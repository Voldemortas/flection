import Conjugator from './Conjugator.ts'
import type { ConjugationType } from '~src/types.ts'
import {
  consonants,
  getInfinitiveRoot,
  getPastRoot,
  getPresentRoot,
  hasAcuteAccent,
  hasAnyAccent,
  hasCircumflexOrShortAccent,
  isEverythingEqual,
  putAccentOnPrefix,
  stripAllAccents,
  vowels,
} from '~src/utils.ts'
import {
  conjugateImmobileA,
  conjugateImmobileI,
  conjugateImmobileO,
  conjugateMobileA,
  conjugateMobileI,
  conjugateMobileO,
  isRootMonosyllabic,
} from './utils.ts'

export default class PresentIndicativeConjugator extends Conjugator {
  static readonly #COPULA_JOINED = `bū\u0301ti-yra\u0300-bu\u0300vo`

  override conjugateDefault(principalParts: string[]): ConjugationType {
    const joinedPrincipalParts = principalParts.join('-')
    if (
      Conjugator.isConjugatedTheSame(
        joinedPrincipalParts,
        PresentIndicativeConjugator.#COPULA_JOINED,
      )
    ) {
      const yra = hasAnyAccent(principalParts[1]) ? `yra\u0300` : `yra`
      const esa = hasAnyAccent(principalParts[1]) ? `e\u0303sa` : `esa`
      return {
        ...this.conjugateDefault([`_`, esa, ``]),
        sg3: yra,
        pl3: yra,
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

  protected override conjugateBasicPrefixed(
    prefix: string,
    principalParts: string[],
  ): ConjugationType {
    const joinedPrincipalParts = principalParts.join('-')
    if (
      prefix === 'ne' &&
      Conjugator.isConjugatedTheSame(
        joinedPrincipalParts,
        PresentIndicativeConjugator.#COPULA_JOINED,
      )
    ) {
      const nera = hasAnyAccent(principalParts[1]) ? `nėra\u0300` : `nėra`
      const nesa = hasAnyAccent(principalParts[1]) ? `ne\u0303sa` : `nesa`
      return {
        ...this.conjugateDefault([`_`, nesa, ``]),
        sg3: nera,
        pl3: nera,
      }
    }
    if (this.#isPrefixMobile(principalParts)) {
      return PresentIndicativeConjugator.applyPrefixToParadigm(
        putAccentOnPrefix(prefix),
        this.conjugateDefault(principalParts.map(stripAllAccents)),
      )
    }
    return this.conjugateBasicImmobilePrefixed(prefix, principalParts)
  }

  #isPrefixMobile(principalParts: string[]): boolean {
    if (!hasAnyAccent(principalParts[1]) || hasAcuteAccent(principalParts[1])) {
      return false
    }
    const galeti = `galė\u0301ti-ga\u0303li-galė\u0301jo`
    const tureti = `turė\u0301ti-tu\u0300ri-turė\u0301jo`
    if (
      PresentIndicativeConjugator.isConjugatedTheSame(
        principalParts.join('-'),
        galeti,
      ) ||
      PresentIndicativeConjugator.isConjugatedTheSame(
        principalParts.join('-'),
        tureti,
      )
    ) {
      return false
    }
    const { root, pattern } = getPresentRoot(principalParts)
    if (pattern === 'o') {
      return false
    }
    if (/([iu]\u0300|a\u0303|[^i]e\u0303)/.test(root)) {
      return true
    }
    if (this.#isAlternatingCircumflexIWithE(principalParts)) {
      return true
    }
    if (
      pattern === 'a' &&
      this.#isCircumflexArAlternatingWith_E_InOtherForms(principalParts)
    ) {
      return true
    }
    return isRootMonosyllabic(root)
  }

  #isAlternatingCircumflexIWithE(principalParts: string[]): boolean {
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

  #isCircumflexArAlternatingWith_E_InOtherForms(
    principalParts: string[],
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
}
