import type { DeclinedType, PrincipalPartsType } from '~src/types.ts'
import {
  joinInflections,
  putAccentOnPrefix,
  stripAllAccents,
} from '~src/utils.ts'
import ParticipleDecliner, {
  type ComplementingParticipleType,
  type ParticipleType,
} from './ParticipleDecliner.ts'
import { NOMINAL_EMPTY, PREFIX_SEPARATOR } from '~src/commons.ts'
import {
  AAdjectiveDecliner,
  APronominalDecliner,
  AsAdjectiveDecliner,
  AsPronominalDecliner,
} from '~decliners/commons.ts'
import { hasMobilePrefix } from './PresentIndicativeConjugator.ts'

const PASSIVE_PRESENT_SUFFIX = 'm'
const PREFIX_REGEX = new RegExp(
  `^(([^${PREFIX_SEPARATOR}]+)${PREFIX_SEPARATOR}.+|.+)$`,
)
const ROOT_REGEX = new RegExp(`^(.+${PREFIX_SEPARATOR})`)

export default class PassivePresentParticipleDecliner
  extends ParticipleDecliner {
  protected getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
    getBasicInflected: (principalParts: PrincipalPartsType) => ParticipleType,
  ): ParticipleType {
    return getBasicInflected(
      principalParts.map((part) =>
        `${prefix}${PREFIX_SEPARATOR}${part}`
      ) as PrincipalPartsType,
    )
  }

  getDefault(principalParts: PrincipalPartsType): ParticipleType {
    let masculine: DeclinedType
    let feminine: DeclinedType
    const { prefixedRoot, isStemImmobile } = getRootAndPrefix(principalParts)

    if (isStemImmobile) {
      masculine = AsAdjectiveDecliner.inflectStatic(prefixedRoot)
      feminine = AAdjectiveDecliner.inflectStatic(prefixedRoot)
    } else {
      masculine = AsAdjectiveDecliner.inflectDynamic(prefixedRoot)
      feminine = AAdjectiveDecliner.inflectDynamic(prefixedRoot)
    }

    return {
      masculine,
      feminine,
      neuter: masculine.sgNom.replace(/s$/, ''),
    } as unknown as ParticipleType
  }

  getPronominal(
    principalParts: PrincipalPartsType,
  ): ComplementingParticipleType {
    let masculine: DeclinedType
    let feminine: DeclinedType
    const { prefixedRoot, isStemImmobile } = getRootAndPrefix(principalParts)

    const masculineMobile = AsPronominalDecliner.inflectDynamic(prefixedRoot)
    const feminineMobile = APronominalDecliner.inflectDynamic(prefixedRoot)
    if (isStemImmobile) {
      const masculineImmobile = AsPronominalDecliner.inflectStatic(prefixedRoot)
      const feminineImmobile = APronominalDecliner.inflectStatic(prefixedRoot)
      masculine = joinInflections(masculineImmobile, masculineMobile)
      feminine = joinInflections(feminineImmobile, feminineMobile)
    } else {
      masculine = masculineMobile
      feminine = feminineMobile
    }

    return {
      masculine,
      feminine,
    } as ParticipleType
  }

  public override getReflexive(
    principalParts: PrincipalPartsType,
  ): ParticipleType {
    return {
      masculine: NOMINAL_EMPTY,
      feminine: NOMINAL_EMPTY,
      neuter: this.getDefault(principalParts).masculine.sgNom + 'i',
    } as unknown as ParticipleType
  }

  override getReflexivePronominal(
    principalParts: PrincipalPartsType,
  ): ComplementingParticipleType {
    const { masculine, feminine } = this.getReflexive(principalParts)
    return { masculine, feminine }
  }
}

function getRootAndPrefix(principalParts: PrincipalPartsType) {
  const parsedRoot = principalParts[1]
  const prefix = parsedRoot.replace(PREFIX_REGEX, '$2')
  const root = parsedRoot.replace(ROOT_REGEX, '')
  const isStemImmobile = !hasMobilePrefix(
    principalParts.map((part) =>
      part.replace(ROOT_REGEX, '')
    ) as PrincipalPartsType,
  )
  const prefixedRoot = prefix !== '' && !isStemImmobile
    ? putAccentOnPrefix(prefix) + stripAllAccents(root)
    : parsedRoot.replace(PREFIX_SEPARATOR, '')
  return {
    isStemImmobile,
    prefixedRoot: prefixedRoot + PASSIVE_PRESENT_SUFFIX,
  }
}
