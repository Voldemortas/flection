export const threeRootsError = new Error(
  `Roots must consist of 3 principal parts`,
)

export const badFormatError = (word: string) =>
  new Error(`Unrecognisable word format in form=${word}`)

export const parsingInputError = new Error('Failed to parse input')
