import {
  badNounError,
  codeNotReachableError,
  feminineIsError,
  feminineUoError,
  imasReflexiveError,
  isYsExplicitGenitiveUError,
  masculineIsError,
  masculineUoError,
} from '~src/errors.ts'
import { stripAllAccents } from '~src/utils.ts'
import type { AccentType } from '~decliners/Accent.ts'
import Accent from '~decliners/Accent.ts'

/**
 * the options type for the Noun constructor
 * @property {boolean?=true} isMasculine - for `-is` and `-uo` nouns only; ignored otherwise <hr />
 * @property {string?} sgGen - used for: <br />
 * a) -is nouns: masculine `io`/`ies`, feminine `ies`  <br />
 * a.1) -ys nouns: masculine `io`/`ies`  <br />
 * b) -uo nouns: masculine `ens`/`uns`, feminine `ers`  <hr />
 * @property {string?} plGen - for non-plurale-tantum `-is/-ys` nouns only if, defaults to `ių`; <br />
 * for plurale-tantum `-ys` nouns only, defaults to `ų`; <br />
 * ignored otherwise <hr />
 * @property {boolean?} isReflexive - for -ymas/-imas defaults to false; for -ymasis/-imasis defaults to true; ignored otherwise <hr />
 * @property {string?=both} availableNumbers - whether the noun is `singulare/plurale tantum` or has `both` numbers <hr />
 * @property {AccentType?} accent - the stress pattern of the noun; the noun is treated as unaccented if missing <hr />
 * @property {boolean=false} isStrict - whether an error should be thrown when mismatching options are given such as `-uo noun` with `-ies genitive singular` <hr />
 */

export type NounOptionsType = {
  isMasculine?: boolean
  sgGen?: 'io' | 'ies' | 'uns' | 'ens' | 'ers'
  plGen?: 'ių' | 'ų'
  isReflexive?: boolean
  availableNumbers?: 'singular' | 'plural' | 'both'
  isStrict?: boolean
  accent?: AccentType
  mandatoryShort?: boolean
}

const IMAS_REGEX = /[yi]mas$/i
const IMASIS_REGEX = /[yi]masis$/i
const OPTIONAL_IMASIS_REGEX = /[yi]mas(is)?$/i
const UO_REGEX = /uo$/i
const IS_REGEX = /is$/i
const YS_REGEX = /ys$/i
const IYS_REGEX = /[iy]s$/i
const IS_GENITIVE_REGEX = /(io|ies)$/i
const MASCULINE_SINGULAR_NOMINATIVE_REGEX = /([auy]s)$/i
const FEMININE_SINGULAR_NOMINATIVE_REGEX = /([aėi])$/i
const BIGENDER_SINGULAR_NOMINATIVE_REGEX = /(is|uo)$/i
const SINGULAR_NOMINATIVE_REGEX = joinRegexesWithOr(
  [
    MASCULINE_SINGULAR_NOMINATIVE_REGEX,
    FEMININE_SINGULAR_NOMINATIVE_REGEX,
    BIGENDER_SINGULAR_NOMINATIVE_REGEX,
  ],
  'i',
)
const PLURAL_AND_SINGULAR_NOMINATIVES_IS_MASCULINE_MAP: [
  RegExp,
  string,
  boolean | undefined,
][] = [
  [/ai$/i, 'as', true],
  [/ūs$/i, 'us', true],
  [/os$/i, 'a', false],
  [/ės$/i, 'ė', false],
  [/ys$/i, 'is', undefined],
]
const PLURAL_NOMINATIVE_REGEX = joinRegexesWithOr(
  PLURAL_AND_SINGULAR_NOMINATIVES_IS_MASCULINE_MAP.map(([reg]) => reg),
  'i',
)

function joinRegexesWithOr(regexes: RegExp[], flags: string): RegExp {
  return new RegExp(regexes.map(({ source }) => source).join('|'), flags)
}

/**
 * Class which lets you decline nouns.
 * **Respects accentuation.**
 */
export default class Noun {
  /**
   * the lemma in nominative singular with all stress trimmed
   */
  readonly lemma: string
  /**
   * whether the noun is masculine
   */
  readonly isMasculine: boolean
  /**
   * whether the noun is reflexive
   */
  readonly isReflexive: boolean
  /**
   * if the genitive plural is special (-ų for -is nouns)
   */
  readonly isPlGenSpecial: boolean
  /**
   * the special genitive singular value for -is and -uo nouns; `undefined` otherwise
   */
  readonly sgGen: string | undefined
  /**
   * the accent of the noun
   */
  readonly accent: Accent | undefined
  /**
   * whether the noun is singulare/plural tantum or has both numbers
   */
  readonly availableNumbers: 'singular' | 'plural' | 'both'

