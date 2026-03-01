import {
  infinitiveRootError,
  pastRootError,
  prefixMustContainVowelsError,
  presentRootError,
  syllableCannotCarryAcuteError,
  tooFewSyllablesError,
} from './errors.ts'
import type { PrincipalPartsType } from './types.ts'

export const consonants = 'bcčdfghjklmnprsštvzž'
export const longVowels = 'ąęįųėoyū'
export const shortVowels = 'aeiuo'
export const resonants = 'lmnriuoe'
export const vowels = 'aąeęėiįyouųū'

const SYLLABLE_REGEX =
  /(.{0}|.+?)((?:[^lmnraąeęėiįyouųū\u0300\u0301\u0303]?[bcčdfghjklmnprsštvzž])?(i?(?:u\u0301?o|uo\u0303?)|(?:i\u0301?e|ie\u0303?)|i?ū[\u0301\u0303]?|[ėęyį][\u0301\u0303]?|[aeo]\u0303|i?(?:a[\u0301\u0300]?|o\u0300?)(?:[uilmnr]\u0303?)?|i?(?:u\u0300?[ilmnr]?\u0303?|)|(?:e[\u0301\u0300]?|i\u0300?)(?:[uilmnr]\u0303?)?)[bcčdfghjklmnprsštvzž]*)$/

const acuteIULMNR = new RegExp(`[iu]\u0300[lmnr]([bcčdfghjklmnprsštvzž]|$)`)

type RootPatternType<T extends string> = { root: string; pattern: T }

export function stripAllAccents(word: string) {
  return word.replaceAll(/[\u0303\u0300\u0301]/g, '')
}

export function hasAnyAccent(word: string) {
  return /[\u0303\u0301\u0300]/.test(word)
}

export function hasAcuteAccent(word: string) {
  return /\u0301/.test(word) || acuteIULMNR.test(word)
}

export function hasCircumflexOrShortAccent(word: string) {
  return /[\u0303\u0300]/.test(word) && !acuteIULMNR.test(word)
}

export function getUnpalatalizedRoot(root: string) {
  return root.replace(/či$/, 't').replace(/dži$/, 'd')
}

export function getPalatalizedRoot(root: string) {
  return root.replace(/t$/, 'č').replace(/d$/, 'dž')
}

export function getPresentRoot(
  principalParts: PrincipalPartsType,
): RootPatternType<'i' | 'o' | 'a'> {
  const regexArr = /^(.+)([aio]\u0300?)$/.exec(principalParts[1])
  if (regexArr === null) {
    throw presentRootError
  }
  return { root: regexArr[1], pattern: regexArr[2] as 'a' | 'i' | 'o' }
}

export function getPastRoot(
  principalParts: PrincipalPartsType,
): RootPatternType<'ė' | 'o'> {
  const regexArr = /^(.+)([ėo])$/.exec(principalParts[2])
  if (regexArr === null) {
    throw pastRootError
  }
  return { root: regexArr[1], pattern: regexArr[2] as 'ė' | 'o' }
}

export function getInfinitiveRoot(
  principalParts: PrincipalPartsType,
): RootPatternType<'ti' | 't'> {
  const regexArr = /^(.+)(ti?)$/.exec(principalParts[0])
  if (regexArr === null) {
    throw infinitiveRootError
  }
  return { root: regexArr[1], pattern: regexArr[2] as 'ti' | 't' }
}

export function appendSuffixWithAssimilation(
  stem: string,
  suffix: string,
  assimilationMap: [string | RegExp, string][],
): string {
  return assimilationMap.reduce(
    (acc, cur) => acc.replace(cur[0], cur[1]),
    stem + suffix,
  )
}

export function stripAllAccentsFromParadigm<T extends Record<string, string>>(
  paradigm: T,
): T {
  return Object.fromEntries(
    Object.keys(paradigm).map((key) => [key, stripAllAccents(paradigm[key])]),
  ) as T
}

export function putAccentOnPrefix(prefix: string): string {
  const finalVowelsAndConsonantsRes = new RegExp(
    `[${vowels}]+[${consonants}]*$`,
  ).exec(prefix)
  if (!finalVowelsAndConsonantsRes) {
    throw prefixMustContainVowelsError
  }
  return putAccentOnString(prefix, 1, false, true)
}

