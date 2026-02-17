import { type AdjectiveType, Gender, type NounType } from '~src/types.ts'
import { getUnpalatalizedRoot, stripAllAccents } from '~src/utils.ts'
import { notAttestedInLanguageError } from '../../errors.ts'

/**
 * @description Declinator for -(i/j)as nominals. All methods accept stems without nominative -as (but with i/j)
 */
export default class AsDeclinator {
  static declineAsNounI(stem: string): NounType {
    return {
      gender: Gender.masculine,
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
  static declineAsNounII(stem: string): NounType {
    const accentlessRoot = stripAllAccents(stem)
    return {
      ...AsDeclinator.declineAsNounI(stem),
      sgInst: `${accentlessRoot}u\u0300`,
      sgLoc: `${accentlessRoot}e\u0300`,
      plAcc: `${accentlessRoot}u\u0300s`,
    }
  }
  static declineAsNounIII(stem: string): NounType {
    return {
      ...AsDeclinator.declineAsNounIV(stem),
      sgInst: `${stem}u`,
      plAcc: `${stem}us`,
    }
  }
  static declineAsNounIV(stem: string): NounType {
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
  static declineBisyllabicAsNounI(stem: string): NounType {
    return {
      ...AsDeclinator.declineAsNounI(stem),
      ...AsDeclinator.#bisyllabic(stem),
    }
  }
  static declineBisyllabicAsNounII(stem: string): NounType {
    return {
      ...AsDeclinator.declineAsNounII(stem),
      ...AsDeclinator.#bisyllabic(stem),
    }
  }
  static declineBisyllabicAsNounIII(stem: string): NounType {
    return {
      ...AsDeclinator.declineAsNounIII(stem),
      ...AsDeclinator.#bisyllabic(stem),
    }
  }
  static declineBisyllabicAsNounIV(stem: string): NounType {
    return {
      ...AsDeclinator.declineAsNounIV(stem),
      ...AsDeclinator.#bisyllabic(stem),
    }
  }
  static declinePolysyllabicAsNounI(stem: string): NounType {
    return {
      ...AsDeclinator.declineAsNounI(stem),
      ...AsDeclinator.#polysyllabic(stem),
    }
  }
  static declinePolysyllabicAsNounII(stem: string): NounType {
    return {
      ...AsDeclinator.declineAsNounII(stem),
      ...AsDeclinator.#polysyllabic(stem),
    }
  }
  static declinePolysyllabicAsNounIII(stem: string): NounType {
    return {
      ...AsDeclinator.declineAsNounIII(stem),
      ...AsDeclinator.#polysyllabic(stem),
    }
  }
  static declinePolysyllabicAsNounIV(stem: string): NounType {
    return {
      ...AsDeclinator.declineAsNounIV(stem),
      ...AsDeclinator.#polysyllabic(stem),
    }
  }
  static declineIasNounI(stem: string): NounType {
    const depalatalisedStem = getUnpalatalizedRoot(stem).replace(/i$/, '')
    return {
      ...AsDeclinator.declineAsNounI(stem),
      sgLoc: `${depalatalisedStem}yje`,
      sgVoc: `${stem} ${stem}au`,
    }
  }
  static declineIasNounII(stem: string): NounType {
    const depalatalisedStem = getUnpalatalizedRoot(stem).replace(/i$/, '')
    return {
      ...AsDeclinator.declineAsNounII(stem),
      sgLoc: `${depalatalisedStem}yje`,
      sgVoc: `${stem}`,
    }
  }
  static declineIasNounIII(stem: string): NounType {
    const depalatalisedUnAccentedStem = stripAllAccents(
      getUnpalatalizedRoot(stem).replace(/i$/, ''),
    )
    return {
      ...AsDeclinator.declineAsNounIII(stem),
      sgLoc: `${depalatalisedUnAccentedStem}yje\u0300`,
      sgVoc: `${depalatalisedUnAccentedStem}y\u0303`,
    }
  }
  static declineIasNounIV(stem: string): NounType {
    const depalatalisedUnAccentedStem = stripAllAccents(
      getUnpalatalizedRoot(stem).replace(/i$/, ''),
    )
    return {
      ...AsDeclinator.declineAsNounIV(stem),
      sgLoc: `${depalatalisedUnAccentedStem}yje\u0300`,
      sgVoc: `${depalatalisedUnAccentedStem}y\u0303`,
    }
  }
  static declineAsAdjectivalI(stem: string): AdjectiveType {
    return {
      ...AsDeclinator.declineAsNounI(stem),
      ...this.#adjectivalAs(stem),
    } as AdjectiveType & { gender: Gender.masculine }
  }

  /**
   * @description no adjectives ending -as and belonging to the 2nd accentuation have been found but just in case the method is here
   */
  static declineAsAdjectivalII(_stem: string): AdjectiveType {
    throw notAttestedInLanguageError
  }
  static declineAsAdjectivalIII(stem: string): AdjectiveType {
    return {
      //@ts-ignore spreading is good, stop complaining
      ...AsDeclinator.declineAsAdjectivalIV(stem),
      sgInst: `${stem}u`,
      plAcc: `${stem}us`,
    } as AdjectiveType & { gender: Gender.masculine }
  }
  static declineAsAdjectivalIV(stem: string): AdjectiveType {
    const accentlessRoot = stripAllAccents(stem)
    return {
      ...AsDeclinator.declineAsNounIV(stem),
      ...this.#adjectivalAs(stem),
      sgDat: `${accentlessRoot}a\u0301m`,
      sgLoc: `${accentlessRoot}ame\u0300`,
      plNom: `${accentlessRoot}i\u0300`,
      plDat: `${accentlessRoot}i\u0301ems`,
      plVoc: `${accentlessRoot}i\u0300`,
    } as AdjectiveType & { gender: Gender.masculine }
  }
  static declineIasAdjectivalI(stem: string): AdjectiveType {
    return {
      //@ts-ignore spreading is good, stop complaining
      ...AsDeclinator.declineAsAdjectivalI(stem),
      ...AsDeclinator.#adjectivalIasStem(stem),
    }
  }
  /**
   * @description no adjectives ending -as and belonging to the 2nd accentuation have been found but just in case the method is here
   */
  static declineIasAdjectivalII(_stem: string): AdjectiveType {
    throw notAttestedInLanguageError
  }
  static declineIasAdjectivalIII(stem: string): AdjectiveType {
    return {
      //@ts-ignore spreading is good, stop complaining
      ...AsDeclinator.declineAsAdjectivalIII(stem),
      ...AsDeclinator.#adjectivalIasFlection(stem),
    }
  }
  static declineIasAdjectivalIV(stem: string): AdjectiveType {
    return {
      //@ts-ignore spreading is good, stop complaining
      ...AsDeclinator.declineAsAdjectivalIV(stem),
      ...AsDeclinator.#adjectivalIasFlection(stem),
    }
  }
  static #bisyllabic(stem: string): { sgLoc: string; sgVoc: string } {
    return {
      sgLoc: `${stem}yje ${stem}uje`,
      sgVoc: `${stem}au`,
    }
  }
  static #polysyllabic(stem: string): { sgLoc: string; sgVoc: string } {
    return {
      sgLoc: `${stem}uje`,
      sgVoc: `${stem}au`,
    }
  }
  static #adjectivalAs(
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
  static #adjectivalIasStem(stem: string): {
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
  static #adjectivalIasFlection(stem: string): {
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
}
