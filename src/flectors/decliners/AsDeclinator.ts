import type { DeclinedType } from '~src/types.ts'
import { getUnpalatalizedRoot, stripAllAccents } from '~src/utils.ts'
import { notAttestedInLanguageError } from '~src/errors.ts'

/**
 * @description Declinator for -(i/j)as nominals. All methods accept stems without nominative -as (but with i/j)
 */
export default class AsDeclinator {
  static declineAsReflexiveNoun(stem: string): DeclinedType {
    return {
      ...Object.fromEntries(
        Object.entries(AsDeclinator.declineAsNounI(stem)).map((
          [key, value],
        ) => [key, (value + 'si').replace(/ssi$/, 'sis')]),
      ),
    } as unknown as DeclinedType
  }
  static declineAsNounI(stem: string): DeclinedType {
    return {
      sgNom: `${stem}as`,
      sgGen: `${stem}o`,
      sgDat: `${stem}ui`,
      sgAcc: `${stem}ą`,
      sgInst: `${stem}u`,
      sgLoc: `${stem}e`,
      sgVoc: `${stem}e`,
      plNom: `${stem}ai`,
      plGen: `${stem}ų`,
      plDat: `${stem}ams`,
      plAcc: `${stem}us`,
      plInst: `${stem}ais`,
      plLoc: `${stem}uose`,
      plVoc: `${stem}ai`,
    }
  }
  static declineAsNounII(stem: string): DeclinedType {
    const accentlessRoot = stripAllAccents(stem)
    return {
      ...AsDeclinator.declineAsNounI(stem),
      sgInst: `${accentlessRoot}u\u0300`,
      sgLoc: `${accentlessRoot}e\u0300`,
      plAcc: `${accentlessRoot}u\u0300s`,
    }
  }
  static declineAsNounIII(stem: string): DeclinedType {
    return {
      ...AsDeclinator.declineAsNounIV(stem),
      sgInst: `${stem}u`,
      plAcc: `${stem}us`,
    }
  }
  static declineAsNounIV(stem: string): DeclinedType {
    const accentlessRoot = stripAllAccents(stem)
    return {
      ...AsDeclinator.declineAsNounII(stem),
      plNom: `${accentlessRoot}ai\u0303`,
      plGen: `${accentlessRoot}ų\u0303`,
      plDat: `${accentlessRoot}a\u0301ms`,
      plInst: `${accentlessRoot}ai\u0303s`,
      plLoc: `${accentlessRoot}uose\u0300`,
      plVoc: `${accentlessRoot}ai\u0303`,
    }
  }
  static declineBisyllabicJasNounI(stem: string): DeclinedType {
    return {
      ...AsDeclinator.declineAsNounI(stem),
      ...getBisyllabic(stem),
    }
  }
  static declineBisyllabicJasNounII(stem: string): DeclinedType {
    return {
      ...AsDeclinator.declineAsNounII(stem),
      ...getBisyllabic(stem),
    }
  }
  static declineBisyllabicJasNounIII(stem: string): DeclinedType {
    return {
      ...AsDeclinator.declineAsNounIII(stem),
      ...getBisyllabic(stem),
    }
  }
  static declineBisyllabicJasNounIV(stem: string): DeclinedType {
    return {
      ...AsDeclinator.declineAsNounIV(stem),
      ...getBisyllabic(stem),
    }
  }
  static declinePolysyllabicJasNounI(stem: string): DeclinedType {
    return {
      ...AsDeclinator.declineAsNounI(stem),
      ...getPolysyllabic(stem),
    }
  }
  static declinePolysyllabicJasNounII(stem: string): DeclinedType {
    return {
      ...AsDeclinator.declineAsNounII(stem),
      ...getPolysyllabic(stem),
    }
  }
  static declinePolysyllabicJasNounIII(stem: string): DeclinedType {
    return {
      ...AsDeclinator.declineAsNounIII(stem),
      ...getPolysyllabic(stem),
    }
  }
  static declinePolysyllabicJasNounIV(stem: string): DeclinedType {
    return {
      ...AsDeclinator.declineAsNounIV(stem),
      ...getPolysyllabic(stem),
    }
  }
  static declineIasNounI(stem: string): DeclinedType {
    const depalatalisedStem = getUnpalatalizedRoot(stem).replace(/i$/, '')
    return {
      ...AsDeclinator.declineAsNounI(stem),
      sgLoc: `${depalatalisedStem}yje`,
      sgVoc: `${stem} ${stem}au`,
    }
  }
  static declineIasNounII(stem: string): DeclinedType {
    const depalatalisedStem = getUnpalatalizedRoot(stem).replace(/i$/, '')
    return {
      ...AsDeclinator.declineAsNounII(stem),
      sgLoc: `${depalatalisedStem}yje`,
      sgVoc: `${stem}`,
    }
  }
  static declineIasNounIII(stem: string): DeclinedType {
    const depalatalisedUnAccentedStem = stripAllAccents(
      getUnpalatalizedRoot(stem).replace(/i$/, ''),
    )
    return {
      ...AsDeclinator.declineAsNounIII(stem),
      sgLoc: `${depalatalisedUnAccentedStem}yje\u0300`,
      sgVoc: `${depalatalisedUnAccentedStem}y\u0303`,
    }
  }
  static declineIasNounIV(stem: string): DeclinedType {
    const depalatalisedUnAccentedStem = stripAllAccents(
      getUnpalatalizedRoot(stem).replace(/i$/, ''),
    )
    return {
      ...AsDeclinator.declineAsNounIV(stem),
      sgLoc: `${depalatalisedUnAccentedStem}yje\u0300`,
      sgVoc: `${depalatalisedUnAccentedStem}y\u0303`,
    }
  }

