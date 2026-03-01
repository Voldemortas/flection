import Conjugator from './Conjugator.ts'
import type { NounType, PrincipalPartsType } from '~src/types.ts'
import {
  getInfinitiveRoot,
  getPastRoot,
  hasAnyAccent,
  stripAllAccents,
} from '~src/utils.ts'
import { isRootMonosyllabic } from './utils.ts'
import AsDeclinator from '~decliners/AsDeclinator.ts'

export default class ImasDecliner extends Conjugator<NounType> {
  override conjugateDefault(
    principalParts: PrincipalPartsType,
  ): NounType {
    const stem = ImasDecliner.#makeStem(principalParts)
    return (/ym$/.test(stem) || !hasAnyAccent(stem))
      ? AsDeclinator.declineAsNounI(stem)
      : AsDeclinator.declineAsNounII(stem)
  }
  override conjugateUnprefixedReflexive(
    principalParts: PrincipalPartsType,
  ): NounType {
    const stem = ImasDecliner.#makeStem(principalParts)
    return AsDeclinator.declineAsReflexiveNoun(stem)
  }

  protected conjugateBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): NounType {
    return this.conjugateBasicImmobilePrefixed(prefix, principalParts)
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
