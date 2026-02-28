import Verbal from './Verbal.ts'
import type { ConjugationType } from './types.ts'
import type Conjugator from '~conjugators/Conjugator.ts'
import PastFrequentativeIndicativeConjugator from '~conjugators/PastFrequentativeIndicativeConjugator.ts'
import FutureIndicativeConjugator from '~conjugators/FutureIndicativeConjugator.ts'
import PastSimpleIndicativeConjugator from '~conjugators/PastSimpleIndicativeConjugator.ts'
import PresentIndicativeConjugator from '~conjugators/PresentIndicativeConjugator.ts'
import ConditionalConjugator from '~conjugators/ConditionalConjugator.ts'
import ImperativeConjugator from '~conjugators/ImperativeConjugator.ts'
import InfinitiveConjugator, {
  type InfinitiveType,
} from '~conjugators/InfinitiveConjugator.ts'

export default class Verb extends Verbal {
  public static readonly pastFrequentativeIndicative: Conjugator<
    ConjugationType
  > = new PastFrequentativeIndicativeConjugator()
  public static readonly futureIndicative: Conjugator<ConjugationType> =
    new FutureIndicativeConjugator()
  public static readonly pastSimpleIndicative: Conjugator<ConjugationType> =
    new PastSimpleIndicativeConjugator()
  public static readonly presentIndicative: Conjugator<ConjugationType> =
    new PresentIndicativeConjugator()
  public static readonly conditional: Conjugator<ConjugationType> =
    new ConditionalConjugator()
  public static readonly imperative: Conjugator<ConjugationType> =
    new ImperativeConjugator()
  public static readonly infinitive: Conjugator<InfinitiveType> =
    new InfinitiveConjugator()

  public constructor(
    roots: string | string[],
    options: { reflexive?: boolean; prefix?: string | undefined } = {},
  ) {
    super(roots, options)
  }

  public conjugatePastFrequentativeIndicative(): ConjugationType {
    return this.#conjugateConjugatorBasedOnOptions(
      Verb.pastFrequentativeIndicative,
    )
  }
  public conjugateFutureIndicative(): ConjugationType {
    return this.#conjugateConjugatorBasedOnOptions(
      Verb.futureIndicative,
    )
  }
  public conjugatePastSimpleIndicative(): ConjugationType {
    return this.#conjugateConjugatorBasedOnOptions(
      Verb.pastSimpleIndicative,
    )
  }
  public conjugatePresentIndicative(): ConjugationType {
    return this.#conjugateConjugatorBasedOnOptions(
      Verb.presentIndicative,
    )
  }
  public conjugateConditional(): ConjugationType {
    return this.#conjugateConjugatorBasedOnOptions(
      Verb.conditional,
    )
  }
  public conjugateImperative(): ConjugationType {
    return this.#conjugateConjugatorBasedOnOptions(
      Verb.imperative,
    )
  }
  public conjugateInfinitive(): InfinitiveType {
    return this.#conjugateConjugatorBasedOnOptions(
      Verb.infinitive,
    )
  }

  #conjugateConjugatorBasedOnOptions<T extends Record<string, string>>(
    conjugator: Conjugator<T>,
  ): T {
    if (!this.isReflexive && !this.prefix) {
      return conjugator.conjugateDefault(this.principalParts)
    }
    if (this.isReflexive && !this.prefix) {
      return conjugator.conjugateUnprefixedReflexive(this.principalParts)
    }
    if (!this.isReflexive && !!this.prefix) {
      return conjugator.conjugatePrefixed(this.principalParts, this.prefix)
    }
    return conjugator.conjugatePrefixedReflexive(
      this.principalParts,
      this.prefix!,
    )
  }
}
