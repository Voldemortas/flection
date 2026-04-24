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
import PadalyvisInflector from '~conjugators/PadalyvisInflector.ts'
import type { PadalyvisType } from '~conjugators/PadalyvisInflector.ts'
import BudinysInflector from '~conjugators/BudinysInflector.ts'
import type { BudinysType } from '~conjugators/BudinysInflector.ts'
import NecessityParticipleDecliner from './flectors/conjugators/NecessityParticipleDecliner.ts'
import {
  badFormatError,
  parsingInputError,
  threeRootsError,
  unmatchingPrefixesError,
  unmatchingReflexivesError,
} from './errors.ts'
import { isEverythingEqual } from './utils.ts'

/**
 * Class which lets you derive various forms such as various moods, -imas action deverbal and various
 * participle forms, presents *constructor* where you can pass certain options such as prefix or reflexivity if you want
 * all the inflected forms to contain them. The derivation methods are also exposed *statically*.
 * **Respects accentuation and metatony.**
 */
export default class Verb {
  static readonly #PRINCIPAL_PARTS_COUNT = 3
  static readonly #WORD_DiLIMIER = '-'

  /**
   * the 3 principal parts consisting of infinitive, 3rd person present indicative and 3rd person past simple indicative
   */
  public readonly principalParts: PrincipalPartsType
  /**
   * the provided prefix(es) - optional
   */
  public readonly prefix: string | undefined
  /**
   * whether the verb should be reflexive
   */
  public readonly isReflexive: boolean

  /**
   * static member for the past frequentative indicative
   */
  public static readonly pastFrequentativeIndicative: Inflector<
    ConjugationType
  > = new PastFrequentativeIndicativeConjugator()
  /**
   * static member for the future indicative
   */
  public static readonly futureIndicative: Inflector<ConjugationType> =
    new FutureIndicativeConjugator()
  /**
   * static member for the past simple indicative
   */
  public static readonly pastSimpleIndicative: Inflector<ConjugationType> =
    new PastSimpleIndicativeConjugator()
  /**
   * static member for the present indicative
   */
  public static readonly presentIndicative: Inflector<ConjugationType> =
    new PresentIndicativeConjugator()
  /**
   * static member for the conditional
   */
  public static readonly conditional: Inflector<ConjugationType> =
    new ConditionalConjugator()
  /**
   * static member for the imperative
   */
  public static readonly imperative: Inflector<ConjugationType> =
    new ImperativeConjugator()
  /**
   * static member for the infinitive
   */
  public static readonly infinitive: Inflector<InfinitiveType> =
    new InfinitiveConjugator()
  /**
   * static member for the -imas noun
   */
  public static readonly imasNoun: Inflector<DeclinedType> = new ImasDecliner()
  /**
   * static member for the pusdalyvis
   */
  public static readonly pusdalyvis: Inflector<PusdalyvisType> =
    new PusdalyvisDecliner()
  /**
   * static member for the passive past participle
   */
  public static readonly passivePastParticiple: ParticipleDecliner =
    new PassivePastParticipleDecliner()
  /**
   * static member for the passive future participle
   */
  public static readonly passiveFutureParticiple: ParticipleDecliner =
    new PassiveFutureParticipleDecliner()
  /**
   * static member for the passive present participle
   */
  public static readonly passivePresentParticiple: ParticipleDecliner =
    new PassivePresentParticipleDecliner()
  /**
   * static member for the active past simple participle
   */
  public static readonly activePastSimpleParticiple: ParticipleDecliner =
    new ActivePastSimpleParticipleDecliner()
  /**
   * static member for the active past frequentative participle
   */
  public static readonly activePastFrequentativeParticiple: ParticipleDecliner =
    new ActivePastFrequentativeParticipleDecliner()
  /**
   * static member for the active future participle
   */
  public static readonly activeFutureParticiple: ParticipleDecliner =
    new ActiveFutureParticipleDecliner()
  /**
   * static member for the active present participle
   */
  public static readonly activePresentParticiple: ParticipleDecliner =
    new ActivePresentParticipleDecliner()
  /**
   * static member for the past simple padalyvis
   */
  public static readonly pastSimplePadalyvis: InflectorInterface<
    PadalyvisType
  > = new PadalyvisInflector(Verb.activePastSimpleParticiple)
  /**
   * static member for the past frequentative padalyvis
   */
  public static readonly pastFrequentativePadalyvis: InflectorInterface<
    PadalyvisType
  > = new PadalyvisInflector(Verb.activePastFrequentativeParticiple)
  /**
   * static member for the future padalyvis
   */
  public static readonly futurePadalyvis: InflectorInterface<PadalyvisType> =
    new PadalyvisInflector(Verb.activeFutureParticiple)
  /**
   * static member for the present padalyvis
   */
  public static readonly presentPadalyvis: InflectorInterface<PadalyvisType> =
    new PadalyvisInflector(Verb.activePresentParticiple)
  /**
   * static member for the budinys
   */
  public static readonly budinys: BudinysInflector = new BudinysInflector()
  /**
   * static member for the necessity articiple
   */
  public static readonly necessityParticiple: ParticipleDecliner =
    new NecessityParticipleDecliner()

