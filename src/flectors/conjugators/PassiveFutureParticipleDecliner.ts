import type { DeclinedType, PrincipalPartsType } from '~src/types.ts'
import {
  appendSuffixWithAssimilation,
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
import {
  AAdjectiveDecliner,
  APronominalDecliner,
  AsAdjectiveDecliner,
  AsPronominalDecliner,
} from '~decliners/commons.ts'
import { NOMINAL_EMPTY } from '~src/commons.ts'

const FUTURE_SUFFIX = 's'
const PASSIVE_FUTURE_SUFFIX = 'im'

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
    const stem = appendSuffixWithAssimilation(root, FUTURE_SUFFIX, [
      [/[sz]s$/, 's'],
      [/[šž]s$/, 'š'],
    ]) + PASSIVE_FUTURE_SUFFIX
    if (isRootStatic(root)) {
      masculine = AsAdjectiveDecliner.inflectStatic(stem)
      feminine = AAdjectiveDecliner.inflectStatic(stem)
    } else {
      masculine = AsAdjectiveDecliner.inflectDynamic(stem)
      feminine = AAdjectiveDecliner.inflectDynamic(stem, {
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
    const stem = appendSuffixWithAssimilation(root, FUTURE_SUFFIX, [
      [/[sz]s$/, 's'],
      [/[šž]s$/, 'š'],
    ]) + PASSIVE_FUTURE_SUFFIX
    if (isRootStatic(root)) {
      masculine = AsPronominalDecliner.inflectStatic(stem)
      feminine = APronominalDecliner.inflectStatic(stem)
    } else {
      masculine = AsPronominalDecliner.inflectDynamic(stem)
      feminine = APronominalDecliner.inflectDynamic(stripAllAccents(stem), {
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

function isRootStatic(root: string) {
  return !isRootMonosyllabic(root) || !hasAnyAccent(root)
}
