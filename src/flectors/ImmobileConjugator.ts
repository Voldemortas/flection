import Conjugator from './Conjugator.ts'
import type { ConjugationType } from '~src/types.ts'

export default abstract class ImmobileConjugator extends Conjugator {
  protected override conjugateBasicPrefixed(
    prefix: string,
    principalParts: string[],
  ): ConjugationType {
    return this.conjugateBasicImmobilePrefixed(prefix, principalParts)
  }
}
