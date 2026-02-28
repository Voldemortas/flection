import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import InfinitiveConjugator from '~conjugators/InfinitiveConjugator.ts'

const BEGTI = [`bė\u0301gti`, `bė\u0301ga`, `bė\u0301go`]

const EXPECTED_BEGTI = `bė\u0301gti bė\u0301gt`
const EXPECTED_BEGTIS = `bė\u0301gtis`
const EXPECTED_PERBEGTI = `pe\u0301rbėgti pe\u0301rbėgt`
const EXPECTED_NEBEGTI = `nebė\u0301gti nebė\u0301gt`
const EXPECTED_NESIBEGTI = `nesibė\u0301gti nesibė\u0301gt`

describe('InfinitiveConjugator', () => {
  const conjugator = new InfinitiveConjugator()
  it('conjugates bėgti', () => {
    expect(conjugator.conjugateDefault(BEGTI).infinitive)
      .toStrictEqual(EXPECTED_BEGTI)
  })
  it('conjugates bėgtis', () => {
    expect(conjugator.conjugateUnprefixedReflexive(BEGTI).infinitive)
      .toStrictEqual(EXPECTED_BEGTIS)
  })
  it('conjugates nesibėgti', () => {
    expect(conjugator.conjugatePrefixedReflexive(BEGTI, 'ne').infinitive)
      .toStrictEqual(EXPECTED_NESIBEGTI)
  })
  it('conjugates perbėgti', () => {
    expect(conjugator.conjugatePrefixed(BEGTI, 'per').infinitive)
      .toStrictEqual(EXPECTED_PERBEGTI)
  })
  it('conjugates nebėgti', () => {
    expect(conjugator.conjugatePrefixed(BEGTI, 'ne').infinitive)
      .toStrictEqual(EXPECTED_NEBEGTI)
  })
})
