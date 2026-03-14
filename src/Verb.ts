import Verbal from './Verbal.ts'
import type {
  ConjugationType,
  DeclinedType,
  PrincipalPartsType,
} from './types.ts'
import type Inflector from '~conjugators/Inflector.ts'
import type { InflectorInterface } from '~conjugators/Inflector.ts'
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
import PassiveFutureParticipleDecliner from '~conjugators/PassiveFutureParticipleDecliner.ts'
import PassivePresentParticipleDecliner from '~conjugators/PassivePresentParticipleDecliner.ts'
import ActivePastFrequentativeParticipleDecliner from '~conjugators/ActivePastFrequentativeParticipleDecliner.ts'
import ActivePastSimpleParticipleDecliner from '~conjugators/ActivePastSimpleParticipleDecliner.ts'
import ActiveFutureParticipleDecliner from '~conjugators/ActiveFutureParticipleDecliner.ts'
import ActivePresentParticipleDecliner from '~conjugators/ActivePresentParticipleDecliner.ts'
import PadalyvisInflector from './flectors/conjugators/PadalyvisInflector.ts'
import type { PadalyvisType } from './flectors/conjugators/PadalyvisInflector.ts'

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
  public static readonly passiveFutureParticple: ParticipleDecliner =
    new PassiveFutureParticipleDecliner()
  public static readonly passivePresentParticiple: ParticipleDecliner =
    new PassivePresentParticipleDecliner()
  public static readonly activePastSimpleParticiple: ParticipleDecliner =
    new ActivePastSimpleParticipleDecliner()
  public static readonly activePastFrequentativeParticiple: ParticipleDecliner =
    new ActivePastFrequentativeParticipleDecliner()
  public static readonly activeFutureParticiple: ParticipleDecliner =
    new ActiveFutureParticipleDecliner()
  public static readonly activePresentParticiple: ParticipleDecliner =
    new ActivePresentParticipleDecliner()
  public static readonly pastSimplePadalyvis: InflectorInterface<
    PadalyvisType
  > = new PadalyvisInflector(Verb.activePastSimpleParticiple)
  public static readonly pastFrequentativePadalyvis: InflectorInterface<
    PadalyvisType
  > = new PadalyvisInflector(Verb.activePastFrequentativeParticiple)
  public static readonly futurePadalyvis: InflectorInterface<PadalyvisType> =
    new PadalyvisInflector(Verb.activeFutureParticiple)
  public static readonly presentPadalyvis: InflectorInterface<PadalyvisType> =
    new PadalyvisInflector(Verb.activePresentParticiple)

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
   * @description declines passive past participle based on the data passed to the verb's constructor
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
   * @description declines passive future participle based on the data passed to the verb's constructor
   * @param {boolean=false} isPronominal - whether the declined participle should be pronominal, defaults `false`
   * @example
   * ```
   * const prefixedPronominalParticiple = new Verb('eiti-eina-ėjo', {prefix: 'per'}).declinePassiveFutureParticiple(true)
   * ```
   */
  public declinePassiveFutureParticiple(
    isPronominal: boolean = false,
  ): ParticipleType {
    return this.#inflectBasedOnOptions(
      Verb.passiveFutureParticple,
      isPronominal,
    )
  }
  /**
   * @description declines passive present participle based on the data passed to the verb's constructor
   * @param {boolean=false} isPronominal - whether the declined participle should be pronominal, defaults `false`
   * @example
   * ```
   * const prefixedPronominalParticiple = new Verb('eiti-eina-ėjo', {prefix: 'per'}).declinePassivePresentParticiple(true)
   * ```
   */
  public declinePassivePresentParticiple(
    isPronominal: boolean = false,
  ): ParticipleType {
    return this.#inflectBasedOnOptions(
      Verb.passivePresentParticiple,
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
  /**
   * @description declines active past simple participle based on the data passed to the verb's constructor
   * @param {boolean=false} isPronominal - whether the declined participle should be pronominal, defaults `false`
   * @example
   * ```
   * const prefixedPronominalParticiple = new Verb('eiti-eina-ėjo', {prefix: 'per'}).declineActivePastSimpleParticiple(true)
   * ```
   */
  public declineActivePastSimpleParticiple(
    isPronominal: boolean = false,
  ): ParticipleType {
    return this.#inflectBasedOnOptions(
      Verb.activePastSimpleParticiple,
      isPronominal,
    )
  }
  /**
   * @description declines active future participle based on the data passed to the verb's constructor
   * @param {boolean=false} isPronominal - whether the declined participle should be pronominal, defaults `false`
   * @example
   * ```
   * const prefixedPronominalParticiple = new Verb('eiti-eina-ėjo', {prefix: 'per'}).declineActiveFutureParticiple(true)
   * ```
   */
  public declineActiveFutureParticiple(
    isPronominal: boolean = false,
  ): ParticipleType {
    return this.#inflectBasedOnOptions(
      Verb.activeFutureParticiple,
      isPronominal,
    )
  }
  /**
   * @description declines active future participle based on the data passed to the verb's constructor
   * @param {boolean=false} isPronominal - whether the declined participle should be pronominal, defaults `false`
   * @example
   * ```
   * const prefixedPronominalParticiple = new Verb('eiti-eina-ėjo', {prefix: 'per'}).declineActivePresentParticiple(true)
   * ```
   */
  public declineActivePresentParticiple(
    isPronominal: boolean = false,
  ): ParticipleType {
    return this.#inflectBasedOnOptions(
      Verb.activePresentParticiple,
      isPronominal,
    )
  }
  /**
   * @description conjugates past frequentative padalyvis based on the data passed to the verb's constructor
   * @example
   * ```
   * const prefixedVerb = new Verb('eiti-eina-ėjo', {prefix: 'per'}).conjugatePastFrequentativePadalyvis()
   * ```
   */
  public conjugatePastFrequentativePadalyvis(): PadalyvisType {
    return this.#inflectBasedOnOptions(
      Verb.pastFrequentativePadalyvis,
    )
  }
  /**
   * @description conjugates future padalyvis based on the data passed to the verb's constructor
   * @example
   * ```
   * const prefixedVerb = new Verb('eiti-eina-ėjo', {prefix: 'per'}).conjugateFuturePadalyvis()
   * ```
   */
  public conjugateFuturePadalyvis(): PadalyvisType {
    return this.#inflectBasedOnOptions(
      Verb.futurePadalyvis,
    )
  }
  /**
   * @description conjugates past simple padalyvis based on the data passed to the verb's constructor
   * @example
   * ```
   * const prefixedVerb = new Verb('eiti-eina-ėjo', {prefix: 'per'}).conjugatePastSimplePadalyvis()
   * ```
   */
  public conjugatePastSimplePadalyvis(): PadalyvisType {
    return this.#inflectBasedOnOptions(
      Verb.pastSimplePadalyvis,
    )
  }
  /**
   * @description conjugates present padalyvis based on the data passed to the verb's constructor
   * @example
   * ```
   * const prefixedVerb = new Verb('eiti-eina-ėjo', {prefix: 'per'}).conjugatePresentPadalyvis()
   * ```
   */
  public conjugatePresentPadalyvis(): PadalyvisType {
    return this.#inflectBasedOnOptions(
      Verb.presentPadalyvis,
    )
  }

  #inflectBasedOnOptions<
    T extends Record<string, string | Record<string, string>>,
  >(
    conjugator: InflectorInterface<T>,
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
