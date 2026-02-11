import type { ConjugationType } from '~src/types.ts'
import {
  consonants,
  longVowels,
  resonants,
  shortVowels,
  vowels,
} from '~src/utils.ts'

export function conjugateThematicThirdAndPlural(
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
