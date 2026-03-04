import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { PrincipalPartsType } from '~src/types.ts'
import PusdalyvisDecliner, {
  type PusdalyvisType,
} from '~conjugators/PusdalyvisDecliner.ts'

const BEGTI: PrincipalPartsType = [`bė\u0301gti`, `bė\u0301ga`, `bė\u0301go`]
const VAZIUOTI: PrincipalPartsType = [
  `važiu\u0301oti`,
  `važiu\u0301oja`,
  `važia\u0303vo`,
]
const EITI: PrincipalPartsType = [`eiti`, `eina`, `ėjo`]

const EXPECTED_BEGTI: PusdalyvisType = {
  sgMasc: `bė\u0301gdamas`,
  sgFem: `bėgdama\u0300`,
  plMasc: `bėgdami\u0300`,
  plFem: `bė\u0301gdamos`,
}
const EXPECTED_BEGTIS: PusdalyvisType = {
  sgMasc: `bė\u0301gdamasis`,
  sgFem: `bė\u0301gdamasi`,
  plMasc: `bė\u0301gdamiesi`,
  plFem: `bė\u0301gdamosi`,
}
const EXPECTED_PERBEGTI: PusdalyvisType = {
  sgMasc: `pe\u0301rbėgdamas`,
  sgFem: `pe\u0301rbėgdama`,
  plMasc: `pe\u0301rbėgdami`,
  plFem: `pe\u0301rbėgdamos`,
}
const EXPECTED_NEBEGTI: PusdalyvisType = {
  sgMasc: `nebė\u0301gdamas`,
  sgFem: `nebėgdama\u0300`,
  plMasc: `nebėgdami\u0300`,
  plFem: `nebė\u0301gdamos`,
}
const EXPECTED_NESIBEGTI: PusdalyvisType = {
  sgMasc: `nesibė\u0301gdamas`,
  sgFem: `nesibėgdama\u0300`,
  plMasc: `nesibėgdami\u0300`,
  plFem: `nesibė\u0301gdamos`,
}
const EXPECTED_VAZIUOTI: PusdalyvisType = {
  sgMasc: `važiu\u0301odamas`,
  sgFem: `važiu\u0301odama`,
  plMasc: `važiu\u0301odami`,
  plFem: `važiu\u0301odamos`,
}
const EXPECTED_NEITI: PusdalyvisType = {
  sgMasc: `neidamas`,
  sgFem: `neidama`,
  plMasc: `neidami`,
  plFem: `neidamos`,
}

describe('PusdalyvisDecliner', () => {
  const conjugator = new PusdalyvisDecliner()
  it('conjugates bėgti', () => {
    expect(conjugator.getDefault(BEGTI)).toMatchObject(EXPECTED_BEGTI)
  })
  it('conjugates važiuoti', () => {
    expect(conjugator.getDefault(VAZIUOTI)).toMatchObject(EXPECTED_VAZIUOTI)
  })
  it('conjugates bėgtis', () => {
    expect(conjugator.getReflexive(BEGTI))
      .toMatchObject(EXPECTED_BEGTIS)
  })
  it('conjugates nesibėgti', () => {
    expect(conjugator.getPrefixedReflexive(BEGTI, 'ne'))
      .toMatchObject(EXPECTED_NESIBEGTI)
  })
  it('conjugates perbėgti', () => {
    expect(conjugator.getPrefixed(BEGTI, 'per'))
      .toMatchObject(EXPECTED_PERBEGTI)
  })
  it('conjugates nebėgti', () => {
    expect(conjugator.getPrefixed(BEGTI, 'ne'))
      .toMatchObject(EXPECTED_NEBEGTI)
  })
  it('conjugates neiti', () => {
    expect(conjugator.getPrefixed(EITI, 'ne'))
      .toMatchObject(EXPECTED_NEITI)
  })
})
