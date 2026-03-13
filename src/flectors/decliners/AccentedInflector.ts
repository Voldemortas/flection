import type { AccentedValueType, AnyKeyType } from '~src/types.ts'
import { moveThirdAccentuation } from './utils.ts'
import type { AccentuationType } from './utils.ts'
import {
  getLastSyllable,
  getPalatalizedRoot,
  hasAnyAccent,
  hasCircumflexOrShortAccent,
  stripAllAccents,
  stripAllAccentsFromParadigm,
} from '~src/utils.ts'
import {
  inflectorCannotBeUndefined,
  notAttestedInLanguageError,
  stresslessDynamicAccentuationError,
} from '~src/errors.ts'
import { SECONDARY_FORM_SEPARATOR } from '~src/commons.ts'

const TEMPORARY_VOWEL = 'a'

export default class AccentedInflector<K extends AnyKeyType> {
  readonly #staticPattern: Record<K, AccentedValueType> | undefined
  readonly #dynamicPattern: Record<K, AccentedValueType> | undefined

  public constructor(
    staticPattern: Record<K, AccentedValueType> | undefined,
    dynamicPattern: Record<K, AccentedValueType> | undefined,
  ) {
    if (staticPattern === undefined && dynamicPattern === undefined) {
      throw inflectorCannotBeUndefined
    }
    this.#staticPattern = staticPattern
    this.#dynamicPattern = dynamicPattern
  }

  /**
   * @description declines the word for 1st and 2nd accentuation based on the stress found on the unpalatalisedRoot or the given type
   * @param {string} unpalatalisedRoot - unpalatalisedRoot without ending; can carry stress
   * @param {AccentuationType=undefined} type - **optional** accentuation type if the unpalatalisedRoot lacks stress; if the unpalatalisedRoot is stressed this part is left ignored
   * @example
   * ```ts
   * //let's assume that the static inflector is the nominal -as inflector
   * //where non-acute paradigms move stress to -u in nominative singular
   * function getType(isAcute: boolean) {
   *   return {isAcute, syllable: 2}
   * }
   * const unstressed = inflector.inflectStatic(`mok`) //nom.inst would be 'moku'
   * const acute= inflector.inflectStatic(`mo\u0301k`) //nom.inst would be 'móku'
   * const acute2 = inflector.inflectStatic(`mok`, getType(true)) //nom.inst would be 'móku'
   * const circumflex = inflector.inflectStatic(`mo\u0303k`) //nom.inst would be 'mokù'
   * const circumflex2 = inflector.inflectStatic(`mok`, getType(false)) //nom.inst would be 'mokù'
   * const short = inflector.inflectStatic(`mo\u0300k`) //nom.inst would be 'mokù'
   * ```
   */
  public inflectStatic(
    unpalatalisedRoot: string,
    type?: AccentuationType,
  ): Record<K, string> {
    if (
      this.#staticPattern === undefined &&
      (hasAnyAccent(unpalatalisedRoot) || type !== undefined)
    ) {
      throw notAttestedInLanguageError
    }
    if (this.#staticPattern === undefined) {
      return inflect(
        unpalatalisedRoot,
        type,
        stripAllAccentsFromParadigm(this.#dynamicPattern!),
      )
    }
    return inflect(
      unpalatalisedRoot,
      type,
      this.#staticPattern,
    )
  }

  /**
   * @description declines the word for 3rd and 4th accentuation based on the stress found on the root or the given type
   * @param {string} unpalatalisedRoot - root without ending; can carry stress
   * @param {AccentuationType=undefined} type - **mandatory** accentuation type if the root lacks stress; if the root is stressed this part is left ignored
   * @example
   * ```ts
   * //let's assume that the static inflector is the nominal -as inflector
   * //where non-acute paradigms move stress to -u in nominative singular
   * function getType(isAcute: boolean) {
   *   return {isAcute, syllable: 2}
   * }
   * const unstressed = inflector.inflectDynamic(`mok`) //nom.inst would be 'moku'
   * const acute= inflector.inflectDynamic(`mo\u0301k`) //nom.inst would be 'móku'
   * const acute2 = inflector.inflectDynamic(`mok`, getType(true)) //nom.inst would be 'móku'
   * const circumflex = inflector.inflectDynamic(`mo\u0303k`) //nom.inst would be 'mokù'
   * const circumflex2 = inflector.inflectDynamic(`mok`, getType(false)) //nom.inst would be 'mokù'
   * const short = inflector.inflectDynamic(`mo\u0300k`) //nom.inst would be 'mokù'
   * ```
   */
  public inflectDynamic(
    unpalatalisedRoot: string,
    type?: AccentuationType,
  ): Record<K, string> {
    if (this.#dynamicPattern === undefined) {
      throw notAttestedInLanguageError
    }
    if (!hasAnyAccent(unpalatalisedRoot) && type === undefined) {
      throw stresslessDynamicAccentuationError
    }
    return inflect(
      unpalatalisedRoot,
      type,
      this.#dynamicPattern,
    )
  }
}

function inflect<K extends AnyKeyType>(
  root: string,
  type: AccentuationType | undefined,
  paradigm: Record<K, AccentedValueType>,
): Record<K, string> {
  const accentedRoot = hasAnyAccent(root) || type === undefined
    ? root
    : moveThirdAccentuation(root + TEMPORARY_VOWEL, type).replace(
      /a\u0303?$/,
      '',
    )
  return Object.fromEntries(
    Object.entries(paradigm).map(
      ([key, value]) => [
        key,
        (value as AccentedValueType).map((value) => {
          const valArray = [value].flat(3) as [string]
          if (hasAnyAccent(accentedRoot)) {
            const isSecondLastSyllableNonAcute = !hasCircumflexOrShortAccent(
              getLastSyllable(accentedRoot) + TEMPORARY_VOWEL,
            )
            return putAccent(
              accentedRoot,
              isSecondLastSyllableNonAcute ? valArray[0] : valArray.at(-1)!,
            )
          }
          return putAccent(
            accentedRoot,
            stripAllAccents(valArray[0]),
          )
        }).join(SECONDARY_FORM_SEPARATOR),
      ],
    ),
  ) as Record<K, string>
}

function putAccent(root: string, ending: string): string {
  const realRoot = /^i[auoąųū]/.test(ending) ? getPalatalizedRoot(root) : root
  const realEnding = /j$/.test(realRoot) && /^i[auoąųū]/.test(ending)
    ? ending.replace(/^i/, '')
    : ending
  if (hasAnyAccent(ending)) {
    return stripAllAccents(realRoot) + realEnding
  }
  return realRoot + realEnding
}

export function palataliseParadigm<K extends AnyKeyType>(
  paradigm: Record<K, AccentedValueType>,
): Record<K, AccentedValueType> {
  const isStartingWithBackVowel = (ending: string) => /^[auoąųū]/.test(ending)
  return Object.fromEntries(
    Object.entries(paradigm).map((
      [key, value],
    ) => [
      key,
      (value as AccentedValueType).map((endings) =>
        [endings].flat(3).map((ending) =>
          isStartingWithBackVowel(ending) ? `i${ending}` : ending
        )
      ),
    ]),
  ) as Record<K, AccentedValueType>
}
