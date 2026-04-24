import type { PrincipalPartsType } from '~src/types.ts'
import {
  getInfinitiveRoot,
  hasAnyAccent,
  isStemWithoutSuffix,
  stripAllAccents,
} from '~src/utils.ts'
import Inflector from './Inflector.ts'

/**
 * type for Pusdalyvis (-dam-), it has 4 members only: 2 gender for 2 numbers
 * ```ts
 * const eitiPusdalyvis: PusdalyvisType = {
 *    sgMasc: 'eidamas',
 *    sgFem: 'eidama',
 *    plMasc: 'eidami',
 *    plFem: 'eidamos',
 *  }
 *  ```
 */
export type PusdalyvisType = Record<
  'sgMasc' | 'sgFem' | 'plMasc' | 'plFem',
  string
>

export default class PusdalyvisDecliner extends Inflector<PusdalyvisType> {
  getDefault(principalParts: PrincipalPartsType): PusdalyvisType {
    const { root } = getInfinitiveRoot(principalParts)
    if (
      !isStemWithoutSuffix(root) ||
      !hasAnyAccent(root)
    ) {
      return {
        sgMasc: `${root}damas`,
        sgFem: `${root}dama`,
        plMasc: `${root}dami`,
        plFem: `${root}damos`,
      }
    }
    const accentlessRoot = stripAllAccents(root)
    return {
      sgMasc: `${root}damas`,
      sgFem: `${accentlessRoot}dama\u0300`,
      plMasc: `${accentlessRoot}dami\u0300`,
      plFem: `${root}damos`,
    }
  }

  getReflexive(principalParts: PrincipalPartsType): PusdalyvisType {
    const { root } = getInfinitiveRoot(principalParts)
    return {
      sgMasc: `${root}damasis`,
      sgFem: `${root}damasi`,
      plMasc: `${root}damiesi`,
      plFem: `${root}damosi`,
    }
  }

  protected getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): PusdalyvisType {
    return this.getBasicImmobilePrefixed(prefix, principalParts)
  }
}