  /**
   * conjugates past frequentative tense based on the data passed to the verb's constructor
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
   * conjugates future tense based on the data passed to the verb's constructor
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
   * conjugates past simple tense based on the data passed to the verb's constructor
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
   * conjugates present tense based on the data passed to the verb's constructor
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
   * conjugates conditional based on the data passed to the verb's constructor
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
   * conjugates imperative based on the data passed to the verb's constructor
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
   * "conjugates" infinitive based on the data passed to the verb's constructor
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
   * declines -imas action deverbial based on the data passed to the verb's constructor
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
   * declines pusdalyvis based on the data passed to the verb's constructor
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
   * declines passive past participle based on the data passed to the verb's constructor
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
   * declines passive future participle based on the data passed to the verb's constructor
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
      Verb.passiveFutureParticiple,
      isPronominal,
    )
  }
  /**
   * declines passive present participle based on the data passed to the verb's constructor
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
   * declines active past frequentative participle based on the data passed to the verb's constructor
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
   * declines active past simple participle based on the data passed to the verb's constructor
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
   * declines active future participle based on the data passed to the verb's constructor
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
   * declines active future participle based on the data passed to the verb's constructor
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
   * conjugates past frequentative padalyvis based on the data passed to the verb's constructor
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
   * conjugates future padalyvis based on the data passed to the verb's constructor
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
   * conjugates past simple padalyvis based on the data passed to the verb's constructor
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
   * conjugates present padalyvis based on the data passed to the verb's constructor
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
  /**
   * conjugates būdinys based on the data passed to the verb's constructor
   * @example
   * ```
   * const budinys = new Verb('eiti-eina-ėjo').conjugateBudinys()
   * ```
   */
  public conjugateBudinys(): BudinysType {
    return Verb.budinys.getDefault(this.principalParts)
  }
  /**
   * declines necessity participle based on the data passed to the verb's constructor
   * @param {boolean=false} isPronominal - whether the declined participle should be pronominal, defaults `false`
   * @example
   * ```
   * const prefixedPronominalParticiple = new Verb('eiti-eina-ėjo', {prefix: 'per'}).declineNecessityParticiple(true)
   * ```
   */
  public declineNecessityParticiple(
    isPronominal: boolean = false,
  ): ParticipleType {
    return this.#inflectBasedOnOptions(
      Verb.necessityParticiple,
      isPronominal,
    )
  }

  /**
   * Wrapper to call all the static methods with the same options
   * @param {[string, string, string] | string} roots - single string with principal parts separated with a dash or array of 3 principal part strings
   * @param {{reflexive?: boolean; prefix?: string}={}} options - options with optional prefix and optional reflexiveness
   * @example
   * ```ts
   * const firstVerb = new Verb([`dėti`, `deda`, `dėjo`])//same as secondVerb
   * const secondVerb = new Verb(`dėti-deda-dėjo`)//same as firstVerb
   * const thirdVerb = new Verb([`dėti`, `deda`, `dėjo`], {prefix: `pa`})//same as fourthVerb
   * const fourthVerb = new Verb(`pa=dėti-pa=deda-pa=dėjo`)//same as thirdVerb
   * const sixthVerb = new Verb([`dėti`, `deda`, `dėjo`], {prefix: `pa`, reflexive: true})//same as seventhVerb
   * const seventhVerb = new Verb(`pasi=dėti-pasi=deda-pasi=dėjo`)//same as sixthVerb
   * const eightVerb = new Verb([`dėti`, `deda`, `dėjo`], {reflexive: true})//same as ninthVerb
   * const ninthVerb = new Verb(`dėtis-dedasi-dėjosi`)//same as eightVerb
   * ```
   */
  public constructor(
    roots: string | PrincipalPartsType,
    options: { reflexive?: boolean; prefix?: string | undefined } = {},
  ) {
    const rootArray = Array.isArray(roots)
      ? roots
      : roots.split(Verb.#WORD_DiLIMIER)
    if (rootArray.length !== Verb.#PRINCIPAL_PARTS_COUNT) {
      throw threeRootsError
    }
    const regexMagicGroup = rootArray.map((root) => {
      const regexMatches =
        /(^(?<prefix>[^=]+?)=(?<root>.+?)(?<reflexive>si?)?$|(^(?<root>.+?)(?<reflexive>si?)?$))/
          .exec(root)
      // deno-coverage-ignore-start
      if (!regexMatches) {
        throw badFormatError(root)
      }
      if (!regexMatches.groups) {
        throw parsingInputError
      }
      // deno-coverage-ignore-stop
      const groups = regexMatches.groups
      return [
        trimReflexiveFromPrefix(groups['prefix'] ?? options.prefix),
        groups['root']!,
        !!options.reflexive || !!groups['reflexive'] ||
        /si$/.test(groups['prefix'] ?? options.prefix ?? ''),
      ] as [string, string, boolean]
    })

    this.principalParts = regexMagicGroup.map((g) => g[1]) as [
      string,
      string,
      string,
    ]
    if (!isEverythingEqual(regexMagicGroup.map((g) => g[0]))) {
      throw unmatchingPrefixesError
    }
    this.prefix = regexMagicGroup[0][0]
    if (!isEverythingEqual(regexMagicGroup.map((g) => g[2]))) {
      throw unmatchingReflexivesError
    }
    this.isReflexive = regexMagicGroup[0][2]
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

function trimReflexiveFromPrefix(prefix: string | undefined) {
  if (!prefix) {
    return prefix
  }
  return prefix.replace(/si$/, '')
}
