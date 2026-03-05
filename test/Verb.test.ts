import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import { assertSpyCall, returnsNext, stub } from '@std/testing/mock'
import Verb from '~src/Verb.ts'
import { EMPTY_PRINCIPAL_PARTS } from './testHelpers.ts'
import type Inflector from '~conjugators/Inflector.ts'
import type ParticipleDecliner from '~conjugators/ParticipleDecliner.ts'
import type { ParticipleType } from '~conjugators/ParticipleDecliner.ts'

describe('Verb', () => {
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
      Verb.activePastFrequentativeParticiple,
      'declineActivePastFrequentativeParticiple',
      'pastFrequentativeActiveParticiple',
    )
    assertPronominal(
      Verb.activePastFrequentativeParticiple,
      'declineActivePastFrequentativeParticiple',
      'pastFrequentativeActiveParticiple',
    )

    function assertTense<
      T extends Record<string, string | Record<string, string>>,
    >(
      conjugator: Inflector<T>,
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
      conjugator: Inflector<T> | ParticipleDecliner,
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
