import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import PastFrequentativeIndicativeConjugator from '~src/flectors/PastFrequentativeIndicativeConjugator.ts'
import { makeInfinitiveRoots, SOKTI } from '~test/testHelpers.ts'
import type { ConjugationType } from '~src/types.ts'

const PREFIX = 'ne'
const PER = 'per'
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
const EXPECTED_PREFIXED: ConjugationType[] = [
  {
    sg1: `nešo\u0300kdavau`,
    sg2: `nešo\u0300kdavai`,
    sg3: `nešo\u0300kdavo`,
    pl1: `nešo\u0300kdavome nešo\u0300kdavom`,
    pl2: `nešo\u0300kdavote nešo\u0300kdavot`,
    pl3: `nešo\u0300kdavo`,
  },
  {
    sg1: `nešo\u0301kdavau`,
    sg2: `nešo\u0301kdavai`,
    sg3: `nešo\u0301kdavo`,
    pl1: `nešo\u0301kdavome nešo\u0301kdavom`,
    pl2: `nešo\u0301kdavote nešo\u0301kdavot`,
    pl3: `nešo\u0301kdavo`,
  },
  {
    sg1: `nešo\u0303kdavau`,
    sg2: `nešo\u0303kdavai`,
    sg3: `nešo\u0303kdavo`,
    pl1: `nešo\u0303kdavome nešo\u0303kdavom`,
    pl2: `nešo\u0303kdavote nešo\u0303kdavot`,
    pl3: `nešo\u0303kdavo`,
  },
  {
    sg1: `nešokdavau`,
    sg2: `nešokdavai`,
    sg3: `nešokdavo`,
    pl1: `nešokdavome nešokdavom`,
    pl2: `nešokdavote nešokdavot`,
    pl3: `nešokdavo`,
  },
]
const EXPECTED_PER_PREFIXED: ConjugationType[] = [
  {
    sg1: `pe\u0301ršokdavau`,
    sg2: `pe\u0301ršokdavai`,
    sg3: `pe\u0301ršokdavo`,
    pl1: `pe\u0301ršokdavome pe\u0301ršokdavom`,
    pl2: `pe\u0301ršokdavote pe\u0301ršokdavot`,
    pl3: `pe\u0301ršokdavo`,
  },
  {
    sg1: `pe\u0301ršokdavau`,
    sg2: `pe\u0301ršokdavai`,
    sg3: `pe\u0301ršokdavo`,
    pl1: `pe\u0301ršokdavome pe\u0301ršokdavom`,
    pl2: `pe\u0301ršokdavote pe\u0301ršokdavot`,
    pl3: `pe\u0301ršokdavo`,
  },
  {
    sg1: `pe\u0301ršokdavau`,
    sg2: `pe\u0301ršokdavai`,
    sg3: `pe\u0301ršokdavo`,
    pl1: `pe\u0301ršokdavome pe\u0301ršokdavom`,
    pl2: `pe\u0301ršokdavote pe\u0301ršokdavot`,
    pl3: `pe\u0301ršokdavo`,
  },
  {
    sg1: `peršokdavau`,
    sg2: `peršokdavai`,
    sg3: `peršokdavo`,
    pl1: `peršokdavome peršokdavom`,
    pl2: `peršokdavote peršokdavot`,
    pl3: `peršokdavo`,
  },
]
const EXPECTED_I_PREFIXED: ConjugationType[] = [
  {
    sg1: `į\u0301šokdavau`,
    sg2: `į\u0301šokdavai`,
    sg3: `į\u0301šokdavo`,
    pl1: `į\u0301šokdavome į\u0301šokdavom`,
    pl2: `į\u0301šokdavote į\u0301šokdavot`,
    pl3: `į\u0301šokdavo`,
  },
  {
    sg1: `į\u0301šokdavau`,
    sg2: `į\u0301šokdavai`,
    sg3: `į\u0301šokdavo`,
    pl1: `į\u0301šokdavome į\u0301šokdavom`,
    pl2: `į\u0301šokdavote į\u0301šokdavot`,
    pl3: `į\u0301šokdavo`,
  },
  {
    sg1: `į\u0301šokdavau`,
    sg2: `į\u0301šokdavai`,
    sg3: `į\u0301šokdavo`,
    pl1: `į\u0301šokdavome į\u0301šokdavom`,
    pl2: `į\u0301šokdavote į\u0301šokdavot`,
    pl3: `į\u0301šokdavo`,
  },
  {
    sg1: `įšokdavau`,
    sg2: `įšokdavai`,
    sg3: `įšokdavo`,
    pl1: `įšokdavome įšokdavom`,
    pl2: `įšokdavote įšokdavot`,
    pl3: `įšokdavo`,
  },
]
const EXPECTED_PREFIXED_REFLEXIVE: ConjugationType[] = [
  {
    sg1: `nesišo\u0300kdavau`,
    sg2: `nesišo\u0300kdavai`,
    sg3: `nesišo\u0300kdavo`,
    pl1: `nesišo\u0300kdavome nesišo\u0300kdavom`,
    pl2: `nesišo\u0300kdavote nesišo\u0300kdavot`,
    pl3: `nesišo\u0300kdavo`,
  },
  {
    sg1: `nesišo\u0301kdavau`,
    sg2: `nesišo\u0301kdavai`,
    sg3: `nesišo\u0301kdavo`,
    pl1: `nesišo\u0301kdavome nesišo\u0301kdavom`,
    pl2: `nesišo\u0301kdavote nesišo\u0301kdavot`,
    pl3: `nesišo\u0301kdavo`,
  },
  {
    sg1: `nesišo\u0303kdavau`,
    sg2: `nesišo\u0303kdavai`,
    sg3: `nesišo\u0303kdavo`,
    pl1: `nesišo\u0303kdavome nesišo\u0303kdavom`,
    pl2: `nesišo\u0303kdavote nesišo\u0303kdavot`,
    pl3: `nesišo\u0303kdavo`,
  },
  {
    sg1: `nesišokdavau`,
    sg2: `nesišokdavai`,
    sg3: `nesišokdavo`,
    pl1: `nesišokdavome nesišokdavom`,
    pl2: `nesišokdavote nesišokdavot`,
    pl3: `nesišokdavo`,
  },
]
const EXPECTED_REFLEXIVE: ConjugationType[] = [
  {
    sg1: `šo\u0300kdavausi šo\u0300kdavaus`,
    sg2: `šo\u0300kdavaisi šo\u0300kdavais`,
    sg3: `šo\u0300kdavosi šo\u0300kdavos`,
    pl1: `šo\u0300kdavomės`,
    pl2: `šo\u0300kdavotės`,
    pl3: `šo\u0300kdavosi šo\u0300kdavos`,
  },
  {
    sg1: `šo\u0301kdavausi šo\u0301kdavaus`,
    sg2: `šo\u0301kdavaisi šo\u0301kdavais`,
    sg3: `šo\u0301kdavosi šo\u0301kdavos`,
    pl1: `šo\u0301kdavomės`,
    pl2: `šo\u0301kdavotės`,
    pl3: `šo\u0301kdavosi šo\u0301kdavos`,
  },
  {
    sg1: `šo\u0303kdavausi šo\u0303kdavaus`,
    sg2: `šo\u0303kdavaisi šo\u0303kdavais`,
    sg3: `šo\u0303kdavosi šo\u0303kdavos`,
    pl1: `šo\u0303kdavomės`,
    pl2: `šo\u0303kdavotės`,
    pl3: `šo\u0303kdavosi šo\u0303kdavos`,
  },
  {
    sg1: `šokdavausi šokdavaus`,
    sg2: `šokdavaisi šokdavais`,
    sg3: `šokdavosi šokdavos`,
    pl1: `šokdavomės`,
    pl2: `šokdavotės`,
    pl3: `šokdavosi šokdavos`,
  },
]

