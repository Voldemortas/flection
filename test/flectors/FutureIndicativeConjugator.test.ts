import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import { makeInfinitiveRoots, SOKTI } from '~test/testHelpers.ts'
import type { ConjugationType } from '~src/types.ts'
import FutureIndicativeConjugator from '~src/flectors/FutureIndicativeConjugator.ts'
import { stripAllAccentsFromParadigm } from '~src/utils.ts'
import { siutiFuture, vytiFuture } from '~src/flectors/utils.ts'

const SOKTI_DATA = SOKTI.map(makeInfinitiveRoots)
const GYTI_DATA = ['gy\u0301ti', 'gy\u0303ti', 'gyti'].map(makeInfinitiveRoots)
const BUTI_DATA = ['bū\u0301ti', 'bū\u0303ti', 'būti'].map(makeInfinitiveRoots)
const EXPECTED_SOKTI: ConjugationType[] = [
  {
    sg1: `šo\u0300ksiu`,
    sg2: `šo\u0300ksi`,
    sg3: `šo\u0300ks`,
    pl1: `šo\u0300ksime šo\u0300ksim`,
    pl2: `šo\u0300ksite šo\u0300ksit`,
    pl3: `šo\u0300ks`,
  },
  {
    sg1: `šo\u0301ksiu`,
    sg2: `šo\u0301ksi`,
    sg3: `šo\u0303ks`,
    pl1: `šo\u0301ksime šo\u0301ksim`,
    pl2: `šo\u0301ksite šo\u0301ksit`,
    pl3: `šo\u0303ks`,
  },
  {
    sg1: `šo\u0303ksiu`,
    sg2: `šo\u0303ksi`,
    sg3: `šo\u0303ks`,
    pl1: `šo\u0303ksime šo\u0303ksim`,
    pl2: `šo\u0303ksite šo\u0303ksit`,
    pl3: `šo\u0303ks`,
  },
  {
    sg1: `šoksiu`,
    sg2: `šoksi`,
    sg3: `šoks`,
    pl1: `šoksime šoksim`,
    pl2: `šoksite šoksit`,
    pl3: `šoks`,
  },
]
const EXPECTED_SOKTIS: ConjugationType[] = [
  {
    sg1: `šo\u0300ksiuosi šo\u0300ksiuos`,
    sg2: `šo\u0300ksiesi šo\u0300ksies`,
    sg3: `šo\u0300ksis`,
    pl1: `šo\u0300ksimės`,
    pl2: `šo\u0300ksitės`,
    pl3: `šo\u0300ksis`,
  },
  {
    sg1: `šo\u0301ksiuosi šo\u0301ksiuos`,
    sg2: `šo\u0301ksiesi šo\u0301ksies`,
    sg3: `šo\u0303ksis`,
    pl1: `šo\u0301ksimės`,
    pl2: `šo\u0301ksitės`,
    pl3: `šo\u0303ksis`,
  },
  {
    sg1: `šo\u0303ksiuosi šo\u0303ksiuos`,
    sg2: `šo\u0303ksiesi šo\u0303ksies`,
    sg3: `šo\u0303ksis`,
    pl1: `šo\u0303ksimės`,
    pl2: `šo\u0303ksitės`,
    pl3: `šo\u0303ksis`,
  },
  {
    sg1: `šoksiuosi šoksiuos`,
    sg2: `šoksiesi šoksies`,
    sg3: `šoksis`,
    pl1: `šoksimės`,
    pl2: `šoksitės`,
    pl3: `šoksis`,
  },
]
const EXPECTED_GYTI: ConjugationType[] = [
  {
    sg1: `gy\u0301siu`,
    sg2: `gy\u0301si`,
    sg3: `gi\u0300s`,
    pl1: `gy\u0301sime gy\u0301sim`,
    pl2: `gy\u0301site gy\u0301sit`,
    pl3: `gi\u0300s`,
  },
  {
    sg1: `gy\u0303siu`,
    sg2: `gy\u0303si`,
    sg3: `gi\u0300s`,
    pl1: `gy\u0303sime gy\u0303sim`,
    pl2: `gy\u0303site gy\u0303sit`,
    pl3: `gi\u0300s`,
  },
  {
    sg1: `gysiu`,
    sg2: `gysi`,
    sg3: `gis`,
    pl1: `gysime gysim`,
    pl2: `gysite gysit`,
    pl3: `gis`,
  },
]
const EXPECTED_BUTI: ConjugationType[] = [
  {
    sg1: `bū\u0301siu`,
    sg2: `bū\u0301si`,
    sg3: `bu\u0300s`,
    pl1: `bū\u0301sime bū\u0301sim`,
    pl2: `bū\u0301site bū\u0301sit`,
    pl3: `bu\u0300s`,
  },
  {
    sg1: `bū\u0303siu`,
    sg2: `bū\u0303si`,
    sg3: `bu\u0300s`,
    pl1: `bū\u0303sime bū\u0303sim`,
    pl2: `bū\u0303site bū\u0303sit`,
    pl3: `bu\u0300s`,
  },
  {
    sg1: `būsiu`,
    sg2: `būsi`,
    sg3: `bus`,
    pl1: `būsime būsim`,
    pl2: `būsite būsit`,
    pl3: `bus`,
  },
]