  static declineAsAdjectivalI(stem: string): DeclinedType {
    return {
      ...AsDeclinator.declineAsNounI(stem),
      ...getAdjectivalAs(stem),
    }
  }
  /**
   * @description no adjectives ending -as and belonging to the 2nd accentuation have been found but just in case the method is here
   */
  static declineAsAdjectivalII(_stem: string): DeclinedType {
    throw notAttestedInLanguageError
  }
  static declineAsAdjectivalIII(stem: string): DeclinedType {
    return {
      ...AsDeclinator.declineAsAdjectivalIV(stem),
      sgInst: `${stem}u`,
      plAcc: `${stem}us`,
    }
  }
  static declineAsAdjectivalIV(stem: string): DeclinedType {
    const accentlessRoot = stripAllAccents(stem)
    return {
      ...AsDeclinator.declineAsNounIV(stem),
      ...getAdjectivalAs(stem),
      sgDat: `${accentlessRoot}a\u0301m`,
      sgLoc: `${accentlessRoot}ame\u0300`,
      plNom: `${accentlessRoot}i\u0300`,
      plDat: `${accentlessRoot}i\u0301ems`,
      plVoc: `${accentlessRoot}i\u0300`,
    }
  }
  static declineIasAdjectivalI(stem: string): DeclinedType {
    return {
      ...AsDeclinator.declineAsAdjectivalI(stem),
      ...getAdjectivalIasStem(stem),
    }
  }
  /**
   * @description no adjectives ending -as and belonging to the 2nd accentuation have been found but just in case the method is here
   */
  static declineIasAdjectivalII(_stem: string): DeclinedType {
    throw notAttestedInLanguageError
  }
  static declineIasAdjectivalIII(stem: string): DeclinedType {
    return {
      ...AsDeclinator.declineAsAdjectivalIII(stem),
      ...getAdjectivalIasFlection(stem),
    }
  }
  static declineIasAdjectivalIV(stem: string): DeclinedType {
    return {
      ...AsDeclinator.declineAsAdjectivalIV(stem),
      ...getAdjectivalIasFlection(stem),
    }
  }

