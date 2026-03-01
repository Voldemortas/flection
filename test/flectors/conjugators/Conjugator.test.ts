import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import Conjugator from '~conjugators/Conjugator.ts'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'
import { assertSpyCall, returnsNext, stub } from '@std/testing/mock'
import { makeConjugatedFromArray } from '~test/testHelpers.ts'

const DEFAULT_CONJUGATED = { sg3: 'default' } as unknown as ConjugationType
const GYVENA_ACCENTED = makeConjugatedFromArray([
  [`gyvenu\u0300`, `gyveni\u0300`, `gyve\u0303na`],
  [`gyve\u0303name gyve\u0303nam`],
  [`gyve\u0303nate gyve\u0303nat`],
])
const PREFIXED_CONJUGATED = { sg3: 'prefixed' } as unknown as ConjugationType
const GYVENA: PrincipalPartsType = [`_`, `_`, `_`]

class NonAbstractConjugator extends Conjugator<ConjugationType> {
  protected override conjugateBasicPrefixed(
    _principalParts: PrincipalPartsType,
    _prefix: string,
  ): ConjugationType {
    return PREFIXED_CONJUGATED
  }
  public override conjugateDefault(
    _principalParts: PrincipalPartsType,
  ): ConjugationType {
    return DEFAULT_CONJUGATED
  }
  conjugateUnprefixedReflexive(
    _principalParts: PrincipalPartsType,
  ): ConjugationType {
    throw ''
  }
}

describe('Conjugator', () => {
  const conjugator = new NonAbstractConjugator()
  describe('prefixed', () => {
    it('calls default method for negated eiti', () => {
      const mockedValue = Math.random() as unknown as ConjugationType
      const myStub = stub(
        conjugator,
        'conjugateDefault',
        returnsNext([mockedValue]),
      )
      const result = conjugator.conjugatePrefixed(['eiti', 'eina', 'ėjo'], 'ne')
      expect(result).toStrictEqual(mockedValue)
      assertSpyCall(myStub, 0, {
        args: [['neiti', 'neina', 'nėjo']],
        returned: mockedValue,
      })
      myStub.restore()
    })
    it(`calls default method for negated ei\u0303ti`, () => {
      const mockedValue = Math.random() as unknown as ConjugationType
      const myStub = stub(
        conjugator,
        'conjugateDefault',
        returnsNext([mockedValue]),
      )
      const result = conjugator.conjugatePrefixed([
        'ei\u0303ti',
        'ei\u0303na',
        'ė\u0303jo',
      ], 'ne')
      expect(result).toStrictEqual(mockedValue)
      assertSpyCall(myStub, 0, {
        args: [['nei\u0303ti', 'nei\u0303na', 'nė\u0303jo']],
        returned: mockedValue,
      })
      myStub.restore()
    })
    it(`calls conjugatePrefixed method for ne+gyvena`, () => {
      const result = conjugator.conjugatePrefixed(GYVENA, 'ne')
      expect(result.sg3).toStrictEqual(PREFIXED_CONJUGATED.sg3)
    })
    it(`calls default method for per+gyvena`, () => {
      const result = conjugator.conjugatePrefixed(GYVENA, 'per')
      expect(result.sg3).toStrictEqual(`per${DEFAULT_CONJUGATED.sg3}`)
    })
    it(`calls default method for per+gyve\u0303na`, () => {
      const myStub = stub(
        conjugator,
        'conjugateDefault',
        returnsNext([GYVENA_ACCENTED]),
      )
      const result = conjugator.conjugatePrefixed(GYVENA, 'per')
      expect(result.sg3).toStrictEqual(`pe\u0301rgyvena`)
      myStub.restore()
    })
  })
})
