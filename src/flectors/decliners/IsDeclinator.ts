import { type AdjectiveType, Gender, type NounType } from '~src/types.ts'
import {
  getPalatalizedRoot,
  hasAnyAccent,
  stripAllAccents,
  stripAllAccentsFromParadigm,
} from '~src/utils.ts'
import {
  type AccentuationType,
  moveThirdAccentuation,
  SECOND_LAST_ACUTE,
} from './utils.ts'

/**
 * @description Declinator for -is/-ys nominals. All methods accept stems without nominative -is/-ys
 */
export default class IsDeclinator {
  static declineIoNounI(stem: string): NounType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    return {
      gender: Gender.masculine,
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
  static declineIoNounII(stem: string): NounType {
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
  ): NounType {
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
  static declineIoNounIV(stem: string): NounType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    return {
      ...IsDeclinator.declineIoNounIII(stem, '2b'),
      sgInst: `${palatalisedRoot}u\u0300`,
      plAcc: `${palatalisedRoot}u\u0300s`,
    }
  }
  static declineMasculineIesNounI(stem: string): NounType {
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
  static declineMasculineIesNounII(stem: string): NounType {
    const accentlessStem = stripAllAccents(stem)
    return {
      ...IsDeclinator.declineMasculineIesNounI(stem),
      plAcc: `${accentlessStem}i\u0300s`,
    }
  }
  static declineMasculineIesNounIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): NounType {
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
  static declineMasculineIesNounIV(stem: string): NounType {
    return {
      ...IsDeclinator.declineMasculineIesNounIII(stem, '2b'),
      plAcc: `${stem}i\u0300s`,
    }
  }
  static declineFeminineIesNounI(stem: string): NounType {
    const masculineNoun = IsDeclinator.declineMasculineIesNounI(stem)
    return {
      ...masculineNoun,
      sgDat: masculineNoun.sgDat.replace(/iui$/, 'iai'),
      gender: Gender.feminine,
    }
  }
  static declineFeminineIesNounII(stem: string): NounType {
    const masculineNoun = IsDeclinator.declineMasculineIesNounII(stem)
    return {
      ...masculineNoun,
      sgDat: masculineNoun.sgDat.replace(/iui$/, 'iai'),
      gender: Gender.feminine,
    }
  }
  static declineFeminineIesNounIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): NounType {
    const masculineNoun = IsDeclinator.declineMasculineIesNounIII(stem, type)
    return {
      ...masculineNoun,
      sgDat: masculineNoun.sgDat.replace(/iui$/, 'iai'),
      gender: Gender.feminine,
    }
  }
  static declineFeminineIesNounIV(stem: string): NounType {
    const masculineNoun = IsDeclinator.declineMasculineIesNounIV(stem)
    return {
      ...masculineNoun,
      sgDat: masculineNoun.sgDat.replace(/iui$/, 'iai'),
      gender: Gender.feminine,
    }
  }
  static declineMasculineIsAdjectiveI(stem: string): AdjectiveType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    return {
      ...IsDeclinator.declineIoNounI(stem),
      sgDat: `${palatalisedRoot}am`,
      sgLoc: `${palatalisedRoot}ame`,
    } as AdjectiveType & { gender: Gender.masculine }
  }
  static declineMasculineIsAdjectiveII(stem: string): AdjectiveType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    const palatalisedUnstressedRoot = stripAllAccents(palatalisedRoot)
    return {
      ...IsDeclinator.declineIoNounII(stem),
      sgDat: `${palatalisedRoot}am`,
      sgLoc: `${palatalisedRoot}ame`,
      plAcc: `${palatalisedUnstressedRoot}u\u0300s`,
    } as AdjectiveType & { gender: Gender.masculine }
  }
  static declineMasculineIsAdjectiveIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): AdjectiveType {
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
      gender: Gender.masculine,
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
    } as AdjectiveType & { gender: Gender.masculine }
  }
  static declineMasculineIsAdjectiveIV(stem: string): AdjectiveType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    return {
      //@ts-ignore spreading is good, stop complaining
      ...IsDeclinator.declineMasculineIsAdjectiveIII(stem, '2b'),
      sgInst: `${palatalisedRoot}u\u0300`,
      plAcc: `${palatalisedRoot}u\u0300s`,
    } as AdjectiveType & { gender: Gender.masculine }
  }
  static declineMasculineYsAdjectiveIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): AdjectiveType {
    return {
      //@ts-ignore spreading is good, stop complaining
      ...IsDeclinator.declineMasculineIsAdjectiveIII(stem, type),
      sgNom: `${stem}y\u0303s`,
      sgVoc: `${stem}y\u0303`,
    }
  }
  static declineMasculineYsAdjectiveIV(stem: string): AdjectiveType {
    return {
      //@ts-ignore spreading is good, stop complaining
      ...IsDeclinator.declineMasculineIsAdjectiveIV(stem),
      sgNom: `${stem}y\u0303s`,
      sgVoc: `${stem}y\u0303`,
    }
  }

  static declineFeminineIAdjectiveIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): AdjectiveType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    const accentlessPalatalisedRoot = stripAllAccents(palatalisedRoot)
    const accentedPalatalisedStem = moveThirdAccentuation(
      accentlessPalatalisedRoot,
      type,
    )
    return {
      gender: Gender.feminine,
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
    } as AdjectiveType & { gender: Gender.feminine }
  }
  static declineFeminineIAdjectiveIV(stem: string): AdjectiveType {
    const palatalisedRoot = `${getPalatalizedRoot(stem)}i`.replace(/ji$/, 'j')
    return {
      //@ts-ignore spreading is good, stop complaining
      ...IsDeclinator.declineFeminineIAdjectiveIII(stem, '2b'),
      sgInst: `${palatalisedRoot}a\u0300`,
      plAcc: `${palatalisedRoot}a\u0300s`,
    } as AdjectiveType & { gender: Gender.feminine }
  }
  static declineFeminineIAdjective(stem: string): AdjectiveType {
    return stripAllAccentsFromParadigm<AdjectiveType>(
      IsDeclinator.declineFeminineIAdjectiveIV(stem),
    )
  }
}
