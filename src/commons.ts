import type { DeclinedType } from './types.ts'

export const consonants = 'bcčdfghjklmnprsštvzž'
export const longVowels = 'ąęįųėoyū'
export const shortVowels = 'aeiuo'
export const resonants = 'lmnriuoe'
export const vowels = 'aąeęėiįyouųū'
export const SYLLABLE_REGEX =
  /(.{0}|.+?)((?:[^lmnraąeęėiįyouųū\u0300\u0301\u0303]?[bcčdfghjklmnprsštvzž])?(i?(?:u\u0301?o|uo\u0303?)|(?:i\u0301?e|ie\u0303?)|i?ū[\u0301\u0303]?|[ėęyį][\u0301\u0303]?|i?[ąų][\u0301\u0303]?|[aeo]\u0303|i?(?:[ao][\u0301\u0300]?)(?:[uilmnr]\u0303?)?|i?(?:u\u0300?[ilmnr]?\u0303?|)|(?:e[\u0301\u0300]?|i\u0300?)(?:[uilmnr]\u0303?)?)[bcčdfghjklmnprsštvzž]*)$/
export const acuteIULMNR = new RegExp(
  `[iu]\u0300[lmnr]([bcčdfghjklmnprsštvzž]|$)`,
)
export const declinedEmpty: Omit<DeclinedType, 'gender' | 'neuter'> = {
  sgNom: '-',
  sgGen: '-',
  sgDat: '-',
  sgAcc: '-',
  sgInst: '-',
  sgLoc: '-',
  sgVoc: '-',
  plNom: '-',
  plGen: '-',
  plDat: '-',
  plAcc: '-',
  plInst: '-',
  plLoc: '-',
  plVoc: '-',
}
export const ACCENTUATION_SEPARATOR = '|'
export const SECONDARY_FORM_SEPARATOR = ' '
