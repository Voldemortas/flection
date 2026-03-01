import ImmobileConjugator from './ImmobileConjugator.ts'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'
import { getInfinitiveRoot } from '~src/utils.ts'
import { conjugateImmobileO } from './utils.ts'

export default class PastFrequentativeIndicativeConjugator
  extends ImmobileConjugator {
  override conjugateDefault(
    principalParts: PrincipalPartsType,
  ): ConjugationType {
    const { root } = getInfinitiveRoot(principalParts)

    return conjugateImmobileO(root + 'dav')
  }
}
