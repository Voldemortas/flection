import { type DeclinedType, Gender, type NounType } from '~src/types.ts'
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
  static declineI(
    stem: string,
    gender: Gender.feminine | Gender.common = Gender.feminine,
  ): DeclinedType {
    const palatalisedStem = getPalatalizedRoot(stem).replace(/i$/, '')
    return {
      gender,
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
  static declineII(
    stem: string,
    gender: Gender.feminine | Gender.common = Gender.feminine,
  ): DeclinedType {
    const accentlessStem = stripAllAccents(stem)
    return {
      ...EDeclinator.declineI(
        putAccentOnString(stripAllAccents(stem), 1, false),
        gender,
      ),
      sgInst: `${accentlessStem}e\u0300`,
      plAcc: `${accentlessStem}e\u0300s`,
    }
  }
  static declineIII(
    stem: string,
    type = '0',
    gender: Gender.feminine | Gender.common = Gender.feminine,
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
      ...EDeclinator.declineI(accentedStem, gender),
      sgNom: `${stem}ė\u0303`,
      sgGen: `${stem}ė\u0303s`,
      sgLoc: `${stem}ėje\u0300`,
      plGen: `${palatalisedStem}ių\u0303`,
      plDat: `${stem}ė\u0301ms`,
      plInst: `${stem}ėmi\u0300s`,
      plLoc: `${stem}ėse\u0300`,
    }
  }
  static declineIV(
    stem: string,
    gender: Gender.feminine | Gender.common = Gender.feminine,
  ): DeclinedType {
    const palatalisedStem = getPalatalizedRoot(stem).replace(/i$/, '')
    return {
      ...EDeclinator.declineII(putAccentOnString(stem, 1, false), gender),
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
  static DUKTE: NounType = {
    gender: Gender.feminine,
    sgNom: `duktė\u0303`,
    sgGen: `dukter\u0303s`,
    sgDat: `du\u0300kteriai`,
    sgAcc: `du\u0300kterį`,
    sgInst: `du\u0300kteria`,
    sgLoc: `dukteryje\u0300`,
    sgVoc: `dukterie\u0303`,
    plNom: `du\u0300kterys`,
    plGen: `dukterų\u0303`,
    plDat: `dukteri\u0300ms`,
    plAcc: `du\u0300kteris`,
    plInst: `dukterimi\u0300s`,
    plLoc: `dukteryse\u0300`,
    plVoc: `du\u0300kterys`,
  }
}
