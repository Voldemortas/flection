import {
  type AccentuationStringType,
  validateAccentuationStringType,
} from '~decliners/utils.ts'
import {
  countAccentedSyllable,
  getAllSyllables,
  hasAcuteAccent,
  hasAnyAccent,
  hasShortAccent,
} from '~src/utils.ts'
import {
  explicitNonAcuteError,
  explicitShortError,
  finalAcuteError,
  lemmaNoStressError,
} from '~src/errors.ts'

export type AccentType =
  | AcuteInterface
  | { type: AccentuationStringType; mandatoryShort?: boolean }
  | AccentuationStringType

export interface AcuteInterface {
  /**
   * Whether the stress in "strong" positions (when it doesn't move to the end) is acute, or mandatory short
   * (in forms like future participles) or neither.
   */
  strongAccent: 'acute' | 'short' | 'nonAcute'
  /**
   * Syllable position counting from the end; 1 - last syllable.
   */
  position: number
  /**
   * Whether the stress stays on the stem or not.
   */
  isStatic: boolean
}

/**
 * Accentuation class regarding nominals
 * exposes various methods to achieve the unified properties from different descriptions
 */
export default class Accent implements AcuteInterface {
  readonly strongAccent: 'acute' | 'short' | 'nonAcute'
  readonly position: number
  readonly isStatic: boolean

  /**
   * a simple constructor
   * @param {'acute' | 'short' | 'nonAcute'} strongAccent - Whether the stress in "strong" positions
   * (when it doesn't move to the end) is acute, or mandatory short (in forms like future participles) or neither.
   * @param {number} position - Syllable position counting from the end; 1 - last syllable.
   * @param {boolean} isStatic - Whether the stress stays on the stem or not.
   * @constructor
   */
  public constructor(
    strongAccent: 'acute' | 'short' | 'nonAcute',
    position: number,
    isStatic: boolean,
  ) {
    this.strongAccent = strongAccent
    this.position = position
    this.isStatic = isStatic
  }

  /**
   * same as constructor but from object
   * @param {Accent} accent - Object bearing accent's properties.
   * @param {'acute' | 'short' | 'nonAcute'} accent.strongAccent - Whether the stress in "strong" positions
   * (when it doesn't move to the end) is acute, or mandatory short (in forms like future participles) or neither.
   * @param {number} accent.position - Syllable position counting from the end; 1 - last syllable.
   * @param {boolean} accent.isStatic - Whether the stress stays on the stem or not.
   */
  public static FromObject(
    { strongAccent, position, isStatic }: AcuteInterface,
  ): Accent {
    return new Accent(strongAccent, position, isStatic)
  }

  /**
   * creates `Accent` object from stressed lemma and provided type
   * @param {string} lemma - nominative singular with stress diacritic
   * @param {AccentuationStringType} type - accentuation type
   * @param {boolean=false} mandatoryShort - whether the short a/e should remain short
   * @constructor
   */
  public static FromAccentedLemma(
    lemma: string,
    type: AccentuationStringType,
    mandatoryShort: boolean | undefined = undefined,
  ): Accent {
    validateAccentuationStringType(type)
    if (!hasAnyAccent(lemma)) {
      throw lemmaNoStressError
    }
    const syllables = getAllSyllables(lemma)
    const isLemmaWithShortStress = hasShortAccent(lemma)
    if (hasAcuteAccent(syllables[0])) {
      throw finalAcuteError
    }
    if (
      hasAcuteAccent(lemma) &&
      (type === '2' || type === '4' || type.includes('b'))
    ) {
      throw explicitNonAcuteError
    }
    if (!isLemmaWithShortStress && mandatoryShort) {
      throw explicitShortError
    }

    const strongAccent: 'acute' | 'short' | 'nonAcute' = hasAcuteAccent(lemma)
      ? 'acute'
      : mandatoryShort ||
          isLemmaWithShortStress && mandatoryShort === undefined &&
            /[ae]\u0300/.test(lemma) && !hasAnyAccent(syllables[0])
      ? 'short'
      : 'nonAcute'
    const position = countAccentedSyllable(lemma)!.syllable!
    const isStatic = type === '1' || type === '2'
    return new Accent(strongAccent, position, isStatic)
  }

  /**
   * A Method to create the Accent|undefined from different
   * @param {AccentType | undefined} accentType - different set of options of the accent
   * @param {string} accentedLemma - used if `accentType` matches the {@link AccentuationStringType}
   * @constructor
   */
  public static FromAccentType(
    accentType: AccentType | undefined,
    accentedLemma: string,
  ): Accent | undefined {
    if (accentType === undefined) {
      return undefined
    }
    if ((accentType as Record<'position', number>)['position'] !== undefined) {
      return Accent.FromObject(accentType as Accent)
    }
    const { type, mandatoryShort } = typeof accentType === 'string'
      ? { type: accentType }
      : accentType as {
        type: AccentuationStringType
        mandatoryShort?: boolean
      }
    return Accent.FromAccentedLemma(
      accentedLemma,
      type,
      mandatoryShort,
    )
  }
}
