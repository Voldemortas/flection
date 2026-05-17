import {
  cannotParseSyllableError,
  infinitiveRootError,
  pastRootError,
  prefixMustContainVowelsError,
  presentRootError,
  syllableCannotCarryAcuteError,
  tooFewSyllablesError,
} from './errors.ts'
import type {
  AnyKeyType,
  InflectionType,
  PrincipalPartsType,
  RootPatternType,
} from './types.ts'
import {
  ACCENTUATION_SEPARATOR,
  acuteIULMNR,
  consonants,
  SECONDARY_FORM_SEPARATOR,
  SYLLABLE_REGEX,
  vowels,
} from './commons.ts'

export function stripAllAccents(word: string) {
  return word.replaceAll(/[\u0303\u0300\u0301]/g, '')
}

export function hasAnyAccent(word: string) {
  return /[\u0303\u0301\u0300]/.test(word)
}

export function hasAcuteAccent(word: string) {
  const accentedSyllable = getStressedSyllable(word)
  return !!accentedSyllable &&
    (/\u0301/.test(accentedSyllable!.text) ||
      acuteIULMNR.test(accentedSyllable!.text))
}

export function hasCircumflexOrShortAccent(word: string) {
  return /[\u0303\u0300]/.test(word) && !acuteIULMNR.test(word)
}

export function hasShortAccent(word: string) {
  const accentedSyllable = getStressedSyllable(word)
  return !!accentedSyllable &&
    (/\u0300/.test(accentedSyllable!.text) &&
      !acuteIULMNR.test(accentedSyllable!.text))
}

