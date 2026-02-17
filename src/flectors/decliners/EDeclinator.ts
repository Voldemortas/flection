import { type DeclinedType, Gender } from '~src/types.ts'
import {
  getPalatalizedRoot,
  putAccentOnString,
  stripAllAccents,
} from '~src/utils.ts'
import { moveThirdAccentuation } from './utils.ts'

/**
 * @description Declinator for -ė nominals. All methods accept stems without nominative -ė
 */
export default class EDeclinator {
  static declineI(stem: string): DeclinedType {
    const palatalisedStem = getPalatalizedRoot(stem).replace(/i$/, '')
    return {
      gender: Gender.feminine,
      sgNom: `${stem}ė`,
      sgGen: `${stem}ės`,
      sgDat: `${stem}ei`,
      sgAcc: `${stem}ę`,
      sgInst: `${stem}e`,
      sgLoc: `${stem}ėje`,
      sgVoc: `${stem}e`,
      plNom: `${stem}ės`,
      plGen: `${palatalisedStem}ių`,
      plDat: `${stem}ėms`,
      plAcc: `${stem}es`,
      plInst: `${stem}ėmis`,
      plLoc: `${stem}ėse`,
      plVoc: `${stem}ės`,
    }
  }
  static declineII(stem: string): DeclinedType {
    const accentlessStem = stripAllAccents(stem)
    return {
      ...EDeclinator.declineI(
        putAccentOnString(stripAllAccents(stem), 1, false),
      ),
      sgInst: `${accentlessStem}e\u0300`,
      plAcc: `${accentlessStem}e\u0300s`,
    }
  }
  static declineIII(
    stem: string,
    type = '0',
  ): DeclinedType {
    const accentedStem = moveThirdAccentuation(stem + 'ė', type)
      .replace(
        /ė$/,
        '',
      )
    const palatalisedStem = getPalatalizedRoot(stem).replace(/i$/, '')
      .replace(
        /ė$/,
        '',
      )
    return {
      ...EDeclinator.declineI(accentedStem),
      sgNom: `${stem}ė\u0303`,
      sgGen: `${stem}ė\u0303s`,
      sgLoc: `${stem}ėje\u0300`,
      plGen: `${palatalisedStem}ių\u0303`,
      plDat: `${stem}ė\u0301ms`,
      plInst: `${stem}ėmi\u0300s`,
      plLoc: `${stem}ėse\u0300`,
    }
  }
  static declineIV(stem: string): DeclinedType {
    const palatalisedStem = getPalatalizedRoot(stem).replace(/i$/, '')
    return {
      ...EDeclinator.declineII(putAccentOnString(stem, 1, false)),
      sgNom: `${stem}ė\u0303`,
      sgGen: `${stem}ė\u0303s`,
      sgLoc: `${stem}ėje\u0300`,
      plGen: `${palatalisedStem}ių\u0303`,
      plDat: `${stem}ė\u0301ms`,
      plAcc: `${stem}e\u0300s`,
      plInst: `${stem}ėmi\u0300s`,
      plLoc: `${stem}ėse\u0300`,
    }
  }
}
