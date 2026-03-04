import Inflector, {
  ACUTE_PREFIXES,
  REFLEXIVE_PREFIX,
} from '~conjugators/Inflector.ts'
import type {
  DeclinedType,
  NeuterDeclinedType,
  PrincipalPartsType,
} from '~src/types.ts'
import { stripAllAccents } from '~src/utils.ts'

export type ParticipleType = {
  masculine: DeclinedType
  feminine: DeclinedType
  neuter: NeuterDeclinedType
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
   * const pronominal = conjugator.getPronominal(['būti', 'būna', 'buvo'])
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
   * const prefixedPronominal = inflector.getPrefixedPronominal(['būti', 'būna', 'buvo'], 'iš')
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
   * const prefixedReflexivePronominal = inflector.getPrefixedReflexivePronominal(['būti', 'būna', 'buvo'], 'iš')
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
   * const pronominalReflexive = inflector.getReflexivePronominal(['būti', 'būna', 'buvo'])
   * ```
   */
  getReflexivePronominal(
    principalParts: PrincipalPartsType,
  ): ComplementingParticipleType {
    return ParticipleDecliner.#applyBracesWithDashToParticiples(
      this.getPrefixedReflexivePronominal(principalParts, BE_PREFIX),
    )
  }

  /**
   * inflects verb by adding the reflexive particle and applying metatony if applicable
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const reflexive = inflector.getReflexive(['būti', 'būna', 'buvo'])
   * ```
   */
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
  static #applyBracesWithDashToParticiple(ptcp: DeclinedType): DeclinedType {
    return Object.fromEntries(
      Object.entries(ptcp).map((
        [key, value],
      ) => [
        key,
        `- (${value})`,
      ]),
    ) as DeclinedType
  }
}
