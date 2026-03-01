import {
  hasAcuteAccent,
  hasAnyAccent,
  stripAllAccents,
  stripAllAccentsFromParadigm,
} from '~src/utils.ts'
import type { PrincipalPartsType } from '~src/types.ts'

const ACUTE_PREFIXES: string[] = [`pe\u0301r`]
const EITI_JOINED = `ei\u0303ti-ei\u0303na-ė\u0303jo`
const PREFIX_EXCLUSION_KEYS = ['gender']

export default abstract class Inflector<T extends Record<string, string>> {
  /**
   * inflects prefixed verb form by applying metatony if applicable
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @param {string} prefix - prefix to add; ***Note**: `per` will always be accute if roots are accented*
   * @example
   * ```ts
   * const inflectedVerb = inflector.getPrefixed('iš', ['būti', 'būna', 'buvo'])
   * ```
   */
  public readonly getPrefixed = (
    principalParts: PrincipalPartsType,
    prefix: string,
  ): T => {
    const joinedPrincipalParts = principalParts.join('-')
    if (
      stripAllAccents(prefix) === 'ne' &&
      Inflector.isInflectedTheSame(
        joinedPrincipalParts,
        EITI_JOINED,
      )
    ) {
      return this.getDefault(
        principalParts.map((part) => `n${part}`) as PrincipalPartsType,
      )
    }
    const isPrefixAcute =
      ACUTE_PREFIXES.map(stripAllAccents).includes(prefix) ||
      hasAcuteAccent(prefix)
    if (isPrefixAcute) {
      const inflected = this.getDefault(principalParts)
      const hasValuesAnyAccented = Object.values(inflected).some(
        hasAnyAccent,
      )
      const prefixToUse = ACUTE_PREFIXES.filter((pr) =>
        stripAllAccents(pr) === prefix && hasValuesAnyAccented
      )[0] ?? prefix
      if (hasValuesAnyAccented) {
        return Inflector.applyPrefixToParadigm(
          prefixToUse,
          stripAllAccentsFromParadigm(inflected),
        )
      }
      return Inflector.applyPrefixToParadigm(
        stripAllAccents(prefix),
        inflected,
      )
    }
    return this.getBasicPrefixed(principalParts, prefix)
  }

  /**
   * inflects prefixed verb by adding the reflexive particle and applying metatony if applicable
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @param {string} prefix - prefix to add; ***Note**: `per` will always be accute if roots are accented*
   * @example
   * ```ts
   * const inflectedVerb = conjugator.getPrefixedReflexive('iš', ['būti', 'būna', 'buvo'])
   * ```
   */
  public readonly getPrefixedReflexive = (
    principalParts: PrincipalPartsType,
    prefix: string,
  ): T => {
    const prefixToUse =
      ACUTE_PREFIXES.filter((pr) => stripAllAccents(pr) === prefix)[0] ?? prefix
    return this.getPrefixed(principalParts, prefixToUse + 'si')
  }

  protected abstract getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): T

  /**
   * inflects verb by applying metatony if applicable
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const inflectedVerb = conjugator.getDefault(['būti', 'būna', 'buvo'])
   * ```
   */
  public abstract getDefault(principalParts: PrincipalPartsType): T

  /**
   * inflects verb by adding the reflexive particle and applying metatony if applicable
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const inflectedVerb = conjugator.getReflexive(['būti', 'būna', 'buvo'])
   * ```
   */
  public abstract getReflexive(
    principalParts: PrincipalPartsType,
  ): T

  protected static applyPrefixToForm(prefix: string, word: string): string {
    return word.split(' ').map((value) => value === '-' ? '-' : prefix + value)
      .join(' ')
  }

  protected static applyPrefixToParadigm<T extends object>(
    prefix: string,
    inflected: T,
  ): T {
    return Object.fromEntries(
      Object.entries(inflected).map((
        [key, value],
      ) => [
        key,
        PREFIX_EXCLUSION_KEYS.includes(key)
          ? value
          : Inflector.applyPrefixToForm(prefix, value),
      ]),
    ) as T
  }

  protected readonly getBasicImmobilePrefixed = (
    prefix: string,
    principalParts: PrincipalPartsType,
  ): T => {
    const basicInflected = this.getDefault(principalParts)
    return Inflector.applyPrefixToParadigm(
      stripAllAccents(prefix),
      basicInflected,
    )
  }

  protected static isInflectedTheSame(
    joinedPrincipalPartsA: string,
    joinedPrincipalPartsB: string,
  ): boolean {
    return stripAllAccents(joinedPrincipalPartsB) ===
        stripAllAccents(joinedPrincipalPartsA) ||
      joinedPrincipalPartsB === joinedPrincipalPartsA
  }
}
