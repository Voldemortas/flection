import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import Inflector from '~src/flectors/conjugators/Inflector.ts'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'
import { assertSpyCall, returnsNext, stub } from '@std/testing/mock'
import { makeConjugatedFromArray } from '~test/testHelpers.ts'

const DEFAULT_CONJUGATED = {
  sg3: 'default',
  gender: 'masculine',
} as unknown as ConjugationType
const GYVENA_ACCENTED = makeConjugatedFromArray([
  [`gyvenu\u0300`, `gyveni\u0300`, `gyve\u0303na`],
  [`gyve\u0303name gyve\u0303nam`],
  [`gyve\u0303nate gyve\u0303nat`],
])
const GYVENA: PrincipalPartsType = [`_`, `_`, `_`]

class NonAbstractConjugator extends Inflector<ConjugationType> {
  protected override getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
  ): ConjugationType {
    return this.getBasicImmobilePrefixed(prefix, principalParts)
  }
  public override getDefault(
    _principalParts: PrincipalPartsType,
  ): ConjugationType {
    return DEFAULT_CONJUGATED
  }
  getReflexive(
    _principalParts: PrincipalPartsType,
  ): ConjugationType {
    throw ''
  }
}

describe('Inflector', () => {
  const conjugator = new NonAbstractConjugator()
  describe('prefixed', () => {
    it('calls default method for negated eiti', () => {
      const mockedValue = Math.random() as unknown as ConjugationType
      const myStub = stub(
        conjugator,
        'getDefault',
        returnsNext([mockedValue]),
      )
      const result = conjugator.getPrefixed(['eiti', 'eina', 'ėjo'], 'ne')
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
        'getDefault',
        returnsNext([mockedValue]),
      )
      const result = conjugator.getPrefixed([
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
    it(`calls getPrefixed method for ne+gyvena`, () => {
      const result = conjugator.getPrefixed(GYVENA, 'ne')
      expect(result.sg3).toStrictEqual(`ne${DEFAULT_CONJUGATED.sg3}`)
    })
    it(`calls default method for per+gyvena`, () => {
      const result = conjugator.getPrefixed(GYVENA, 'per')
      expect(result.sg3).toStrictEqual(`per${DEFAULT_CONJUGATED.sg3}`)
    })
    it(`calls default method for per+gyve\u0303na`, () => {
      const myStub = stub(
        conjugator,
        'getDefault',
        returnsNext([GYVENA_ACCENTED]),
      )
      const result = conjugator.getPrefixed(GYVENA, 'per')
      expect(result.sg3).toStrictEqual(`pe\u0301rgyvena`)
      myStub.restore()
    })
    it(`correctly applies ne- to nested element`, () => {
      const mockedValue = {
        nested: { sg3: 'deda' },
      } as unknown as ConjugationType
      const myStub = stub(
        conjugator,
        'getDefault',
        returnsNext([mockedValue]),
      )
      const result = conjugator.getPrefixed(['dėti', 'deda', 'dėjo'], 'ne')
      expect(result).toMatchObject({ nested: { sg3: 'nededa' } })
      assertSpyCall(myStub, 0, {
        args: [['dėti', 'deda', 'dėjo']],
        returned: mockedValue,
      })
      myStub.restore()
    })
    it(`correctly applies per- to nested element`, () => {
      const mockedValue = {
        nested: { sg3: 'deda' },
      } as unknown as ConjugationType
      const myStub = stub(
        conjugator,
        'getDefault',
        returnsNext([mockedValue]),
      )
      const result = conjugator.getPrefixed(['dėti', 'deda', 'dėjo'], 'per')
      expect(result).toMatchObject({ nested: { sg3: 'perdeda' } })
      assertSpyCall(myStub, 0, {
        args: [['dėti', 'deda', 'dėjo']],
        returned: mockedValue,
      })
      myStub.restore()
    })
  })
})
