import FiniteConjugator from './FiniteConjugator.ts'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'
import {
  getInfinitiveRoot,
  getPastRoot,
  hasCircumflexOrShortAccent,
  putAccentOnPrefix,
  stripAllAccentsFromParadigm,
} from '~src/utils.ts'
import {
  conjugateImmobileE,
  conjugateImmobileO,
  conjugateMobileE,
  conjugateMobileO,
} from './utils.ts'
import { consonants, vowels } from '~src/commons.ts'

const polysyllabicEndsInYRegex = new RegExp(
  `[${vowels}]+[${consonants}]+y\\u0301?$`,
  'i',
)

export default class PastSimpleIndicativeConjugator extends FiniteConjugator {
  override getDefault(
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

  protected override getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): ConjugationType {
    const { pattern } = getPastRoot(principalParts)
    const infinitiveRoot = getInfinitiveRoot(principalParts).root
    const isPrefixMobile = pattern === 'ė' &&
      hasCircumflexOrShortAccent(principalParts[2]) &&
      !polysyllabicEndsInYRegex.test(
        infinitiveRoot,
      )
    if (isPrefixMobile) {
      return PastSimpleIndicativeConjugator.applyPrefixToParadigm(
        putAccentOnPrefix(prefix),
        stripAllAccentsFromParadigm(this.getDefault(principalParts)),
      )
    }
    return this.getBasicImmobilePrefixed(prefix, principalParts)
  }
}
