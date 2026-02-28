import FiniteConjugator from './FiniteConjugator.ts'
import type { ConjugationType } from '~src/types.ts'

export default abstract class ImmobileConjugator extends FiniteConjugator {
  protected override conjugateBasicPrefixed(
    prefix: string,
    principalParts: string[],
  ): ConjugationType {
    return this.conjugateBasicImmobilePrefixed(prefix, principalParts)
  }
}