describe('PastFrequentativeIndicativeConjugator', () => {
  const conjugator = new PastFrequentativeIndicativeConjugator()
  describe('conjugateDefault', () => {
    DATA.forEach((data, i) => {
      it(`conjugates default ${data[0]}`, () => {
        expect(conjugator.conjugateDefault(data)).toMatchObject(
          EXPECTED_DEFAULT[i],
        )
      })
    })
  })
  describe('conjugatePrefixed', () => {
    DATA.forEach((data, i) => {
      it(`conjugates prefixed ne-${data[0]}`, () => {
        expect(conjugator.conjugatePrefixed(data, PREFIX)).toMatchObject(
          EXPECTED_PREFIXED[i],
        )
      })
      it(`conjugates prefixed per-${data[0]}`, () => {
        expect(conjugator.conjugatePrefixed(data, PER)).toMatchObject(
          EXPECTED_PER_PREFIXED[i],
        )
      })
      it(`conjugates prefixed į\u0301-${data[0]}`, () => {
        expect(conjugator.conjugatePrefixed(data, `į\u0301`)).toMatchObject(
          EXPECTED_I_PREFIXED[i],
        )
      })
    })
  })
  describe('conjugatePrefixedReflexive', () => {
    DATA.forEach((data, i) => {
      it(`conjugates prefixed and reflexive ${data[0]}`, () => {
        expect(conjugator.conjugatePrefixedReflexive(data, PREFIX))
          .toMatchObject(EXPECTED_PREFIXED_REFLEXIVE[i])
      })
    })
  })
  describe('conjugateUnprefixedReflexive', () => {
    DATA.forEach((data, i) => {
      it(`conjugates reflexive ${data[0]}`, () => {
        expect(conjugator.conjugateUnprefixedReflexive(data)).toMatchObject(
          EXPECTED_REFLEXIVE[i],
        )
      })
    })
  })
})
