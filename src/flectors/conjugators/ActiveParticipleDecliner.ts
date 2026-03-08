import type { PrincipalPartsType } from '~src/types.ts'
import ParticipleDecliner, {
  type ParticipleType,
} from './ParticipleDecliner.ts'
import { getNthLast } from '~src/utils.ts'

export default abstract class ActiveParticipleDecliner
  extends ParticipleDecliner {
  protected override getBasicPrefixed(
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
  override getReflexive(principalParts: PrincipalPartsType): ParticipleType {
    const beReflexive = super.getReflexive(principalParts)
    const { masculine, feminine } = this.getDefault(principalParts)
    const masculineSg = getNthLast(masculine.sgNom.split(' '), 2)
    const masculinePl = getNthLast(masculine.plNom.split(' '), 2)
    const feminineSg = feminine.sgNom.split(' ')[0]
    const femininePl = feminine.plNom.split(' ')[0]
    return {
      masculine: {
        ...beReflexive.masculine,
        sgNom: beReflexive.masculine.sgNom.replace('-', `${masculineSg}is`),
        sgVoc: beReflexive.masculine.sgVoc.replace('-', `${masculineSg}is`),
        plNom: beReflexive.masculine.plNom.replace('-', `${masculinePl}si`),
        plVoc: beReflexive.masculine.plVoc.replace('-', `${masculinePl}si`),
      },
      feminine: {
        ...beReflexive.feminine,
        sgNom: beReflexive.feminine.sgNom.replace('-', `${feminineSg}s`),
        sgVoc: beReflexive.feminine.sgVoc.replace('-', `${feminineSg}s`),
        plNom: beReflexive.feminine.plNom.replace('-', `${femininePl}i`),
        plVoc: beReflexive.feminine.plVoc.replace('-', `${femininePl}i`),
      },
      neuter: beReflexive.neuter,
    }
  }
}
