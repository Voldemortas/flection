import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import { makeInfinitiveRoots, SOKTI } from '~test/testHelpers.ts'
import type { ConjugationType } from '~src/types.ts'
import ConditionalConjugator from '~conjugators/ConditionalConjugator.ts'

const SOKTI_DATA = SOKTI.map(makeInfinitiveRoots)
const EXPECTED_SOKTI: ConjugationType[] = [
  {
    sg1: `šo\u0300kčiau`,
    sg2: `šo\u0300ktum šo\u0300ktumei`,
    sg3: `šo\u0300ktų`,
    pl1: `šo\u0300ktume šo\u0300ktumėm šo\u0300ktumėme`,
    pl2: `šo\u0300ktumėte šo\u0300ktumėt šo\u0300ktute`,
    pl3: `šo\u0300ktų`,
  },
  {
    sg1: `šo\u0301kčiau`,
    sg2: `šo\u0301ktum šo\u0301ktumei`,
    sg3: `šo\u0301ktų`,
    pl1: `šo\u0301ktume šo\u0301ktumėm šo\u0301ktumėme`,
    pl2: `šo\u0301ktumėte šo\u0301ktumėt šo\u0301ktute`,
    pl3: `šo\u0301ktų`,
  },
  {
    sg1: `šo\u0303kčiau`,
    sg2: `šo\u0303ktum šo\u0303ktumei`,
    sg3: `šo\u0303ktų`,
    pl1: `šo\u0303ktume šo\u0303ktumėm šo\u0303ktumėme`,
    pl2: `šo\u0303ktumėte šo\u0303ktumėt šo\u0303ktute`,
    pl3: `šo\u0303ktų`,
  },
  {
    sg1: `šokčiau`,
    sg2: `šoktum šoktumei`,
    sg3: `šoktų`,
    pl1: `šoktume šoktumėm šoktumėme`,
    pl2: `šoktumėte šoktumėt šoktute`,
    pl3: `šoktų`,
  },
]
const EXPECTED_SOKTIS: ConjugationType[] = [
  {
    sg1: `šo\u0300kčiausi šo\u0300kčiaus`,
    sg2: `šo\u0300ktumeisi šo\u0300ktumeis`,
    sg3: `šo\u0300ktųsi šo\u0300ktųs`,
    pl1: `šo\u0300ktumės šo\u0300ktumėmės`,
    pl2: `šo\u0300ktumėtės šo\u0300ktutės`,
    pl3: `šo\u0300ktųsi šo\u0300ktųs`,
  },
  {
    sg1: `šo\u0301kčiausi šo\u0301kčiaus`,
    sg2: `šo\u0301ktumeisi šo\u0301ktumeis`,
    sg3: `šo\u0301ktųsi šo\u0301ktųs`,
    pl1: `šo\u0301ktumės šo\u0301ktumėmės`,
    pl2: `šo\u0301ktumėtės šo\u0301ktutės`,
    pl3: `šo\u0301ktųsi šo\u0301ktųs`,
  },
  {
    sg1: `šo\u0303kčiausi šo\u0303kčiaus`,
    sg2: `šo\u0303ktumeisi šo\u0303ktumeis`,
    sg3: `šo\u0303ktųsi šo\u0303ktųs`,
    pl1: `šo\u0303ktumės šo\u0303ktumėmės`,
    pl2: `šo\u0303ktumėtės šo\u0303ktutės`,
    pl3: `šo\u0303ktųsi šo\u0303ktųs`,
  },
  {
    sg1: `šokčiausi šokčiaus`,
    sg2: `šoktumeisi šoktumeis`,
    sg3: `šoktųsi šoktųs`,
    pl1: `šoktumės šoktumėmės`,
    pl2: `šoktumėtės šoktutės`,
    pl3: `šoktųsi šoktųs`,
  },
]

describe('ConditionalConjugator', () => {
  const conjugator = new ConditionalConjugator()
  SOKTI_DATA.forEach((data, i) => {
    it(`conjugates ${data[0]}`, () => {
      expect(conjugator.getDefault(data)).toMatchObject(
        EXPECTED_SOKTI[i],
      )
    })
  })
  SOKTI_DATA.forEach((data, i) => {
    it(`conjugates ${data[0]}s`, () => {
      expect(conjugator.getReflexive(data)).toMatchObject(
        EXPECTED_SOKTIS[i],
      )
    })
  })
})
