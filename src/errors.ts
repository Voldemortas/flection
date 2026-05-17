export const threeRootsError = new Error(
  `Roots must consist of 3 principal parts`,
)

// deno-coverage-ignore-start
export const badFormatError = (word: string) =>
  new Error(`Unrecognisable word format in form=${word}`)
// deno-coverage-ignore-stop

export const unmatchingPrefixesError = new Error(
  'Different prefixes found, they must be the same, otherwise use the static internal methods',
)
export const unmatchingReflexivesError = new Error(
  'Different reflexives found, they must be the same, otherwise use the static internal methods',
)
export const parsingInputError = new Error('Failed to parse input')

export const presentRootError = new Error(
  `Present form must end in one of the following: -(i)a, -i, -o`,
)

export const pastRootError = new Error(
  `Past form must end in one of the following: -ė, -o`,
)

export const infinitiveRootError = new Error(
  `Infinitive form must end in -t(i)`,
)

export const prefixMustContainVowelsError = new Error(
  `Prefixes in Lithuanian language must contain a vowel`,
)

export const thirdAccentuationTypeError = new Error(
  `Unrecognisable accentuation type`,
)

export const tooFewSyllablesError = new Error(
  `Word has too few syllables`,
)

export const syllableCannotCarryAcuteError = new Error(
  `Syllable cannot carry acute`,
)

export const notAttestedInLanguageError = new Error(
  'Such use is not attested and thus is not implemented',
)

export const cannotParseSyllableError = new Error('Cannot parse syllable')

export const stresslessDynamicAccentuationError = new Error(
  'Root must be accented via the string or by the type parameter',
)

export const inflectorCannotBeUndefined = new Error(
  'Both inflector patterns cannot be undefined',
)

export const codeNotReachableError = new Error('Code should not be reachable')

export const badNounError = new Error(
  `Such noun doesn't match known flectional ending`,
)

export const imasReflexiveError = new Error(
  'only -ymas/-imas/-ymasis/-imasis nouns can be reflexive',
)

export const isYsExplicitGenitiveUError = new Error(
  'only -is and -ys nouns can have explicit -ų plural genitive',
)

export const masculineUoError = new Error(
  `masculine -uo nouns can only have -uns/-ens in genitive singular`,
)

export const feminineUoError = new Error(
  `feminine -uo nouns can only have -ers in genitive singular`,
)

export const masculineIsError = new Error(
  `-is/-ys nouns can only have -ies/-io in genitive singular`,
)

export const feminineIsError = new Error(
  `feminine -is nouns can only have -ies in genitive singular`,
)

export const accentuationStringError = new Error(
  'provided type fails to validate the AccentuationStringType',
)

export const lemmaNoStressError = new Error('lemma must bear a stress marker')

export const finalAcuteError = new Error('final syllable cannot carry acute')

export const explicitNonAcuteError = new Error(
  'accentuation type explicitly states non-acute, ' +
    'however, the lemma carries acute',
)

export const explicitShortError = new Error(
  `Mandatory short is explicitly stated, however, 
the lemma doesn't carry a short stress`,
)
