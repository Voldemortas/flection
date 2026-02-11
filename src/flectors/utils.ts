import type { ConjugationType } from '~src/types.ts'
import {
  appendSuffixWithAssimilation,
  consonants,
  longVowels,
  resonants,
  shortVowels,
  stripAllAccents,
  vowels,
} from '~src/utils.ts'

function conjugateThematicThirdAndPlural(
  root: string,
  theme: string,
): Omit<ConjugationType, 'sg1' | 'sg2'> {
  return {
    sg3: `${root}${theme}`,
    pl3: `${root}${theme}`,
    ...conjugateThematicPlural(root, theme),
  }
}

function conjugateThematicPlural(
  root: string,
  theme: string,
): Pick<ConjugationType, 'pl1' | 'pl2'> {
  return {
    pl1: `${root}${theme}me ${root}${theme}m`,
    pl2: `${root}${theme}te ${root}${theme}t`,
  }
}

export function decorateConjugatedReflexive(
  mood: ConjugationType,
): ConjugationType {
  return {
    sg1: `${mood.sg1}i ${mood.sg1}`,
    sg2: `${mood.sg2}i ${mood.sg2}`,
    sg3: `${mood.sg3}i ${mood.sg3}`,
    pl1: mood.pl1,
    pl2: mood.pl2,
    pl3: `${mood.pl3}i ${mood.pl3}`,
  }
}

export function isRootMonosyllabic(root: string) {
  const pattern = new RegExp(
    `^[${consonants}]*?[${vowels}]+[${consonants}]*?$`,
    'i',
  )
  return pattern.test(root)
}

export function metatonise3rdFuture(word: string) {
  const isLastSyllableLongAcute = new RegExp(
    `[${longVowels}]\u0301[${consonants}]*[sš]$`,
    'i',
  )
  if (isLastSyllableLongAcute.test(word)) {
    return word.replace(`\u0301`, `\u0303`)
  }
  const isLastSyllableDiphthongAcute = new RegExp(
    `^(.*)([${shortVowels}])\u0301([${resonants}])([${consonants}]*s)$`,
    'i',
  )
  if (isLastSyllableDiphthongAcute.test(word)) {
    return word.replace(isLastSyllableDiphthongAcute, `$1$2$3\u0303$4`)
  }
  return word
}

export function conjugateFuture(root: string): ConjugationType {
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

export function conjugateImmobileO(root: string): ConjugationType {
  return {
    sg1: `${root}au`,
    sg2: `${root}ai`,
    ...conjugateThematicThirdAndPlural(root, 'o'),
  }
}

export const vytiFuture: ConjugationType = {
  sg1: `vy\u0301siu`,
  sg2: `vy\u0301si`,
  sg3: `vy\u0303s`,
  ...conjugateThematicPlural(`vy\u0301s`, 'i'),
  pl3: `vy\u0303s`,
}

export const siutiFuture: ConjugationType = {
  sg1: `siū\u0301siu`,
  sg2: `siū\u0301si`,
  sg3: `siū\u0303s`,
  ...conjugateThematicPlural(`siū\u0301s`, 'i'),
  pl3: `siū\u0303s`,
}
