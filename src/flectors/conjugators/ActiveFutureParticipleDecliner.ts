import ActiveParticipleDecliner from './ActiveParticipleDecliner.ts'
import type {
  ComplementingParticipleType,
  ParticipleType,
} from './ParticipleDecliner.ts'
import type { PrincipalPartsType } from '~src/types.ts'
import { getInfinitiveRoot } from '~src/utils.ts'
import {
  IsFeminineAdjectiveDecliner,
  IsFemininePronominalDecliner,
  IsMasculineParticipleDecliner,
  IsMasculinePronominalDecliner,
} from '~decliners/commons.ts'
import { appendFutureSuffix } from './FutureIndicativeConjugator.ts'
import { SECONDARY_FORM_SEPARATOR } from '~src/commons.ts'

export default class ActiveFutureParticipleDecliner
  extends ActiveParticipleDecliner {
  getDefault(principalParts: PrincipalPartsType): ParticipleType {
    const { root, stem } = getStem(principalParts)
    const masculine = IsMasculineParticipleDecliner.inflectStatic(stem)
    const feminine = IsFeminineAdjectiveDecliner.inflectStatic(stem)
    return {
      masculine: {
        ...masculine,
        sgNom: `${root}iąs ${masculine.sgNom}`,
        sgVoc: `${root}iąs ${masculine.sgVoc}`,
        plNom: `${root}ią ${masculine.plNom}`,
        plVoc: `${root}ią ${masculine.plVoc}`,
      },
      feminine: {
        ...feminine,
        plNom: `${feminine.plNom}${SECONDARY_FORM_SEPARATOR}${root}ią`,
        plVoc: `${feminine.plVoc}${SECONDARY_FORM_SEPARATOR}${root}ią`,
      },
      neuter: `${root}ią`,
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
  const inf = getInfinitiveRoot(principalParts)
  const root = appendFutureSuffix(inf.root)
  return {
    root,
    stem: root + 'iant',
  }
}
