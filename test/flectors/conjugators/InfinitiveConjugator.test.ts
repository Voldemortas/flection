import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import InfinitiveConjugator from '~conjugators/InfinitiveConjugator.ts'
import type { PrincipalPartsType } from '~src/types.ts'

const BEGTI: PrincipalPartsType = [`bė\u0301gti`, `bė\u0301ga`, `bė\u0301go`]

const EXPECTED_BEGTI = `bė\u0301gti bė\u0301gt`
const EXPECTED_BEGTIS = `bė\u0301gtis`
const EXPECTED_PERBEGTI = `pe\u0301rbėgti pe\u0301rbėgt`
const EXPECTED_NEBEGTI = `nebė\u0301gti nebė\u0301gt`
const EXPECTED_NESIBEGTI = `nesibė\u0301gti nesibė\u0301gt`

describe('InfinitiveConjugator', () => {
  const conjugator = new InfinitiveConjugator()
  it('conjugates bėgti', () => {
    expect(conjugator.getDefault(BEGTI).infinitive)
      .toStrictEqual(EXPECTED_BEGTI)
  })
  it('conjugates bėgtis', () => {
    expect(conjugator.getReflexive(BEGTI).infinitive)
      .toStrictEqual(EXPECTED_BEGTIS)
  })
  it('conjugates nesibėgti', () => {
    expect(conjugator.getPrefixedReflexive(BEGTI, 'ne').infinitive)
      .toStrictEqual(EXPECTED_NESIBEGTI)
  })
  it('conjugates perbėgti', () => {
    expect(conjugator.getPrefixed(BEGTI, 'per').infinitive)
      .toStrictEqual(EXPECTED_PERBEGTI)
  })
  it('conjugates nebėgti', () => {
    expect(conjugator.getPrefixed(BEGTI, 'ne').infinitive)
      .toStrictEqual(EXPECTED_NEBEGTI)
  })
})
