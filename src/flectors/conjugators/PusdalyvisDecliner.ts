import type { PrincipalPartsType } from '~src/types.ts'
import {
  getInfinitiveRoot,
  hasAnyAccent,
  isRootMonosyllabic,
  stripAllAccents,
} from '~src/utils.ts'
import Inflector from './Inflector.ts'

export type PusdalyvisType = Record<
  'sgMasc' | 'sgFem' | 'plMasc' | 'plFem',
  string
>

export default class PusdalyvisDecliner extends Inflector<PusdalyvisType> {
  getDefault(principalParts: PrincipalPartsType): PusdalyvisType {
    const { root } = getInfinitiveRoot(principalParts)
    if (!isRootMonosyllabic(root) || !hasAnyAccent(root)) {
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
