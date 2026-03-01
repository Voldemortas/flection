import Conjugator from './Conjugator.ts'
import { getInfinitiveRoot } from '~src/utils.ts'
import type { PrincipalPartsType } from '~src/types.ts'

export type InfinitiveType = { infinitive: string }

export default class InfinitiveConjugator extends Conjugator<InfinitiveType> {
  override conjugateDefault(
    principalParts: PrincipalPartsType,
  ): InfinitiveType {
    const { root } = getInfinitiveRoot(principalParts)
    return { infinitive: `${root}ti ${root}t` }
  }
  override conjugateUnprefixedReflexive(
    principalParts: PrincipalPartsType,
  ): InfinitiveType {
    const { root } = getInfinitiveRoot(principalParts)
    return { infinitive: `${root}tis` }
  }

  protected conjugateBasicPrefixed(
    prefix: string,
    principalParts: PrincipalPartsType,
  ): InfinitiveType {
    return this.conjugateBasicImmobilePrefixed(prefix, principalParts)
  }
}
