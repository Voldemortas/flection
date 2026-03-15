import {
  hasAcuteAccent,
  hasAnyAccent,
  isInflectedTheSame,
  stripAllAccents,
  stripAllAccentsFromParadigm,
} from '~src/utils.ts'
import type { PrincipalPartsType } from '~src/types.ts'

export const REFLEXIVE_PREFIX = 'si'
export const ACUTE_PREFIXES: string[] = [`pe\u0301r`]
const EITI_JOINED = `ei\u0303ti-ei\u0303na-ė\u0303jo`

export interface InflectorInterface<
  T extends Record<string, string | Record<string, string>>,
> {
  getDefault: (principalParts: PrincipalPartsType) => T
  getPrefixed: (principalParts: PrincipalPartsType, prefix: string) => T
  getReflexive: (principalParts: PrincipalPartsType) => T
  getPrefixedReflexive: (
    principalParts: PrincipalPartsType,
    prefix: string,
  ) => T
}

export default abstract class Inflector<
  T extends Record<string, string | Record<string, string>>,
> implements InflectorInterface<T> {
  /**
   * inflects prefixed verb form by applying metatony if applicable
   * @param {PrincipalPartsType} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @param {string} prefix - prefix to add; ***Note**: `per` will always be acute if roots are accented*
   * @example
   * ```ts
   * const prefixed = inflector.getPrefixed('iš', ['būti', 'būna', 'buvo'])
   * ```
   */
  public readonly getPrefixed = (
    principalParts: PrincipalPartsType,
    prefix: string,
  ): T => {
    return this.getPrefixedForInflected(principalParts, prefix, this.getDefault)
  }

  protected getPrefixedForInflected(
    principalParts: PrincipalPartsType,
    prefix: string,
    getBasicInflected: (principalParts: PrincipalPartsType) => T,
  ): T {
    const joinedPrincipalParts = principalParts.join('-')
    if (
      stripAllAccents(prefix) === 'ne' &&
      isInflectedTheSame(
        joinedPrincipalParts,
        EITI_JOINED,
      )
    ) {
      return getBasicInflected(
        principalParts.map((part) => `n${part}`) as PrincipalPartsType,
      )
    }
    const isPrefixAcute =
      ACUTE_PREFIXES.map(stripAllAccents).includes(prefix) ||
      hasAcuteAccent(prefix)
    if (isPrefixAcute) {
      const inflected = getBasicInflected(principalParts)
      const deepestInflected = (typeof Object.values(inflected)[0] === 'string'
        ? inflected
        : Object.values(inflected)[0]) as Record<string, string>
      const hasValuesAnyAccented = Object.values(deepestInflected).some(
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
    return this.getBasicPrefixed(principalParts, prefix, getBasicInflected)
  }

  /**
   * inflects prefixed verb by adding the reflexive particle and applying metatony if applicable
   * @param {PrincipalPartsType} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @param {string} prefix - prefix to add; ***Note**: `per` will always be acute if roots are accented*
   * @example
   * ```ts
   * const prefixedReflexive = inflector.getPrefixedReflexive('iš', ['būti', 'būna', 'buvo'])
   * ```
   */
  public readonly getPrefixedReflexive = (
    principalParts: PrincipalPartsType,
    prefix: string,
  ): T => {
    const prefixToUse =
      ACUTE_PREFIXES.filter((pr) => stripAllAccents(pr) === prefix)[0] ?? prefix
    return this.getPrefixed(principalParts, prefixToUse + REFLEXIVE_PREFIX)
  }

  protected abstract getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
    getBasicInflected?: (principalParts: PrincipalPartsType) => T,
  ): T

  /**
   * inflects verb by applying metatony if applicable
   * @param {PrincipalPartsType} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const inflected = inflector.getDefault(['būti', 'būna', 'buvo'])
   * ```
   */
  public abstract getDefault(principalParts: PrincipalPartsType): T

  /**
   * inflects verb by adding the reflexive particle and applying metatony if applicable
   * @param {PrincipalPartsType} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const reflexive = inflector.getReflexive(['būti', 'būna', 'buvo'])
   * ```
   */
  public abstract getReflexive(
    principalParts: PrincipalPartsType,
  ): T

  protected static applyPrefixToForm(prefix: string, word: string): string {
    return word.replaceAll(/([^\s|\-]+)/g, `${prefix}$1`)
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
        typeof value === 'string'
          ? Inflector.applyPrefixToForm(prefix, value)
          : this.applyPrefixToParadigm(prefix, value),
      ]),
    ) as T
  }

  protected readonly getBasicImmobilePrefixed = (
    prefix: string,
    principalParts: PrincipalPartsType,
    getBasicInflected: (principalParts: PrincipalPartsType) => T =
      this.getDefault,
  ): T => {
    const basicInflected = getBasicInflected(principalParts)
    return Inflector.applyPrefixToParadigm(
      stripAllAccents(prefix),
      basicInflected,
    )
  }
}
