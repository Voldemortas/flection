import type { DeclinedType } from '~src/types.ts'
import { putAccentOnString, stripAllAccents } from '~src/utils.ts'
import {
  type AccentuationType,
  moveThirdAccentuation,
  SECOND_LAST_ACUTE,
} from './utils.ts'

/**
 * @description Declinator for -(i/j)a nominals. All methods accept stems without nominative -a (but with i/j)
 */
export default class ADeclinator {
  static declineI(
    stem: string,
  ): DeclinedType {
    return {
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
  ): DeclinedType {
    return {
      ...ADeclinator.declineI(
        putAccentOnString(stripAllAccents(stem), 1, false),
      ),
      sgNom: `${stem}a\u0300`,
      sgInst: `${stem}a\u0300`,
      plAcc: `${stem}a\u0300s`,
    }
  }
  static declineNounIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ): DeclinedType {
    const accentlessStem = stripAllAccents(stem)
    return {
      ...ADeclinator.declineI(
        moveThirdAccentuation(stripAllAccents(stem) + 'a', type).replace(
          /a$/,
          '',
        ),
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
  ): DeclinedType {
    return {
      ...ADeclinator.declineII(stem),
      sgGen: `${stem}o\u0303s`,
      sgLoc: `${stem}oje\u0300`,
      plGen: `${stem}ų\u0303`,
      plDat: `${stem}o\u0301ms`,
      plInst: `${stem}omi\u0300s`,
      plLoc: `${stem}ose\u0300`,
    }
  }
  static declineAdjectivalIII(
    stem: string,
    type: AccentuationType = SECOND_LAST_ACUTE,
  ) {
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
  static declinePronominalImmobile(stem: string): DeclinedType {
    return {
      sgNom: `${stem}oji`,
      sgGen: `${stem}osios`,
      sgDat: `${stem}ajai`,
      sgAcc: `${stem}ąją`,
      sgInst: `${stem}ąja`,
      sgLoc: `${stem}ojoje`,
      sgVoc: `${stem}oji`,
      plNom: `${stem}osios`,
      plGen: `${stem}ųjų`,
      plDat: `${stem}osioms`,
      plAcc: `${stem}ąsias`,
      plInst: `${stem}osiomis`,
      plLoc: `${stem}osiose`,
      plVoc: `${stem}osios`,
    }
  }
  /**
   * @description declines pronominal adjectives of the 3rd and the 4th accentuation class
   * @param stem stem without -a: gera - ger; stačia - stači
   * @param type accentuation class: use 2b for the 4th accentuation
   */
  static declinePronominalMobile(
    stem: string,
    type: AccentuationType,
  ): DeclinedType {
    const accentedStem = moveThirdAccentuation(stem + 'a', type).replace(
      /a$/,
      '',
    )
    return {
      sgNom: `${stem}o\u0301ji`,
      sgGen: `${stem}o\u0303sios`,
      sgDat: `${accentedStem}ajai`,
      sgAcc: `${accentedStem}ąją`,
      sgInst: `${stem}ą\u0301ja`,
      sgLoc: `${stem}o\u0303joje`,
      sgVoc: `${stem}o\u0301ji`,
      plNom: `${accentedStem}osios`,
      plGen: `${stem}ų\u0303jų`,
      plDat: `${stem}o\u0301sioms`,
      plAcc: `${stem}ą\u0301sias`,
      plInst: `${stem}o\u0303siomis`,
      plLoc: `${stem}o\u0303siose`,
      plVoc: `${accentedStem}osios`,
    }
  }
  static #adjectival(stem: string): { sgVoc: string } {
    const accentlessStem = stripAllAccents(stem)
    return { sgVoc: `${accentlessStem}a\u0300` }
  }
}
