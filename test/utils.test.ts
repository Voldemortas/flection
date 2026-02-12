import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import {
  appendSuffixWithAssimilation,
  getInfinitiveRoot,
  getPalatalizedRoot,
  getPastRoot,
  getUnpalatalizedRoot,
  hasAcuteAccent,
  hasAnyAccent,
  hasCircumflexOrShortAccent,
  isEverythingEqual,
  putAccentOnPrefix,
  stripAllAccents,
  stripAllAccentsFromParadigm,
} from '~src/utils.ts'
import {
  infinitiveRootError,
  pastRootError,
  prefixMustContainVowelsError,
  threeRootsError,
} from '~src/errors.ts'
import {
  makeInfinitiveRoots,
  makePastRoots,
  OME,
  OMO,
  SOKTI,
} from './testHelpers.ts'

describe('utils', () => {
  describe('stripAllAccents', () => {
    const expected = `šokti`
    SOKTI.forEach((word) => {
      it(`strips all accents from a ${word}`, () => {
        expect(stripAllAccents(word)).toStrictEqual(expected)
      })
    })
  })
  describe('hasAnyAccent', () => {
    const expected = [true, true, true, false]
    SOKTI.forEach((word, i) => {
      it(`checks if ${word} has an accent`, () => {
        expect(hasAnyAccent(word)).toStrictEqual(expected[i])
      })
    })
  })
  describe('hasCircumflexOrShortAccent', () => {
    const expected = [true, false, true, false]
    SOKTI.forEach((word, i) => {
      it(`checks if ${word} has a circumflex or a short accent`, () => {
        expect(hasCircumflexOrShortAccent(word)).toStrictEqual(expected[i])
      })
    })
  })
  describe('hasAcuteAccent', () => {
    const expected = [false, true, false, false]
    SOKTI.forEach((word, i) => {
      it(`checks if ${word} has a circumflex or a short accent`, () => {
        expect(hasAcuteAccent(word)).toStrictEqual(expected[i])
      })
    })
  })
  describe('getInfinitiveRoot', () => {
    SOKTI.map(makeInfinitiveRoots).forEach((principalParts) => {
      it(`gets correct infinitive root and pattern from ${principalParts.join('-')}`, () => {
        const root = principalParts[0].replace(/ti$/, '')
        const pattern = 'ti'
        expect(getInfinitiveRoot(principalParts)).toMatchObject({
          root,
          pattern,
        })
      })
    })
    it('throws when principal part ends in -a', () => {
      expect(() => getInfinitiveRoot(['šoka', 'šoka', 'šoko'])).toThrow(
        infinitiveRootError,
      )
    })
    it('throws when principal part count is not 3', () => {
      expect(() => getInfinitiveRoot(['šokti'])).toThrow(
        threeRootsError,
      )
    })
  })
  describe('getPastRoot', () => {
    OME.map(makePastRoots).forEach((principalParts) => {
      it(`gets correct infinitive root and pattern from ${principalParts.join('-')}`, () => {
        const root = principalParts[2].replace(/ė$/, '')
        const pattern = 'ė'
        expect(getPastRoot(principalParts)).toMatchObject({
          root,
          pattern,
        })
      })
    })
    OMO.map(makePastRoots).forEach((principalParts) => {
      it(`gets correct infinitive root and pattern from ${principalParts.join('-')}`, () => {
        const root = principalParts[2].replace(/o$/, '')
        const pattern = 'o'
        expect(getPastRoot(principalParts)).toMatchObject({
          root,
          pattern,
        })
      })
    })
    it('throws when principal part ends in -a', () => {
      expect(() => getPastRoot(['šoka', 'šoka', 'šoka'])).toThrow(
        pastRootError,
      )
    })
    it('throws when principal part count is not 3', () => {
      expect(() => getPastRoot(['šokti'])).toThrow(
        threeRootsError,
      )
    })
  })
  describe('appendSuffixWithAssimilation', () => {
    ;[
      ['deg', 'degs'],
      ['myž', 'myš'],
      ['skęs', 'skęs'],
      ['šiauš', 'šiauš'],
    ].forEach(([initial, appended]) => {
      it(`correctly appends -s to ${initial}`, () => {
        expect(
          appendSuffixWithAssimilation(initial, 's', [
            [/[sz]s$/, 's'],
            [/[šž]s$/, 'š'],
          ]),
        ).toStrictEqual(appended)
      })
    })
    ;[
      ['deg', 'dek'],
      ['myž', 'myžk'],
      ['lėk', 'lėk'],
    ].forEach(([initial, appended]) => {
      it(`correctly appends -k to ${initial}`, () => {
        expect(
          appendSuffixWithAssimilation(initial, 'k', [[/[kg]k$/, 'k']]),
        ).toStrictEqual(appended)
      })
    })
  })
  describe('stripAllAccentsFromParadigm', () => {
    const data = {
      acute: `co\u0301c`,
      short: `co\u0300c`,
      circumflex: `co\u0303c`,
      none: `coc`,
    }
    const expected = {
      acute: 'coc',
      short: 'coc',
      circumflex: 'coc',
      none: 'coc',
    }
    expect(stripAllAccentsFromParadigm(data)).toMatchObject(expected)
  })
  describe('getPalatalizedRoot', () => {
    ;[
      [`keist`, `keisči`],
      [`gird`, `girdži`],
      [`tik`, `tik`],
      [`dyg`, `dyg`],
    ].forEach(([before, after]) => {
      it(`gets palatalized root for ${before}`, () => {
        expect(getPalatalizedRoot(before)).toStrictEqual(after)
      })
    })
  })
  describe('getUnpalatalizedRoot', () => {
    ;[
      [`kenči`, `kent`],
      [`žaidži`, `žaid`],
      [`čik`, `čik`],
      [`džiaug`, `džiaug`],
    ].forEach(([before, after]) => {
      it(`gets unpalatalized root for ${before}`, () => {
        expect(getUnpalatalizedRoot(before)).toStrictEqual(after)
      })
    })
  })
  describe('putAccentOnPrefix', () => {
    it('throws error when prefix contains no vowel', () => {
      expect(() => putAccentOnPrefix('sk')).toThrow(
        prefixMustContainVowelsError,
      )
    })
    it(`puts accent on ie type prefix`, () => {
      expect(putAccentOnPrefix(`virgdies`)).toStrictEqual(`virgdie\u0303s`)
    })
    ;[['monosyllabic', ''], ['polysyllabic', 'nes']].forEach(
      ([name, prePrefix]) => {
        it(`puts accent on ${name} V\u0306 type prefix`, () => {
          expect(putAccentOnPrefix(`${prePrefix}u`)).toStrictEqual(
            `${prePrefix}u\u0300`,
          )
          expect(putAccentOnPrefix(`${prePrefix}ia`)).toStrictEqual(
            `${prePrefix}ia\u0300`,
          )
        })
        it(`puts accent on ${name} V\u0306C type prefix`, () => {
          expect(putAccentOnPrefix(`${prePrefix}us`)).toStrictEqual(
            `${prePrefix}u\u0300s`,
          )
          expect(putAccentOnPrefix(`${prePrefix}ias`)).toStrictEqual(
            `${prePrefix}ia\u0300s`,
          )
        })
        it(`puts accent on ${name} CV\u0306C type prefix`, () => {
          expect(putAccentOnPrefix(`${prePrefix}kus`)).toStrictEqual(
            `${prePrefix}ku\u0300s`,
          )
          expect(putAccentOnPrefix(`${prePrefix}kias`)).toStrictEqual(
            `${prePrefix}kia\u0300s`,
          )
        })
        it(`puts accent on ${name} V\u0304 type prefix`, () => {
          expect(putAccentOnPrefix(`${prePrefix}ė`)).toStrictEqual(
            `${prePrefix}ė\u0303`,
          )
          expect(putAccentOnPrefix(`${prePrefix}iū`)).toStrictEqual(
            `${prePrefix}iū\u0303`,
          )
        })
        it(`puts accent on ${name} V\u0304C type prefix`, () => {
          expect(putAccentOnPrefix(`${prePrefix}ės`)).toStrictEqual(
            `${prePrefix}ė\u0303s`,
          )
          expect(putAccentOnPrefix(`${prePrefix}iūs`)).toStrictEqual(
            `${prePrefix}iū\u0303s`,
          )
        })
        it(`puts accent on ${name} CV\u0304C type prefix`, () => {
          expect(putAccentOnPrefix(`${prePrefix}kės`)).toStrictEqual(
            `${prePrefix}kė\u0303s`,
          )
          expect(putAccentOnPrefix(`${prePrefix}kiūs`)).toStrictEqual(
            `${prePrefix}kiū\u0303s`,
          )
        })
        it(`puts accent on ${name} CVR type prefix`, () => {
          expect(putAccentOnPrefix(`${prePrefix}kur`)).toStrictEqual(
            `${prePrefix}kur\u0303`,
          )
          expect(putAccentOnPrefix(`${prePrefix}kiau`)).toStrictEqual(
            `${prePrefix}kiau\u0303`,
          )
        })
        it(`puts accent on ${name} CVRC type prefix`, () => {
          expect(putAccentOnPrefix(`${prePrefix}kurs`)).toStrictEqual(
            `${prePrefix}kur\u0303s`,
          )
          expect(putAccentOnPrefix(`${prePrefix}kiaus`)).toStrictEqual(
            `${prePrefix}kiau\u0303s`,
          )
        })
      },
    )
  })
  describe('isEverythingEqual', () => {
    it('[4, 4, 4] are all equal', () => {
      expect(isEverythingEqual([4, 4, 4])).toStrictEqual(true)
    })
    it('[4, 5, 4] are not all equal', () => {
      expect(isEverythingEqual([4, 5, 4])).toStrictEqual(false)
    })
  })
})
