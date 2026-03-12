import ImmobileConjugator from './ImmobileConjugator.ts'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'
import { getInfinitiveRoot, getPalatalizedRoot } from '~src/utils.ts'
import { SECONDARY_FORM_SEPARATOR } from '~src/commons.ts'

export default class ConditionalConjugator extends ImmobileConjugator {
  override getDefault(
    principalParts: PrincipalPartsType,
  ): ConjugationType {
    const { root } = getInfinitiveRoot(principalParts)
    const suffixedRoot = root + 't'
    return {
      sg1: `${getPalatalizedRoot(suffixedRoot)}iau`,
      sg2: `${suffixedRoot}um${SECONDARY_FORM_SEPARATOR}${suffixedRoot}umei`,
      sg3: `${suffixedRoot}ų`,
      pl1:
        `${suffixedRoot}ume${SECONDARY_FORM_SEPARATOR}${suffixedRoot}umėm${SECONDARY_FORM_SEPARATOR}${suffixedRoot}umėme`,
      pl2:
        `${suffixedRoot}umėte${SECONDARY_FORM_SEPARATOR}${suffixedRoot}umėt${SECONDARY_FORM_SEPARATOR}${suffixedRoot}ute`,
      pl3: `${suffixedRoot}ų`,
    }
  }
  override getReflexive(
    principalParts: PrincipalPartsType,
  ): ConjugationType {
    const { root } = getInfinitiveRoot(principalParts)
    const suffixedRoot = root + 't'
    return {
      sg1: `${getPalatalizedRoot(suffixedRoot)}iausi ${
        getPalatalizedRoot(suffixedRoot)
      }iaus`,
      sg2:
        `${suffixedRoot}umeisi${SECONDARY_FORM_SEPARATOR}${suffixedRoot}umeis`,
      sg3: `${suffixedRoot}ųsi${SECONDARY_FORM_SEPARATOR}${suffixedRoot}ųs`,
      pl1:
        `${suffixedRoot}umės${SECONDARY_FORM_SEPARATOR}${suffixedRoot}umėmės`,
      pl2:
        `${suffixedRoot}umėtės${SECONDARY_FORM_SEPARATOR}${suffixedRoot}utės`,
      pl3: `${suffixedRoot}ųsi${SECONDARY_FORM_SEPARATOR}${suffixedRoot}ųs`,
    }
  }
}
