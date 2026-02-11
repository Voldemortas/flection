import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import { assertSpyCall, returnsNext, stub } from '@std/testing/mock'
import Verb from '~src/Verb.ts'
import {
  threeRootsError,
  unmatchingPrefixesError,
  unmatchingReflexivesError,
} from '~src/errors.ts'
import { makeInfinitiveRoots, SOKTI } from './testHelpers.ts'
import type Conjugator from '~src/flectors/Conjugator.ts'
import type { ConjugationType } from '~src/types.ts'

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
    it('should throw when prefixes mismatch', () => {
      expect(() => new Verb('rinkti-ne=renka-ne=rinko')).toThrow(
        unmatchingPrefixesError,
      )
    })
    it('should throw when reflexive mismatches', () => {
      expect(() => new Verb('rinktis-renka-rinko')).toThrow(
        unmatchingReflexivesError,
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
    describe('futureIndicative', () => {
      const principalParts = makeInfinitiveRoots(SOKTI[0])
      it(`uses futureIndicative.conjugateDefault() when there's no prefix and reflexiveness`, () => {
        assertCorrectConjugationWasCalled(
          Verb.futureIndicative,
          'conjugateDefault',
          () =>
            new Verb(principalParts)
              .conjugateFutureIndicative(),
          [principalParts],
        )
      })
      it(`uses futureIndicative.conjugatePrefixed() when there's a prefix`, () => {
        assertCorrectConjugationWasCalled(
          Verb.futureIndicative,
          'conjugatePrefixed',
          () =>
            new Verb(principalParts, { prefix: 'ne' })
              .conjugateFutureIndicative(),
          [principalParts, 'ne'],
        )
      })
      it(`uses futureIndicative.conjugateUnprefixedReflexive() for reflexive`, () => {
        assertCorrectConjugationWasCalled(
          Verb.futureIndicative,
          'conjugateUnprefixedReflexive',
          () =>
            new Verb(principalParts, { reflexive: true })
              .conjugateFutureIndicative(),
          [principalParts],
        )
      })
      it(`uses futureIndicative.conjugatePrefixedReflexive() for prefixed reflexive`, () => {
        assertCorrectConjugationWasCalled(
          Verb.futureIndicative,
          'conjugatePrefixedReflexive',
          () =>
            new Verb(principalParts, { prefix: 'ne', reflexive: true })
              .conjugateFutureIndicative(),
          [principalParts, 'ne'],
        )
      })
    })
    describe('pastSimpleIndicative', () => {
      const principalParts = makeInfinitiveRoots(SOKTI[0])
      it(`uses pastSimpleIndicative.conjugateDefault() when there's no prefix and reflexiveness`, () => {
        assertCorrectConjugationWasCalled(
          Verb.pastSimpleIndicative,
          'conjugateDefault',
          () =>
            new Verb(principalParts)
              .conjugatePastSimpleIndicative(),
          [principalParts],
        )
      })
      it(`uses pastSimpleIndicative.conjugatePrefixed() when there's a prefix`, () => {
        assertCorrectConjugationWasCalled(
          Verb.pastSimpleIndicative,
          'conjugatePrefixed',
          () =>
            new Verb(principalParts, { prefix: 'ne' })
              .conjugatePastSimpleIndicative(),
          [principalParts, 'ne'],
        )
      })
      it(`uses pastSimpleIndicative.conjugateUnprefixedReflexive() for reflexive`, () => {
        assertCorrectConjugationWasCalled(
          Verb.pastSimpleIndicative,
          'conjugateUnprefixedReflexive',
          () =>
            new Verb(principalParts, { reflexive: true })
              .conjugatePastSimpleIndicative(),
          [principalParts],
        )
      })
      it(`uses pastSimpleIndicative.conjugatePrefixedReflexive() for prefixed reflexive`, () => {
        assertCorrectConjugationWasCalled(
          Verb.pastSimpleIndicative,
          'conjugatePrefixedReflexive',
          () =>
            new Verb(principalParts, { prefix: 'ne', reflexive: true })
              .conjugatePastSimpleIndicative(),
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
