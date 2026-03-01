import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'
import FiniteConjugator from '~conjugators/FiniteConjugator.ts'
import { assertSpyCall, returnsNext, stub } from '@std/testing/mock'

export function assertReflexive(conjugator: FiniteConjugator) {
  describe(`conjugateUnprefixedReflexive`, () => {
    it(`calls Conjugator implementation`, () => {
      const mockedValue = { value: Math.random() } as unknown as ConjugationType
      const input = [Math.random() + ''] as unknown as PrincipalPartsType
      const myStub = stub(
        FiniteConjugator.prototype,
        'conjugateUnprefixedReflexive',
        returnsNext([mockedValue]),
      )
      const result = conjugator.conjugateUnprefixedReflexive(input)
      expect(result).toMatchObject(mockedValue)
      assertSpyCall(myStub, 0, {
        args: [input],
        returned: mockedValue,
      })
      myStub.restore()
    })
  })
}
export function assertPrefixedReflexive(conjugator: FiniteConjugator) {
  describe(`conjugatePrefixedReflexive`, () => {
    it(`calls Conjugator implementation`, () => {
      const mockedValue = { value: Math.random() } as unknown as ConjugationType
      const input = [Math.random() + ''] as unknown as PrincipalPartsType
      const prefix = Math.random() + ''
      const reflexiveStub = stub(
        conjugator,
        'conjugatePrefixed',
        returnsNext([mockedValue]),
      )
      const result = conjugator.conjugatePrefixedReflexive(input, prefix)
      expect(result).toMatchObject(mockedValue)
      assertSpyCall(reflexiveStub, 0, {
        args: [input, prefix + 'si'],
        returned: mockedValue,
      })
      reflexiveStub.restore()
    })
  })
}
