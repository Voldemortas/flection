import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import { assertSpyCall, returnsNext, stub } from '@std/testing/mock'
import Verb from '~src/Verb.ts'
import { EMPTY_PRINCIPAL_PARTS } from './testHelpers.ts'
import type Conjugator from '~conjugators/Conjugator.ts'
import ADeclinator from '~decliners/ADeclinator.ts'
import type { NounType } from '~src/types.ts'

describe('Verb', () => {
  describe('deverbial nouns', () => {
    it('makes -sena noun from the infinitive root with the 1st -as accentuation', () => {
      const mockedNoun = { sgNom: 'sena' } as unknown as NounType
      const principalParts = [`dary\u0303t`, `daro`, `darė`]
      const declinerStub = stub(
        ADeclinator,
        'declineI',
        returnsNext([mockedNoun]),
      )
      const result = new Verb(principalParts).declineSenaNoun()
      expect(result).toMatchObject(mockedNoun)
      assertSpyCall(declinerStub, 0, {
        args: [`dary\u0303sen`],
        returned: mockedNoun,
      })
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

    function assertTense<T extends Record<string, string>>(
      conjugator: Conjugator<T>,
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

    function assertCorrectConjugationWasCalled<
      T extends Record<string, string>,
    >(
      conjugator: Conjugator<T>,
      method: keyof Conjugator<T>,
      action: () => T,
      args: [string[], string?],
    ) {
      const mockedValue = Math.random() as unknown as T
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