  static declineAsPronominalImmobile(stem: string): DeclinedType {
    return {
      sgNom: `${stem}asis`,
      sgGen: `${stem}ojo`,
      sgDat: `${stem}ajam`,
      sgAcc: `${stem}ąjį`,
      sgInst: `${stem}uoju`,
      sgLoc: `${stem}ajame`,
      sgVoc: `${stem}asis`,
      plNom: `${stem}ieji`,
      plGen: `${stem}ųjų`,
      plDat: `${stem}iesiems`,
      plAcc: `${stem}uosius`,
      plInst: `${stem}aisiais`,
      plLoc: `${stem}uosiuose`,
      plVoc: `${stem}ieji`,
    }
  }
  /**
   * @description declines pronominal adjectives of the 3rd and the 4th accentuation class
   * @param stem stem without -as: geras - ger
   */
  static declineAsPronominalMobile(
    stem: string,
  ): DeclinedType {
    const accentlessRoot = stripAllAccents(stem)
    return {
      sgNom: `${accentlessRoot}a\u0300sis`,
      sgGen: `${stem}ojo`,
      sgDat: `${accentlessRoot}a\u0301jam`,
      sgAcc: `${stem}ąjį`,
      sgInst: `${accentlessRoot}u\u0301oju`,
      sgLoc: `${accentlessRoot}a\u0303jame`,
      sgVoc: `${accentlessRoot}a\u0300sis`,
      plNom: `${accentlessRoot}i\u0301eji`,
      plGen: `${accentlessRoot}ų\u0303jų`,
      plDat: `${accentlessRoot}i\u0301esiems`,
      plAcc: `${accentlessRoot}u\u0301osius`,
      plInst: `${accentlessRoot}ai\u0303siais`,
      plLoc: `${accentlessRoot}uo\u0303siuose`,
      plVoc: `${accentlessRoot}i\u0301eji`,
    }
  }
  static declineIasPronominalImmobile(stem: string): DeclinedType {
    const depalatalisedStem = getUnpalatalizedRoot(stem).replace(/i$/, '')
    return {
      ...AsDeclinator.declineAsPronominalImmobile(stem),
      plNom: `${depalatalisedStem}ieji`,
      plDat: `${depalatalisedStem}iesiems`,
      plVoc: `${depalatalisedStem}ieji`,
    }
  }
  /**
   * @description declines pronominal adjectives of the 3rd and the 4th accentuation class
   * @param stem stem without -as: stačias - stači
   */
  static declineIasPronominalMobile(
    stem: string,
  ): DeclinedType {
    const depalatalisedAccentlessStem = stripAllAccents(
      getUnpalatalizedRoot(stem).replace(/i$/, ''),
    )
    return {
      ...AsDeclinator.declineAsPronominalMobile(stem),
      plNom: `${depalatalisedAccentlessStem}i\u0301eji`,
      plDat: `${depalatalisedAccentlessStem}i\u0301esiems`,
      plVoc: `${depalatalisedAccentlessStem}i\u0301eji`,
    }
  }
}

function getBisyllabic(stem: string): { sgLoc: string; sgVoc: string } {
  return {
    sgLoc: `${stem}yje ${stem}uje`,
    sgVoc: `${stem}au`,
  }
}

function getPolysyllabic(stem: string): { sgLoc: string; sgVoc: string } {
  return {
    sgLoc: `${stem}uje`,
    sgVoc: `${stem}au`,
  }
}

function getAdjectivalAs(
  stem: string,
): {
  sgDat: string
  sgLoc: string
  sgVoc: string
  plNom: string
  plDat: string
  plVoc: string
} {
  return {
    sgDat: `${stem}am`,
    sgLoc: `${stem}ame`,
    sgVoc: `${stem}as`,
    plNom: `${stem}i`,
    plDat: `${stem}iems`,
    plVoc: `${stem}i`,
  }
}

function getAdjectivalIasStem(stem: string): {
  plNom: string
  plDat: string
  plVoc: string
} {
  const depalatalisedStem = getUnpalatalizedRoot(stem)
  return {
    plNom: `${depalatalisedStem}i`,
    plDat: `${depalatalisedStem}iems`,
    plVoc: `${depalatalisedStem}i`,
  }
}

function getAdjectivalIasFlection(stem: string): {
  plNom: string
  plDat: string
  plVoc: string
} {
  const depalatalisedStem = getUnpalatalizedRoot(stem)
  const depalatalisedUnaccentedStem = stripAllAccents(depalatalisedStem)
  return {
    plNom: `${depalatalisedUnaccentedStem}i\u0300`,
    plDat: `${depalatalisedUnaccentedStem}i\u0301ems`,
    plVoc: `${depalatalisedUnaccentedStem}i\u0300`,
  }
}