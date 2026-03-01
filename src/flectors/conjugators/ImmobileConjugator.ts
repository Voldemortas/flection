import FiniteConjugator from './FiniteConjugator.ts'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'

export default abstract class ImmobileConjugator extends FiniteConjugator {
  protected override conjugateBasicPrefixed(
    prefix: string,
    principalParts: PrincipalPartsType,
  ): ConjugationType {
    return this.conjugateBasicImmobilePrefixed(prefix, principalParts)
  }
}
