import { thirdAccentuationTypeError } from '~src/errors.ts'
import { putAccentOnString } from '~src/utils.ts'

/**
 * @typedef {(string|{isAcutre: string, syllable: number})} AccentuationType
 * @description
 * * `'a'` - 3rd last is acute
 * * `'b'` - 3rd last is circumflex/short
 * * `'2a'` - 2nd last is acute
 * * `'2b'` - 2nd last is circumflex/short
 * * `'#a'` - #th last is acute, # - number starting with 4
 * * `'#b'` - #th last is circumflex/short, # - number starting with 4
 */
export type AccentuationType = string | { isAcute: boolean; syllable: number }

export const SECOND_LAST_ACUTE = '2a'

/**
 * @description moves accent to stem
 * @param {string} word - full word with a flectional ending
 * @param {AccentuationType} type='2a'
 * * `'a'` - 3rd last is acute
 * * `'b'` - 3rd last is circumflex/short
 * * `'2a'` - 2nd last is acute
 * * `'2b'` - 2nd last is circumflex/short
 * * `'#a'` - #th last is acute, # - number starting with 4
 * * `'#b'` - #th last is circumflex/short, # - number starting with 4
 */
export function moveThirdAccentuation(
  word: string,
  type: AccentuationType,
): string {
  const { isAcute, syllable } = (typeof type === 'string')
    ? getThirdAccentuationType(type)
    : type
  return putAccentOnString(word, syllable, isAcute)
}

/**
 * @param {string} type='2a'
 * * `'a'` - 3rd last is acute
 * * `'b'` - 3rd last is circumflex/short
 * * `'2a'` - 2nd last is acute
 * * `'2b'` - 2nd last is circumflex/short
 * * `'#a'` - #th last is acute, # - number starting with 4
 * * `'#b'` - #th last is circumflex/short, # - number starting with 4
 */
export function getThirdAccentuationType(
  type: string = SECOND_LAST_ACUTE,
): { isAcute: boolean; syllable: number } {
  const lowerCasedType = type.toLowerCase()
  if (lowerCasedType === 'a') {
    return { isAcute: true, syllable: 3 }
  }
  if (lowerCasedType === 'b') {
    return { isAcute: false, syllable: 3 }
  }
  const regex = /(\d+)([ab])/
  if (!regex.test(lowerCasedType)) {
    throw thirdAccentuationTypeError
  }
  const parsed = [...regex.exec(lowerCasedType)!]
  if (+parsed[1] < 1) {
    throw thirdAccentuationTypeError
  }
  return { isAcute: parsed[2] === 'a', syllable: +parsed[1] }
}
