import { thirdAccentuationTypeError } from '~src/errors.ts'
import { putAccentOnString } from '~src/utils.ts'

/**
 * * `'2'` - 2nd accentuation - 1st last is circumflex
 * * `'3'` - 3rd accentuation - 2nd last is acute
 * * `'4'` - 4th accentuation - 2nd last is circumflex/short
 * * `'a'` - 3rd last is acute
 * * `'b'` - 3rd last is circumflex/short
 * * `'2a'` - 2nd last is acute
 * * `'2b'` - 2nd last is circumflex/short
 * * `'#a'` - #th last is acute, # - number starting with 4
 * * `'#b'` - #th last is circumflex/short, # - number starting with 4
 * @typedef {(string|{isAcutre: string, syllable: number})} AccentuationType
 */
export type AccentuationType = string | { isAcute: boolean; syllable: number }

export const SECOND_LAST_ACUTE = '2a'

/**
 * moves accent to stem
 * @param {string} word - full word with a flectional ending
 * @param {AccentuationType} type='2a'
 * * `'2'` - 2nd accentuation - 1st last is circumflex
 * * `'3'` - 3rd accentuation - 2nd last is acute
 * * `'4'` - 4th accentuation - 2nd last is circumflex/short
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
 * * `'2'` - 2nd accentuation - 1st last is circumflex
 * * `'3'` - 3rd accentuation - 2nd last is acute
 * * `'4'` - 4th accentuation - 2nd last is circumflex/short
 * * `'2a'` - 2nd last is acute
 * * `'2b'` - 2nd last is circumflex/short
 * * `'#a'` - #th last is acute, # - number starting with 4
 * * `'#b'` - #th last is circumflex/short, # - number starting with 4
 */
export function getThirdAccentuationType(
  type: AccentuationType = SECOND_LAST_ACUTE,
): { isAcute: boolean; syllable: number } {
  if (
    typeof type === 'object' &&
    typeof type.isAcute === 'boolean' &&
    typeof type.syllable === 'number'
  ) {
    return type
  }
  if (typeof type !== 'string') {
    throw thirdAccentuationTypeError
  }
  const lowerCasedType = type.toLowerCase()
  if (lowerCasedType === 'a') {
    return { isAcute: true, syllable: 3 }
  }
  if (lowerCasedType === 'b') {
    return { isAcute: false, syllable: 3 }
  }
  if (lowerCasedType === '2') {
    return { isAcute: false, syllable: 1 }
  }
  if (lowerCasedType === '3') {
    return { isAcute: true, syllable: 2 }
  }
  if (lowerCasedType === '4') {
    return { isAcute: false, syllable: 2 }
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
