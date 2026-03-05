import Verbal from './Verbal.ts'
import type {
  ConjugationType,
  DeclinedType,
  PrincipalPartsType,
} from './types.ts'
import type Inflector from '~conjugators/Inflector.ts'
import type ParticipleDecliner from '~conjugators/ParticipleDecliner.ts'
import type { ParticipleType } from '~conjugators/ParticipleDecliner.ts'
import PastFrequentativeIndicativeConjugator from '~conjugators/PastFrequentativeIndicativeConjugator.ts'
import FutureIndicativeConjugator from '~conjugators/FutureIndicativeConjugator.ts'
import PastSimpleIndicativeConjugator from '~conjugators/PastSimpleIndicativeConjugator.ts'
import PresentIndicativeConjugator from '~conjugators/PresentIndicativeConjugator.ts'
import ConditionalConjugator from '~conjugators/ConditionalConjugator.ts'
import ImperativeConjugator from '~conjugators/ImperativeConjugator.ts'
import InfinitiveConjugator, {
  type InfinitiveType,
} from '~conjugators/InfinitiveConjugator.ts'
import ImasDecliner from '~conjugators/ImasDecliner.ts'
import PusdalyvisDecliner, {
  type PusdalyvisType,
} from '~conjugators/PusdalyvisDecliner.ts'
import PassivePastParticipleDecliner from '~conjugators/PassivePastParticipleDecliner.ts'
import ActivePastFrequentativeParticipleDecliner from '~conjugators/ActivePastFrequentativeParticipleDecliner.ts'

/**
 * @description Class which lets you derive various forms such as various moods, -imas action deverbal and various
 * participle forms, presents *constructor* where you can pass certain options such as prefix or reflexivity if you want
 * all the inflected forms to contain them. The derivation methods are also exposed *statically*.
 * **Respects accentuation and metatony.**
 */
export default class Verb extends Verbal {
  public static readonly pastFrequentativeIndicative: Inflector<
    ConjugationType
  > = new PastFrequentativeIndicativeConjugator()
  public static readonly futureIndicative: Inflector<ConjugationType> =
    new FutureIndicativeConjugator()
  public static readonly pastSimpleIndicative: Inflector<ConjugationType> =
    new PastSimpleIndicativeConjugator()
  public static readonly presentIndicative: Inflector<ConjugationType> =
    new PresentIndicativeConjugator()
  public static readonly conditional: Inflector<ConjugationType> =
    new ConditionalConjugator()
  public static readonly imperative: Inflector<ConjugationType> =
    new ImperativeConjugator()
  public static readonly infinitive: Inflector<InfinitiveType> =
    new InfinitiveConjugator()
  public static readonly imasNoun: Inflector<DeclinedType> = new ImasDecliner()
  public static readonly pusdalyvis: Inflector<PusdalyvisType> =
    new PusdalyvisDecliner()
  public static readonly passivePastParticiple: ParticipleDecliner =
    new PassivePastParticipleDecliner()
  public static readonly activePastFrequentativeParticiple: ParticipleDecliner =
    new ActivePastFrequentativeParticipleDecliner()

  /**
   * @description Wrapper to call all the static methods with the same options
   * @param {[string, string, string] | string} roots - single string with principal parts separated with a dash or array of 3 principal part strings
   * @param {{reflexive?: boolean; prefix?: string}={}} options - options with optional prefix and optional reflexiveness
   */
  public constructor(
    roots: string | PrincipalPartsType,
    options: { reflexive?: boolean; prefix?: string | undefined } = {},
  ) {
    super(roots, options)
  }

