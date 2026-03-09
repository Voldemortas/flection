import type { DeclinedType, PrincipalPartsType } from '~src/types.ts'
import {
  declinedEmpty,
  getInfinitiveRoot,
  hasAcuteAccent,
  hasAnyAccent,
  isRootMonosyllabic,
  stripAllAccents,
} from '~src/utils.ts'
import ParticipleDecliner, {
  type ComplementingParticipleType,
  type ParticipleType,
} from './ParticipleDecliner.ts'
import AsDeclinator from '~decliners/AsDeclinator.ts'
import ADeclinator from '~decliners/ADeclinator.ts'

const PASSIVE_FUTURE_SUFFIX = 'sim'

export default class PassiveFutureParticipleDecliner
  extends ParticipleDecliner {
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
      principalParts.map((principalPart) =>
        `${prefix}${principalPart}`
      ) as PrincipalPartsType,
    )
  }

  getDefault(principalParts: PrincipalPartsType): ParticipleType {
    let masculine: DeclinedType
    let feminine: DeclinedType
    const { root } = getInfinitiveRoot(principalParts)
    const stem = root + PASSIVE_FUTURE_SUFFIX
    if (isRootStatic(root)) {
      masculine = AsDeclinator.declineAsAdjectivalI(stem)
      feminine = ADeclinator.declineI(stem)
    } else {
      masculine = AsDeclinator.declineAsAdjectivalIII(stem)
      feminine = ADeclinator.declineAdjectivalIII(stem, {
        syllable: 3,
        isAcute: hasAcuteAccent(root),
      })
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
    const { root } = getInfinitiveRoot(principalParts)
    const stem = root + PASSIVE_FUTURE_SUFFIX
    if (isRootStatic(root)) {
      masculine = AsDeclinator.declineAsPronominalImmobile(stem)
      feminine = ADeclinator.declinePronominalImmobile(stem)
    } else {
      masculine = AsDeclinator.declineAsPronominalMobile(stem)
      feminine = ADeclinator.declinePronominalMobile(stripAllAccents(stem), {
        syllable: 3,
        isAcute: hasAcuteAccent(stem),
      })
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

function isRootStatic(root: string) {
  return !isRootMonosyllabic(root) || !hasAnyAccent(root)
}
