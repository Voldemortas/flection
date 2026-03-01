import {
  badFormatError,
  parsingInputError,
  threeRootsError,
  unmatchingPrefixesError,
  unmatchingReflexivesError,
} from './errors.ts'
import { isEverythingEqual } from './utils.ts'
import type { PrincipalPartsType } from './types.ts'

export default class Verbal {
  static readonly #PRINCIPAL_PARTS_COUNT = 3
  static readonly #WORD_DiLIMIER = '-'

  public readonly principalParts: PrincipalPartsType
  public readonly prefix: string | undefined
  public readonly isReflexive: boolean

  static #trimReflexiveFromPrefix(prefix: string | undefined) {
    if (!prefix) {
      return prefix
    }
    return prefix.replace(/si$/, '')
  }

  public constructor(
    roots: string | string[],
    options: { reflexive?: boolean; prefix?: string | undefined } = {},
  ) {
    const rootArray = Array.isArray(roots)
      ? roots
      : roots.split(Verbal.#WORD_DiLIMIER)
    if (rootArray.length !== Verbal.#PRINCIPAL_PARTS_COUNT) {
      throw threeRootsError
    }
    const regexMagicGroup = rootArray.map((root) => {
      const regexMatches =
        /(^(?<prefix>[^=]+?)=(?<root>.+?)(?<reflexive>si?)?$|(^(?<root>.+?)(?<reflexive>si?)?$))/
          .exec(root)
      // deno-coverage-ignore-start
      if (!regexMatches) {
        throw badFormatError(root)
      }
      if (!regexMatches.groups) {
        throw parsingInputError
      }
      // deno-coverage-ignore-stop
      const groups = regexMatches.groups
      return [
        Verbal.#trimReflexiveFromPrefix(groups['prefix'] ?? options.prefix),
        groups['root']!,
        !!options.reflexive || !!groups['reflexive'] ||
        /si$/.test(groups['prefix'] ?? options.prefix ?? ''),
      ] as [string, string, boolean]
    })

    this.principalParts = regexMagicGroup.map((g) => g[1]) as [
      string,
      string,
      string,
    ]
    if (!isEverythingEqual(regexMagicGroup.map((g) => g[0]))) {
      throw unmatchingPrefixesError
    }
    this.prefix = regexMagicGroup[0][0]
    if (!isEverythingEqual(regexMagicGroup.map((g) => g[2]))) {
      throw unmatchingReflexivesError
    }
    this.isReflexive = regexMagicGroup[0][2]
  }
}
