import Verbal from './Verbal.ts'

export default class Participle extends Verbal {
  public readonly isPronominal: boolean
  public constructor(
    roots: string | string[],
    options: {
      reflexive?: boolean
      prefix?: string | undefined
      isPronominal?: boolean
    } = {},
  ) {
    super(roots, options)
    this.isPronominal = !!options.isPronominal
  }
  public static FromVerbal(verb: Verbal, isPronominal?: boolean): Participle {
    const parsedPronominal = isPronominal === undefined &&
        (verb as Participle).isPronominal !== undefined
      ? (verb as Participle).isPronominal
      : isPronominal
    return new Participle(verb.principalParts, {
      reflexive: verb.isReflexive,
      prefix: verb.prefix,
      isPronominal: parsedPronominal,
    })
  }
}