export function isEverythingEqual<T>(array: T[]): boolean {
  return array.every((v) => v === array[0])
}

export function putAccentOnString(
  string: string,
  syllableFromEnd: number,
  isAcute: boolean,
  mandatoryShort = false,
): string {
  if (syllableFromEnd <= 0) {
    throw tooFewSyllablesError
  }
  let wordToUse = string
  let answer = ''
  let currentSyllable = 0
  do {
    currentSyllable++
    let thisSyllable = wordToUse.replace(SYLLABLE_REGEX, '$2')
    wordToUse = wordToUse.replace(SYLLABLE_REGEX, '$1')
    if (currentSyllable === syllableFromEnd) {
      if (isAcute) {
        if (/[iu][lmnri]/.test(thisSyllable)) {
          thisSyllable = thisSyllable.replace(/([iu])/, `$1\u0300`)
        } else if (/(ie|uo)/.test(thisSyllable)) {
          thisSyllable = thisSyllable.replace(/(iu|i|u)/, `$1\u0301`)
        } else if (/o[iulmnr]/.test(thisSyllable)) {
          thisSyllable = thisSyllable.replace('o', `o\u0300`)
        } else if (/[ae][iulmnr]/.test(thisSyllable)) {
          thisSyllable = thisSyllable.replace(/([ae])/, `$1\u0301`)
        } else if (/[ąęįųyūėo]/.test(thisSyllable)) {
          thisSyllable = thisSyllable.replace(/([ąęįųyūėo])/, `$1\u0301`)
        } else {
          throw syllableCannotCarryAcuteError
        }
      } else {
        if (/[iu][lmnri]/.test(thisSyllable)) {
          thisSyllable = thisSyllable.replace(/([ui][lmnri])/, `$1\u0303`)
        } else if (/(ie|uo)/.test(thisSyllable)) {
          thisSyllable = thisSyllable.replace(/([eo])/, `$1\u0303`)
        } else if (/[aeo][iulmnr]/.test(thisSyllable)) {
          thisSyllable = thisSyllable.replace(
            /(i?[aeo])([iulmnr])/,
            `$1$2\u0303`,
          )
        } else if (/[ąęįųyūė]/.test(thisSyllable)) {
          thisSyllable = thisSyllable.replace(/([ąęįųyūė])/, `$1\u0303`)
        } else if (/[aeo]/.test(thisSyllable)) {
          thisSyllable = thisSyllable.replace(
            /([aeo])/,
            mandatoryShort ? `$1\u0300` : `$1\u0303`,
          )
        } else {
          thisSyllable = thisSyllable.replace(/(iu|u|i)/, `$1\u0300`)
        }
      }
    }
    answer = thisSyllable + answer
  } while (/[aąeęėiįyouųū]/.test(wordToUse))
  if (currentSyllable < syllableFromEnd) {
    throw tooFewSyllablesError
  }
  return wordToUse + answer
}

export function countAccentedSyllable(
  word: string,
): { hasAccentedSyllable: false; type?: never; syllable?: never } | {
  hasAccentedSyllable: true
  type: 'short' | 'acute' | 'circumflex'
  syllable: number
} {
  if (!hasAnyAccent(word)) {
    return { hasAccentedSyllable: false }
  }

  let wordToUse = word
  let currentSyllable = 0
  do {
    currentSyllable++
    const thisSyllable = wordToUse.replace(SYLLABLE_REGEX, '$2')
    wordToUse = wordToUse.replace(SYLLABLE_REGEX, '$1')
    if (thisSyllable.includes(`\u0303`)) {
      return {
        hasAccentedSyllable: true,
        type: 'circumflex',
        syllable: currentSyllable,
      }
    }
    if (hasAcuteAccent(thisSyllable)) {
      return {
        hasAccentedSyllable: true,
        type: 'acute',
        syllable: currentSyllable,
      }
    }
    if (thisSyllable.includes(`\u0300`)) {
      return {
        hasAccentedSyllable: true,
        type: 'short',
        syllable: currentSyllable,
      }
    }
  } while (true)
}
