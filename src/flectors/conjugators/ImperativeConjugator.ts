import ImmobileConjugator from './ImmobileConjugator.ts'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'
import { appendSuffixWithAssimilation, getInfinitiveRoot } from '~src/utils.ts'
import { SECONDARY_FORM_SEPARATOR } from '~src/commons.ts'

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
      sg2: `${suffixedRoot}${SECONDARY_FORM_SEPARATOR}${suffixedRoot}i`,
      pl1: `${suffixedRoot}im${SECONDARY_FORM_SEPARATOR}${suffixedRoot}ime`,
      pl2: `${suffixedRoot}it${SECONDARY_FORM_SEPARATOR}${suffixedRoot}ite`,
      ...emptyPersons,
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
      ...emptyPersons,
    }
  }
  protected override getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): ConjugationType {
    return {
      ...super.getBasicPrefixed(principalParts, prefix),
      ...emptyPersons,
    }
  }
}

const emptyPersons = {
  sg1: '-',
  sg3: '-',
  pl3: '-',
}
