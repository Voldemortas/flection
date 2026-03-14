import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { InflectorInterface } from '~conjugators/Inflector.ts'
import type { PrincipalPartsType } from '~src/types.ts'
import { EMPTY_PRINCIPAL_PARTS } from '~test/testHelpers.ts'
import PadalyvisInflector from '~conjugators/PadalyvisInflector.ts'

type feminineSgType = {
  feminine: { sgNom: string }
}

const DEFAULT_CONJUGATED: feminineSgType = {
  feminine: {
    sgNom: `sa\u0303kanti`,
  },
}
const PREFIXED_CONJUGATED: feminineSgType = {
  feminine: {
    sgNom: `nesa\u0303kanti`,
  },
}
const REFLEXIVE_CONJUGATED: feminineSgType = {
  feminine: {
    sgNom: `sa\u0303kantis`,
  },
}
const PREFIXED_REFLEXIVE_CONJUGATED: feminineSgType = {
  feminine: {
    sgNom: `nesisa\u0303kanti`,
  },
}

class FeminineSgInflector implements InflectorInterface<feminineSgType> {
  getDefault(
    _principalParts: PrincipalPartsType,
  ): feminineSgType {
    return DEFAULT_CONJUGATED
  }

  getPrefixed(
    _principalParts: PrincipalPartsType,
    _prefix: string,
  ): feminineSgType {
    return PREFIXED_CONJUGATED
  }

  getReflexive(
    _principalParts: PrincipalPartsType,
  ): feminineSgType {
    return REFLEXIVE_CONJUGATED
  }

  getPrefixedReflexive(
    _principalParts: PrincipalPartsType,
    _prefix: string,
  ): feminineSgType {
    return PREFIXED_REFLEXIVE_CONJUGATED
  }
}

describe('PadalyvisInflector', () => {
  const feminineSgInflector = new FeminineSgInflector()
  const padalyvisInflector = new PadalyvisInflector(feminineSgInflector)
  it('gets default', () => {
    expect(padalyvisInflector.getDefault(EMPTY_PRINCIPAL_PARTS)).toMatchObject({
      padalyvis: `sa\u0303kant`,
    })
  })
  it('gets prefixed', () => {
    expect(padalyvisInflector.getPrefixed(EMPTY_PRINCIPAL_PARTS, 'ne'))
      .toMatchObject({ padalyvis: `nesa\u0303kant` })
  })
  it('gets reflexive', () => {
    expect(padalyvisInflector.getReflexive(EMPTY_PRINCIPAL_PARTS))
      .toMatchObject({ padalyvis: `sa\u0303kantis` })
  })
  it('gets prefixed reflexive', () => {
    expect(padalyvisInflector.getPrefixedReflexive(EMPTY_PRINCIPAL_PARTS, 'ne'))
      .toMatchObject({ padalyvis: `nesisa\u0303kant` })
  })
})
