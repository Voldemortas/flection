import FiniteConjugator from './FiniteConjugator.ts'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'

export default abstract class ImmobileConjugator extends FiniteConjugator {
  protected override conjugateBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): ConjugationType {
    return this.conjugateBasicImmobilePrefixed(prefix, principalParts)
  }
}
