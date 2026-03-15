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

  /**
   * inflects verb by applying metatony if applicable
   * @param {PrincipalPartsType} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const inflected = inflector.getDefault(['būti', 'būna', 'buvo'])
   * ```
   */
  getDefault(principalParts: PrincipalPartsType): PadalyvisType {
    const padalyvis = this.#activeParticiple.getDefault(principalParts).feminine
      .sgNom.replace(/i$/, '')
    return { padalyvis }
  }

  /**
   * inflects prefixed verb by adding the reflexive particle and applying metatony if applicable
   * @param {PrincipalPartsType} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @param {string} prefix - prefix to add; ***Note**: `per` will always be acute if roots are accented*
   * @example
   * ```ts
   * const prefixedReflexive = inflector.getPrefixedReflexive('iš', ['būti', 'būna', 'buvo'])
   * ```
   */
  getPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): PadalyvisType {
    const padalyvis = this.#activeParticiple.getPrefixed(principalParts, prefix)
      .feminine
      .sgNom.replace(/i$/, '')
    return { padalyvis }
  }

  /**
   * inflects verb by adding the reflexive particle and applying metatony if applicable
   * @param {PrincipalPartsType} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @example
   * ```ts
   * const reflexive = inflector.getReflexive(['būti', 'būna', 'buvo'])
   * ```
   */
  getReflexive(principalParts: PrincipalPartsType): PadalyvisType {
    const padalyvis =
      this.#activeParticiple.getDefault(principalParts).feminine.sgNom + 's'
    return { padalyvis }
  }

  /**
   * inflects prefixed verb by adding the reflexive particle and applying metatony if applicable
   * @param {PrincipalPartsType} principalParts - 3 principal forms in their full unprefixed&unreflexive form
   * @param {string} prefix - prefix to add; ***Note**: `per` will always be acute if roots are accented*
   * @example
   * ```ts
   * const prefixedReflexive = inflector.getPrefixedReflexive('iš', ['būti', 'būna', 'buvo'])
   * ```
   */
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
