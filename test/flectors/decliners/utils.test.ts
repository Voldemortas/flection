import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import { getThirdAccentuationType } from '~decliners/utils.ts'
import { thirdAccentuationTypeError } from '~src/errors.ts'

describe('decliners/utils', () => {
  describe('getThirdAccentuationType', () => {
    it('correctly parses default', () => {
      expect(getThirdAccentuationType()).toMatchObject({
        isAcute: true,
        syllable: 2,
      })
    })
    it('correctly parses a', () => {
      expect(getThirdAccentuationType('a')).toMatchObject({
        isAcute: true,
        syllable: 3,
      })
    })
    it('correctly parses b', () => {
      expect(getThirdAccentuationType('b')).toMatchObject({
        isAcute: false,
        syllable: 3,
      })
    })
    it('correctly parses 4a', () => {
      expect(getThirdAccentuationType('4a')).toMatchObject({
        isAcute: true,
        syllable: 4,
      })
    })
    it('correctly parses 4b', () => {
      expect(getThirdAccentuationType('4b')).toMatchObject({
        isAcute: false,
        syllable: 4,
      })
    })
    it('correctly parses 2', () => {
      expect(getThirdAccentuationType('2')).toMatchObject({
        isAcute: false,
        syllable: 1,
      })
    })
    it('correctly parses 3', () => {
      expect(getThirdAccentuationType('3')).toMatchObject({
        isAcute: true,
        syllable: 2,
      })
    })
    it('correctly parses 4', () => {
      expect(getThirdAccentuationType('4')).toMatchObject({
        isAcute: false,
        syllable: 2,
      })
    })
    it('correctly parses object', () => {
      expect(getThirdAccentuationType({ isAcute: false, syllable: 5 }))
        .toMatchObject({
          isAcute: false,
          syllable: 5,
        })
    })
    it('throws on unexpected', () => {
      expect(() => getThirdAccentuationType('')).toThrow(
        thirdAccentuationTypeError,
      )
      expect(() => getThirdAccentuationType('0b')).toThrow(
        thirdAccentuationTypeError,
      )
      expect(() => getThirdAccentuationType('5')).toThrow(
        thirdAccentuationTypeError,
      )
      //@ts-ignore bad value on purpose
      expect(() => getThirdAccentuationType({ syllable: 4 })).toThrow(
        thirdAccentuationTypeError,
      )
    })
  })
})
