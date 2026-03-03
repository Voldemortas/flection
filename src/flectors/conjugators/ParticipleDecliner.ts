import Inflector, {
  ACUTE_PREFIXES,
  PREFIX_EXCLUSION_KEYS,
  REFLEXIVE_PREFIX,
} from '~conjugators/Inflector.ts'
import type {
  AdjectiveType,
  GenderfulAdjectiveType,
  NeuterAdjectiveType,
  PrincipalPartsType,
} from '~src/types.ts'
import { stripAllAccents } from '~src/utils.ts'

export type ParticipleType = {
  masculine: GenderfulAdjectiveType & { gender: 'masculine' }
  feminine: GenderfulAdjectiveType & { gender: 'feminine' }
  neuter: NeuterAdjectiveType & { gender: 'neuter' }
}
export type ComplementingParticipleType = Omit<ParticipleType, 'neuter'>

const BE_PREFIX = 'be'

export default abstract class ParticipleDecliner
  extends Inflector<ParticipleType> {
  /**
   * declines pronominal particple
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const pronominalParticiples = conjugator.getPronominal(['būti', 'būna', 'buvo'])
   * ```
   */
  abstract getPronominal(
    principalParts: PrincipalPartsType,
  ): ComplementingParticipleType

  /**
   * inflects prefixed pronominal participle
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @param {string} prefix - prefix to add; ***Note**: `per` will always be accute if roots are accented*
   * @example
   * ```ts
   * const prefixedPronominalParticiples = inflector.getPrefixedPronominal(['būti', 'būna', 'buvo'], 'iš')
   * ```
   */
  getPrefixedPronominal(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): ComplementingParticipleType {
    return this.getPrefixedForInflected(
      principalParts,
      prefix,
      //@ts-ignore intended ComplementingParticipleType instead of ParticipleType
      this.getPronominal,
    )
  }

  /**
   * inflects prefixed reflexive pronominal participle
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @param {string} prefix - prefix to add; ***Note**: `per` will always be accute if roots are accented*
   * @example
   * ```ts
   * const prefixedReflexivePronominalParticiples = inflector.getPrefixedReflexivePronominal(['būti', 'būna', 'buvo'], 'iš')
   * ```
   */
  getPrefixedReflexivePronominal(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): ComplementingParticipleType {
    const prefixToUse =
      ACUTE_PREFIXES.filter((pr) => stripAllAccents(pr) === prefix)[0] ?? prefix
    return this.getPrefixedPronominal(
      principalParts,
      prefixToUse + REFLEXIVE_PREFIX,
    )
  }

  /**
   * inflects reflexive pronominal participle
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const pronominalReflexiveParticiples = inflector.getReflexivePronominal(['būti', 'būna', 'buvo'])
   * ```
   */
  getReflexivePronominal(
    principalParts: PrincipalPartsType,
  ): ComplementingParticipleType {
    return ParticipleDecliner.#applyBracesWithDashToParticiples(
      this.getPrefixedReflexivePronominal(principalParts, BE_PREFIX),
    )
  }

  override getReflexive(principalParts: PrincipalPartsType): ParticipleType {
    return ParticipleDecliner.#applyBracesWithDashToParticiples(
      this.getPrefixedReflexive(principalParts, BE_PREFIX),
    )
  }

  static #applyBracesWithDashToParticiples<
    T extends ComplementingParticipleType | ParticipleType,
  >(
    paradigm: T,
  ): T {
    return Object.fromEntries(
      Object.entries(paradigm).map((
        [key, value],
      ) => [
        key,
        //@ts-ignore all good
        this.#applyBracesWithDashToParticiple(value),
      ]),
    ) as unknown as T
  }
  static #applyBracesWithDashToParticiple(ptcp: AdjectiveType): AdjectiveType {
    return Object.fromEntries(
      Object.entries(ptcp).map((
        [key, value],
      ) => [
        key,
        PREFIX_EXCLUSION_KEYS.includes(key) ? value : `- (${value})`,
      ]),
    ) as AdjectiveType
  }
}
