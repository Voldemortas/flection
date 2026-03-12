import FiniteConjugator from './FiniteConjugator.ts'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'
import {
  getInfinitiveRoot,
  getPastRoot,
  getPresentRoot,
  getUnpalatalizedRoot,
  hasAcuteAccent,
  hasAnyAccent,
  hasCircumflexOrShortAccent,
  isEverythingEqual,
  isInflectedTheSame,
  isRootMonosyllabic,
  putAccentOnPrefix,
  stripAllAccents,
} from '~src/utils.ts'
import {
  conjugateImmobileA,
  conjugateImmobileI,
  conjugateImmobileO,
  conjugateMobileA,
  conjugateMobileI,
  conjugateMobileO,
} from './utils.ts'
import { consonants, vowels } from '~src/commons.ts'

const JOINED_COPULAS = [
  `bū\u0301ti-yra\u0300-bu\u0300vo`,
  `bū\u0301t-yra\u0300-bu\u0300vo`,
]

export default class PresentIndicativeConjugator extends FiniteConjugator {
  override getDefault(
    principalParts: PrincipalPartsType,
  ): ConjugationType {
    const positiveCopula = getPositiveCopula(principalParts)
    if (positiveCopula.isCopula) {
      return {
        ...this.getDefault(positiveCopula.esa!),
        sg3: positiveCopula.yra!,
        pl3: positiveCopula.yra!,
      }
    }

    const { root, pattern } = getPresentRoot(principalParts)
    const rootHasCircumflexOrShortAccent = hasCircumflexOrShortAccent(
      principalParts[1],
    )

    if (rootHasCircumflexOrShortAccent && pattern === 'o') {
      return conjugateMobileO(root)
    }
    if (rootHasCircumflexOrShortAccent && pattern === 'i') {
      return conjugateMobileI(root)
    }
    if (rootHasCircumflexOrShortAccent) {
      return conjugateMobileA(root)
    }
    if (pattern === 'o') {
      return conjugateImmobileO(root)
    }
    if (pattern === 'i') {
      return conjugateImmobileI(root)
    }
    return conjugateImmobileA(root)
  }

  protected override getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): ConjugationType {
    const negatedCopula = getNegatedCopula(principalParts, prefix)
    if (negatedCopula.isCopula) {
      return {
        ...this.getDefault(negatedCopula.nesa!),
        sg3: negatedCopula.nera!,
        pl3: negatedCopula.nera!,
      }
    }
    if (hasMobilePrefix(principalParts)) {
      return PresentIndicativeConjugator.applyPrefixToParadigm(
        putAccentOnPrefix(prefix),
        this.getDefault(
          principalParts.map(stripAllAccents) as PrincipalPartsType,
        ),
      )
    }
    return this.getBasicImmobilePrefixed(prefix, principalParts)
  }
}

export function hasMobilePrefix(principalParts: PrincipalPartsType): boolean {
  const { root, pattern } = getPresentRoot(principalParts)
  if (
    !hasAnyAccent(root) || hasAcuteAccent(principalParts[1]) ||
    !isRootMonosyllabic(getUnpalatalizedRoot(root))
  ) {
    return false
  }
  const joined = principalParts.join('-')
  const immobileVerbs = [
    `galė\u0301ti-ga\u0303li-galė\u0301jo`,
    `galė\u0301t-ga\u0303li-galė\u0301jo`,
    `turė\u0301ti-tu\u0300ri-turė\u0301jo`,
    `turė\u0301t-tu\u0300ri-turė\u0301jo`,
  ]
  if (
    immobileVerbs.some((verb) => isInflectedTheSame(joined, verb))
  ) {
    return false
  }
  if (pattern === 'o') {
    return false
  }
  if (/([iu]\u0300|a\u0303|[^i]e\u0303)/.test(root)) {
    return true
  }
  if (isAlternatingCircumflexIWithE(principalParts)) {
    return true
  }
  return pattern === 'a' &&
    isCircumflexArAlternatingWith_E_InOtherForms(principalParts)
}

function isAlternatingCircumflexIWithE(
  principalParts: PrincipalPartsType,
): boolean {
  const infinitiveRoot = getInfinitiveRoot(principalParts).root
  const presentRoot = getPresentRoot(principalParts).root
  const pastRoot = getPastRoot(principalParts).root
  const roots = [infinitiveRoot, presentRoot, pastRoot]

  if (new RegExp(`[^${vowels}]ie\u0303`).test(principalParts[1])) {
    return false
  }

  if (roots.filter((r) => /^.*([ie][lmnr]\u0303).*$/.test(r)).length === 3) {
    const iRER = roots.map((r) => r.replace(/^.*([ie][lmnr]\u0303).*$/, '$1'))
    if (
      iRER.length === 3 && !isEverythingEqual(iRER) &&
      isEverythingEqual(iRER.map((r) => r.replace(/[ie]/, '')))
    ) {
      return true
    }
  }
  if (roots.filter((r) => /^.*(i\u0300|en\u0303).*$/.test(r)).length === 3) {
    const iEN = roots.map((r) => r.replace(/^.*(i\u0300|en\u0303).*$/, '$1'))
    return iEN.length === 3 && !isEverythingEqual(iEN)
  }
  return false
}

function isCircumflexArAlternatingWith_E_InOtherForms(
  principalParts: PrincipalPartsType,
): boolean {
  const infinitiveRoot = getInfinitiveRoot(principalParts).root
  const presentRoot = getPresentRoot(principalParts).root
  const pastRoot = getPastRoot(principalParts).root
  if (!/a[lmr]\u0303/.test(presentRoot)) {
    return false
  }
  return new RegExp(`[${vowels}][${consonants}]+ė\u0301?$`).test(
    infinitiveRoot,
  ) || new RegExp(`[${vowels}][${consonants}]+ė\u0301?j?$`).test(pastRoot)
}

export function getPositiveCopula(
  principalParts: PrincipalPartsType,
): { isCopula: true; yra?: string; esa?: PrincipalPartsType } | {
  isCopula: false
  yra?: never
  esa?: never
} {
  const joinedPrincipalParts = principalParts.join('-')
  if (
    JOINED_COPULAS.some((copula) =>
      isInflectedTheSame(copula, joinedPrincipalParts)
    )
  ) {
    const esa: PrincipalPartsType = hasAnyAccent(principalParts[1])
      ? [`bū\u0301ti`, `e\u0303sa`, `bū\u0300vo`]
      : [`būti`, `esa`, `buvo`]
    return {
      isCopula: true,
      yra: hasAnyAccent(principalParts[1]) ? `yra\u0300` : `yra`,
      esa,
    }
  }
  return { isCopula: false }
}

export function getNegatedCopula(
  principalParts: PrincipalPartsType,
  prefix: string,
): { isCopula: true; nera?: string; nesa?: PrincipalPartsType } | {
  isCopula: false
  nera?: never
  nesa?: never
} {
  const joinedPrincipalParts = principalParts.join('-')
  if (
    JOINED_COPULAS.some((copula) =>
      isInflectedTheSame(copula, joinedPrincipalParts)
    ) && prefix === 'ne'
  ) {
    const nesa: PrincipalPartsType = hasAnyAccent(principalParts[1])
      ? [`bū\u0301ti`, `ne\u0303sa`, `bū\u0300vo`]
      : [`būti`, `nesa`, `buvo`]
    return {
      isCopula: true,
      nera: hasAnyAccent(principalParts[1]) ? `nėra\u0300` : `nėra`,
      nesa,
    }
  }
  return { isCopula: false }
}