  /**
   * @description conjugates past frequentative tense based on the data passed to the verb's constructor
   * @example
   * ```
   * const prefixedVerb = new Verb('eiti-eina-ėjo', {prefix: 'per'}).conjugatePastFrequentativeIndicative()
   * ```
   */
  public conjugatePastFrequentativeIndicative(): ConjugationType {
    return this.#inflectBasedOnOptions(
      Verb.pastFrequentativeIndicative,
    )
  }
  /**
   * @description conjugates future tense based on the data passed to the verb's constructor
   * @example
   * ```
   * const prefixedVerb = new Verb('eiti-eina-ėjo', {prefix: 'per'}).conjugateFutureIndicative()
   * ```
   */
  public conjugateFutureIndicative(): ConjugationType {
    return this.#inflectBasedOnOptions(
      Verb.futureIndicative,
    )
  }
  /**
   * @description conjugates past simple tense based on the data passed to the verb's constructor
   * @example
   * ```
   * const prefixedVerb = new Verb('eiti-eina-ėjo', {prefix: 'per'}).conjugatePastSimpleIndicative()
   * ```
   */
  public conjugatePastSimpleIndicative(): ConjugationType {
    return this.#inflectBasedOnOptions(
      Verb.pastSimpleIndicative,
    )
  }
  /**
   * @description conjugates present tense based on the data passed to the verb's constructor
   * @example
   * ```
   * const prefixedVerb = new Verb('eiti-eina-ėjo', {prefix: 'per'}).conjugatePresentIndicative()
   * ```
   */
  public conjugatePresentIndicative(): ConjugationType {
    return this.#inflectBasedOnOptions(
      Verb.presentIndicative,
    )
  }
  /**
   * @description conjugates conditional based on the data passed to the verb's constructor
   * @example
   * ```
   * const prefixedVerb = new Verb('eiti-eina-ėjo', {prefix: 'per'}).conjugateConditional()
   * ```
   */
  public conjugateConditional(): ConjugationType {
    return this.#inflectBasedOnOptions(
      Verb.conditional,
    )
  }
  /**
   * @description conjugates imperative based on the data passed to the verb's constructor
   * @example
   * ```
   * const prefixedVerb = new Verb('eiti-eina-ėjo', {prefix: 'per'}).conjugateImperative()
   * ```
   */
  public conjugateImperative(): ConjugationType {
    return this.#inflectBasedOnOptions(
      Verb.imperative,
    )
  }
  /**
   * @description "conjugates" infinitive based on the data passed to the verb's constructor
   * @example
   * ```
   * const prefixedVerb = new Verb('eiti-eina-ėjo', {prefix: 'per'}).conjugateInfinitive()
   * ```
   */
  public conjugateInfinitive(): InfinitiveType {
    return this.#inflectBasedOnOptions(
      Verb.infinitive,
    )
  }
  /**
   * @description declines -imas action deverbial based on the data passed to the verb's constructor
   * @example
   * ```
   * const prefixedDeverbial = new Verb('eiti-eina-ėjo', {prefix: 'per'}).declineImas()
   * ```
   */
  public declineImas(): DeclinedType {
    return this.#inflectBasedOnOptions(
      Verb.imasNoun,
    )
  }
  /**
   * @description declines pusdalyvis based on the data passed to the verb's constructor
   * @example
   * ```
   * const prefixedPusdalyvis = new Verb('eiti-eina-ėjo', {prefix: 'per'}).declinePusdalyvis()
   * ```
   */
  public declinePusdalyvis(): PusdalyvisType {
    return this.#inflectBasedOnOptions(
      Verb.pusdalyvis,
    )
  }
  /**
   * @description declines past passive participle based on the data passed to the verb's constructor
   * @param {boolean=false} isPronominal - whether the declined participle should be pronominal, defaults `false`
   * @example
   * ```
   * const prefixedPronominalParticiple = new Verb('eiti-eina-ėjo', {prefix: 'per'}).declinePassivePastParticiple(true)
   * ```
   */
  public declinePassivePastParticiple(
    isPronominal: boolean = false,
  ): ParticipleType {
    return this.#inflectBasedOnOptions(
      Verb.passivePastParticiple,
      isPronominal,
    )
  }
  /**
   * @description declines active past frequentative participle based on the data passed to the verb's constructor
   * @param {boolean=false} isPronominal - whether the declined participle should be pronominal, defaults `false`
   * @example
   * ```
   * const prefixedPronominalParticiple = new Verb('eiti-eina-ėjo', {prefix: 'per'}).declineActivePastFrequentativeParticiple(true)
   * ```
   */
  public declineActivePastFrequentativeParticiple(
    isPronominal: boolean = false,
  ): ParticipleType {
    return this.#inflectBasedOnOptions(
      Verb.activePastFrequentativeParticiple,
      isPronominal,
    )
  }

  #inflectBasedOnOptions<
    T extends Record<string, string | Record<string, string>>,
  >(
    conjugator: Inflector<T>,
    pronomial: boolean = false,
  ): T {
    if (!this.isReflexive && !this.prefix && !pronomial) {
      return conjugator.getDefault(this.principalParts)
    }
    if (this.isReflexive && !this.prefix && !pronomial) {
      return conjugator.getReflexive(this.principalParts)
    }
    if (!this.isReflexive && !!this.prefix && !pronomial) {
      return conjugator.getPrefixed(this.principalParts, this.prefix)
    }
    if (!pronomial) {
      return conjugator.getPrefixedReflexive(
        this.principalParts,
        this.prefix!,
      )
    }
    if (
      !this.isReflexive && !this.prefix &&
      !!(conjugator as unknown as ParticipleDecliner).getPronominal
    ) {
      return (conjugator as unknown as ParticipleDecliner).getPronominal(
        this.principalParts,
      ) as unknown as T
    }
    if (
      this.isReflexive && !this.prefix &&
      !!(conjugator as unknown as ParticipleDecliner).getReflexivePronominal
    ) {
      return (conjugator as unknown as ParticipleDecliner)
        .getReflexivePronominal(this.principalParts) as unknown as T
    }
    if (
      !this.isReflexive && !!this.prefix &&
      !!(conjugator as unknown as ParticipleDecliner).getPrefixedPronominal
    ) {
      return (conjugator as unknown as ParticipleDecliner)
        .getPrefixedPronominal(this.principalParts, this.prefix) as unknown as T
    }

    return (conjugator as unknown as ParticipleDecliner)
      .getPrefixedReflexivePronominal(
        this.principalParts,
        this.prefix!,
      ) as unknown as T
  }
}
