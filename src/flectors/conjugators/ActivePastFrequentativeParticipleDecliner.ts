import type { PrincipalPartsType } from '~src/types.ts'
import { getInfinitiveRoot } from '~src/utils.ts'
import ParticipleDecliner, {
  type ComplementingParticipleType,
  type ParticipleType,
} from './ParticipleDecliner.ts'
import IsDeclinator from '~decliners/IsDeclinator.ts'

export default class ActivePastFrequentativeParticipleDecliner
  extends ParticipleDecliner {
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
    const { root } = getInfinitiveRoot(principalParts)
    const stem = `${root}davus`
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
    const { root } = getInfinitiveRoot(principalParts)
    const stem = `${root}davus`
    const masculine = IsDeclinator.declineMasculinePronominalImmobile(stem)
    const feminine = IsDeclinator.declineFemininePronominalImmobile(stem)
    return {
      masculine,
      feminine,
    }
  }

  override getReflexive(principalParts: PrincipalPartsType): ParticipleType {
    const beReflexive = super.getReflexive(principalParts)
    const { masculine, feminine } = this.getDefault(principalParts)
    const femininePlNom = feminine.plNom.split(' ')[0]
    return {
      masculine: {
        ...beReflexive.masculine,
        sgNom: beReflexive.masculine.sgNom.replace('-', `${masculine.sgNom}is`),
        sgVoc: beReflexive.masculine.sgVoc.replace('-', `${masculine.sgVoc}is`),
        plNom: beReflexive.masculine.plNom.replace('-', `${masculine.plNom}si`),
        plVoc: beReflexive.masculine.plVoc.replace('-', `${masculine.plVoc}si`),
      },
      feminine: {
        ...beReflexive.feminine,
        sgNom: beReflexive.feminine.sgNom.replace('-', `${feminine.sgNom}s`),
        sgVoc: beReflexive.feminine.sgVoc.replace('-', `${feminine.sgVoc}s`),
        plNom: beReflexive.feminine.plNom.replace('-', `${femininePlNom}i`),
        plVoc: beReflexive.feminine.plVoc.replace('-', `${femininePlNom}i`),
      },
      neuter: '-',
    }
  }
}