  /**
   * Wrapper to call all the static methods with the same options
   * @param {string} lemma - lemma expressed with *nominative singular*
   * @param {NounOptionsType={}} options
   * @example
   * ```ts
   * const namas = new Noun('namas', {stressPattern: '2'});
   * const spyris = new Noun('spyris)
   * const debesis = new Noun('debesis', {stressPattern: '3b', sgGen: 'ies', plGen: 'ų'});
   * const sultys = new Noun('sultys', {plGen: 'ių', availableNumbers: 'plural'});
   * const durys = new Noun('durys', {availableNumbers: 'plural'});
   * ```
   */
  public constructor(lemma: string, options: NounOptionsType = {}) {
    const strippedLemma = stripAllAccents(lemma)
    const isStrict = options.isStrict === true
    const hasSgGen = options.sgGen !== undefined

    if (
      options.availableNumbers !== 'plural' &&
      SINGULAR_NOMINATIVE_REGEX.test(strippedLemma)
    ) {
      this.availableNumbers = options.availableNumbers ?? 'both'
      this.isReflexive =
        (IMAS_REGEX.test(strippedLemma) && (options.isReflexive ?? false)) ||
        (IMASIS_REGEX.test(strippedLemma) && options.isReflexive !== false)
      if (
        isStrict &&
        !OPTIONAL_IMASIS_REGEX.test(strippedLemma) &&
        options.isReflexive === true
      ) {
        throw imasReflexiveError
      }
      if (this.isReflexive && IS_REGEX.test(strippedLemma)) {
        this.lemma = strippedLemma.replace(/is$/, '')
      } else {
        this.lemma = strippedLemma
      }
      if (IS_REGEX.test(this.lemma)) {
        this.isMasculine = options.isMasculine ?? true
      } else if (UO_REGEX.test(this.lemma)) {
        this.isMasculine = options.isMasculine ?? options.sgGen !== 'ers'
      } else {
        this.isMasculine = MASCULINE_SINGULAR_NOMINATIVE_REGEX.test(this.lemma)
      }
      this.isPlGenSpecial = IYS_REGEX.test(this.lemma) && options.plGen === 'ų'
      if (isStrict && !IYS_REGEX.test(this.lemma) && options.plGen === 'ų') {
        throw isYsExplicitGenitiveUError
      }
      if (YS_REGEX.test(strippedLemma)) {
        if (isStrict && hasSgGen && !IS_GENITIVE_REGEX.test(options.sgGen!)) {
          throw masculineIsError
        }
        this.sgGen = options.sgGen === 'ies' ? 'ies' : 'io'
      } else if (IS_REGEX.test(strippedLemma)) {
        if (isStrict && hasSgGen && !IS_GENITIVE_REGEX.test(options.sgGen!)) {
          throw masculineIsError
        }
        if (
          isStrict &&
          hasSgGen &&
          /io$/i.test(options.sgGen!) &&
          !this.isMasculine
        ) {
          throw feminineIsError
        }
        this.sgGen = !this.isMasculine || options.sgGen === 'ies' ? 'ies' : 'io'
      } else if (UO_REGEX.test(strippedLemma)) {
        if (!this.isMasculine) {
          if (isStrict && hasSgGen && !/ers/i.test(options.sgGen!)) {
            throw feminineUoError
          }
          this.sgGen = 'ers'
        } else {
          if (isStrict && hasSgGen && !/[eu]ns/i.test(options.sgGen!)) {
            throw masculineUoError
          }
          this.sgGen = options.sgGen === 'uns' ? 'uns' : 'ens'
        }
      } else {
        this.sgGen = undefined
      }
    } else if (
      options.availableNumbers === 'plural' &&
      PLURAL_NOMINATIVE_REGEX.test(strippedLemma)
    ) {
      this.availableNumbers = options.availableNumbers
      this.isReflexive = false
      this.sgGen = undefined

      for (
        const [
          pluralRegex,
          sgNom,
          isMasculine,
        ] of PLURAL_AND_SINGULAR_NOMINATIVES_IS_MASCULINE_MAP
      ) {
        if (pluralRegex.test(strippedLemma)) {
          this.lemma = strippedLemma.replace(pluralRegex, sgNom)
          if (isMasculine === undefined) {
            this.isMasculine = options.isMasculine ?? true
            this.isPlGenSpecial = options.plGen !== 'ių'
          } else {
            this.isMasculine = isMasculine
            this.isPlGenSpecial = false
          }
          break
        }
      }
    } else {
      throw badNounError
    }
    // deno-coverage-ignore-start
    if (
      //@ts-expect-error checks if the property is assigned
      typeof this.lemma! === 'undefined' ||
      //@ts-expect-error checks if the property is assigned
      typeof this.isMasculine === 'undefined' ||
      //@ts-expect-error checks if the property is assigned
      typeof this.isPlGenSpecial === 'undefined'
    ) {
      throw codeNotReachableError
    }
    // deno-coverage-ignore-stop
    this.accent = Accent.FromAccentType(options.accent, lemma)
  }

  // public decline(): DeclinedType {
  //   let answer: DeclinedType

  //   const inflectionMethod: 'inflectStatic' | 'inflectDynamic' = this.stressPattern === undefined ||

  // }

  // /**
  //  * static method that declines a noun, same as calling new Noun(lemma, options).decline()
  //  * @param lemma
  //  * @param options
  //  */
  // public static decline(lemma: string, options?: NounOptionsType = {}) {
  //   return new Noun(lemma, options).decline()
  // }
}
