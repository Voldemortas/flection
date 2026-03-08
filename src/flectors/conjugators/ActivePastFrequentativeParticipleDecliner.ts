import ActiveParticipleDecliner from './ActiveParticipleDecliner.ts'
import type { PrincipalPartsType } from '~src/types.ts'
import type {
  ComplementingParticipleType,
  ParticipleType,
} from './ParticipleDecliner.ts'
import ActivePastSimpleParticipleDecliner from './ActivePastSimpleParticipleDecliner.ts'
import { getInfinitiveRoot } from '~src/utils.ts'

const FLECTION = 'davo'

const activePastSimpleParticipleDecliner =
  new ActivePastSimpleParticipleDecliner()

export default class ActivePastFrequentativeParticipleDecliner
  extends ActiveParticipleDecliner {
  getDefault(principalParts: PrincipalPartsType): ParticipleType {
    return activePastSimpleParticipleDecliner.getDefault(
      makePrincipalParts(principalParts),
    )
  }

  getPronominal(
    principalParts: PrincipalPartsType,
  ): ComplementingParticipleType {
    return activePastSimpleParticipleDecliner.getPronominal(
      makePrincipalParts(principalParts),
    )
  }
}

function makePrincipalParts(
  principalParts: PrincipalPartsType,
): PrincipalPartsType {
  return [
    principalParts[0],
    principalParts[1],
    getInfinitiveRoot(principalParts).root! + FLECTION,
  ] as PrincipalPartsType
}
