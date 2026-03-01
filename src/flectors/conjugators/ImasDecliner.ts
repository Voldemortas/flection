import Inflector from './Inflector.ts'
import type { NounType, PrincipalPartsType } from '~src/types.ts'
import {
  getInfinitiveRoot,
  getPastRoot,
  hasAnyAccent,
  stripAllAccents,
} from '~src/utils.ts'
import { isRootMonosyllabic } from './utils.ts'
import AsDeclinator from '~decliners/AsDeclinator.ts'

export default class ImasDecliner extends Inflector<NounType> {
  override getDefault(
    principalParts: PrincipalPartsType,
  ): NounType {
    const stem = ImasDecliner.#makeStem(principalParts)
    return (/ym$/.test(stem) || !hasAnyAccent(stem))
      ? AsDeclinator.declineAsNounI(stem)
      : AsDeclinator.declineAsNounII(stem)
  }
  override getReflexive(
    principalParts: PrincipalPartsType,
  ): NounType {
    const stem = ImasDecliner.#makeStem(principalParts)
    return AsDeclinator.declineAsReflexiveNoun(stem)
  }

  protected getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): NounType {
    return this.getBasicImmobilePrefixed(prefix, principalParts)
  }

  static #makeStem(principalParts: PrincipalPartsType): string {
    const infinitiveRoot = getInfinitiveRoot(principalParts).root
    const pastRoot = getPastRoot(principalParts).root
    if (
      isRootMonosyllabic(pastRoot) && !isRootMonosyllabic(infinitiveRoot) &&
      /y\u0301?$/.test(infinitiveRoot)
    ) {
      return `${pastRoot}ym`
    }
    return `${stripAllAccents(pastRoot)}i${
      hasAnyAccent(pastRoot) ? `\u0300` : ``
    }m`
  }
}
