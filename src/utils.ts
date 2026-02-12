import {
  infinitiveRootError,
  pastRootError,
  prefixMustContainVowelsError,
  threeRootsError,
} from './errors.ts'

export const consonants = 'bcčdfghjklmnprsštvzž'
export const longVowels = 'ąęįųėoyū'
export const shortVowels = 'aeiuo'
export const resonants = 'lmnriuoe'
export const vowels = 'aąeęėiįyouųū'

type RootPatternType<T extends string> = { root: string; pattern: T }

export function stripAllAccents(word: string) {
  return word.replaceAll(/[\u0303\u0300\u0301]/g, '')
}

export function hasAnyAccent(word: string) {
  return /[\u0303\u0301\u0300]/.test(word)
}

export function hasAcuteAccent(word: string) {
  return /\u0301/.test(word)
}

export function hasCircumflexOrShortAccent(word: string) {
  return /[\u0303\u0300]/.test(word)
}

export function getUnpalatalizedRoot(root: string) {
  return root.replace(/či$/, 't').replace(/dži$/, 'd')
}

export function getPalatalizedRoot(root: string) {
  return root.replace(/t$/, 'či').replace(/d$/, 'dži')
}

export function getPastRoot(
  principalParts: string[],
): RootPatternType<'ė' | 'o'> {
  if (principalParts.length !== 3) {
    throw threeRootsError
  }
  const regexArr = /^(.+)([ėo])$/.exec(principalParts[2])
  if (regexArr === null) {
    throw pastRootError
  }
  return { root: regexArr[1], pattern: regexArr[2] as 'ė' | 'o' }
}

export function getInfinitiveRoot(
  principalParts: string[],
): RootPatternType<'ti' | 't'> {
  if (principalParts.length !== 3) {
    throw threeRootsError
  }
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
  const lastNucleusAndCoda = finalVowelsAndConsonantsRes[0]
  if (new RegExp(`^ie[${consonants}]*$`).test(lastNucleusAndCoda)) {
    return prefix.replace(new RegExp(`(ie)([${consonants}]*)$`), `$1\u0303$2`)
  }
  if (
    new RegExp(`^i?[${shortVowels}][${resonants}][${consonants}]*$`).test(
      lastNucleusAndCoda,
    )
  ) {
    return prefix.replace(
      new RegExp(`(i?[${shortVowels}][${resonants}])([${consonants}]*)$`),
      `$1\u0303$2`,
    )
  }
  if (
    new RegExp(`^[i?${longVowels}[${consonants}]*$`).test(lastNucleusAndCoda)
  ) {
    return prefix.replace(
      new RegExp(`(i?[${longVowels}])([${consonants}]*)$`),
      `$1\u0303$2`,
    )
  }

  return prefix.replace(
    new RegExp(`(i?[${shortVowels}])([${consonants}]*)$`),
    `$1\u0300$2`,
  )
}

export function isEverythingEqual<T>(array: T[]): boolean {
  return array.every((v) => v === array[0])
}
