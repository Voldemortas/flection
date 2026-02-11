import { badFormatError, parsingInputError, threeRootsError } from './errors.ts'

type Triple<T> = [T, T, T]

export default class Verb {
  private static PRINCIPAL_PARTS_COUNT = 3
  private static WORD_DiLIMIER = '-'
  public readonly principalParts: Triple<string>
  public readonly prefixes: Triple<string | undefined>
  public readonly areReflexive: Triple<boolean>

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

    this.prefixes = regexMagicGroup.map((g) => g[0]) as Triple<
      string | undefined
    >
    this.principalParts = regexMagicGroup.map((g) => g[1]) as Triple<string>
    this.areReflexive = regexMagicGroup.map((g) => g[2]) as Triple<boolean>
  }
}
