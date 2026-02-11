import ImmobileConjugator from './ImmobileConjugator.ts'
import type { ConjugationType } from '~src/types.ts'
import { getInfinitiveRoot, getPalatalizedRoot } from '~src/utils.ts'

export default class ConditionalConjugator extends ImmobileConjugator {
  override conjugateDefault(principalParts: string[]): ConjugationType {
    const { root } = getInfinitiveRoot(principalParts)
    const suffixedRoot = root + 't'
    return {
      sg1: `${getPalatalizedRoot(suffixedRoot)}au`,
      sg2: `${suffixedRoot}um ${suffixedRoot}umei`,
      sg3: `${suffixedRoot}ų`,
      pl1: `${suffixedRoot}ume ${suffixedRoot}umėm ${suffixedRoot}umėme`,
      pl2: `${suffixedRoot}umėte ${suffixedRoot}umėt ${suffixedRoot}ute`,
      pl3: `${suffixedRoot}ų`,
    }
  }
  override conjugateUnprefixedReflexive(
    principalParts: string[],
  ): ConjugationType {
    const { root } = getInfinitiveRoot(principalParts)
    const suffixedRoot = root + 't'
    return {
      sg1: `${getPalatalizedRoot(suffixedRoot)}ausi ${
        getPalatalizedRoot(suffixedRoot)
      }aus`,
      sg2: `${suffixedRoot}umeisi ${suffixedRoot}umeis`,
      sg3: `${suffixedRoot}ųsi ${suffixedRoot}ųs`,
      pl1: `${suffixedRoot}umės ${suffixedRoot}umėmės`,
      pl2: `${suffixedRoot}umėtės ${suffixedRoot}utės`,
      pl3: `${suffixedRoot}ųsi ${suffixedRoot}ųs`,
    }
  }
}
