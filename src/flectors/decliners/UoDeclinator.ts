import { Gender, type NounType } from '~src/types.ts'
import { moveThirdAccentuation } from './utils.ts'

/**
 * @description Declinator for -uo nominals. All methods accept stems without nominative -uo
 */
export default class UoDeclinator {
  static decline(
    stem: string,
    type = '0',
  ): NounType {
    const accentedStem = moveThirdAccentuation(stem + 'enis', type)
      .replace(
        /enis$/,
        '',
      )
    return {
      gender: Gender.masculine,
      sgNom: `${stem}uo\u0303`,
      sgGen: `${stem}en\u0303s`,
      sgDat: `${accentedStem}eniui`,
      sgAcc: `${accentedStem}enį`,
      sgInst: `${accentedStem}eniu`,
      sgLoc: `${stem}enyje\u0300`,
      sgVoc: `${stem}enie\u0303`,
      plNom: `${accentedStem}enys`,
      plGen: `${stem}enų\u0303`,
      plDat: `${stem}eni\u0300ms`,
      plAcc: `${accentedStem}enis`,
      plInst: `${stem}enimi\u0300s`,
      plLoc: `${stem}enyse\u0300`,
      plVoc: `${accentedStem}enys`,
    }
  }
}
