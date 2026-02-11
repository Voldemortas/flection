import ImmobileConjugator from './ImmobileConjugator.ts'
import type { ConjugationType } from '~src/types.ts'
import { getInfinitiveRoot } from '~src/utils.ts'
import { conjugateImmobileO } from './utils.ts'

export default class PastFrequentativeIndicativeConjugator
  extends ImmobileConjugator {
  override conjugateDefault(principalParts: string[]): ConjugationType {
    const { root } = getInfinitiveRoot(principalParts)

    return conjugateImmobileO(root + 'dav')
  }
}
