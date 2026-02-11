import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import {
  appendSuffixWithAssimilation,
  getInfinitiveRoot,
  hasAcuteAccent,
  hasAnyAccent,
  hasCircumflexOrShortAccent,
  stripAllAccents,
} from '~src/utils.ts'
import { makeInfinitiveRoots, SOKTI } from './testHelpers.ts'
import { infinitiveRootError, threeRootsError } from '../src/errors.ts'

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
})
