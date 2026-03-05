import type { PrincipalPartsType } from '~src/types.ts'
import ParticipleDecliner, {
  type ParticipleType,
} from './ParticipleDecliner.ts'

export default abstract class ActiveParticipleDecliner
  extends ParticipleDecliner {
  override getReflexive(principalParts: PrincipalPartsType): ParticipleType {
    const beReflexive = super.getReflexive(principalParts)
    const { masculine, feminine } = this.getDefault(principalParts)
    const masculineSg = masculine.sgNom.split(' ')[0]
    const masculinePl = masculine.plNom.split(' ')[0]
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
      neuter: '-',
    }
  }
}
