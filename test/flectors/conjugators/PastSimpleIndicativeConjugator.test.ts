import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import PastSimpleIndicativeConjugator from '~conjugators/PastSimpleIndicativeConjugator.ts'
import { OME, OMO, YTI } from '~test/testHelpers.ts'
import type { ConjugationType } from '~src/types.ts'
import { assertPrefixedReflexive, assertReflexive } from './commons.ts'

const DATA_OMO = Array.from({ length: 4 }).map((
  _,
  i,
) => [`omti`, OMO[i], OMO[i]])
const EXPECTED_OMO: ConjugationType[] = [
  {
    sg1: `omau\u0303`,
    sg2: `omai\u0303`,
    sg3: `o\u0300mo`,
    pl1: `o\u0300mome o\u0300mom`,
    pl2: `o\u0300mote o\u0300mot`,
    pl3: `o\u0300mo`,
  },
  {
    sg1: `o\u0301mau`,
    sg2: `o\u0301mai`,
    sg3: `o\u0301mo`,
    pl1: `o\u0301mome o\u0301mom`,
    pl2: `o\u0301mote o\u0301mot`,
    pl3: `o\u0301mo`,
  },
  {
    sg1: `omau\u0303`,
    sg2: `omai\u0303`,
    sg3: `o\u0303mo`,
    pl1: `o\u0303mome o\u0303mom`,
    pl2: `o\u0303mote o\u0303mot`,
    pl3: `o\u0303mo`,
  },
  {
    sg1: `omau`,
    sg2: `omai`,
    sg3: `omo`,
    pl1: `omome omom`,
    pl2: `omote omot`,
    pl3: `omo`,
  },
]
const DATA_OME = Array.from({ length: 4 }).map((
  _,
  i,
) => [`omti`, OMO[i], OME[i]])
const EXPECTED_OME: ConjugationType[] = [
  {
    sg1: `omiau\u0303`,
    sg2: `omei\u0303`,
    sg3: `o\u0300mė`,
    pl1: `o\u0300mėme o\u0300mėm`,
    pl2: `o\u0300mėte o\u0300mėt`,
    pl3: `o\u0300mė`,
  },
  {
    sg1: `o\u0301miau`,
    sg2: `o\u0301mei`,
    sg3: `o\u0301mė`,
    pl1: `o\u0301mėme o\u0301mėm`,
    pl2: `o\u0301mėte o\u0301mėt`,
    pl3: `o\u0301mė`,
  },
  {
    sg1: `omiau\u0303`,
    sg2: `omei\u0303`,
    sg3: `o\u0303mė`,
    pl1: `o\u0303mėme o\u0303mėm`,
    pl2: `o\u0303mėte o\u0303mėt`,
    pl3: `o\u0303mė`,
  },
  {
    sg1: `omiau`,
    sg2: `omei`,
    sg3: `omė`,
    pl1: `omėme omėm`,
    pl2: `omėte omėt`,
    pl3: `omė`,
  },
]
const DATA_OMYTI = Array.from({ length: 4 }).map((
  _,
  i,
) => [`om${YTI[i]}`, OMO[i], OME[i]])
const EXPECTED_NEOMYTI: ConjugationType[] = [
  {
    sg1: `ne\u0300omiau`,
    sg2: `ne\u0300omei`,
    sg3: `ne\u0300omė`,
    pl1: `ne\u0300omėme ne\u0300omėm`,
    pl2: `ne\u0300omėte ne\u0300omėt`,
    pl3: `ne\u0300omė`,
  },
  {
    sg1: `neo\u0301miau`,
    sg2: `neo\u0301mei`,
    sg3: `neo\u0301mė`,
    pl1: `neo\u0301mėme neo\u0301mėm`,
    pl2: `neo\u0301mėte neo\u0301mėt`,
    pl3: `neo\u0301mė`,
  },
  {
    sg1: `ne\u0300omiau`,
    sg2: `ne\u0300omei`,
    sg3: `ne\u0300omė`,
    pl1: `ne\u0300omėme ne\u0300omėm`,
    pl2: `ne\u0300omėte ne\u0300omėt`,
    pl3: `ne\u0300omė`,
  },
  {
    sg1: `neomiau`,
    sg2: `neomei`,
    sg3: `neomė`,
    pl1: `neomėme neomėm`,
    pl2: `neomėte neomėt`,
    pl3: `neomė`,
  },
]

describe('PastSimpleIndicativeConjugator', () => {
  const conjugator = new PastSimpleIndicativeConjugator()
  assertReflexive(conjugator)
  assertPrefixedReflexive(conjugator)
  describe('conjugate default', () => {
    DATA_OMO.forEach((data, i) => {
      it(`conjugates ${data[2]}`, () => {
        expect(conjugator.conjugateDefault(data)).toMatchObject(
          EXPECTED_OMO[i],
        )
      })
    })
    DATA_OME.forEach((data, i) => {
      it(`conjugates ${data[2]}`, () => {
        expect(conjugator.conjugateDefault(data)).toMatchObject(
          EXPECTED_OME[i],
        )
      })
    })
    DATA_OMO.forEach((data, i) => {
      it(`conjugates ne${data[0]} ne${data[2]}`, () => {
        expect(conjugator.conjugatePrefixed(data, 'ne')).toMatchObject(
          Object.fromEntries(
            Object.entries(EXPECTED_OMO[i]).map((
              [key, value],
            ) => [key, value.split(' ').map((v) => `ne${v}`).join(' ')]),
          ),
        )
      })
    })
    DATA_OME.forEach((data, i) => {
      it(`conjugates ne${data[0]} ne${data[2]}`, () => {
        expect(conjugator.conjugatePrefixed(data, 'ne')).toMatchObject(
          EXPECTED_NEOMYTI[i],
        )
      })
    })
    DATA_OMYTI.forEach((data, i) => {
      it(`conjugates ne${data[0]} ne${data[2]}`, () => {
        expect(conjugator.conjugatePrefixed(data, 'ne')).toMatchObject(
          Object.fromEntries(
            Object.entries(EXPECTED_OME[i]).map((
              [key, value],
            ) => [key, value.split(' ').map((v) => `ne${v}`).join(' ')]),
          ),
        )
      })
    })
  })
})
