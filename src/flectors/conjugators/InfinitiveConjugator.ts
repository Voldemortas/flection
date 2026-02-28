import Conjugator from './Conjugator.ts'
import { getInfinitiveRoot } from '~src/utils.ts'

export type InfinitiveType = { infinitive: string }

export default class InfinitiveConjugator extends Conjugator<InfinitiveType> {
  override conjugateDefault(principalParts: string[]): InfinitiveType {
    const { root } = getInfinitiveRoot(principalParts)
    return { infinitive: `${root}ti ${root}t` }
  }
  override conjugateUnprefixedReflexive(
    principalParts: string[],
  ): InfinitiveType {
    const { root } = getInfinitiveRoot(principalParts)
    return { infinitive: `${root}tis` }
  }

  protected conjugateBasicPrefixed(
    prefix: string,
    principalParts: string[],
  ): InfinitiveType {
    return this.conjugateBasicImmobilePrefixed(prefix, principalParts)
  }
}
