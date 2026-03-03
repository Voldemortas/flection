import Verbal from './Verbal.ts'
import type { ConjugationType, NounType } from './types.ts'
import type Inflector from '~conjugators/Inflector.ts'
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
  public static readonly imasNoun: Inflector<NounType> = new ImasDecliner()
  public static readonly pusdalyvis: Inflector<PusdalyvisType> =
    new PusdalyvisDecliner()

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
  public declineImas(): NounType {
    return this.#inflectBasedOnOptions(
      Verb.imasNoun,
    )
  }
  public declinePusdalyvis(): PusdalyvisType {
    return this.#inflectBasedOnOptions(
      Verb.pusdalyvis,
    )
  }
  public declineSenaNoun(): NounType {
    const { root } = getInfinitiveRoot(this.principalParts)
    return ADeclinator.declineI(`${root}sen`)
  }

  #inflectBasedOnOptions<T extends Record<string, string>>(
    conjugator: Inflector<T>,
  ): T {
    if (!this.isReflexive && !this.prefix) {
      return conjugator.getDefault(this.principalParts)
    }
    if (this.isReflexive && !this.prefix) {
      return conjugator.getReflexive(this.principalParts)
    }
    if (!this.isReflexive && !!this.prefix) {
      return conjugator.getPrefixed(this.principalParts, this.prefix)
    }
    return conjugator.getPrefixedReflexive(
      this.principalParts,
      this.prefix!,
    )
  }
}
