import { describe, it } from '@std/testing/bdd'
import { expect } from '@std/expect'
import AccentedInflector, {
  palataliseParadigm,
} from '~decliners/AccentedInflector.ts'
import type { AccentedValueType } from '~src/types.ts'
import {
  inflectorCannotBeUndefined,
  notAttestedInLanguageError,
  stresslessDynamicAccentuationError,
} from '~src/errors.ts'
import type { AccentuationType } from '~src/flectors/decliners/utils.ts'

type ABC = 'a' | 'b' | 'c'

const PARADIGM: Record<ABC, AccentedValueType> = {
  a: [`as`],
  b: [[`ių`, `ių\u0303`]],
  c: [[`ame`, `ame\u0300`], [`am`, `am\u0303`]],
}

describe('AccentedInflector', () => {
  const inflector = new AccentedInflector(PARADIGM, PARADIGM)
  describe('errors', () => {
    it('throws error when both paradigms are undefined', () => {
      expect(() => new AccentedInflector(undefined, undefined))
        .toThrow(inflectorCannotBeUndefined)
    })
    it(`throws error when dynamic is used but it's undefined`, () => {
      expect(() =>
        new AccentedInflector(PARADIGM, undefined).inflectDynamic('a')
      )
        .toThrow(notAttestedInLanguageError)
    })
    it(`throws error when accented static is used but it's undefined`, () => {
      expect(() =>
        new AccentedInflector(undefined, PARADIGM).inflectStatic('ma\u0301r')
      )
        .toThrow(notAttestedInLanguageError)
    })
  })
  describe('with type', () => {
    it('correctly conjugates unstressed paradigm', () => {
      expect(
        new AccentedInflector(undefined, PARADIGM).inflectStatic(
          'mot',
          undefined,
        ),
      ).toMatchObject({
        a: `motas`,
        b: `močių`,
        c: `motame motam`,
      })
      expect(inflector.inflectStatic('mot', undefined)).toMatchObject({
        a: `motas`,
        b: `močių`,
        c: `motame motam`,
      })
      expect(() => inflector.inflectDynamic('mot', undefined)).toThrow(
        stresslessDynamicAccentuationError,
      )
    })
    it('correctly conjugates acute paradigm', () => {
      assertBothStaticAndDynamic('mot', { isAcute: true, syllable: 2 }, {
        a: `mo\u0301tas`,
        b: `mo\u0301čių`,
        c: `mo\u0301tame mo\u0301tam`,
      })
    })
    it('correctly conjugates circumflex paradigm', () => {
      assertBothStaticAndDynamic('mot', { isAcute: false, syllable: 2 }, {
        a: `mo\u0303tas`,
        b: `močių\u0303`,
        c: `motame\u0300 motam\u0303`,
      })
    })
    it('correctly conjugates polysyllabic non-acute', () => {
      assertBothStaticAndDynamic('lupik', { isAcute: false, syllable: 3 }, {
        a: `lu\u0300pikas`,
        b: `lu\u0300pikių`,
        c: `lu\u0300pikame lu\u0300pikam`,
      })
    })
    function assertBothStaticAndDynamic(
      root: string,
      type: AccentuationType,
      expected: Record<ABC, string>,
    ) {
      expect(inflector.inflectStatic(root, type)).toMatchObject(expected)
      expect(inflector.inflectDynamic(root, type)).toMatchObject(expected)
    }
  })
  describe('without type', () => {
    it('correctly conjugates unstressed paradigm', () => {
      expect(inflector.inflectStatic(`mot`)).toMatchObject({
        a: `motas`,
        b: `močių`,
        c: `motame motam`,
      })
      expect(() => inflector.inflectDynamic('mot')).toThrow(
        stresslessDynamicAccentuationError,
      )
    })
    it('correctly conjugates acute paradigm', () => {
      assertBothStaticAndDynamic(`mo\u0301t`, {
        a: `mo\u0301tas`,
        b: `mo\u0301čių`,
        c: `mo\u0301tame mo\u0301tam`,
      })
    })
    it('correctly conjugates circumflex paradigm', () => {
      assertBothStaticAndDynamic(`mo\u0303t`, {
        a: `mo\u0303tas`,
        b: `močių\u0303`,
        c: `motame\u0300 motam\u0303`,
      })
    })
    it('correctly conjugates short paradigm', () => {
      assertBothStaticAndDynamic(`mo\u0300t`, {
        a: `mo\u0300tas`,
        b: `močių\u0303`,
        c: `motame\u0300 motam\u0303`,
      })
    })
    function assertBothStaticAndDynamic(
      root: string,
      expected: Record<ABC, string>,
    ) {
      expect(inflector.inflectStatic(root)).toMatchObject(expected)
      expect(inflector.inflectDynamic(root)).toMatchObject(expected)
    }
  })
  describe('palataliseParadigm', () => {
    it('palatalises paradigm', () => {
      expect(palataliseParadigm(PARADIGM)).toMatchObject({
        a: [[`ias`]],
        b: [[`ių`, `ių\u0303`]],
        c: [[`iame`, `iame\u0300`], [`iam`, `iam\u0303`]],
      })
    })
  })
})
