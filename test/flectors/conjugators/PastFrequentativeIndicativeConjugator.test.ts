import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import PastFrequentativeIndicativeConjugator from '~conjugators/PastFrequentativeIndicativeConjugator.ts'
import { makeInfinitiveRoots, SOKTI } from '~test/testHelpers.ts'
import type { ConjugationType } from '~src/types.ts'
import { assertPrefixedReflexive, assertReflexive } from './commons.ts'

const DATA = SOKTI.map(makeInfinitiveRoots)
const EXPECTED_DEFAULT: ConjugationType[] = [
  {
    sg1: `šo\u0300kdavau`,
    sg2: `šo\u0300kdavai`,
    sg3: `šo\u0300kdavo`,
    pl1: `šo\u0300kdavome šo\u0300kdavom`,
    pl2: `šo\u0300kdavote šo\u0300kdavot`,
    pl3: `šo\u0300kdavo`,
  },
  {
    sg1: `šo\u0301kdavau`,
    sg2: `šo\u0301kdavai`,
    sg3: `šo\u0301kdavo`,
    pl1: `šo\u0301kdavome šo\u0301kdavom`,
    pl2: `šo\u0301kdavote šo\u0301kdavot`,
    pl3: `šo\u0301kdavo`,
  },
  {
    sg1: `šo\u0303kdavau`,
    sg2: `šo\u0303kdavai`,
    sg3: `šo\u0303kdavo`,
    pl1: `šo\u0303kdavome šo\u0303kdavom`,
    pl2: `šo\u0303kdavote šo\u0303kdavot`,
    pl3: `šo\u0303kdavo`,
  },
  {
    sg1: `šokdavau`,
    sg2: `šokdavai`,
    sg3: `šokdavo`,
    pl1: `šokdavome šokdavom`,
    pl2: `šokdavote šokdavot`,
    pl3: `šokdavo`,
  },
]

describe('PastFrequentativeIndicativeConjugator', () => {
  const conjugator = new PastFrequentativeIndicativeConjugator()
  describe('getDefault', () => {
    DATA.forEach((data, i) => {
      it(`conjugates default ${data[0]}`, () => {
        expect(conjugator.getDefault(data)).toMatchObject(
          EXPECTED_DEFAULT[i],
        )
      })
    })
  })
  assertReflexive(conjugator)
  assertPrefixedReflexive(conjugator)
})
