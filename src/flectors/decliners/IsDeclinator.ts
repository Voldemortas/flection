import type { DeclinedType } from '~src/types.ts'
import {
  getPalatalizedRoot,
  hasAnyAccent,
  stripAllAccents,
} from '~src/utils.ts'
import {
  type AccentuationType,
  getThirdAccentuationType,
  moveThirdAccentuation,
  SECOND_LAST_ACUTE,
} from './utils.ts'
import ADeclinator from './ADeclinator.ts'

/**
 * @description Declinator for -is/-ys nominals. All methods accept stems without nominative -is/-ys
 */
export default class IsDeclinator {
  static declineIoNounI(stem: string): DeclinedType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    return {
      sgNom: `${stem}is`,
      sgGen: `${palatalisedRoot}o`,
      sgDat: `${palatalisedRoot}ui`,
      sgAcc: `${stem}į`,
      sgInst: `${palatalisedRoot}u`,
      sgLoc: `${stem}yje`,
      sgVoc: `${stem}i`,
      plNom: `${palatalisedRoot}ai`,
      plGen: `${palatalisedRoot}ų`,
      plDat: `${palatalisedRoot}ams`,
      plAcc: `${palatalisedRoot}us`,
      plInst: `${palatalisedRoot}ais`,
      plLoc: `${palatalisedRoot}uose`,
      plVoc: `${palatalisedRoot}ai`,
    }
  }
  static declineIoNounII(stem: string): DeclinedType {
    const palatalisedUnstressedRoot = `${
      getPalatalizedRoot(stripAllAccents(stem))
    }i`.replace(/ji$/, 'j')
    return {
      ...IsDeclinator.declineIoNounI(stem),
      sgInst: `${palatalisedUnstressedRoot}u\u0300`,
      plAcc: `${palatalisedUnstressedRoot}u\u0300s`,
    }
  }
  static declineIoNounIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): DeclinedType {
    const accentedStem = moveThirdAccentuation(
      stripAllAccents(stem) + 'ys',
      type,
    ).replace(
      /ys$/,
      '',
    )
    return {
      ...IsDeclinator.declineIoNounI(accentedStem),
      sgNom: `${stem}y\u0303s`,
      sgLoc: `${stem}yje\u0300`,
      sgVoc: `${stem}y\u0303`,
      plNom: `${stem}iai\u0303`,
      plGen: `${stem}ių\u0303`,
      plDat: `${stem}ia\u0301ms`,
      plInst: `${stem}iai\u0303s`,
      plLoc: `${stem}iuose\u0300`,
      plVoc: `${stem}iai\u0303`,
    }
  }
  static declineIoNounIV(stem: string): DeclinedType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    return {
      ...IsDeclinator.declineIoNounIII(stem, '4'),
      sgInst: `${palatalisedRoot}u\u0300`,
      plAcc: `${palatalisedRoot}u\u0300s`,
    }
  }
  static declineMasculineIesNounI(stem: string): DeclinedType {
    return {
      ...IsDeclinator.declineIoNounI(stem),
      sgGen: `${stem}ies`,
      sgInst: `${stem}imi`,
      sgVoc: `${stem}ie`,
      plNom: `${stem}ys`,
      plDat: `${stem}ims`,
      plAcc: `${stem}is`,
      plInst: `${stem}imis`,
      plLoc: `${stem}yse`,
      plVoc: `${stem}ys`,
    }
  }
  static declineMasculineIesNounII(stem: string): DeclinedType {
    const accentlessStem = stripAllAccents(stem)
    return {
      ...IsDeclinator.declineMasculineIesNounI(stem),
      plAcc: `${accentlessStem}i\u0300s`,
    }
  }
  static declineMasculineIesNounIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): DeclinedType {
    const accentedStem = moveThirdAccentuation(
      stripAllAccents(stem) + 'ys',
      type,
    ).replace(
      /ys$/,
      '',
    )
    const palatalisedStem = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    return {
      ...IsDeclinator.declineMasculineIesNounI(accentedStem),
      sgNom: `${stem}i\u0300s`,
      sgGen: `${stem}ie\u0303s`,
      sgInst: `${stem}imi\u0300`,
      sgLoc: `${stem}yje\u0300`,
      sgVoc: `${stem}ie\u0303`,
      plGen: `${palatalisedStem}ų\u0303`,
      plDat: `${stem}i\u0300ms`,
      plInst: `${stem}imi\u0300s`,
      plLoc: `${stem}yse\u0300`,
    }
  }
  static declineMasculineIesNounIV(stem: string): DeclinedType {
    return {
      ...IsDeclinator.declineMasculineIesNounIII(stem, '4'),
      plAcc: `${stem}i\u0300s`,
    }
  }
  static declineFeminineIesNounI(stem: string): DeclinedType {
    const masculineNoun = IsDeclinator.declineMasculineIesNounI(stem)
    return {
      ...masculineNoun,
      sgDat: masculineNoun.sgDat.replace(/iui$/, 'iai'),
    }
  }
  static declineFeminineIesNounII(stem: string): DeclinedType {
    const masculineNoun = IsDeclinator.declineMasculineIesNounII(stem)
    return {
      ...masculineNoun,
      sgDat: masculineNoun.sgDat.replace(/iui$/, 'iai'),
    }
  }
  static declineFeminineIesNounIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): DeclinedType {
    const masculineNoun = IsDeclinator.declineMasculineIesNounIII(stem, type)
    return {
      ...masculineNoun,
      sgDat: masculineNoun.sgDat.replace(/iui$/, 'iai'),
    }
  }
  static declineFeminineIesNounIV(stem: string): DeclinedType {
    const masculineNoun = IsDeclinator.declineMasculineIesNounIV(stem)
    return {
      ...masculineNoun,
      sgDat: masculineNoun.sgDat.replace(/iui$/, 'iai'),
    }
  }
  static declineMasculineIsAdjectiveI(stem: string): DeclinedType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    return {
      ...IsDeclinator.declineIoNounI(stem),
      sgDat: `${palatalisedRoot}am`,
      sgLoc: `${palatalisedRoot}ame`,
      plDat: `${stem}iems`,
    }
  }
  static declineMasculineIsAdjectiveII(stem: string): DeclinedType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    const palatalisedUnstressedRoot = stripAllAccents(palatalisedRoot)
    return {
      ...IsDeclinator.declineIoNounII(stem),
      sgDat: `${palatalisedRoot}am`,
      sgLoc: `${palatalisedRoot}ame`,
      plAcc: `${palatalisedUnstressedRoot}u\u0300s`,
    }
  }
  static declineMasculineIsAdjectiveIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): DeclinedType {
    function palataliseRoot(root: string): string {
      return `${getPalatalizedRoot(root)}i`.replace(/ji$/, 'j')
    }
    const hasAccentedSyllable = hasAnyAccent(stem)
    const accentedStem = hasAccentedSyllable
      ? stem
      : moveThirdAccentuation(stem + 'is', type).replace(/is$/, '')
    const unaccentedStem = hasAccentedSyllable ? stripAllAccents(stem) : stem
    const palatalisedAccentedStem = palataliseRoot(accentedStem)
    const palatalisedUnaccentedStem = palataliseRoot(unaccentedStem)
    return {
      sgNom: `${accentedStem}is`,
      sgGen: `${palatalisedAccentedStem}o`,
      sgDat: `${palatalisedUnaccentedStem}a\u0301m`,
      sgAcc: `${accentedStem}į`,
      sgInst: `${palatalisedAccentedStem}u`,
      sgLoc: `${palatalisedUnaccentedStem}ame\u0300`,
      sgVoc: `${accentedStem}is`,
      plNom: `${unaccentedStem}i\u0300`,
      plGen: `${palatalisedUnaccentedStem}ų\u0303`,
      plDat: `${unaccentedStem}i\u0301ems`,
      plAcc: `${palatalisedAccentedStem}us`,
      plInst: `${palatalisedUnaccentedStem}ai\u0303s`,
      plLoc: `${palatalisedUnaccentedStem}uose\u0300`,
      plVoc: `${unaccentedStem}i\u0300`,
    }
  }
  static declineMasculineIsAdjectiveIV(stem: string): DeclinedType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    return {
      ...IsDeclinator.declineMasculineIsAdjectiveIII(stem, '4'),
      sgInst: `${palatalisedRoot}u\u0300`,
      plAcc: `${palatalisedRoot}u\u0300s`,
    }
  }
  static declineMasculineYsAdjectiveIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): DeclinedType {
    return {
      ...IsDeclinator.declineMasculineIsAdjectiveIII(stem, type),
      sgNom: `${stem}y\u0303s`,
      sgVoc: `${stem}y\u0303`,
    }
  }
  static declineMasculineYsAdjectiveIV(stem: string): DeclinedType {
    return {
      ...IsDeclinator.declineMasculineIsAdjectiveIV(stem),
      sgNom: `${stem}y\u0303s`,
      sgVoc: `${stem}y\u0303`,
    }
  }

  static declineFeminineIAdjectiveIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): DeclinedType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    const accentlessPalatalisedRoot = stripAllAccents(palatalisedRoot)
    const accentedPalatalisedStem = moveThirdAccentuation(
      accentlessPalatalisedRoot,
      type,
    )
    return {
      sgNom: `${stem}i\u0300`,
      sgGen: `${palatalisedRoot}o\u0303s`,
      sgDat: `${accentedPalatalisedStem}ai`,
      sgAcc: `${accentedPalatalisedStem}ą`,
      sgInst: `${accentedPalatalisedStem}a`,
      sgLoc: `${palatalisedRoot}oje\u0300`,
      sgVoc: `${stem}i\u0300`,
      plNom: `${accentedPalatalisedStem}os`,
      plGen: `${palatalisedRoot}ų\u0303`,
      plDat: `${palatalisedRoot}o\u0301ms`,
      plAcc: `${accentedPalatalisedStem}as`,
      plInst: `${palatalisedRoot}omi\u0300s`,
      plLoc: `${palatalisedRoot}ose\u0300`,
      plVoc: `${accentedPalatalisedStem}os`,
    }
  }
  static declineFeminineIAdjectiveIV(stem: string): DeclinedType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    return {
      ...IsDeclinator.declineFeminineIAdjectiveIII(stem, '4'),
      sgInst: `${palatalisedRoot}a\u0300`,
      plAcc: `${palatalisedRoot}a\u0300s`,
    }
  }
  static declineFeminineIAdjective(stem: string): DeclinedType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    return {
      sgNom: `${stem}i`,
      sgGen: `${palatalisedRoot}os`,
      sgDat: `${palatalisedRoot}ai`,
      sgAcc: `${palatalisedRoot}ą`,
      sgInst: `${palatalisedRoot}a`,
      sgLoc: `${palatalisedRoot}oje`,
      sgVoc: `${stem}i`,
      plNom: `${palatalisedRoot}os`,
      plGen: `${palatalisedRoot}ų`,
      plDat: `${palatalisedRoot}oms`,
      plAcc: `${palatalisedRoot}as`,
      plInst: `${palatalisedRoot}omis`,
      plLoc: `${palatalisedRoot}ose`,
      plVoc: `${palatalisedRoot}os`,
    }
  }
  static declineMasculinePronominalImmobile(stem: string): DeclinedType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    return {
      sgNom: `${stem}ysis`,
      sgGen: `${palatalisedRoot}ojo`,
      sgDat: `${palatalisedRoot}ajam`,
      sgAcc: `${stem}įjį`,
      sgInst: `${palatalisedRoot}uoju`,
      sgLoc: `${palatalisedRoot}ajame`,
      sgVoc: `${stem}ysis`,
      plNom: `${stem}ieji`,
      plGen: `${palatalisedRoot}ųjų`,
      plDat: `${stem}iesiems`,
      plAcc: `${palatalisedRoot}uosius`,
      plInst: `${palatalisedRoot}aisiais`,
      plLoc: `${palatalisedRoot}uosiuose`,
      plVoc: `${stem}ieji`,
    }
  }
  /**
   * @description declines pronominal adjectives of the 3rd and the 4th accentuation class
   * @param stem stem without -is/ys: dešinys - dešin
   * @param type accentuation class: use 2b for the 4th accentuation
   */
  static declineMasculinePronominalMobile(
    stem: string,
    type: AccentuationType,
  ): DeclinedType {
    const palatalisedRoot = getPalatalizedRoot(stem) + 'i'
    const accentedStem = moveThirdAccentuation(stem + 'u', type).replace(
      /u$/,
      '',
    )
    return {
      sgNom: `${stem}y\u0303sis`,
      sgGen: `${accentedStem}iojo`,
      sgDat: `${palatalisedRoot}a\u0301jam`,
      sgAcc: `${accentedStem}įjį`,
      sgInst: `${palatalisedRoot}u\u0301oju`,
      sgLoc: `${palatalisedRoot}a\u0303jame`,
      sgVoc: `${stem}y\u0303sis`,
      plNom: `${stem}i\u0301eji`,
      plGen: `${palatalisedRoot}ų\u0303jų`,
      plDat: `${stem}i\u0301esiems`,
      plAcc: `${palatalisedRoot}u\u0301osius`,
      plInst: `${palatalisedRoot}ai\u0303siais`,
      plLoc: `${palatalisedRoot}uo\u0303siuose`,
      plVoc: `${stem}i\u0301eji`,
    }
  }
  /**
   * @description declines pronominal adjectives of with no stress moving to the flectio
   * @param {string} stem stem without -a: stati - stat
   */
  static declineFemininePronominalImmobile(stem: string): DeclinedType {
    return ADeclinator.declinePronominalImmobile(
      getPalatalizedRoot(getPalatalizedRoot(stem) + 'i'),
    ) as DeclinedType
  }
  /**
   * @description declines pronominal adjectives of the 2nd, 3rd and the 4th accentuation class
   * @param {string} stem stem without -a: stati - stat
   * @param {AccentuationType} type accentuation class
   */
  static declineFemininePronominalMobile(
    stem: string,
    type: AccentuationType,
  ): DeclinedType {
    const { isAcute, syllable } = getThirdAccentuationType(type)
    return ADeclinator.declinePronominalMobile(
      getPalatalizedRoot(stem) + 'i',
      { isAcute, syllable: syllable + 1 },
    ) as DeclinedType
  }
}
