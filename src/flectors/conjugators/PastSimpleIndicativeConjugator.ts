import FiniteConjugator from './FiniteConjugator.ts'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'
import {
  consonants,
  getInfinitiveRoot,
  getPastRoot,
  hasCircumflexOrShortAccent,
  putAccentOnPrefix,
  stripAllAccentsFromParadigm,
  vowels,
} from '~src/utils.ts'
import {
  conjugateImmobileE,
  conjugateImmobileO,
  conjugateMobileE,
  conjugateMobileO,
} from './utils.ts'

export default class PastSimpleIndicativeConjugator extends FiniteConjugator {
  override conjugateDefault(
    principalParts: PrincipalPartsType,
  ): ConjugationType {
    const { root, pattern } = getPastRoot(principalParts)
    const rootHasCircumflexOrShortAccent = hasCircumflexOrShortAccent(
      principalParts[2],
    )

    if (rootHasCircumflexOrShortAccent && pattern === 'o') {
      return conjugateMobileO(root)
    }
    if (rootHasCircumflexOrShortAccent) {
      return conjugateMobileE(root)
    }
    if (pattern === 'o') {
      return conjugateImmobileO(root)
    }
    return conjugateImmobileE(root)
  }

  protected override conjugateBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): ConjugationType {
    const { pattern } = getPastRoot(principalParts)
    const infinitiveRoot = getInfinitiveRoot(principalParts).root
    const isPrefixMobile = pattern === 'ė' &&
      hasCircumflexOrShortAccent(principalParts[2]) &&
      !PastSimpleIndicativeConjugator.#polysyllabicEndsInYRegex.test(
        infinitiveRoot,
      )
    if (isPrefixMobile) {
      return PastSimpleIndicativeConjugator.applyPrefixToParadigm(
        putAccentOnPrefix(prefix),
        stripAllAccentsFromParadigm(this.conjugateDefault(principalParts)),
      )
    }
    return this.conjugateBasicImmobilePrefixed(prefix, principalParts)
  }

  static readonly #polysyllabicEndsInYRegex = new RegExp(
    `[${vowels}]+[${consonants}]+y\\u0301?$`,
    'i',
  )
}
