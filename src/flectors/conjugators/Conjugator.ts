import {
  hasAcuteAccent,
  hasAnyAccent,
  stripAllAccents,
  stripAllAccentsFromParadigm,
} from '~src/utils.ts'

export default abstract class Conjugator<T extends Record<string, string>> {
  static readonly #ACUTE_PREFIXES: string[] = [`pe\u0301r`]
  static readonly #EITI_JOINED = `ei\u0303ti-ei\u0303na-ė\u0303jo`

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
    principalParts: string[],
    prefix: string,
  ): T => {
    const joinedPrincipalParts = principalParts.join('-')
    if (
      prefix === 'ne' &&
      Conjugator.isConjugatedTheSame(
        joinedPrincipalParts,
        Conjugator.#EITI_JOINED,
      )
    ) {
      return this.conjugateDefault(principalParts.map((part) => `n${part}`))
    }
    const isPrefixAcute =
      Conjugator.#ACUTE_PREFIXES.map(stripAllAccents).includes(prefix) ||
      hasAcuteAccent(prefix)
    if (isPrefixAcute) {
      const conjugated = this.conjugateDefault(principalParts)
      const hasConjugatedValuesAnyAccented = Object.values(conjugated).some(
        hasAnyAccent,
      )
      const prefixToUse = Conjugator.#ACUTE_PREFIXES.filter((pr) =>
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
    return this.conjugateBasicPrefixed(prefix, principalParts)
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
    principalParts: string[],
    prefix: string,
  ): T => {
    const prefixToUse =
      Conjugator.#ACUTE_PREFIXES.filter((pr) =>
        stripAllAccents(pr) === prefix
      )[0] ?? prefix
    return this.conjugatePrefixed(principalParts, prefixToUse + 'si')
  }

  protected abstract conjugateBasicPrefixed(
    prefix: string,
    principalParts: string[],
  ): T

  /**
   * conjugates verb by applying metatony if applicable
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const conjugatedVerb = conjugator.conjugateDefault(['būti', 'būna', 'buvo'])
   * ```
   */
  public abstract conjugateDefault(principalParts: string[]): T

  /**
   * conjugates verb by adding the reflexive particle and applying metatony if applicable
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const conjugatedVerb = conjugator.conjugateUnprefixedReflexive(['būti', 'būna', 'buvo'])
   * ```
   */
  public abstract conjugateUnprefixedReflexive(principalParts: string[]): T

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
        Conjugator.applyPrefixToForm(prefix, value),
      ]),
    ) as T
  }

  protected readonly conjugateBasicImmobilePrefixed = (
    prefix: string,
    principalParts: string[],
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
