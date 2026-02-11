import ImmobileConjugator from './ImmobileConjugator.ts'
import type { ConjugationType } from '~src/types.ts'
import {
  appendSuffixWithAssimilation,
  getInfinitiveRoot,
  stripAllAccents,
  stripAllAccentsFromParadigm,
} from '~src/utils.ts'
import {
  conjugateThematicThirdAndPlural,
  isRootMonosyllabic,
  metatonise3rdFuture,
  siutiFuture,
  vytiFuture,
} from './utils.ts'

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

    const accentlessRoot = stripAllAccents(root)
    const isMonosyllabicAndEndsInYU = /[yū]$/.test(accentlessRoot) &&
      isRootMonosyllabic(accentlessRoot)
    const thirdRoot = isMonosyllabicAndEndsInYU
      ? root.replaceAll(
        /(.+)([yū])([\u0301\u0303]?)$/g,
        (_, r: string, v: string, a: string) =>
          `${r}${v === 'y' ? 'i' : 'u'}${a !== '' ? `\u0300` : ''}`,
      )
      : root

    const appendFutureSuffix = (r: string) =>
      appendSuffixWithAssimilation(r, 's', [
        [/[sz]s$/, 's'],
        [/[šž]s$/, 'š'],
      ])

    const non3rd = appendFutureSuffix(root)

    const third = metatonise3rdFuture(appendFutureSuffix(thirdRoot))

    return {
      ...conjugateThematicThirdAndPlural(non3rd, 'i'),
      sg1: `${non3rd}iu`,
      sg2: `${non3rd}i`,
      sg3: third,
      pl3: third,
    }
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
