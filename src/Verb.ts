import Verbal from './Verbal.ts'
import type { ConjugationType, DeclinedType } from './types.ts'
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
import ADeclinator from '~decliners/ADeclinator.ts'
import { getInfinitiveRoot } from './utils.ts'
import PusdalyvisDecliner, {
  type PusdalyvisType,
} from '~conjugators/PusdalyvisDecliner.ts'
import PastPassiveParticipleDecliner from '~conjugators/PastPassiveParticipleDecliner.ts'

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
  public static readonly pastPassiveParticiple: ParticipleDecliner =
    new PastPassiveParticipleDecliner()

  public constructor(
    roots: string | string[],
    options: { reflexive?: boolean; prefix?: string | undefined } = {},
  ) {
    super(roots, options)
  }

  public conjugatePastFrequentativeIndicative(): ConjugationType {
    return this.#inflectBasedOnOptions(
      Verb.pastFrequentativeIndicative,
    )
  }
  public conjugateFutureIndicative(): ConjugationType {
    return this.#inflectBasedOnOptions(
      Verb.futureIndicative,
    )
  }
  public conjugatePastSimpleIndicative(): ConjugationType {
    return this.#inflectBasedOnOptions(
      Verb.pastSimpleIndicative,
    )
  }
  public conjugatePresentIndicative(): ConjugationType {
    return this.#inflectBasedOnOptions(
      Verb.presentIndicative,
    )
  }
  public conjugateConditional(): ConjugationType {
    return this.#inflectBasedOnOptions(
      Verb.conditional,
    )
  }
  public conjugateImperative(): ConjugationType {
    return this.#inflectBasedOnOptions(
      Verb.imperative,
    )
  }
  public conjugateInfinitive(): InfinitiveType {
    return this.#inflectBasedOnOptions(
      Verb.infinitive,
    )
  }
  public declineImas(): DeclinedType {
    return this.#inflectBasedOnOptions(
      Verb.imasNoun,
    )
  }
  public declinePusdalyvis(): PusdalyvisType {
    return this.#inflectBasedOnOptions(
      Verb.pusdalyvis,
    )
  }
  public declinePastPassiveParticiple(isPronominal: boolean): ParticipleType {
    return this.#inflectBasedOnOptions(
      Verb.pastPassiveParticiple,
      isPronominal,
    )
  }
  public declineSenaNoun(): DeclinedType {
    const { root } = getInfinitiveRoot(this.principalParts)
    return ADeclinator.declineI(`${root}sen`)
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
