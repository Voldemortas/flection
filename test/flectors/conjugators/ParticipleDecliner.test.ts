import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import ParticipleDecliner, {
  type ComplementingParticipleType,
  type ParticipleType,
} from '~conjugators/ParticipleDecliner.ts'
import type { PrincipalPartsType } from '~src/types.ts'
import { returnsNext, stub } from '@std/testing/mock'

const DEFAULT_DECLINED = {
  'feminine': {
    sgNom: 'gyvenanti',
  },
} as unknown as ParticipleType
const PRONOMINAL_DECLINED = {
  'feminine': {
    sgNom: 'gyvenančioji',
  },
} as unknown as ParticipleType
const DEFAULT_ACCENTED = {
  'feminine': {
    sgNom: 'gyve\u0303nanti',
  },
} as unknown as ParticipleType
const PRONOMINAL_ACCENTED = {
  'feminine': {
    sgNom: 'gyvenančio\u0301ji',
  },
} as unknown as ParticipleType

const GYVENA: PrincipalPartsType = [`_`, `_`, `_`]

class NonAbstractParticipleDecliner extends ParticipleDecliner {
  protected override getBasicPrefixed(
    principalParts: PrincipalPartsType,
    prefix: string,
    getBasicInflected?: (principalParts: PrincipalPartsType) => ParticipleType,
  ): ParticipleType {
    return this.getBasicImmobilePrefixed(
      prefix,
      principalParts,
      getBasicInflected,
    )
  }
  public override getDefault(
    _principalParts: PrincipalPartsType,
  ): ParticipleType {
    return DEFAULT_DECLINED
  }

  getPronominal(
    _principalParts: PrincipalPartsType,
  ): ComplementingParticipleType {
    return PRONOMINAL_DECLINED
  }
}

describe('ParticipleDecliner', () => {
  const conjugator = new NonAbstractParticipleDecliner()
  describe('non pronominal', () => {
    describe('prefixed', () => {
      it(`calls getPrefixed method for ne+gyvena`, () => {
        const result = conjugator.getPrefixed(GYVENA, 'ne')
        expect(result.feminine.sgNom).toStrictEqual(
          `ne${DEFAULT_DECLINED.feminine.sgNom}`,
        )
      })
      it(`calls default method for per+gyvena`, () => {
        const result = conjugator.getPrefixed(GYVENA, 'per')
        expect(result.feminine.sgNom).toStrictEqual(
          `per${DEFAULT_DECLINED.feminine.sgNom}`,
        )
      })
      it(`calls default method for per+gyve\u0303na`, () => {
        const myStub = stub(
          conjugator,
          'getDefault',
          returnsNext([DEFAULT_ACCENTED]),
        )
        const result = conjugator.getPrefixed(GYVENA, 'per')
        expect(result.feminine.sgNom).toStrictEqual(`pe\u0301rgyvenanti`)
        myStub.restore()
      })
    })
    it(`calls default method for reflexive`, () => {
      const myStub = stub(
        conjugator,
        'getDefault',
        returnsNext([DEFAULT_ACCENTED]),
      )
      const result = conjugator.getReflexive(GYVENA)
      expect(result.feminine.sgNom).toStrictEqual(
        `- (besi${DEFAULT_ACCENTED.feminine.sgNom})`,
      )
      myStub.restore()
    })
  })
  describe('pronominal', () => {
    describe('prefixed', () => {
      it(`calls getPrefixed method for ne+gyvena`, () => {
        const result = conjugator.getPrefixedPronominal(GYVENA, 'ne')
        expect(result.feminine.sgNom).toStrictEqual(
          `ne${PRONOMINAL_DECLINED.feminine.sgNom}`,
        )
      })
      it(`calls default method for per+si+gyvena`, () => {
        const result = conjugator.getPrefixedPronominal(GYVENA, 'per')
        expect(result.feminine.sgNom).toStrictEqual(
          `per${PRONOMINAL_DECLINED.feminine.sgNom}`,
        )
      })
      it(`calls default method for per+gyve\u0303na`, () => {
        const myStub = stub(
          conjugator,
          'getPronominal',
          returnsNext([PRONOMINAL_ACCENTED]),
        )
        const result = conjugator.getPrefixedPronominal(GYVENA, 'per')
        expect(result.feminine.sgNom).toStrictEqual(`pe\u0301rgyvenančioji`)
        myStub.restore()
      })
      it(`calls default method for per+si+gyve\u0303na`, () => {
        const myStub = stub(
          conjugator,
          'getPronominal',
          returnsNext([PRONOMINAL_ACCENTED]),
        )
        const result = conjugator.getPrefixedReflexivePronominal(GYVENA, 'per')
        expect(result.feminine.sgNom).toStrictEqual(`pe\u0301rsigyvenančioji`)
        myStub.restore()
      })
      it(`calls default method for reflexive`, () => {
        const myStub = stub(
          conjugator,
          'getPronominal',
          returnsNext([PRONOMINAL_ACCENTED]),
        )
        const result = conjugator.getReflexivePronominal(GYVENA)
        expect(result.feminine.sgNom).toStrictEqual(
          `- (besi${PRONOMINAL_ACCENTED.feminine.sgNom})`,
        )
        myStub.restore()
      })
    })
  })
})
