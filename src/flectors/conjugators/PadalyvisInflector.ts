import type { InflectorInterface } from '~conjugators/Inflector.ts'
import type { PrincipalPartsType } from '~src/types.ts'

export type PadalyvisType = {
  padalyvis: string
}

export default class PadalyvisInflector<
  T extends {
    feminine: { sgNom: string }
  },
> implements InflectorInterface<PadalyvisType> {
  #activeParticiple: InflectorInterface<T>

  constructor(activeParticiple: InflectorInterface<T>) {
    this.#activeParticiple = activeParticiple
  }

  getDefault(principalParts: PrincipalPartsType): PadalyvisType {
    const padalyvis = this.#activeParticiple.getDefault(principalParts).feminine
      .sgNom.replace(/i$/, '')
    return { padalyvis }
  }

  getPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): PadalyvisType {
    const padalyvis = this.#activeParticiple.getPrefixed(principalParts, prefix)
      .feminine
      .sgNom.replace(/i$/, '')
    return { padalyvis }
  }

  getReflexive(principalParts: PrincipalPartsType): PadalyvisType {
    const padalyvis =
      this.#activeParticiple.getDefault(principalParts).feminine.sgNom + 's'
    return { padalyvis }
  }

  getPrefixedReflexive(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): PadalyvisType {
    const padalyvis = this.#activeParticiple.getPrefixedReflexive(
      principalParts,
      prefix,
    ).feminine
      .sgNom.replace(/i$/, '')
    return { padalyvis }
  }
}
