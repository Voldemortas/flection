import ActiveParticipleDecliner from './ActiveParticipleDecliner.ts'
import type { PrincipalPartsType } from '~src/types.ts'
import {
  getInfinitiveRoot,
  getPalatalizedRoot,
  getPastRoot,
  isRootMonosyllabic,
} from '~src/utils.ts'
import type {
  ComplementingParticipleType,
  ParticipleType,
} from './ParticipleDecliner.ts'
import {
  IsFeminineAdjectiveDecliner,
  IsFemininePronominalDecliner,
  IsMasculineAdjectiveDecliner,
  IsMasculinePronominalDecliner,
} from '~decliners/commons.ts'

const FLECTION = 'ę'

export default class ActivePastSimpleParticipleDecliner
  extends ActiveParticipleDecliner {
  getDefault(principalParts: PrincipalPartsType): ParticipleType {
    const { root, stem } = getStem(principalParts)
    const masculine = IsMasculineAdjectiveDecliner.inflectStatic(stem)
    const feminine = IsFeminineAdjectiveDecliner.inflectStatic(stem)
    return {
      masculine: {
        ...masculine,
        sgNom: `${root}${FLECTION}s`,
        sgVoc: `${root}${FLECTION}s`,
        plNom: `${root}${FLECTION}`,
        plVoc: `${root}${FLECTION}`,
      },
      feminine: {
        ...feminine,
        plNom: `${feminine.plNom} ${root}${FLECTION}`,
        plVoc: `${feminine.plVoc} ${root}${FLECTION}`,
      },
      neuter: `${root}${FLECTION}`,
    }
  }

  getPronominal(
    principalParts: PrincipalPartsType,
  ): ComplementingParticipleType {
    const { stem } = getStem(principalParts)
    const masculine = IsMasculinePronominalDecliner.inflectStatic(stem)
    const feminine = IsFemininePronominalDecliner.inflectStatic(stem)
    return {
      masculine,
      feminine,
    }
  }
}

function getStem(principalParts: PrincipalPartsType) {
  const { root, pattern } = getPastRoot(principalParts)
  const infinitiveRoot = getInfinitiveRoot(principalParts).root
  const stem = pattern === 'ė' && !isRootMonosyllabic(infinitiveRoot) &&
      /y\u0301?$/.test(infinitiveRoot)
    ? `${getPalatalizedRoot(root)}i`
    : root
  return { root, stem: `${stem}us` }
}
