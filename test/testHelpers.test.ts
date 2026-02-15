import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import {
  makeConjugatedFromArray,
  makePrincipalPartsArray,
} from './testHelpers.ts'
import type { ConjugationType } from '~src/types.ts'

describe('testHelpers', () => {
  const expected: ConjugationType = {
    sg1: 'a',
    sg2: 'b',
    sg3: 'c',
    pl1: 'd',
    pl2: 'e',
    pl3: 'f',
  }
  describe('makeConjugatedFromArray', () => {
    it('works well with 6x1 array', () => {
      expect(makeConjugatedFromArray('abcdef'.split(''))).toMatchObject(
        expected,
      )
    })
    it('works well with 3x2 array', () => {
      expect(makeConjugatedFromArray([['a', 'd'], ['b', 'e'], ['c', 'f']]))
        .toMatchObject(
          expected,
        )
    })
    it('works well with 2x3 array', () => {
      expect(makeConjugatedFromArray([['a', 'b', 'c'], ['d', 'e', 'f']]))
        .toMatchObject(
          expected,
        )
    })
    it('works well with array.length = 5', () => {
      expect(makeConjugatedFromArray([['a', 'b', 'c'], ['e', 'f']]))
        .toMatchObject(
          makeConjugatedFromArray([['a', 'b', 'c'], ['e', 'f', 'c']]),
        )
    })
    it('throws when array count is not 5 or 6', () => {
      expect(() => makeConjugatedFromArray([['a', 'b'], ['e', 'f']]))
        .toThrow()
    })
  })
  describe('makePrincipalPartsArray', () => {
    it('build array', () => {
      expect(
        makePrincipalPartsArray(['eiti', 'duoti'], ['eina', 'duoda'], [
          'ėjo',
          'davė',
        ]),
      ).toStrictEqual(
        [['eiti', 'eina', 'ėjo'], [
          'duoti',
          'duoda',
          'davė',
        ]] as unknown as string[][],
      )
    })
  })
})
