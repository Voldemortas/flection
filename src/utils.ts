import { infinitiveRootError, threeRootsError } from './errors.ts'

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
