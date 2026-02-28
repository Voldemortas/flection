import ImmobileConjugator from './ImmobileConjugator.ts'
import type { ConjugationType } from '~src/types.ts'
import { appendSuffixWithAssimilation, getInfinitiveRoot } from '~src/utils.ts'

export default class ImperativeConjugator extends ImmobileConjugator {
  override conjugateDefault(principalParts: string[]): ConjugationType {
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
  override conjugateUnprefixedReflexive(
    principalParts: string[],
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
  protected override conjugateBasicPrefixed(
    prefix: string,
    principalParts: string[],
  ): ConjugationType {
    return {
      ...super.conjugateBasicPrefixed(prefix, principalParts),
      ...ImperativeConjugator.#emptyPersons,
    }
  }

  static #emptyPersons = {
    sg1: '-',
    sg3: '-',
    pl3: '-',
  }
}