describe('FutureIndicativeConjugator', () => {
  const conjugator = new FutureIndicativeConjugator()
  describe('conjugateDefault', () => {
    SOKTI_DATA.forEach((data, i) => {
      it(`conjugates ${data[0]}`, () => {
        expect(conjugator.conjugateDefault(data)).toMatchObject(
          EXPECTED_SOKTI[i],
        )
      })
    })
    SOKTI_DATA.forEach((data, i) => {
      it(`conjugates ${data[0]}s`, () => {
        expect(conjugator.conjugateUnprefixedReflexive(data)).toMatchObject(
          EXPECTED_SOKTIS[i],
        )
      })
    })
    GYTI_DATA.forEach((data, i) => {
      it(`conjugates ${data[0]}`, () => {
        expect(conjugator.conjugateDefault(data)).toMatchObject(
          EXPECTED_GYTI[i],
        )
      })
    })
    BUTI_DATA.forEach((data, i) => {
      it(`conjugates ${data[0]}`, () => {
        expect(conjugator.conjugateDefault(data)).toMatchObject(
          EXPECTED_BUTI[i],
        )
      })
    })
    it(`conjugates vyti`, () => {
      expect(conjugator.conjugateDefault(makeInfinitiveRoots(`vyti`)))
        .toMatchObject(
          stripAllAccentsFromParadigm(vytiFuture),
        )
      expect(conjugator.conjugateDefault(makeInfinitiveRoots(`vy\u0301ti`)))
        .toMatchObject(
          vytiFuture,
        )
    })
    it(`conjugates siūti`, () => {
      expect(conjugator.conjugateDefault(makeInfinitiveRoots(`siūti`)))
        .toMatchObject(
          stripAllAccentsFromParadigm(siutiFuture),
        )
      expect(conjugator.conjugateDefault(makeInfinitiveRoots(`siū\u0301ti`)))
        .toMatchObject(
          siutiFuture,
        )
    })
  })
  describe('some prefixed tests', () => {
    const gauti = makeInfinitiveRoots(`ga\u0301uti`)
    const myzti = makeInfinitiveRoots(`my\u0301žti`)
    it('correcly conjugates prefixed words', () => {
      expect(conjugator.conjugatePrefixed(gauti, 'ne').sg3).toStrictEqual(`negau\u0303s`)
      expect(conjugator.conjugatePrefixed(myzti, 'ne').sg3).toStrictEqual(`nemy\u0303š`)
      expect(conjugator.conjugatePrefixed(gauti, 'per').sg3).toStrictEqual(`pe\u0301rgaus`)
      expect(conjugator.conjugatePrefixed(myzti, 'per').sg3).toStrictEqual(`pe\u0301rmyš`)
    })
    it('correcly conjugates prefixed reflexive words', () => {
      expect(conjugator.conjugatePrefixedReflexive(gauti, 'ne').sg3).toStrictEqual(`nesigau\u0303s`)
      expect(conjugator.conjugatePrefixedReflexive(myzti, 'ne').sg3).toStrictEqual(`nesimy\u0303š`)
      expect(conjugator.conjugatePrefixedReflexive(gauti, 'per').sg3).toStrictEqual(`pe\u0301rsigaus`)
      expect(conjugator.conjugatePrefixedReflexive(myzti, 'per').sg3).toStrictEqual(`pe\u0301rsimyš`)
    })
  })
})
