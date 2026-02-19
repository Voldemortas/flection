import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import { assertSpyCall, returnsNext, stub } from '@std/testing/mock'
import Verb from '~src/Verb.ts'
import {
  threeRootsError,
  unmatchingPrefixesError,
  unmatchingReflexivesError,
} from '~src/errors.ts'
import { EMPTY_PRINCIPAL_PARTS } from './testHelpers.ts'
import type Conjugator from '~conjugators/Conjugator.ts'
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
    assertTense(
      Verb.pastFrequentativeIndicative,
      'conjugatePastFrequentativeIndicative',
      'pastFrequentativeIndicative',
    )
    assertTense(
      Verb.pastSimpleIndicative,
      'conjugatePastSimpleIndicative',
      'pastSimpleIndicative',
    )
    assertTense(
      Verb.futureIndicative,
      'conjugateFutureIndicative',
      'futureIndicative',
    )
    assertTense(
      Verb.presentIndicative,
      'conjugatePresentIndicative',
      'presentIndicative',
    )
    assertTense(
      Verb.conditional,
      'conjugateConditional',
      'conditional',
    )
    assertTense(
      Verb.imperative,
      'conjugateImperative',
      'imperative',
    )

    function assertTense(
      conjugator: Conjugator,
      conjugateMethod: keyof Verb,
      conjugatorName: string,
    ) {
      describe(conjugateMethod, () => {
        const principalParts = EMPTY_PRINCIPAL_PARTS
        it(`uses ${conjugatorName}.conjugateDefault() when there's no prefix and reflexiveness`, () => {
          assertCorrectConjugationWasCalled(
            conjugator,
            'conjugateDefault',
            //@ts-ignore method is actually callable
            () => new Verb(principalParts)[conjugateMethod](),
            [principalParts],
          )
        })
        it(`uses ${conjugatorName}.conjugatePrefixed() when there's a prefix`, () => {
          assertCorrectConjugationWasCalled(
            conjugator,
            'conjugatePrefixed',
            //@ts-ignore method is actually callable
            () => new Verb(principalParts, { prefix: 'ne' })[conjugateMethod](),
            [principalParts, 'ne'],
          )
        })
        it(`uses ${conjugatorName}.conjugateUnprefixedReflexive() for reflexive`, () => {
          assertCorrectConjugationWasCalled(
            conjugator,
            'conjugateUnprefixedReflexive',
            () =>
              //@ts-ignore method is actually callable
              new Verb(principalParts, { reflexive: true })[conjugateMethod](),
            [principalParts],
          )
        })
        it(`uses ${conjugatorName}.conjugatePrefixedReflexive() for prefixed reflexive`, () => {
          assertCorrectConjugationWasCalled(
            conjugator,
            'conjugatePrefixedReflexive',
            () =>
              //@ts-ignore method is actually callable
              new Verb(principalParts, { prefix: 'ne', reflexive: true })
                [conjugateMethod](),
            [principalParts, 'ne'],
          )
        })
      })
    }

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
