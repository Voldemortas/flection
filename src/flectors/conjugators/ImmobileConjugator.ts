import FiniteConjugator from './FiniteConjugator.ts'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'

export default abstract class ImmobileConjugator extends FiniteConjugator {
  protected override getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): ConjugationType {
    return this.getBasicImmobilePrefixed(prefix, principalParts)
  }
}
