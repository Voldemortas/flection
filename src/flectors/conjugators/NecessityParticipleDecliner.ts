import type { DeclinedType, PrincipalPartsType } from '~src/types.ts'
import {
  countAccentedSyllable,
  getInfinitiveRoot,
  hasAcuteAccent,
  hasAnyAccent,
  hasCircumflexOrShortAccent,
  isRootMonosyllabic,
  stripAllAccents,
} from '~src/utils.ts'
import ParticipleDecliner, {
  type ComplementingParticipleType,
  type ParticipleType,
} from './ParticipleDecliner.ts'
import {
  AAdjectiveDecliner,
  APronominalDecliner,
  AsAdjectiveDecliner,
  AsPronominalDecliner,
} from '~decliners/commons.ts'
import { NOMINAL_EMPTY, PREFIX_SEPARATOR } from '~src/commons.ts'

const NECESSITY_SUFFIX = 'tin'
const PREFIX_REGEX = new RegExp(
  `^(([^${PREFIX_SEPARATOR}]+)${PREFIX_SEPARATOR}.+|.+)$`,
)
const ROOT_REGEX = new RegExp(`^(.+${PREFIX_SEPARATOR})`)

export default class NecessityParticipleDecliner extends ParticipleDecliner {
  protected getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
    getBasicInflected: (principalParts: PrincipalPartsType) => ParticipleType,
  ): ParticipleType {
    const { root } = getInfinitiveRoot(principalParts)
    const isStemImmobile = !hasAnyAccent(root) || !isRootMonosyllabic(root) ||
      hasAcuteAccent(root)
    if (isStemImmobile) {
      return this.getBasicImmobilePrefixed(
        prefix,
        principalParts,
        getBasicInflected,
      )
    }

    return getBasicInflected(
      principalParts.map((part) =>
        `${prefix}${PREFIX_SEPARATOR}${part}`
      ) as PrincipalPartsType,
    )
  }

  getDefault(principalParts: PrincipalPartsType): ParticipleType {
    let masculine: DeclinedType
    let feminine: DeclinedType
    const { isStemImmobile, prefixedRoot, isAcute, syllable } =
      getRootAndPrefix(principalParts)

    if (isStemImmobile) {
      masculine = AsAdjectiveDecliner.inflectStatic(
        prefixedRoot,
      )
      feminine = AAdjectiveDecliner.inflectStatic(prefixedRoot)
    } else {
      masculine = AsAdjectiveDecliner.inflectDynamic(prefixedRoot)
      feminine = AAdjectiveDecliner.inflectDynamic(
        stripAllAccents(prefixedRoot),
        {
          syllable: syllable!,
          isAcute,
        },
        hasCircumflexOrShortAccent(prefixedRoot),
      )
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
    const { isStemImmobile, prefixedRoot, isAcute, syllable } =
      getRootAndPrefix(principalParts)

    if (isStemImmobile) {
      masculine = AsPronominalDecliner.inflectStatic(
        prefixedRoot,
      )
      feminine = APronominalDecliner.inflectStatic(prefixedRoot)
    } else {
      masculine = AsPronominalDecliner.inflectDynamic(prefixedRoot)
      feminine = APronominalDecliner.inflectDynamic(
        stripAllAccents(prefixedRoot),
        {
          syllable: syllable!,
          isAcute,
        },
        hasCircumflexOrShortAccent(prefixedRoot),
      )
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
  const parsedRoot = getInfinitiveRoot(principalParts).root
  const prefix = parsedRoot.replace(PREFIX_REGEX, '$2')
  const root = parsedRoot.replace(ROOT_REGEX, '')
  const prefixedRoot = prefix + root + NECESSITY_SUFFIX
  const { hasAccentedSyllable, syllable, type } = countAccentedSyllable(
    prefixedRoot + 'as',
  )
  const isStemImmobile = !isRootMonosyllabic(root) || !hasAccentedSyllable
  return {
    isStemImmobile,
    prefixedRoot,
    type,
    isAcute: type === 'acute',
    syllable,
  }
}
