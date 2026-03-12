import {
  cannotParseSyllableError,
  infinitiveRootError,
  pastRootError,
  prefixMustContainVowelsError,
  presentRootError,
  syllableCannotCarryAcuteError,
  tooFewSyllablesError,
} from './errors.ts'
import type { PrincipalPartsType, RootPatternType } from './types.ts'
import { acuteIULMNR, consonants, SYLLABLE_REGEX, vowels } from './commons.ts'

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

// deno-lint-ignore no-explicit-any
export function stripAllAccentsFromParadigm<T extends Record<string, any>>(
  paradigm: T,
): T {
  return JSON.parse(
    JSON.stringify(paradigm).replaceAll(/[\u0300\u0301\u0303]/g, ''),
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

export function getLastSyllable(text: string): string {
  return text.replace(SYLLABLE_REGEX, '$2')
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
    let thisSyllable = getLastSyllable(wordToUse)
    const nextWordToUse = wordToUse.replace(SYLLABLE_REGEX, '$1')
    if (nextWordToUse === wordToUse) {
      throw cannotParseSyllableError
    }
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

export function isRootMonosyllabic(root: string) {
  return [...SYLLABLE_REGEX.exec(root)!][1] === ''
}

export function isInflectedTheSame(
  joinedPrincipalPartsA: string,
  joinedPrincipalPartsB: string,
): boolean {
  return joinedPrincipalPartsB === joinedPrincipalPartsA ||
    stripAllAccents(joinedPrincipalPartsB) === joinedPrincipalPartsA ||
    stripAllAccents(joinedPrincipalPartsA) === joinedPrincipalPartsB
}

/**
 * returns element counting from the end (1 = last) or the first element if the length is too large
 * @param arr {any[]} - array of anything
 * @param id {number} - index from the end starting with 1
 */
export function getNthLast<T>(arr: T[], id: number) {
  return arr.at(-id) ?? arr[0]
}
