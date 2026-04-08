import ActiveParticipleDecliner from './ActiveParticipleDecliner.ts'
import type {
  ComplementingParticipleType,
  ParticipleType,
} from './ParticipleDecliner.ts'
import type { DeclinedType, PrincipalPartsType } from '~src/types.ts'
import {
  getLastStressedInflection,
  getPresentRoot,
  hasAnyAccent,
  isRootMonosyllabic,
  isStemWithoutSuffix,
  joinInflections,
  putAccentOnPrefix,
  stripAllAccents,
} from '~src/utils.ts'
import {
  IsFeminineAdjectiveDecliner,
  IsFemininePronominalDecliner,
  IsMasculineParticipleDecliner,
  IsMasculinePronominalDecliner,
} from '~decliners/commons.ts'
import {
  getNegatedCopula,
  getPositiveCopula,
  hasMobilePrefix,
} from './PresentIndicativeConjugator.ts'
import {
  ACCENTUATION_SEPARATOR,
  SECONDARY_FORM_SEPARATOR,
} from '~src/commons.ts'

export default class ActivePresentParticipleDecliner
  extends ActiveParticipleDecliner {
  protected override getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
    getBasicInflected: (principalParts: PrincipalPartsType) => ParticipleType,
  ): ParticipleType {
    const negatedCopula = getNegatedCopula(principalParts, prefix)
    if (negatedCopula.isCopula) {
      return getBasicInflected(negatedCopula.nesa!)
    }
    const basicPrefixed = this.getBasicImmobilePrefixed(
      prefix,
      principalParts,
      getBasicInflected,
    )
    if (hasMobilePrefix(principalParts)) {
      const stressedOnPrefix = ActivePresentParticipleDecliner
        .applyPrefixToParadigm(
          putAccentOnPrefix(prefix),
          getBasicInflected(
            principalParts.map(stripAllAccents) as PrincipalPartsType,
          ),
        )
      if (getBasicInflected === this.getPronominal) {
        //@ts-ignore complementing type is intended
        return {
          masculine: joinInflections(
            stressedOnPrefix.masculine,
            getLastStressedInflection(basicPrefixed.masculine),
          ),
          feminine: joinInflections(
            stressedOnPrefix.feminine,
            getLastStressedInflection(basicPrefixed.feminine),
          ),
        }
      } else {
        const masculine = stressedOnPrefix.masculine
        const feminine = stressedOnPrefix.feminine
        const short = this.getDefault(principalParts).masculine.plNom.split(
          SECONDARY_FORM_SEPARATOR,
        )[0]
        return {
          masculine: {
            ...masculine,
            sgNom: masculine.sgNom.replace(/^\S+/, `${prefix}${short}s`),
            sgVoc: masculine.sgVoc.replace(/^\S+/, `${prefix}${short}s`),
            plNom: masculine.plNom.replace(/^\S+/, `${prefix}${short}`),
            plVoc: masculine.plVoc.replace(/^\S+/, `${prefix}${short}`),
          },
          feminine: {
            ...feminine,
            plNom: feminine.plNom.replace(/\S+$/, `${prefix}${short}`),
            plVoc: feminine.plVoc.replace(/\S+$/, `${prefix}${short}`),
          },
          neuter: stressedOnPrefix.neuter,
        }
      }
    }
    return basicPrefixed
  }

  getDefault(principalParts: PrincipalPartsType): ParticipleType {
    const positiveCopula = getPositiveCopula(principalParts)
    if (positiveCopula.isCopula) {
      return this.getDefault(positiveCopula.esa!)
    }
    const { stem, shortStemStressed } = getStem(principalParts)
    const short = getShort(principalParts)
    const masculine = IsMasculineParticipleDecliner.inflectStatic(stem)
    const feminine = IsFeminineAdjectiveDecliner.inflectStatic(stem)
    return {
      masculine: {
        ...masculine,
        sgNom: `${
          short.split(ACCENTUATION_SEPARATOR).map((s) => s + 's').join(
            ACCENTUATION_SEPARATOR,
          )
        } ${masculine.sgNom}`,
        sgVoc: `${
          short.split(ACCENTUATION_SEPARATOR).map((s) => s + 's').join(
            ACCENTUATION_SEPARATOR,
          )
        } ${masculine.sgVoc}`,
        plNom: `${short}${SECONDARY_FORM_SEPARATOR}${masculine.plNom}`,
        plVoc: `${short}${SECONDARY_FORM_SEPARATOR}${masculine.plVoc}`,
      },
      feminine: {
        ...feminine,
        plNom: `${feminine.plNom}${SECONDARY_FORM_SEPARATOR}${short}`,
        plVoc: `${feminine.plVoc}${SECONDARY_FORM_SEPARATOR}${short}`,
      },
      neuter: shortStemStressed,
    }
  }

  getPronominal(
    principalParts: PrincipalPartsType,
  ): ComplementingParticipleType {
    const positiveCopula = getPositiveCopula(principalParts)
    if (positiveCopula.isCopula) {
      return this.getPronominal(positiveCopula.esa!)
    }
    const { stem } = getStem(principalParts)
    let masculine: DeclinedType
    let feminine: DeclinedType
    const masculineImmobile = IsMasculinePronominalDecliner.inflectStatic(
      stem,
    )
    const feminineImmobile = IsFemininePronominalDecliner.inflectStatic(
      stem,
    )
    if (
      hasAnyAccent(stem) && isStemWithoutSuffix(stem.replace(/[aiu]nt$/, ''))
    ) {
      const masculineMobile = IsMasculinePronominalDecliner.inflectDynamic(
        stripAllAccents(stem),
        'b',
      )
      const feminineMobile = IsFemininePronominalDecliner.inflectDynamic(
        stripAllAccents(stem),
        '3b',
      )
      masculine = joinInflections(masculineImmobile, masculineMobile)
      feminine = joinInflections(feminineImmobile, feminineMobile)
    } else {
      masculine = masculineImmobile
      feminine = feminineImmobile
    }
    return {
      masculine,
      feminine,
    }
  }

  override getReflexive(principalParts: PrincipalPartsType): ParticipleType {
    const { masculine, feminine, neuter } = super.getReflexive(principalParts)
    const { shortStemStressed } = getStem(principalParts)
    const sgMasc = masculine.sgNom.replace(/^\S+/, `${shortStemStressed}sis`)
    const plMasc = masculine.plNom.replace(/^\S+/, `${shortStemStressed}si`)
    return {
      masculine: {
        ...masculine,
        sgNom: sgMasc,
        sgVoc: sgMasc,
        plNom: plMasc,
        plVoc: plMasc,
      },
      feminine,
      neuter,
    }
  }
}

function getStem(principalParts: PrincipalPartsType) {
  const { root, pattern } = getPresentRoot(principalParts)
  const shortStemStressed = root + (pattern === 'i' ? `į` : `ą`)
  return {
    shortStemStressed,
    stem: root + (pattern === 'i' ? `i` : `a`) + 'nt',
    root,
  }
}

function getShort(principalParts: PrincipalPartsType) {
  const mobileSuffixes = [/e\u0303na$/, /i\u0300na$/, /i\u0300ja$/]
  const { shortStemStressed, root } = getStem(principalParts)
  if (!hasAnyAccent(root)) {
    return shortStemStressed
  }
  if (hasMobilePrefix(principalParts)) {
    return `${stripAllAccents(shortStemStressed)}\u0303`
  }
  if (
    isRootMonosyllabic(root) ||
    mobileSuffixes.some((suffix) => suffix.test(principalParts[1]))
  ) {
    return `${shortStemStressed}${ACCENTUATION_SEPARATOR}${
      stripAllAccents(shortStemStressed)
    }\u0303`
  }
  return shortStemStressed
}
