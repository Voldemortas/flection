import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import { assertSpyCall, returnsNext, stub } from '@std/testing/mock'
import Verb from '~src/Verb.ts'
import { EMPTY_PRINCIPAL_PARTS } from './testHelpers.ts'
import type { InflectorInterface } from '~conjugators/Inflector.ts'
import type ParticipleDecliner from '~conjugators/ParticipleDecliner.ts'
import type { ParticipleType } from '~conjugators/ParticipleDecliner.ts'
import type { BudinysType } from '~conjugators/BudinysInflector.ts'
import {
  threeRootsError,
  unmatchingPrefixesError,
  unmatchingReflexivesError,
} from '~src/errors.ts'
import type { PrincipalPartsType } from '~src/types.ts'

describe('Verb', () => {
  describe('constructor', () => {
    const principalParts: PrincipalPartsType = ['rinkti', 'renka', 'rinko']
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
    assertTense(
      Verb.infinitive,
      'conjugateInfinitive',
      'infinitive',
    )
    assertTense(
      Verb.imasNoun,
      'declineImas',
      'imasNoun',
    )
    assertTense(
      Verb.pusdalyvis,
      'declinePusdalyvis',
      'pusdalyvis',
    )
    assertTense(
      Verb.passivePastParticiple,
      'declinePassivePastParticiple',
      'pastPassiveParticiple',
    )
    assertPronominal(
      Verb.passivePastParticiple,
      'declinePassivePastParticiple',
      'pastPassiveParticiple',
    )
    assertTense(
      Verb.passiveFutureParticiple,
      'declinePassiveFutureParticiple',
      'passiveFutureParticiple',
    )
    assertPronominal(
      Verb.passiveFutureParticiple,
      'declinePassiveFutureParticiple',
      'passiveFutureParticiple',
    )
    assertTense(
      Verb.passivePresentParticiple,
      'declinePassivePresentParticiple',
      'passivePresentParticiple',
    )
    assertPronominal(
      Verb.passivePresentParticiple,
      'declinePassivePresentParticiple',
      'passivePresentParticiple',
    )
    assertTense(
      Verb.activePastFrequentativeParticiple,
      'declineActivePastFrequentativeParticiple',
      'activePastFrequentativeParticiple',
    )
    assertPronominal(
      Verb.activePastFrequentativeParticiple,
      'declineActivePastFrequentativeParticiple',
      'activePastFrequentativeParticiple',
    )
    assertTense(
      Verb.activePastSimpleParticiple,
      'declineActivePastSimpleParticiple',
      'activePastSimpleParticiple',
    )
    assertPronominal(
      Verb.activePastSimpleParticiple,
      'declineActivePastSimpleParticiple',
      'activePastSimpleParticiple',
    )
    assertTense(
      Verb.activeFutureParticiple,
      'declineActiveFutureParticiple',
      'activeFutureParticiple',
    )
    assertPronominal(
      Verb.activeFutureParticiple,
      'declineActiveFutureParticiple',
      'activeFutureParticiple',
    )
    assertTense(
      Verb.activePresentParticiple,
      'declineActivePresentParticiple',
      'activePresentParticiple',
    )
    assertPronominal(
      Verb.activePresentParticiple,
      'declineActivePresentParticiple',
      'activePresentParticiple',
    )
    assertTense(
      Verb.presentPadalyvis,
      'conjugatePresentPadalyvis',
      'presentPadalyvis',
    )
    assertTense(
      Verb.futurePadalyvis,
      'conjugateFuturePadalyvis',
      'futurePadalyvis',
    )
    assertTense(
      Verb.pastSimplePadalyvis,
      'conjugatePastSimplePadalyvis',
      'pastSimplePadalyvis',
    )
    assertTense(
      Verb.pastFrequentativePadalyvis,
      'conjugatePastFrequentativePadalyvis',
      'pastFrequentativePadalyvis',
    )
    describe('būdinys', () => {
      it('calls būdinys default', () => {
        assertCorrectConjugationWasCalled(
          Verb.budinys as unknown as InflectorInterface<BudinysType>,
          'getDefault',
          () => new Verb(EMPTY_PRINCIPAL_PARTS).conjugateBudinys(),
          [EMPTY_PRINCIPAL_PARTS],
        )
      })
    })
    assertTense(
      Verb.necessityParticiple,
      'declineNecessityParticiple',
      'necessityParticiple',
    )
    assertPronominal(
      Verb.necessityParticiple,
      'declineNecessityParticiple',
      'necessityParticiple',
    )

    function assertTense<
      T extends Record<string, string | Record<string, string>>,
    >(
      conjugator: InflectorInterface<T>,
      conjugateMethod: keyof Verb,
      conjugatorName: string,
    ) {
      describe(conjugateMethod, () => {
        const principalParts = EMPTY_PRINCIPAL_PARTS
        it(`uses ${conjugatorName}.getDefault() when there's no prefix and reflexiveness`, () => {
          assertCorrectConjugationWasCalled(
            conjugator,
            'getDefault',
            //@ts-ignore method is actually callable
            () => new Verb(principalParts)[conjugateMethod](false),
            [principalParts],
          )
        })
        it(`uses ${conjugatorName}.getPrefixed() when there's a prefix`, () => {
          assertCorrectConjugationWasCalled(
            conjugator,
            'getPrefixed',
            () =>
              //@ts-ignore method is actually callable
              new Verb(principalParts, { prefix: 'ne' })[conjugateMethod](
                false,
              ),
            [principalParts, 'ne'],
          )
        })
        it(`uses ${conjugatorName}.getReflexive() for reflexive`, () => {
          assertCorrectConjugationWasCalled(
            conjugator,
            'getReflexive',
            () =>
              //@ts-ignore method is actually callable
              new Verb(principalParts, { reflexive: true })[conjugateMethod](
                false,
              ),
            [principalParts],
          )
        })
        it(`uses ${conjugatorName}.getPrefixedReflexive() for prefixed reflexive`, () => {
          assertCorrectConjugationWasCalled(
            conjugator,
            'getPrefixedReflexive',
            () =>
              //@ts-ignore method is actually callable
              new Verb(principalParts, { prefix: 'ne', reflexive: true })
                [conjugateMethod](false),
            [principalParts, 'ne'],
          )
        })
      })
    }

    function assertPronominal(
      conjugator: ParticipleDecliner,
      conjugateMethod: keyof Verb,
      conjugatorName: string,
    ) {
      describe(conjugateMethod, () => {
        const principalParts = EMPTY_PRINCIPAL_PARTS
        it(`uses pronominal ${conjugatorName}.getDefault() when there's no prefix and reflexiveness`, () => {
          assertCorrectConjugationWasCalled(
            conjugator,
            'getPronominal',
            //@ts-ignore method is actually callable
            () => new Verb(principalParts)[conjugateMethod](true),
            [principalParts],
          )
        })
        it(`uses pronominal ${conjugatorName}.getPrefixed() when there's a prefix`, () => {
          assertCorrectConjugationWasCalled(
            conjugator,
            'getPrefixedPronominal',
            () =>
              //@ts-ignore method is actually callable
              new Verb(principalParts, { prefix: 'ne' })[conjugateMethod](true),
            [principalParts, 'ne'],
          )
        })
        it(`uses pronominal ${conjugatorName}.getReflexive() for reflexive`, () => {
          assertCorrectConjugationWasCalled(
            conjugator,
            'getReflexivePronominal',
            () =>
              //@ts-ignore method is actually callable
              new Verb(principalParts, { reflexive: true })[conjugateMethod](
                true,
              ),
            [principalParts],
          )
        })
        it(`uses pronominal ${conjugatorName}.getPrefixedReflexive() for prefixed reflexive`, () => {
          assertCorrectConjugationWasCalled(
            conjugator,
            'getPrefixedReflexivePronominal',
            () =>
              //@ts-ignore method is actually callable
              new Verb(principalParts, { prefix: 'ne', reflexive: true })
                [conjugateMethod](true),
            [principalParts, 'ne'],
          )
        })
      })
    }

    function assertCorrectConjugationWasCalled<
      T extends Record<string, string | Record<string, string>>,
    >(
      conjugator: InflectorInterface<T> | ParticipleDecliner,
      method: keyof (ParticipleDecliner),
      action: () => T,
      args: [string[], string?],
    ) {
      const mockedValue = Math.random() as unknown as T
      const myStub = stub(
        conjugator as unknown as ParticipleDecliner,
        method,
        returnsNext([mockedValue as unknown as ParticipleType]),
      )
      const result = action()
      expect(result).toStrictEqual(mockedValue)
      assertSpyCall(myStub, 0, {
        args,
        returned: mockedValue as unknown as ParticipleType,
      })
      myStub.restore()
    }
  })
})

function assertEqualVerbs(a: Verb, b: Verb) {
  expect(a.principalParts).toStrictEqual(b.principalParts)
  expect(a.prefix).toStrictEqual(b.prefix)
  expect(a.isReflexive).toStrictEqual(b.isReflexive)
}
