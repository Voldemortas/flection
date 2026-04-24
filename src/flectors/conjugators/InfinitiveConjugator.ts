import Inflector from './Inflector.ts'
import { getInfinitiveRoot } from '~src/utils.ts'
import type { PrincipalPartsType } from '~src/types.ts'
import { SECONDARY_FORM_SEPARATOR } from '~src/commons.ts'

/**
 * type for Infinitive, it only has 1 type named `infinitive`
 * ```ts
 * const eitiInfinitive: InfinitiveType = {infinitive: `eite`}
 *  ```
 */
export type InfinitiveType = { infinitive: string }

export default class InfinitiveConjugator extends Inflector<InfinitiveType> {
  override getDefault(
    principalParts: PrincipalPartsType,
  ): InfinitiveType {
    const { root } = getInfinitiveRoot(principalParts)
    return { infinitive: `${root}ti${SECONDARY_FORM_SEPARATOR}${root}t` }
  }
  override getReflexive(
    principalParts: PrincipalPartsType,
  ): InfinitiveType {
    const { root } = getInfinitiveRoot(principalParts)
    return { infinitive: `${root}tis` }
  }

  protected getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): InfinitiveType {
    return this.getBasicImmobilePrefixed(prefix, principalParts)
  }
}
