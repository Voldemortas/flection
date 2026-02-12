import type { ConjugationType } from '~src/types.ts'
import {
  appendSuffixWithAssimilation,
  hasAcuteAccent,
  hasAnyAccent,
  stripAllAccents,
  stripAllAccentsFromParadigm,
} from '~src/utils.ts'
import { decorateConjugatedReflexive } from './utils.ts'

export default abstract class Conjugator {
  static readonly #ACUTE_PREFIXES: string[] = [`pe\u0301r`]
  static readonly #EITI_JOINED = `ei\u0303ti-ei\u0303na-ė\u0303jo`

  /**
   * conjugates prefixed verb by applying metatony if applicable
   * @param {string} prefix - prefix to add; ***Note**: `per` will always be accute if roots are accented*
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const conjugatedVerb = conjugator.conjugatePrefixed('iš', ['būti', 'būna', 'buvo'])
   * ```
   */
  public readonly conjugatePrefixed = (
    principalParts: string[],
    prefix: string,
  ): ConjugationType => {
    const joinedPrincipalParts = principalParts.join('-')
    if (
      prefix === 'ne' &&
      [stripAllAccents(Conjugator.#EITI_JOINED), Conjugator.#EITI_JOINED].some((eiti) =>
        joinedPrincipalParts === eiti
      )
    ) {
      return this.conjugateDefault(principalParts.map((part) => `n${part}`))
    }
    const isPrefixAcute =
      Conjugator.#ACUTE_PREFIXES.map(stripAllAccents).includes(prefix) ||
      hasAcuteAccent(prefix)
    if (isPrefixAcute) {
      const conjugated = this.conjugateDefault(principalParts)
      const prefixToUse = Conjugator.#ACUTE_PREFIXES.filter((pr) =>
        stripAllAccents(pr) === prefix && hasAnyAccent(conjugated.sg3)
      )[0] ?? prefix
      if (hasAnyAccent(conjugated.sg3)) {
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
   * @param {string} prefix - prefix to add; ***Note**: `per` will always be accute if roots are accented*
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const conjugatedVerb = conjugator.conjugatePrefixedReflexive('iš', ['būti', 'būna', 'buvo'])
   * ```
   */
  public readonly conjugatePrefixedReflexive = (
    principalParts: string[],
    prefix: string,
  ): ConjugationType => {
    const prefixToUse =
      Conjugator.#ACUTE_PREFIXES.filter((pr) =>
        stripAllAccents(pr) === prefix
      )[0] ?? prefix
    return this.conjugatePrefixed(principalParts, prefixToUse + 'si')
  }

  protected abstract conjugateBasicPrefixed(
    prefix: string,
    principalParts: string[],
  ): ConjugationType

  /**
   * conjugates verb by applying metatony if applicable
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const conjugatedVerb = conjugator.conjugateDefault(['būti', 'būna', 'buvo'])
   * ```
   */
  public abstract conjugateDefault(principalParts: string[]): ConjugationType

  /**
   * conjugates verb by adding the reflexive particle and applying metatony if applicable
   * @param {[string, string, string]} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const conjugatedVerb = conjugator.conjugateUnprefixedReflexive(['būti', 'būna', 'buvo'])
   * ```
   */
  public conjugateUnprefixedReflexive(
    principalParts: string[],
  ): ConjugationType {
    const conjugated = this.conjugateDefault(principalParts)
    return decorateConjugatedReflexive({
      sg1: appendSuffixWithAssimilation(conjugated.sg1, 's', [
        [/([^a])us$/, `$1uos`],
        [/([^a])u\u0300s$/, `$1u\u0301os`],
      ]),
      sg2: appendSuffixWithAssimilation(conjugated.sg2, 's', [
        [/([^a])is$/, `$1ies`],
        [/([^a])i\u0300s$/, `$1i\u0301es`],
      ]),
      sg3: conjugated.sg3 + 's',
      pl1: `${conjugated.pl1.split(' ')[1]}ės`,
      pl2: `${conjugated.pl2.split(' ')[1]}ės`,
      pl3: conjugated.pl3 + 's',
    })
  }

  protected static applyPrefixToForm(prefix: string, word: string): string {
    return word.split(' ').map((value) => prefix + value).join(' ')
  }

  protected static applyPrefixToParadigm(
    prefix: string,
    conjugated: ConjugationType,
  ): ConjugationType {
    return Object.fromEntries(
      Object.entries(conjugated).map((
        [key, value],
      ) => [
        key,
        Conjugator.applyPrefixToForm(prefix, value),
      ]),
    ) as ConjugationType
  }

  protected readonly conjugateBasicImmobilePrefixed = (
    prefix: string,
    principalParts: string[],
  ): ConjugationType => {
    const basicInflected = this.conjugateDefault(principalParts)
    return Conjugator.applyPrefixToParadigm(
      stripAllAccents(prefix),
      basicInflected,
    )
  }
}
