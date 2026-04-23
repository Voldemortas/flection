import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import {
  appendSuffixWithAssimilation,
  countAccentedSyllable,
  getInfinitiveRoot,
  getLastStressedInflection,
  getNthLast,
  getPalatalizedRoot,
  getPastRoot,
  getPresentRoot,
  getStressedSyllable,
  getUnpalatalizedRoot,
  hasAcuteAccent,
  hasAnyAccent,
  hasCircumflexOrShortAccent,
  isEverythingEqual,
  isInflectedTheSame,
  isRootMonosyllabic,
  isStemWithoutSuffix,
  joinInflections,
  putAccentOnPrefix,
  putAccentOnString,
  stripAllAccents,
  stripAllAccentsFromParadigm,
} from '~src/utils.ts'
import {
  cannotParseSyllableError,
  infinitiveRootError,
  pastRootError,
  prefixMustContainVowelsError,
  presentRootError,
  syllableCannotCarryAcuteError,
  tooFewSyllablesError,
} from '~src/errors.ts'
import {
  makeInfinitiveRoots,
  makePastRoots,
  makePresentRoots,
  OMA,
  OME,
  OMI,
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
  })
  describe('getPresentRoot', () => {
    OMO.map(makePresentRoots).forEach((principalParts) => {
      it(`gets correct infinitive root and pattern from ${principalParts.join('-')}`, () => {
        const root = principalParts[1].replace(/o$/, '')
        const pattern = 'o'
        expect(getPresentRoot(principalParts)).toMatchObject({
          root,
          pattern,
        })
      })
    })
    OMA.map(makePresentRoots).forEach((principalParts) => {
      it(`gets correct infinitive root and pattern from ${principalParts.join('-')}`, () => {
        const root = principalParts[1].replace(/a$/, '')
        const pattern = 'a'
        expect(getPresentRoot(principalParts)).toMatchObject({
          root,
          pattern,
        })
      })
    })
    OMI.map(makePresentRoots).forEach((principalParts) => {
      it(`gets correct infinitive root and pattern from ${principalParts.join('-')}`, () => {
        const root = principalParts[1].replace(/i$/, '')
        const pattern = 'i'
        expect(getPresentRoot(principalParts)).toMatchObject({
          root,
          pattern,
        })
      })
    })
    it('throws when principal part ends in -ė', () => {
      expect(() => getPresentRoot(['šoka', 'šokė', 'šoka'])).toThrow(
        presentRootError,
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
    it('strips all accents from paradigm without nesting', () => {
      expect(stripAllAccentsFromParadigm(data)).toMatchObject(expected)
    })
    it('strips all accents from paradigm with nesting', () => {
      expect(stripAllAccentsFromParadigm({ nested: data }))
        .toMatchObject({ nested: expected })
    })
  })
  describe('getPalatalizedRoot', () => {
    ;[
      [`keist`, `keisč`],
      [`gird`, `girdž`],
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
  describe('putAccentOnString', () => {
    const WORD = `neperperoivilkiuoliegėpiams`
    it('throws when syllable is 0 or below', () => {
      expect(() => putAccentOnString(WORD, 0, true)).toThrow(
        tooFewSyllablesError,
      )
    })
    it('puts acute on the 1st syllable', () => {
      expect(putAccentOnString(WORD, 1, true)).toStrictEqual(
        `neperperoivilkiuoliegėpia\u0301ms`,
      )
    })
    it('puts acute on the 2nd syllable', () => {
      expect(putAccentOnString(WORD, 2, true)).toStrictEqual(
        `neperperoivilkiuoliegė\u0301piams`,
      )
    })
    it('puts acute on the 3rd syllable', () => {
      expect(putAccentOnString(WORD, 3, true)).toStrictEqual(
        `neperperoivilkiuoli\u0301egėpiams`,
      )
    })
    it('puts acute on the 4th syllable', () => {
      expect(putAccentOnString(WORD, 4, true)).toStrictEqual(
        `neperperoivilkiu\u0301oliegėpiams`,
      )
    })
    it('puts acute on the 5th syllable', () => {
      expect(putAccentOnString(WORD, 5, true)).toStrictEqual(
        `neperperoivi\u0300lkiuoliegėpiams`,
      )
    })
    it('puts acute on the 6th syllable', () => {
      expect(putAccentOnString(WORD, 6, true)).toStrictEqual(
        `neperpero\u0300ivilkiuoliegėpiams`,
      )
    })
    it('puts acute on the 7th syllable', () => {
      expect(() => putAccentOnString(WORD, 7, true)).toThrow(
        syllableCannotCarryAcuteError,
      )
    })
    it('puts acute on the 8th syllable', () => {
      expect(putAccentOnString(WORD, 8, true)).toStrictEqual(
        `nepe\u0301rperoivilkiuoliegėpiams`,
      )
    })
    it('puts acute on the 9th syllable', () => {
      expect(() => putAccentOnString(WORD, 9, true)).toThrow(
        syllableCannotCarryAcuteError,
      )
    })
    it("throws when syllable count is larger than word's or below", () => {
      expect(() => putAccentOnString(WORD, 10, true)).toThrow(
        tooFewSyllablesError,
      )
    })
    it('puts circumflex on the 1st syllable', () => {
      expect(putAccentOnString(WORD, 1, false)).toStrictEqual(
        `neperperoivilkiuoliegėpiam\u0303s`,
      )
    })
    it('puts circumflex on the 2nd syllable', () => {
      expect(putAccentOnString(WORD, 2, false)).toStrictEqual(
        `neperperoivilkiuoliegė\u0303piams`,
      )
    })
    it('puts circumflex on the 3rd syllable', () => {
      expect(putAccentOnString(WORD, 3, false)).toStrictEqual(
        `neperperoivilkiuolie\u0303gėpiams`,
      )
    })
    it('puts circumflex on the 4th syllable', () => {
      expect(putAccentOnString(WORD, 4, false)).toStrictEqual(
        `neperperoivilkiuo\u0303liegėpiams`,
      )
    })
    it('puts circumflex on the 5th syllable', () => {
      expect(putAccentOnString(WORD, 5, false)).toStrictEqual(
        `neperperoivil\u0303kiuoliegėpiams`,
      )
    })
    it('puts circumflex on the 6th syllable', () => {
      expect(putAccentOnString(WORD, 6, false)).toStrictEqual(
        `neperperoi\u0303vilkiuoliegėpiams`,
      )
    })
    it('puts circumflex on the 7th syllable', () => {
      expect(putAccentOnString(WORD, 7, false)).toStrictEqual(
        `neperpe\u0303roivilkiuoliegėpiams`,
      )
    })
    it('puts circumflex on the 8th syllable', () => {
      expect(putAccentOnString(WORD, 8, false)).toStrictEqual(
        `neper\u0303peroivilkiuoliegėpiams`,
      )
    })
    it('puts circumflex on the 9th syllable', () => {
      expect(putAccentOnString(WORD, 9, false, true)).toStrictEqual(
        `ne\u0300perperoivilkiuoliegėpiams`,
      )
    })
    it('puts circumflex on the 10th syllable', () => {
      expect(putAccentOnString(`iš${WORD}`, 10, false)).toStrictEqual(
        `i\u0300šneperperoivilkiuoliegėpiams`,
      )
    })
    it('throws when loop get stuck', () => {
      expect(() => putAccentOnString(`pažы\u0303ti`, 2, false)).toThrow(
        cannotParseSyllableError,
      )
    })
  })
  describe('countAccentedSyllable', () => {
    it(`finds if there's no accented syllable`, () => {
      expect(countAccentedSyllable(`labas`)).toMatchObject({
        hasAccentedSyllable: false,
      })
    })
    it('finds acute a\u0301l at the end', () => {
      expect(countAccentedSyllable(`atga\u0301l`)).toMatchObject({
        hasAccentedSyllable: true,
        type: 'acute',
        syllable: 1,
      })
    })
    it('finds acute i\u0301l at the end', () => {
      expect(countAccentedSyllable(`atgi\u0300l`)).toMatchObject({
        hasAccentedSyllable: true,
        type: 'acute',
        syllable: 1,
      })
    })
    it('finds short i\u0300s at the end', () => {
      expect(countAccentedSyllable(`ji\u0300s`)).toMatchObject({
        hasAccentedSyllable: true,
        type: 'short',
        syllable: 1,
      })
    })
    it('finds short ne\u0300 at the end', () => {
      expect(countAccentedSyllable(`ne\u0300`)).toMatchObject({
        hasAccentedSyllable: true,
        type: 'short',
        syllable: 1,
      })
    })
    it('finds circumflex at the end', () => {
      expect(countAccentedSyllable(`visur\u0303`)).toMatchObject({
        hasAccentedSyllable: true,
        type: 'circumflex',
        syllable: 1,
      })
    })

    it('finds acute a\u0301l at the start', () => {
      expect(countAccentedSyllable(`a\u0301lkanas`)).toMatchObject({
        hasAccentedSyllable: true,
        type: 'acute',
        syllable: 3,
      })
    })
    it('finds acute i\u0301l at the start', () => {
      expect(countAccentedSyllable(`i\u0300lgumas`)).toMatchObject({
        hasAccentedSyllable: true,
        type: 'acute',
        syllable: 3,
      })
    })
    it('finds short i\u0300l at the start', () => {
      expect(countAccentedSyllable(`vi\u0300liojau`)).toMatchObject({
        hasAccentedSyllable: true,
        type: 'short',
        syllable: 3,
      })
    })
    it('finds short ne\u0300 at the start', () => {
      expect(countAccentedSyllable(`ne\u0300žinau`)).toMatchObject({
        hasAccentedSyllable: true,
        type: 'short',
        syllable: 3,
      })
    })
    it('finds circumflex at the start', () => {
      expect(countAccentedSyllable(`įkur\u0303tuvės`)).toMatchObject({
        hasAccentedSyllable: true,
        type: 'circumflex',
        syllable: 3,
      })
    })
    it("throws when loop get stuck'", () => {
      expect(() => countAccentedSyllable(`bau\u0301simas`)).toThrow(
        cannotParseSyllableError,
      )
    })
  })
  describe('isRootMonosyllabic', () => {
    const data: [string, boolean][] = [
      ['duod', true],
      ['duo', true],
      ['uod', true],
      ['liuod', true],
      ['liuo', true],
      [`rin\u0303kt`, true],
      ['pažy', false],
      ['pažys', false],
      ['ažys', false],
    ]
    data.forEach(([root, isMonosyllabic]) => {
      describe(`checks if ${root} is monosyllabic`, () => {
        expect(isRootMonosyllabic(root)).toStrictEqual(isMonosyllabic)
      })
    })
  })
  describe('getNthLast', () => {
    it('gets the last element', () => {
      expect(getNthLast(['a', 'b', 'c'], 1)).toStrictEqual('c')
    })
    it('gets the chosen element', () => {
      expect(getNthLast(['a', 'b', 'c'], 2)).toStrictEqual('b')
    })
    it('gets the first element if index exceeds length', () => {
      expect(getNthLast(['a', 'b', 'c'], 4)).toStrictEqual('a')
    })
  })
  describe('isInflectedTheSame', () => {
    it('works fine for unstressed inflection', () => {
      expect(isInflectedTheSame('eiti-eina-ėjo', 'eiti-eina-ėjo')).toBeTruthy()
    })
    it('when first is unstressed', () => {
      expect(
        isInflectedTheSame(`ei\u0303ti-ei\u0303na-ė\u0303jo`, 'eiti-eina-ėjo'),
      ).toBeTruthy()
    })
    it('when second is unstressed', () => {
      expect(
        isInflectedTheSame('eiti-eina-ėjo', `e\u0301iti-e\u0301ina-ė\u0301jo`),
      ).toBeTruthy()
    })
    it('returns false when both words are stressed differently', () => {
      expect(
        isInflectedTheSame(
          `ei\u0303ti-ei\u0303na-ė\u0303jo`,
          `e\u0301iti-e\u0301ina-ė\u0301jo`,
        ),
      ).toBeFalsy()
    })
  })
  describe('inflectors', () => {
    const inflectedA = {
      a: `a\u0300`,
      u: `u\u0300`,
      i: `im\u0303 i\u0300`,
      e: `em\u0303 e\u0300`,
    }
    const inflectedB = {
      a: `a\u0300`,
      u: `u`,
      i: `im i`,
      e: `em\u0303 e`,
    }
    const inflectedJoined = {
      a: `a\u0300`,
      u: `u\u0300|u`,
      i: `im\u0303|im i\u0300|i`,
      e: `em\u0303 e\u0300|e`,
    }
    it('joins 2 inflections', () => {
      expect(joinInflections(inflectedA, inflectedB)).toMatchObject(
        inflectedJoined,
      )
    })
    it('gets the last joined inflection', () => {
      expect(getLastStressedInflection(inflectedJoined)).toMatchObject(
        inflectedB,
      )
    })
  })
  describe('isStemWithoutSuffix', () => {
    it('returns true when root is monosyllabic', () => {
      expect(isStemWithoutSuffix(`gau\u0303t`)).toBeTruthy()
      expect(isStemWithoutSuffix(`ga\u0301ut`)).toBeTruthy()
    })
    it('returns true when root is polysyllabic but the last syllabe is not acute', () => {
      expect(isStemWithoutSuffix(`gau\u0303ti`)).toBeTruthy()
      expect(isStemWithoutSuffix(`ga\u0301uti`)).toBeTruthy()
      expect(isStemWithoutSuffix(`gauti\u0300`)).toBeTruthy()
      expect(isStemWithoutSuffix(`gautė\u0303`)).toBeTruthy()
    })
    it('returns false when the last syllable is acute', () => {
      expect(isStemWithoutSuffix(`gautė\u0301`)).toBeFalsy()
      expect(isStemWithoutSuffix(`gaute\u0301i`)).toBeFalsy()
    })
  })
  describe('getStressedSyllable', () => {
    it('returns null when there is no stress', () => {
      expect(getStressedSyllable(`dėti`)).toBeNull()
    })
    it(`returns correct stressed syllable and its position`, () => {
      expect(getStressedSyllable(`padė\u0301ti`)).toMatchObject({
        text: `dė\u0301`,
        position: 2,
      })
      expect(getStressedSyllable(`padėti\u0300`)).toMatchObject({
        text: `ti\u0300`,
        position: 1,
      })
      expect(getStressedSyllable(`pe\u0301rdėti`)).toMatchObject({
        text: `pe\u0301r`,
        position: 3,
      })
    })
    it('throws when loop get stuck', () => {
      expect(() => getStressedSyllable(`pažы\u0303ti`)).toThrow(
        cannotParseSyllableError,
      )
    })
  })
})
