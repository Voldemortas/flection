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

export default abstract class Conjugator<T extends Record<string, string>> {
  /**
   * conjugates prefixed verb by applying metatony if applicable
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @param {string} prefix - prefix to add; ***Note**: `per` will always be accute if roots are accented*
   * @example
   * ```ts
   * const conjugatedVerb = conjugator.conjugatePrefixed('iš', ['būti', 'būna', 'buvo'])
   * ```
   */
  public readonly conjugatePrefixed = (
    principalParts: PrincipalPartsType,
    prefix: string,
  ): T => {
    const joinedPrincipalParts = principalParts.join('-')
    if (
      stripAllAccents(prefix) === 'ne' &&
      Conjugator.isConjugatedTheSame(
        joinedPrincipalParts,
        EITI_JOINED,
      )
    ) {
      return this.conjugateDefault(
        principalParts.map((part) => `n${part}`) as PrincipalPartsType,
      )
    }
    const isPrefixAcute =
      ACUTE_PREFIXES.map(stripAllAccents).includes(prefix) ||
      hasAcuteAccent(prefix)
    if (isPrefixAcute) {
      const conjugated = this.conjugateDefault(principalParts)
      const hasConjugatedValuesAnyAccented = Object.values(conjugated).some(
        hasAnyAccent,
      )
      const prefixToUse = ACUTE_PREFIXES.filter((pr) =>
        stripAllAccents(pr) === prefix && hasConjugatedValuesAnyAccented
      )[0] ?? prefix
      if (hasConjugatedValuesAnyAccented) {
        return Conjugator.applyPrefixToParadigm(
          prefixToUse,
          stripAllAccentsFromParadigm(conjugated),
        )
      }
      return Conjugator.applyPrefixToParadigm(
        stripAllAccents(prefix),
        conjugated,
      )
    }
    return this.conjugateBasicPrefixed(principalParts, prefix)
  }

  /**
   * conjugates prefixed verb by adding the reflexive particle and applying metatony if applicable
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @param {string} prefix - prefix to add; ***Note**: `per` will always be accute if roots are accented*
   * @example
   * ```ts
   * const conjugatedVerb = conjugator.conjugatePrefixedReflexive('iš', ['būti', 'būna', 'buvo'])
   * ```
   */
  public readonly conjugatePrefixedReflexive = (
    principalParts: PrincipalPartsType,
    prefix: string,
  ): T => {
    const prefixToUse =
      ACUTE_PREFIXES.filter((pr) => stripAllAccents(pr) === prefix)[0] ?? prefix
    return this.conjugatePrefixed(principalParts, prefixToUse + 'si')
  }

  protected abstract conjugateBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): T

  /**
   * conjugates verb by applying metatony if applicable
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const conjugatedVerb = conjugator.conjugateDefault(['būti', 'būna', 'buvo'])
   * ```
   */
  public abstract conjugateDefault(principalParts: PrincipalPartsType): T

  /**
   * conjugates verb by adding the reflexive particle and applying metatony if applicable
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const conjugatedVerb = conjugator.conjugateUnprefixedReflexive(['būti', 'būna', 'buvo'])
   * ```
   */
  public abstract conjugateUnprefixedReflexive(
    principalParts: PrincipalPartsType,
  ): T

  protected static applyPrefixToForm(prefix: string, word: string): string {
    return word.split(' ').map((value) => value === '-' ? '-' : prefix + value)
      .join(' ')
  }

  protected static applyPrefixToParadigm<T extends object>(
    prefix: string,
    conjugated: T,
  ): T {
    return Object.fromEntries(
      Object.entries(conjugated).map((
        [key, value],
      ) => [
        key,
        PREFIX_EXCLUSION_KEYS.includes(key)
          ? value
          : Conjugator.applyPrefixToForm(prefix, value),
      ]),
    ) as T
  }

  protected readonly conjugateBasicImmobilePrefixed = (
    prefix: string,
    principalParts: PrincipalPartsType,
  ): T => {
    const basicInflected = this.conjugateDefault(principalParts)
    return Conjugator.applyPrefixToParadigm(
      stripAllAccents(prefix),
      basicInflected,
    )
  }

  protected static isConjugatedTheSame(
    joinedPrincipalPartsA: string,
    joinedPrincipalPartsB: string,
  ): boolean {
    return stripAllAccents(joinedPrincipalPartsB) ===
        stripAllAccents(joinedPrincipalPartsA) ||
      joinedPrincipalPartsB === joinedPrincipalPartsA
  }
}
