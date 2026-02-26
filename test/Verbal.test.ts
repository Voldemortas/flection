import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import Verbal from '~src/Verbal.ts'
import {
  threeRootsError,
  unmatchingPrefixesError,
  unmatchingReflexivesError,
} from '~src/errors.ts'

describe('Verbal', () => {
  describe('constructor', () => {
    const principalParts = ['rinkti', 'renka', 'rinko']
    it('should get correct basic input', () => {
      const verb = new Verbal('rinkti-renka-rinko')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.isReflexive).toStrictEqual(false)
      expect(verb.prefix).toStrictEqual(undefined)
      assertEqualVerbals(new Verbal(principalParts), verb)
    })
    it('should get correct reflexive input', () => {
      const verb = new Verbal('rinktis-renkas-rinkosi')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.isReflexive).toStrictEqual(true)
      expect(verb.prefix).toStrictEqual(undefined)
      assertEqualVerbals(new Verbal(principalParts, { reflexive: true }), verb)
    })
    it('should get correct prefixed input', () => {
      const verb = new Verbal('ne=rinkti-ne=renka-ne=rinko')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.isReflexive).toStrictEqual(false)
      expect(verb.prefix).toStrictEqual('ne')
      assertEqualVerbals(new Verbal(principalParts, { prefix: 'ne' }), verb)
    })
    it('should get correct prefixed and reflexed input', () => {
      const verb = new Verbal('ne=rinktis-ne=renkasi-ne=rinkos')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.isReflexive).toStrictEqual(true)
      expect(verb.prefix).toStrictEqual('ne')
      assertEqualVerbals(
        new Verbal(principalParts, { prefix: 'ne', reflexive: true }),
        verb,
      )
    })
    it('should get correct prefix with reflexive input', () => {
      const verb = new Verbal('nesi=rinkti-nesi=renka-nesi=rinko')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.isReflexive).toStrictEqual(true)
      expect(verb.prefix).toStrictEqual('ne')
      assertEqualVerbals(
        new Verbal(principalParts, { prefix: 'ne', reflexive: true }),
        verb,
      )
    })
    it('should throw when prefixes mismatch', () => {
      expect(() => new Verbal('rinkti-ne=renka-ne=rinko')).toThrow(
        unmatchingPrefixesError,
      )
    })
    it('should throw when reflexive mismatches', () => {
      expect(() => new Verbal('rinktis-renka-rinko')).toThrow(
        unmatchingReflexivesError,
      )
    })
    it('it should throw when principal part count is not 3', () => {
      expect(() => new Verbal('')).toThrow(threeRootsError)
      expect(() => new Verbal('dėti-dedu')).toThrow(threeRootsError)
      expect(() => new Verbal('dėti-dedu-dėjo-dėdavo')).toThrow(threeRootsError)
    })
  })
})

export function assertEqualVerbals(a: Verbal, b: Verbal) {
  expect(a.principalParts).toStrictEqual(b.principalParts)
  expect(a.prefix).toStrictEqual(b.prefix)
  expect(a.isReflexive).toStrictEqual(b.isReflexive)
}
