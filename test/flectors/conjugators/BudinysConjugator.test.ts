import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import BudinysInflector from '~conjugators/BudinysInflector.ts'
import type { BudinysType } from '~conjugators/BudinysInflector.ts'
import { makeInfinitiveRoots, SOKTI } from '~test/testHelpers.ts'
import type { PrincipalPartsType } from '~src/types.ts'

const DAINUOTI: PrincipalPartsType = [
  `dainu\u0301oti`,
  `dainu\u0301oja`,
  `daina\u0303vo`,
]
const SOKTI_DATA = SOKTI.map(makeInfinitiveRoots)
const SOKTI_EXPECTED: BudinysType[] = [
  {
    budinys: `šokte\u0300`,
  },
  {
    budinys: `šokte\u0300`,
  },
  {
    budinys: `šokte\u0300`,
  },
  {
    budinys: `šokte`,
  },
]

describe('BudinysInflector', () => {
  const conjugator = new BudinysInflector()
  SOKTI_DATA.forEach((data, i) => {
    it(`conjugates ${data[0]}`, () => {
      expect(conjugator.getDefault(data)).toMatchObject(
        SOKTI_EXPECTED[i],
      )
    })
  })
  it('conjugate polysyllabic', () => {
    expect(conjugator.getDefault(DAINUOTI)).toMatchObject({
      budinys: `dainu\u0301ote`,
    })
  })
})
