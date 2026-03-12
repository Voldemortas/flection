import type { DeclinedType, PrincipalPartsType } from '~src/types.ts'
import {
  countAccentedSyllable,
  getInfinitiveRoot,
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
import { declinedEmpty } from '~src/commons.ts'

export default class PassivePastParticipleDecliner extends ParticipleDecliner {
  protected getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
    getBasicInflected: (principalParts: PrincipalPartsType) => ParticipleType,
  ): ParticipleType {
    const { root } = getInfinitiveRoot(principalParts)
    const isStemImmobile = !hasAnyAccent(root) || !isRootMonosyllabic(root)
    if (isStemImmobile) {
      return this.getBasicImmobilePrefixed(
        prefix,
        principalParts,
        getBasicInflected,
      )
    }

    return getBasicInflected(
      principalParts.map((part) => `${prefix}=${part}`) as PrincipalPartsType,
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
      if (
        isRootMonosyllabic(prefixedRoot) &&
        hasCircumflexOrShortAccent(prefixedRoot)
      ) {
        masculine = AsAdjectiveDecliner.inflectDynamic(prefixedRoot)
        feminine = AAdjectiveDecliner.inflectDynamic(
          stripAllAccents(prefixedRoot),
          '4',
        )
      } else {
        masculine = AsAdjectiveDecliner.inflectDynamic(prefixedRoot)
        feminine = AAdjectiveDecliner.inflectDynamic(
          stripAllAccents(prefixedRoot),
          {
            syllable: syllable!,
            isAcute,
          },
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
      masculine: declinedEmpty,
      feminine: declinedEmpty,
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
  const parsedRoot = getInfinitiveRoot(principalParts).root + 't'
  const prefix = parsedRoot.replace(/^(([^=]+)=.+|.+)$/, '$2')
  const root = parsedRoot.replace(/^(.+=)/, '')
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
  }
}
