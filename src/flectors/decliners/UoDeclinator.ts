import { Gender, type NounType } from '~src/types.ts'
import { moveThirdAccentuation } from './utils.ts'
import IsDeclinator from './IsDeclinator.ts'

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
  static SUO: NounType = {
    gender: Gender.masculine,
    sgNom: `šuo\u0303`,
    sgGen: `šun\u0303s`,
    sgDat: `šu\u0300niui`,
    sgAcc: `šu\u0300nį`,
    sgInst: `šuniu\u0300`,
    sgLoc: `šunyje\u0300`,
    sgVoc: `šunie\u0303`,
    plNom: `šu\u0300nys`,
    plGen: `šunų\u0303`,
    plDat: `šuni\u0300ms`,
    plAcc: `šuni\u0300s`,
    plInst: `šunimi\u0300s`,
    plLoc: `šunyse\u0300`,
    plVoc: `šu\u0300nys`,
  }
  static MENUO: NounType = {
    ...IsDeclinator.declineIoNounI(`mė\u0301nes`),
    nomSg: `mė\u0301nuo`,
  } as unknown as NounType
  static SESUO: NounType = {
    gender: Gender.feminine,
    sgNom: `sesuo\u0303`,
    sgGen: `seser\u0303s`,
    sgDat: `se\u0303seriai`,
    sgAcc: `se\u0303serį`,
    sgInst: `se\u0303seria`,
    sgLoc: `seseryje\u0300`,
    sgVoc: `seserie\u0303`,
    plNom: `se\u0303serys`,
    plGen: `seserų\u0303`,
    plDat: `seseri\u0300ms`,
    plAcc: `se\u0303seris`,
    plInst: `seserimi\u0300s`,
    plLoc: `seseryse\u0300`,
    plVoc: `se\u0303serys`,
  }
}
