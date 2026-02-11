export const threeRootsError = new Error(
  `Roots must consist of 3 principal parts`,
)

export const badFormatError = (word: string) =>
  new Error(`Unrecognisable word format in form=${word}`)

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
