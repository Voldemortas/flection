import ImmobileConjugator from './ImmobileConjugator.ts'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'
import { appendSuffixWithAssimilation, getInfinitiveRoot } from '~src/utils.ts'

export default class ImperativeConjugator extends ImmobileConjugator {
  override getDefault(
    principalParts: PrincipalPartsType,
  ): ConjugationType {
    const { root } = getInfinitiveRoot(principalParts)
    const suffixedRoot = appendSuffixWithAssimilation(root, 'k', [[
      /[kg]k$/,
      'k',
    ]])
    return {
      sg2: `${suffixedRoot} ${suffixedRoot}i`,
      pl1: `${suffixedRoot}im ${suffixedRoot}ime`,
      pl2: `${suffixedRoot}it ${suffixedRoot}ite`,
      ...ImperativeConjugator.#emptyPersons,
    }
  }
  override getReflexive(
    principalParts: PrincipalPartsType,
  ): ConjugationType {
    const { root } = getInfinitiveRoot(principalParts)
    const suffixedRoot = appendSuffixWithAssimilation(root, 'k', [[
      /[kg]k$/,
      'k',
    ]])
    return {
      sg2: `${suffixedRoot}is`,
      pl1: `${suffixedRoot}imės`,
      pl2: `${suffixedRoot}itės`,
      ...ImperativeConjugator.#emptyPersons,
    }
  }
  protected override getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): ConjugationType {
    return {
      ...super.getBasicPrefixed(principalParts, prefix),
      ...ImperativeConjugator.#emptyPersons,
    }
  }

  static #emptyPersons = {
    sg1: '-',
    sg3: '-',
    pl3: '-',
  }
}
