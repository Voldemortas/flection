import ActiveParticipleDecliner from './ActiveParticipleDecliner.ts'
import type { PrincipalPartsType } from '~src/types.ts'
import { getInfinitiveRoot } from '~src/utils.ts'
import type {
  ComplementingParticipleType,
  ParticipleType,
} from './ParticipleDecliner.ts'
import IsDeclinator from '~decliners/IsDeclinator.ts'

export default class ActivePastFrequentativeParticipleDecliner
  extends ActiveParticipleDecliner {
  getDefault(principalParts: PrincipalPartsType): ParticipleType {
    const { root, stem } = getStem(principalParts)
    const masculine = IsDeclinator.declineMasculineIsAdjectiveI(stem)
    const feminine = IsDeclinator.declineFeminineIAdjective(stem)
    return {
      masculine: {
        ...masculine,
        sgNom: `${root}davęs`,
        sgVoc: `${root}davęs`,
        plNom: `${root}davę`,
        plVoc: `${root}davę`,
      },
      feminine: {
        ...feminine,
        plNom: `${feminine.plNom} ${root}davę`,
        plVoc: `${feminine.plVoc} ${root}davę`,
      },
      neuter: `${root}davę`,
    }
  }

  getPronominal(
    principalParts: PrincipalPartsType,
  ): ComplementingParticipleType {
    const { stem } = getStem(principalParts)
    const masculine = IsDeclinator.declineMasculinePronominalImmobile(stem)
    const feminine = IsDeclinator.declineFemininePronominalImmobile(stem)
    return {
      masculine,
      feminine,
    }
  }
}

function getStem(principalParts: PrincipalPartsType) {
  const { root } = getInfinitiveRoot(principalParts)
  return { root, stem: `${root}davus` }
}
