import type { DeclinedType } from '~src/types.ts'
import { notAttestedInLanguageError } from '~src/errors.ts'
import {
  getPalatalizedRoot,
  putAccentOnString,
  stripAllAccents,
} from '~src/utils.ts'
import {
  type AccentuationType,
  moveThirdAccentuation,
  SECOND_LAST_ACUTE,
} from './utils.ts'
import AsDeclinator from './AsDeclinator.ts'
import EDeclinator from './EDeclinator.ts'

/**
 * @description Declinator for -(i)us nominals. All methods accept stems without nominative -us
 */
export default class UsDeclinator {
  static declineUsNounI(
    stem: string,
  ): DeclinedType {
    return {
      sgNom: `${stem}us`,
      sgGen: `${stem}aus`,
      sgDat: `${stem}ui`,
      sgAcc: `${stem}ų`,
      sgInst: `${stem}umi`,
      sgLoc: `${stem}uje`,
      sgVoc: `${stem}au`,
      plNom: `${stem}ūs`,
      plGen: `${stem}ų`,
      plDat: `${stem}ums`,
      plAcc: `${stem}us`,
      plInst: `${stem}umis`,
      plLoc: `${stem}uose`,
      plVoc: `${stem}ūs`,
    }
  }
  static declineUsNounII(
    stem: string,
  ): DeclinedType {
    const accentlessStem = stripAllAccents(stem)
    return {
      ...UsDeclinator.declineUsNounI(stem),
      plAcc: `${accentlessStem}u\u0300s`,
    }
  }
  static declineUsNounIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): DeclinedType {
    const accentedStem = moveThirdAccentuation(stem + 'u', type).replace(
      /u$/,
      '',
    )
    return {
      sgNom: `${stem}u\u0300s`,
      sgGen: `${stem}au\u0303s`,
      sgDat: `${accentedStem}ui`,
      sgAcc: `${accentedStem}ų`,
      sgInst: `${stem}umi\u0300`,
      sgLoc: `${stem}uje\u0300`,
      sgVoc: `${stem}au\u0303`,
      plNom: `${accentedStem}ūs`,
      plGen: `${stem}ų\u0303`,
      plDat: `${stem}u\u0300ms`,
      plAcc: `${accentedStem}us`,
      plInst: `${stem}umi\u0300s`,
      plLoc: `${stem}uose\u0300`,
      plVoc: `${accentedStem}ūs`,
    }
  }
  static declineUsNounIV(
    stem: string,
  ): DeclinedType {
    const accentedStem = putAccentOnString(stem, 1, false)
    return {
      sgNom: `${stem}u\u0300s`,
      sgGen: `${stem}au\u0303s`,
      sgDat: `${accentedStem}ui`,
      sgAcc: `${accentedStem}ų`,
      sgInst: `${stem}umi\u0300`,
      sgLoc: `${stem}uje\u0300`,
      sgVoc: `${stem}au\u0303`,
      plNom: `${accentedStem}ūs`,
      plGen: `${stem}ų\u0303`,
      plDat: `${stem}u\u0300ms`,
      plAcc: `${stem}u\u0300s`,
      plInst: `${stem}umi\u0300s`,
      plLoc: `${stem}uose\u0300`,
      plVoc: `${accentedStem}ūs`,
    }
  }
  static declineIusNounI(
    stem: string,
  ): DeclinedType {
    return {
      ...AsDeclinator.declineAsNounI(stem),
      ...UsDeclinator.#getSingular(UsDeclinator.declineUsNounI(stem)),
    }
  }
  static declineIusNounII(
    stem: string,
  ): DeclinedType {
    return {
      ...AsDeclinator.declineAsNounII(stem),
      ...UsDeclinator.#getSingular(UsDeclinator.declineUsNounII(stem)),
    }
  }
  static declineIusNounIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): DeclinedType {
    const accentedStem = moveThirdAccentuation(stem + 'u', type).replace(
      /u$/,
      '',
    )
    return {
      ...AsDeclinator.declineAsNounIII(accentedStem),
      ...UsDeclinator.#getSingular(UsDeclinator.declineUsNounIII(stem, type)),
    }
  }
  static declineIusNounIV(
    stem: string,
  ): DeclinedType {
    return {
      ...AsDeclinator.declineAsNounIV(stem),
      ...UsDeclinator.#getSingular(UsDeclinator.declineUsNounIV(stem)),
    }
  }
  static declineUsAdjectivalI(stem: string): DeclinedType {
    const palatalisedStem = getPalatalizedRoot(stem)
    return {
      sgNom: `${stem}us`,
      sgGen: `${stem}aus`,
      sgDat: `${palatalisedStem}iam`,
      sgAcc: `${stem}ų`,
      sgInst: `${palatalisedStem}iu`,
      sgLoc: `${palatalisedStem}iame`,
      sgVoc: `${stem}us`,
      plNom: `${stem}ūs`,
      plGen: `${palatalisedStem}ių`,
      plDat: `${stem}iems`,
      plAcc: `${palatalisedStem}ius`,
      plInst: `${palatalisedStem}iais`,
      plLoc: `${palatalisedStem}iuose`,
      plVoc: `${stem}ūs`,
    }
  }
  static declineUsAdjectivalII(_stem: string): DeclinedType {
    throw notAttestedInLanguageError
  }
  static declineUsAdjectivalIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): DeclinedType {
    const accentedStem = moveThirdAccentuation(stem + 'u', type).replace(
      /u$/,
      '',
    )
    const accentedPalatalisedStem = getPalatalizedRoot(accentedStem)
    const palatalisedStem = getPalatalizedRoot(stem)
    return {
      sgNom: `${stem}u\u0300s`,
      sgGen: `${stem}au\u0303s`,
      sgDat: `${palatalisedStem}ia\u0301m`,
      sgAcc: `${accentedStem}ų`,
      sgInst: `${accentedPalatalisedStem}iu`,
      sgLoc: `${palatalisedStem}iame\u0300`,
      sgVoc: `${stem}u\u0300s`,
      plNom: `${accentedStem}ūs`,
      plGen: `${palatalisedStem}ių\u0303`,
      plDat: `${stem}i\u0301ems`,
      plAcc: `${accentedPalatalisedStem}ius`,
      plInst: `${palatalisedStem}iai\u0303s`,
      plLoc: `${palatalisedStem}iuose\u0300`,
      plVoc: `${accentedStem}ūs`,
    }
  }
  static declineUsAdjectivalIV(stem: string): DeclinedType {
    const palatalisedStem = getPalatalizedRoot(stem)
    return {
      //@ts-ignore spreading is good, stop complaining
      ...UsDeclinator.declineUsAdjectivalIII(stem, {
        isAcute: false,
        syllable: 2,
      }),
      sgInst: `${palatalisedStem}iu\u0300`,
      plAcc: `${palatalisedStem}iu\u0300s`,
    }
  }

  static declineUsPronominalImmobile(stem: string): DeclinedType {
    const palatalisedStem = getPalatalizedRoot(stem)
    return {
      sgNom: `${stem}usis`,
      sgGen: `${palatalisedStem}iojo`,
      sgDat: `${palatalisedStem}iajam`,
      sgAcc: `${stem}ųjį`,
      sgInst: `${palatalisedStem}iuoju`,
      sgLoc: `${palatalisedStem}iajame`,
      sgVoc: `${stem}usis`,
      plNom: `${stem}ieji`,
      plGen: `${palatalisedStem}iųjų`,
      plDat: `${stem}iesiems`,
      plAcc: `${palatalisedStem}iuosius`,
      plInst: `${palatalisedStem}iaisiais`,
      plLoc: `${palatalisedStem}iuosiuose`,
      plVoc: `${stem}ieji`,
    }
  }

  /**
   * @description declines pronominal adjectives of the 3rd and the 4th accentuation class
   * @param stem stem without -us: gražus - graž; gajus - gaj
   * @param type accentuation class: use 2b for the 4th accentuation
   */
  static declineUsPronominalMobile(
    stem: string,
    type: AccentuationType,
  ): DeclinedType {
    const accentedStem = moveThirdAccentuation(stem + 'u', type).replace(
      /u$/,
      '',
    )
    const accentedPalatalisedStem = getPalatalizedRoot(accentedStem)
    const palatalisedStem = getPalatalizedRoot(stem)
    return {
      sgNom: `${stem}u\u0300sis`,
      sgGen: `${accentedPalatalisedStem}iojo`,
      sgDat: `${palatalisedStem}ia\u0301jam`,
      sgAcc: `${accentedStem}ųjį`,
      sgInst: `${palatalisedStem}iu\u0301oju`,
      sgLoc: `${palatalisedStem}ia\u0303jame`,
      sgVoc: `${stem}u\u0300sis`,
      plNom: `${stem}i\u0301eji`,
      plGen: `${palatalisedStem}ių\u0303jų`,
      plDat: `${stem}i\u0301esiems`,
      plAcc: `${palatalisedStem}iu\u0301osius`,
      plInst: `${palatalisedStem}iai\u0303siais`,
      plLoc: `${palatalisedStem}iuo\u0303siuose`,
      plVoc: `${stem}i\u0301eji`,
    }
  }

  static #getSingular(
    noun: DeclinedType,
  ): {
    sgNom: string
    sgGen: string
    sgDat: string
    sgAcc: string
    sgInst: string
    sgLoc: string
    sgVoc: string
  } {
    return {
      sgNom: noun.sgNom,
      sgGen: noun.sgGen,
      sgDat: noun.sgDat,
      sgAcc: noun.sgAcc,
      sgInst: noun.sgInst,
      sgLoc: noun.sgLoc,
      sgVoc: noun.sgVoc,
    }
  }
  static ZMOGUS: DeclinedType = {
    ...EDeclinator.declineIII(`žmon`),
    ...UsDeclinator.#getSingular(UsDeclinator.declineUsNounIV('žmog')),
  }
}
