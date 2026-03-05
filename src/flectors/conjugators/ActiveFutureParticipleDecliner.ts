import ActiveParticipleDecliner from './ActiveParticipleDecliner.ts'
import type {
  ComplementingParticipleType,
  ParticipleType,
} from './ParticipleDecliner.ts'
import type { PrincipalPartsType } from '~src/types.ts'
import { getInfinitiveRoot } from '~src/utils.ts'
import IsDeclinator from '~decliners/IsDeclinator.ts'
import { appendFutureSuffix } from './FutureIndicativeConjugator.ts'

export default class ActiveFutureParticipleDecliner
  extends ActiveParticipleDecliner {
  protected getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
    getBasicInflected: (principalParts: PrincipalPartsType) => ParticipleType,
  ): ParticipleType {
    return this.getBasicImmobilePrefixed(
      prefix,
      principalParts,
      getBasicInflected,
    )
  }

  getDefault(principalParts: PrincipalPartsType): ParticipleType {
    const { root, stem } = getStem(principalParts)
    const masculine = IsDeclinator.declineMasculineActiveParticiple(stem)
    const feminine = IsDeclinator.declineFeminineIAdjective(stem)
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
        plNom: `${feminine.plNom} ${root}ią`,
        plVoc: `${feminine.plVoc} ${root}ią`,
      },
      neuter: `${root}ią`,
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
  const inf = getInfinitiveRoot(principalParts)
  const root = appendFutureSuffix(inf.root)
  return {
    root,
    stem: root + 'iant',
  }
}