export function getUnpalatalizedRoot(root: string) {
  return root.replace(/či$/, 't').replace(/dži$/, 'd').replace(/i$/, '')
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

export function stripAllAccentsFromParadigm<T extends object>(
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

/**
 * @description breaks a word into syllable. *Note: the syllables will be present in the reversed order*
 * @param lemma - the word to find syllables of
 * @example
 * ```ts
 * getAllSyllables(`laba\u0300s`) // [`ba\u0300s`, `la`]
 * getAllSyllables(`bėgti`) // ['gti', 'bė']
 * getAllSyllables(`kanda`) // ['da', 'kan']
 * ```
 */

export function getAllSyllables(lemma: string): string[] {
  const answer: string[] = []
  let wordToUse = lemma
  do {
    answer.push(getLastSyllable(wordToUse))
    const nextWordToUse = wordToUse.replace(SYLLABLE_REGEX, '$1')
    if (nextWordToUse === wordToUse) {
      throw cannotParseSyllableError
    }
    wordToUse = nextWordToUse
  } while (/[aąeęėiįyouųū]/.test(wordToUse))

  return answer
}

/**
 * @description Finds the stressed syllable (both text and its position counting from behind).
 * @param lemma - the word to look for stress
 * @return returns `null` if no stress exists, otherwise returns the syllable and its position starting from behind
 * @example
 * ```ts
 * getStressedSyllable(`dėti`) // null
 * getStressedSyllable(`padėti\u0300`) // {text: `ti\u0300`, position: 1}
 * ```
 */
export function getStressedSyllable(
  lemma: string,
): { position: number; text: string } | null {
  if (!hasAnyAccent(lemma)) {
    return null
  }
  const allSyllables = getAllSyllables(lemma)
  let answer: { text: string; position: number } | null = null
  for (let i = 0; i < allSyllables.length; i++) {
    const currentSyllable = allSyllables[i]
    if (hasAnyAccent(currentSyllable)) {
      answer = { text: currentSyllable, position: i + 1 }
      break
    }
  }
  return answer
}

export function putAccentOnString(
  lemma: string,
  syllableFromEnd: number,
  isAcute: boolean,
  mandatoryShort = false,
): string {
  const allSyllables = getAllSyllables(lemma)
  if (syllableFromEnd <= 0 || allSyllables.length < syllableFromEnd) {
    throw tooFewSyllablesError
  }
  let newStressedSyllable = allSyllables[syllableFromEnd - 1]
  if (isAcute) {
    if (/[iu][lmnri]/.test(newStressedSyllable)) {
      newStressedSyllable = newStressedSyllable.replace(/([iu])/, `$1\u0300`)
    } else if (/(ie|uo)/.test(newStressedSyllable)) {
      newStressedSyllable = newStressedSyllable.replace(/(iu|i|u)/, `$1\u0301`)
    } else if (/o[iulmnr]/.test(newStressedSyllable)) {
      newStressedSyllable = newStressedSyllable.replace('o', `o\u0300`)
    } else if (/[ae][iulmnr]/.test(newStressedSyllable)) {
      newStressedSyllable = newStressedSyllable.replace(/([ae])/, `$1\u0301`)
    } else if (/[ąęįųyūėo]/.test(newStressedSyllable)) {
      newStressedSyllable = newStressedSyllable.replace(
        /([ąęįųyūėo])/,
        `$1\u0301`,
      )
    } else {
      throw syllableCannotCarryAcuteError
    }
  } else {
    if (/[iu][lmnri]/.test(newStressedSyllable)) {
      newStressedSyllable = newStressedSyllable.replace(
        /([ui][lmnri])/,
        `$1\u0303`,
      )
    } else if (/(ie|uo)/.test(newStressedSyllable)) {
      newStressedSyllable = newStressedSyllable.replace(/([eo])/, `$1\u0303`)
    } else if (/[aeo][iulmnr]/.test(newStressedSyllable)) {
      newStressedSyllable = newStressedSyllable.replace(
        /(i?[aeo])([iulmnr])/,
        `$1$2\u0303`,
      )
    } else if (/[ąęįųyūė]/.test(newStressedSyllable)) {
      newStressedSyllable = newStressedSyllable.replace(
        /([ąęįųyūė])/,
        `$1\u0303`,
      )
    } else if (/[aeo]/.test(newStressedSyllable)) {
      newStressedSyllable = newStressedSyllable.replace(
        /([aeo])/,
        mandatoryShort ? `$1\u0300` : `$1\u0303`,
      )
    } else {
      newStressedSyllable = newStressedSyllable.replace(/(iu|u|i)/, `$1\u0300`)
    }
  }
  return allSyllables.map((syllable, id) =>
    id + 1 === syllableFromEnd ? newStressedSyllable : syllable
  )
    .toReversed()
    .join('')
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
    const nextWord = wordToUse.replace(SYLLABLE_REGEX, '$1')
    if (nextWord === wordToUse) {
      throw cannotParseSyllableError
    }
    wordToUse = nextWord
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

export function joinInflections<T extends AnyKeyType>(
  a: InflectionType<T>,
  b: InflectionType<T>,
): InflectionType<T> {
  return Object.fromEntries(
    Object.entries(a).map((entry) => {
      const [key, value] = entry as unknown as [T, string]
      const joined = [...new Set([
        ...value.split(SECONDARY_FORM_SEPARATOR),
        ...b[key].split(SECONDARY_FORM_SEPARATOR),
      ]).values()]
      const joinedUnique: string[] = [
        ...new Set(joined.map(stripAllAccents)).values(),
      ]

      return [
        key,
        joinedUnique.map((unique) =>
          joined.filter((join) => unique === stripAllAccents(join)).join(
            ACCENTUATION_SEPARATOR,
          )
        ).join(SECONDARY_FORM_SEPARATOR),
      ]
    }),
  ) as InflectionType<T>
}

export function getLastStressedInflection<T extends AnyKeyType>(
  declined: InflectionType<T>,
): InflectionType<T> {
  return Object.fromEntries(
    Object.entries(declined).map((entry) => {
      const [key, values] = entry as unknown as [T, string]
      return [
        key,
        values.split(SECONDARY_FORM_SEPARATOR).map((value) =>
          value.split(ACCENTUATION_SEPARATOR).at(-1)
        ).join(SECONDARY_FORM_SEPARATOR),
      ]
    }),
  ) as InflectionType<T>
}

export function isStemWithoutSuffix(stem: string): boolean {
  return isRootMonosyllabic(stem) || !hasAcuteAccent(getLastSyllable(stem))
}
