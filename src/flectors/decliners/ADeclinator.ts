import { type DeclinedType, Gender } from '~src/types.ts'
import { putAccentOnString, stripAllAccents } from '~src/utils.ts'
import { moveThirdAccentuation } from './utils.ts'

/**
 * @description Declinator for -(i/j)a nominals. All methods accept stems without nominative -a (but with i/j)
 */
export default class ADeclinator {
  static declineI(
    stem: string,
    gender: Gender.feminine | Gender.common = Gender.feminine,
  ): DeclinedType {
    return {
      gender,
      sgNom: `${stem}a`,
      sgGen: `${stem}os`,
      sgDat: `${stem}ai`,
      sgAcc: `${stem}ą`,
      sgInst: `${stem}a`,
      sgLoc: `${stem}oje`,
      sgVoc: `${stem}a`,
      plNom: `${stem}os`,
      plGen: `${stem}ų`,
      plDat: `${stem}oms`,
      plAcc: `${stem}as`,
      plInst: `${stem}omis`,
      plLoc: `${stem}ose`,
      plVoc: `${stem}os`,
    }
  }
  static declineII(
    stem: string,
    gender: Gender.feminine | Gender.common = Gender.feminine,
  ): DeclinedType {
    return {
      ...ADeclinator.declineI(
        putAccentOnString(stripAllAccents(stem), 1, false),
        gender,
      ),
      sgNom: `${stem}a\u0300`,
      sgInst: `${stem}a\u0300`,
      plAcc: `${stem}a\u0300s`,
    }
  }
  static declineNounIII(
    stem: string,
    type = '0',
    gender: Gender.feminine | Gender.common = Gender.feminine,
  ): DeclinedType {
    const accentlessStem = stripAllAccents(stem)
    return {
      ...ADeclinator.declineI(
        moveThirdAccentuation(stripAllAccents(stem) + 'a', type).replace(
          /a$/,
          '',
        ),
        gender,
      ),
      sgNom: `${accentlessStem}a\u0300`,
      sgGen: `${accentlessStem}o\u0303s`,
      sgLoc: `${accentlessStem}oje\u0300`,
      plGen: `${accentlessStem}ų\u0303`,
      plDat: `${accentlessStem}o\u0301ms`,
      plInst: `${accentlessStem}omi\u0300s`,
      plLoc: `${accentlessStem}ose\u0300`,
    }
  }
  static declineNounIV(
    stem: string,
    gender: Gender.feminine | Gender.common = Gender.feminine,
  ): DeclinedType {
    return {
      ...ADeclinator.declineII(stem, gender),
      sgGen: `${stem}o\u0303s`,
      sgLoc: `${stem}oje\u0300`,
      plGen: `${stem}ų\u0303`,
      plDat: `${stem}o\u0301ms`,
      plInst: `${stem}omi\u0300s`,
      plLoc: `${stem}ose\u0300`,
    }
  }
  static declineAdjectivalIII(stem: string, type = '0') {
    return {
      ...ADeclinator.declineNounIII(stem, type),
      ...ADeclinator.#adjectival(stem),
    }
  }
  static declineAdjectivalIV(stem: string) {
    return {
      ...ADeclinator.declineNounIV(stem),
      ...ADeclinator.#adjectival(stem),
    }
  }
  static #adjectival(stem: string): { sgVoc: string } {
    const accentlessStem = stripAllAccents(stem)
    return { sgVoc: `${accentlessStem}a\u0300` }
  }
}
