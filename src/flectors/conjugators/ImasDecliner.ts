import Inflector from './Inflector.ts'
import type { DeclinedType, PrincipalPartsType } from '~src/types.ts'
import {
  getInfinitiveRoot,
  getPastRoot,
  hasAnyAccent,
  isRootMonosyllabic,
  stripAllAccents,
} from '~src/utils.ts'
import AsDeclinator from '~decliners/AsDeclinator.ts'

export default class ImasDecliner extends Inflector<DeclinedType> {
  override getDefault(
    principalParts: PrincipalPartsType,
  ): DeclinedType {
    const stem = makeStem(principalParts)
    return (/ym$/.test(stem) || !hasAnyAccent(stem))
      ? AsDeclinator.declineAsNounI(stem)
      : AsDeclinator.declineAsNounII(stem)
  }
  override getReflexive(
    principalParts: PrincipalPartsType,
  ): DeclinedType {
    const stem = makeStem(principalParts)
    return AsDeclinator.declineAsReflexiveNoun(stem)
  }

  protected getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): DeclinedType {
    return this.getBasicImmobilePrefixed(prefix, principalParts)
  }
}

function makeStem(principalParts: PrincipalPartsType): string {
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