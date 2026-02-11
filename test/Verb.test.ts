import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import { assertSpyCall, returnsNext, stub } from '@std/testing/mock'
import Verb from '~src/Verb.ts'
import { threeRootsError, unmatchingPrefixesError } from '~src/errors.ts'
import type { ConjugationType } from '../src/types.ts'
import { makeInfinitiveRoots, SOKTI } from './testHelpers.ts'
import type Conjugator from '../src/flectors/Conjugator.ts'

describe('Verb', () => {
  describe('constructor', () => {
    const principalParts = ['rinkti', 'renka', 'rinko']
    it('should get correct basic input', () => {
      const verb = new Verb('rinkti-renka-rinko')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.isReflexive).toStrictEqual(false)
      expect(verb.prefix).toStrictEqual(undefined)
      assertEqualVerbs(new Verb(principalParts), verb)
    })
    it('should get correct reflexive input', () => {
      const verb = new Verb('rinktis-renkas-rinkosi')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.isReflexive).toStrictEqual(true)
      expect(verb.prefix).toStrictEqual(undefined)
      assertEqualVerbs(new Verb(principalParts, { reflexive: true }), verb)
    })
    it('should get correct prefixed input', () => {
      const verb = new Verb('ne=rinkti-ne=renka-ne=rinko')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.isReflexive).toStrictEqual(false)
      expect(verb.prefix).toStrictEqual('ne')
      assertEqualVerbs(new Verb(principalParts, { prefix: 'ne' }), verb)
    })
    it('should get correct prefixed and reflexed input', () => {
      const verb = new Verb('ne=rinktis-ne=renkasi-ne=rinkos')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.isReflexive).toStrictEqual(true)
      expect(verb.prefix).toStrictEqual('ne')
      assertEqualVerbs(
        new Verb(principalParts, { prefix: 'ne', reflexive: true }),
        verb,
      )
    })
    it('should get correct prefix with reflexive input', () => {
      const verb = new Verb('nesi=rinkti-nesi=renka-nesi=rinko')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.isReflexive).toStrictEqual(true)
      expect(verb.prefix).toStrictEqual('ne')
      assertEqualVerbs(
        new Verb(principalParts, { prefix: 'ne', reflexive: true }),
        verb,
      )
    })
    it('should throw when prefix or reflexiveness mismatch', () => {
      expect(() => new Verb('rinktis-ne=renka-nesi=rinko')).toThrow(
        unmatchingPrefixesError,
      )
    })
    it('it should throw when principal part count is not 3', () => {
      expect(() => new Verb('')).toThrow(threeRootsError)
      expect(() => new Verb('dėti-dedu')).toThrow(threeRootsError)
      expect(() => new Verb('dėti-dedu-dėjo-dėdavo')).toThrow(threeRootsError)
    })
  })

  function assertEqualVerbs(a: Verb, b: Verb) {
    expect(a.principalParts).toStrictEqual(b.principalParts)
    expect(a.prefix).toStrictEqual(b.prefix)
    expect(a.isReflexive).toStrictEqual(b.isReflexive)
  }
  describe('conjugations', () => {
    describe('pastFrequentativeIndicative', () => {
      const principalParts = makeInfinitiveRoots(SOKTI[0])
      it(`uses pastFrequentativeIndicative.conjugateDefault() when there's no prefix and reflexiveness`, () => {
        assertCorrectConjugationWasCalled(
          Verb.pastFrequentativeIndicative,
          'conjugateDefault',
          () =>
            new Verb(principalParts)
              .conjugatePastFrequentativeIndicative(),
          [principalParts],
        )
      })
      it(`uses pastFrequentativeIndicative.conjugatePrefixed() when there's a prefix`, () => {
        assertCorrectConjugationWasCalled(
          Verb.pastFrequentativeIndicative,
          'conjugatePrefixed',
          () =>
            new Verb(principalParts, { prefix: 'ne' })
              .conjugatePastFrequentativeIndicative(),
          [principalParts, 'ne'],
        )
      })
      it(`uses pastFrequentativeIndicative.conjugateUnprefixedReflexive() for reflexive`, () => {
        assertCorrectConjugationWasCalled(
          Verb.pastFrequentativeIndicative,
          'conjugateUnprefixedReflexive',
          () =>
            new Verb(principalParts, { reflexive: true })
              .conjugatePastFrequentativeIndicative(),
          [principalParts],
        )
      })
      it(`uses pastFrequentativeIndicative.conjugatePrefixedReflexive() for prefixed reflexive`, () => {
        assertCorrectConjugationWasCalled(
          Verb.pastFrequentativeIndicative,
          'conjugatePrefixedReflexive',
          () =>
            new Verb(principalParts, { prefix: 'ne', reflexive: true })
              .conjugatePastFrequentativeIndicative(),
          [principalParts, 'ne'],
        )
      })
    })

    function assertCorrectConjugationWasCalled(
      conjugator: Conjugator,
      method: keyof Conjugator,
      action: () => ConjugationType,
      args: [string[], string?],
    ) {
      const mockedValue = Math.random() as unknown as ConjugationType
      const myStub = stub(
        conjugator,
        method,
        returnsNext([mockedValue]),
      )
      const result = action()
      expect(result).toStrictEqual(mockedValue)
      assertSpyCall(myStub, 0, {
        args,
        returned: mockedValue,
      })
      myStub.restore()
    }
  })
})
