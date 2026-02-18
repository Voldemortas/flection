import { thirdAccentuationTypeError } from '~src/errors.ts'
import { putAccentOnString } from '~src/utils.ts'

/**
 * @description moves accent to stem
 * @param {string} word - full word with a flectional ending
 * @param {string} type='0'
 * * `'0'` - 2nd last is acute
 * * `'a'` - 3rd last is acute
 * * `'b'` - 3rd last is circumflex/short
 * * `'#a'` - #th last is acute, # - number starting with 4
 * * `'#b'` - #th last is circumflex/short, # - number starting with 4
 */
export function moveThirdAccentuation(
  word: string,
  type: string = '0',
): string {
  const { isAcute, syllable } = getThirdAccentuationType(type)
  return putAccentOnString(word, syllable, isAcute)
}

/**
 * @param {string} type='0'
 * * `'0'` - 2nd last is acute
 * * `'a'` - 3rd last is acute
 * * `'b'` - 3rd last is circumflex/short
 * * `'#a'` - #th last is acute, # - number starting with 4
 * * `'#b'` - #th last is circumflex/short, # - number starting with 4
 */
export function getThirdAccentuationType(
  type: string = '0',
): { isAcute: boolean; syllable: number } {
  const lowerCasedType = type.toLowerCase()
  if (lowerCasedType === '0') {
    return { isAcute: true, syllable: 2 }
  }
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
  if (+parsed[1] < 2) {
    throw thirdAccentuationTypeError
  }
  return { isAcute: parsed[2] === 'a', syllable: +parsed[1] }
}
