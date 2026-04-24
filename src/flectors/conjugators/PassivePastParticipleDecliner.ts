import type { DeclinedType, PrincipalPartsType } from '~src/types.ts'
import {
  countAccentedSyllable,
  getInfinitiveRoot,
  hasAcuteAccent,
  hasAnyAccent,
  hasCircumflexOrShortAccent,
  isRootMonosyllabic,
  putAccentOnPrefix,
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

const PASSIVE_PAST_SUFFIX = 't'
const PREFIX_REGEX = new RegExp(
  `^(([^${PREFIX_SEPARATOR}]+)${PREFIX_SEPARATOR}.+|.+)$`,
)
const ROOT_REGEX = new RegExp(`^(.+${PREFIX_SEPARATOR})`)

export default class PassivePastParticipleDecliner extends ParticipleDecliner {
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
    const {
      isStemImmobile,
      prefixedRoot,
      isAcute,
      syllable,
      isMandatoryShort,
    } = getRootAndPrefix(principalParts)

    if (isStemImmobile) {
      masculine = AsAdjectiveDecliner.inflectStatic(
        prefixedRoot,
      )
      feminine = AAdjectiveDecliner.inflectStatic(prefixedRoot)
    } else {
      const accentlessRoot = stripAllAccents(prefixedRoot)
      if (
        isRootMonosyllabic(prefixedRoot) &&
        hasCircumflexOrShortAccent(prefixedRoot)
      ) {
        const type = '4'
        masculine = AsAdjectiveDecliner.inflectDynamic(
          accentlessRoot,
          type,
        )
        feminine = AAdjectiveDecliner.inflectDynamic(
          accentlessRoot,
          type,
        )
      } else {
        const type = {
          syllable: syllable!,
          isAcute,
        }
        masculine = AsAdjectiveDecliner.inflectDynamic(
          accentlessRoot,
          type,
          isMandatoryShort,
        )
        feminine = AAdjectiveDecliner.inflectDynamic(
          accentlessRoot,
          type,
          isMandatoryShort,
        )
      }
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
    const {
      isStemImmobile,
      prefixedRoot,
      isAcute,
      syllable,
      isMandatoryShort,
    } = getRootAndPrefix(principalParts)

    if (isStemImmobile) {
      masculine = AsPronominalDecliner.inflectStatic(
        prefixedRoot,
      )
      feminine = APronominalDecliner.inflectStatic(prefixedRoot)
    } else {
      const accentlessRoot = stripAllAccents(prefixedRoot)
      const type = {
        syllable: syllable!,
        isAcute,
      }
      masculine = AsPronominalDecliner.inflectDynamic(
        accentlessRoot,
        type,
        isMandatoryShort,
      )
      feminine = APronominalDecliner.inflectDynamic(
        accentlessRoot,
        type,
        isMandatoryShort,
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
  const parsedRoot = getInfinitiveRoot(principalParts).root +
    PASSIVE_PAST_SUFFIX
  const prefix = parsedRoot.replace(PREFIX_REGEX, '$2')
  const root = parsedRoot.replace(ROOT_REGEX, '')
  const prefixedRoot = prefix !== ''
    ? putAccentOnPrefix(prefix) + stripAllAccents(root)
    : root
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
    isMandatoryShort: prefix !== '',
  }
}
