import ImmobileConjugator from './ImmobileConjugator.ts'
import type { ConjugationType } from '~src/types.ts'
import { getInfinitiveRoot, stripAllAccentsFromParadigm } from '~src/utils.ts'
import { conjugateFuture, siutiFuture, vytiFuture } from './utils.ts'

export default class FutureIndicativeConjugator extends ImmobileConjugator {
  override conjugateDefault(principalParts: string[]): ConjugationType {
    const { root } = getInfinitiveRoot(principalParts)

    const dict = new Map([
      [`vy`, stripAllAccentsFromParadigm(vytiFuture)],
      [`vy\u0301`, vytiFuture],
      [`siū`, stripAllAccentsFromParadigm(siutiFuture)],
      [`siū\u0301`, siutiFuture],
    ])
    if (dict.has(root)) {
      return dict.get(root)!
    }

    return conjugateFuture(root)
  }
  override conjugateUnprefixedReflexive(
    principalParts: string[],
  ): ConjugationType {
    const defaultConjugated = super.conjugateUnprefixedReflexive(principalParts)
    return {
      ...defaultConjugated,
      sg3: defaultConjugated.sg3.replace(/^(.+)si \1s$/, '$1is'),
      pl3: defaultConjugated.pl3.replace(/^(.+)si \1s$/, '$1is'),
    }
  }
}
