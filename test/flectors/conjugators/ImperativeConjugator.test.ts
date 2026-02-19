import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { ConjugationType } from '~src/types.ts'
import ImperativeConjugator from '~conjugators/ImperativeConjugator.ts'

const BEGTI = [`bė\u0301gti`, `bė\u0301ga`, `bė\u0301go`]

const EXPECTED_BEGTI: ConjugationType = {
  sg1: `-`,
  sg2: `bė\u0301k bė\u0301ki`,
  sg3: `-`,
  pl1: `bė\u0301kim bė\u0301kime`,
  pl2: `bė\u0301kit bė\u0301kite`,
  pl3: `-`,
}
const EXPECTED_BEGTIS: ConjugationType = {
  sg1: `-`,
  sg2: `bė\u0301kis`,
  sg3: `-`,
  pl1: `bė\u0301kimės`,
  pl2: `bė\u0301kitės`,
  pl3: `-`,
}
const EXPECTED_PERBEGTI: ConjugationType = {
  sg1: `-`,
  sg2: `pe\u0301rbėk pe\u0301rbėki`,
  sg3: `-`,
  pl1: `pe\u0301rbėkim pe\u0301rbėkime`,
  pl2: `pe\u0301rbėkit pe\u0301rbėkite`,
  pl3: `-`,
}
const EXPECTED_NEBEGTI: ConjugationType = {
  sg1: `-`,
  sg2: `nebė\u0301k nebė\u0301ki`,
  sg3: `-`,
  pl1: `nebė\u0301kim nebė\u0301kime`,
  pl2: `nebė\u0301kit nebė\u0301kite`,
  pl3: `-`,
}
const EXPECTED_NESIBEGTI: ConjugationType = {
  sg1: `-`,
  sg2: `nesibė\u0301k nesibė\u0301ki`,
  sg3: `-`,
  pl1: `nesibė\u0301kim nesibė\u0301kime`,
  pl2: `nesibė\u0301kit nesibė\u0301kite`,
  pl3: `-`,
}

describe('ConditionalConjugator', () => {
  const conjugator = new ImperativeConjugator()
  it('conjugates bėgti', () => {
    expect(conjugator.conjugateDefault(BEGTI)).toMatchObject(EXPECTED_BEGTI)
  })
  it('conjugates bėgtis', () => {
    expect(conjugator.conjugateUnprefixedReflexive(BEGTI)).toMatchObject(
      EXPECTED_BEGTIS,
    )
  })
  it('conjugates nesibėgti', () => {
    expect(conjugator.conjugatePrefixedReflexive(BEGTI, 'ne')).toMatchObject(
      EXPECTED_NESIBEGTI,
    )
  })
  it('conjugates perbėgti', () => {
    expect(conjugator.conjugatePrefixed(BEGTI, 'per')).toMatchObject(
      EXPECTED_PERBEGTI,
    )
  })
  it('conjugates nebėgti', () => {
    expect(conjugator.conjugatePrefixed(BEGTI, 'ne')).toMatchObject(
      EXPECTED_NEBEGTI,
    )
  })
})
