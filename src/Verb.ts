import {
  badFormatError,
  parsingInputError,
  threeRootsError,
  unmatchingPrefixesError,
} from './errors.ts'
import PastFrequentativeIndicativeConjugator from './flectors/PastFrequentativeIndicativeConjugator.ts'
import type Conjugator from './flectors/Conjugator.ts'
import type { ConjugationType } from './types.ts'

type Triple<T> = [T, T, T]

export default class Verb {
  private static PRINCIPAL_PARTS_COUNT = 3
  private static WORD_DiLIMIER = '-'

  public readonly principalParts: Triple<string>
  public readonly prefix: string | undefined
  public readonly isReflexive: boolean

  public static readonly pastFrequentativeIndicative: Conjugator =
    new PastFrequentativeIndicativeConjugator()

  private static trimReflexiveFromPrefix(prefix: string | undefined) {
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
      : roots.split(Verb.WORD_DiLIMIER)
    if (rootArray.length !== Verb.PRINCIPAL_PARTS_COUNT) {
      throw threeRootsError
    }
    const regexMagicGroup = rootArray.map((root) => {
      const regexMatches =
        /(^(?<prefix>[^=]+?)=(?<root>.+?)(?<reflexive>si?)?$|(^(?<root>.+?)(?<reflexive>si?)?$))/
          .exec(root)
      if (!regexMatches) {
        throw badFormatError(root)
      }
      if (!regexMatches.groups) {
        throw parsingInputError
      }
      const groups = regexMatches.groups
      return [
        Verb.trimReflexiveFromPrefix(groups['prefix'] ?? options.prefix),
        groups['root']!,
        !!options.reflexive || !!groups['reflexive'] ||
        /si$/.test(groups['prefix'] ?? options.prefix ?? ''),
      ] as [string, string, boolean]
    })

    this.principalParts = regexMagicGroup.map((g) => g[1]) as Triple<string>
    if (!regexMagicGroup.map((g) => g[0]).every((v, _, arr) => v === arr[0])) {
      throw unmatchingPrefixesError
    }
    this.prefix = regexMagicGroup[0][0]
    if (!regexMagicGroup.map((g) => g[2]).every((v, _, arr) => v === arr[0])) {
      throw unmatchingPrefixesError
    }
    this.isReflexive = regexMagicGroup[0][2]
  }

  public conjugatePastFrequentativeIndicative(): ConjugationType {
    return this.conjugateConjugatorBasedOnOptions(
      Verb.pastFrequentativeIndicative,
    )
  }

  private conjugateConjugatorBasedOnOptions(
    conjugator: Conjugator,
  ): ConjugationType {
    if (!this.isReflexive && !this.prefix) {
      return conjugator.conjugateDefault(this.principalParts)
    }
    if (this.isReflexive && !this.prefix) {
      return conjugator.conjugateUnprefixedReflexive(this.principalParts)
    }
    if (!this.isReflexive && !!this.prefix) {
      return conjugator.conjugatePrefixed(this.principalParts, this.prefix)
    }
    return conjugator.conjugatePrefixedReflexive(
      this.principalParts,
      this.prefix!,
    )
  }
}
