import type { ConjugationType } from '~src/types.ts'

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

export function conjugateImmobileO(root: string): ConjugationType {
  return {
    sg1: `${root}au`,
    sg2: `${root}ai`,
    ...conjugateThematicThirdAndPlural(root, 'o'),
  }
}
