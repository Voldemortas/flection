import type { DeclinedType, PrincipalPartsType } from '~src/types.ts'
import {
  countAccentedSyllable,
  declinedEmpty,
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
import AsDeclinator from '~decliners/AsDeclinator.ts'
import ADeclinator from '~decliners/ADeclinator.ts'

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
      PassivePastParticipleDecliner
        .#getRootAndPrefix(principalParts)

    if (isStemImmobile) {
      masculine = AsDeclinator.declineAsAdjectivalI(
        prefixedRoot,
      ) as DeclinedType
      feminine = ADeclinator.declineI(prefixedRoot) as DeclinedType
    } else {
      if (
        isRootMonosyllabic(prefixedRoot) &&
        hasCircumflexOrShortAccent(prefixedRoot)
      ) {
        masculine = AsDeclinator.declineAsAdjectivalIV(prefixedRoot)
        feminine = ADeclinator.declineAdjectivalIV(
          stripAllAccents(prefixedRoot),
        )
      } else {
        masculine = AsDeclinator.declineAsAdjectivalIII(prefixedRoot)
        feminine = ADeclinator.declineAdjectivalIII(prefixedRoot, {
          syllable: syllable!,
          isAcute,
        })
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
      PassivePastParticipleDecliner
        .#getRootAndPrefix(principalParts)

    if (isStemImmobile) {
      masculine = AsDeclinator.declineAsPronominalImmobile(
        prefixedRoot,
      )
      feminine = ADeclinator.declinePronominalImmobile(prefixedRoot)
    } else {
      masculine = AsDeclinator.declineAsPronominalMobile(prefixedRoot)
      feminine = ADeclinator.declinePronominalMobile(
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

  static #getRootAndPrefix(principalParts: PrincipalPartsType) {
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
}
