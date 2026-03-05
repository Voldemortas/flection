import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { PrincipalPartsType } from '~src/types.ts'
import ActivePastFrequentativeParticipleDecliner from '~conjugators/ActivePastFrequentativeParticipleDecliner.ts'
import { makeDeclinedFromArray } from '~test/testHelpers.ts'

const RINKTI: PrincipalPartsType = [
  `rin\u0303kti`,
  `ren\u0303ka`,
  `rin\u0303ko`,
]

const RINKDAVES = makeDeclinedFromArray(
  `riñkdavęs riñkdavusio riñkdavusiam riñkdavusį riñkdavusiu riñkdavusiame riñkdavęs
riñkdavę riñkdavusių riñkdavusiems riñkdavusius riñkdavusiais riñkdavusiuose riñkdavę`
    .split(/\s/),
)
const RINKDAVUSYSIS = makeDeclinedFromArray(
  `riñkdavusysis riñkdavusiojo riñkdavusiajam riñkdavusįjį riñkdavusiuoju riñkdavusiajame riñkdavusysis
riñkdavusieji riñkdavusiųjų riñkdavusiesiems riñkdavusiuosius riñkdavusiaisiais riñkdavusiuosiuose riñkdavusieji`
    .split(/\s/),
)
const RINKDAVUSI = makeDeclinedFromArray(
  `riñkdavusi riñkdavusios riñkdavusiai riñkdavusią riñkdavusia riñkdavusioje riñkdavusi
riñkdavusios riñkdavusių riñkdavusioms riñkdavusias riñkdavusiomis riñkdavusiose riñkdavusios`
    .split(/\s/).map((v, i) => i === 7 || i === 13 ? v + ` riñkdavę` : v),
)
const RINKDAVUSIOJI = makeDeclinedFromArray(
  `riñkdavusioji riñkdavusiosios riñkdavusiajai riñkdavusiąją riñkdavusiąja riñkdavusiojoje riñkdavusioji
riñkdavusiosios riñkdavusiųjų riñkdavusiosioms riñkdavusiąsias riñkdavusiosiomis riñkdavusiosiose riñkdavusiosios`
    .split(/\s/),
)

const NESIRINKDAVES = makeDeclinedFromArray(
  `nesiriñkdavęs nesiriñkdavusio nesiriñkdavusiam nesiriñkdavusį nesiriñkdavusiu nesiriñkdavusiame nesiriñkdavęs
nesiriñkdavę nesiriñkdavusių nesiriñkdavusiems nesiriñkdavusius nesiriñkdavusiais nesiriñkdavusiuose nesiriñkdavę`
    .split(/\s/),
)
const NESIRINKDAVUSYSIS = makeDeclinedFromArray(
  `nesiriñkdavusysis nesiriñkdavusiojo nesiriñkdavusiajam nesiriñkdavusįjį nesiriñkdavusiuoju nesiriñkdavusiajame nesiriñkdavusysis
nesiriñkdavusieji nesiriñkdavusiųjų nesiriñkdavusiesiems nesiriñkdavusiuosius nesiriñkdavusiaisiais nesiriñkdavusiuosiuose nesiriñkdavusieji`
    .split(/\s/),
)
const NESIRINKDAVUSI = makeDeclinedFromArray(
  `nesiriñkdavusi nesiriñkdavusios nesiriñkdavusiai nesiriñkdavusią nesiriñkdavusia nesiriñkdavusioje nesiriñkdavusi
nesiriñkdavusios nesiriñkdavusių nesiriñkdavusioms nesiriñkdavusias nesiriñkdavusiomis nesiriñkdavusiose nesiriñkdavusios`
    .split(/\s/).map((v, i) => i === 7 || i === 13 ? v + ` nesiriñkdavę` : v),
)
const NESIRINKDAVUSIOJI = makeDeclinedFromArray(
  `nesiriñkdavusioji nesiriñkdavusiosios nesiriñkdavusiajai nesiriñkdavusiąją nesiriñkdavusiąja nesiriñkdavusiojoje nesiriñkdavusioji
nesiriñkdavusiosios nesiriñkdavusiųjų nesiriñkdavusiosioms nesiriñkdavusiąsias nesiriñkdavusiosiomis nesiriñkdavusiosiose nesiriñkdavusiosios`
    .split(/\s/),
)

const BRINKDAVESIS = {
  sgNom: `rin\u0303kdavęsis (besirin\u0303kdavęs)`,
  sgGen: `- (besirin\u0303kdavusio)`,
  sgDat: `- (besirin\u0303kdavusiam)`,
  sgAcc: `- (besirin\u0303kdavusį)`,
  sgInst: `- (besirin\u0303kdavusiu)`,
  sgLoc: `- (besirin\u0303kdavusiame)`,
  sgVoc: `rin\u0303kdavęsis (besirin\u0303kdavęs)`,
  plNom: `rin\u0303kdavęsi (besirin\u0303kdavę)`,
  plGen: `- (besirin\u0303kdavusių)`,
  plDat: `- (besirin\u0303kdavusiems)`,
  plAcc: `- (besirin\u0303kdavusius)`,
  plInst: `- (besirin\u0303kdavusiais)`,
  plLoc: `- (besirin\u0303kdavusiuose)`,
  plVoc: `rin\u0303kdavęsi (besirin\u0303kdavę)`,
}
const BESIRINKDAVUSYSIS = {
  sgNom: `- (besirin\u0303kdavusysis)`,
  sgGen: `- (besirin\u0303kdavusiojo)`,
  sgDat: `- (besirin\u0303kdavusiajam)`,
  sgAcc: `- (besirin\u0303kdavusįjį)`,
  sgInst: `- (besirin\u0303kdavusiuoju)`,
  sgLoc: `- (besirin\u0303kdavusiajame)`,
  sgVoc: `- (besirin\u0303kdavusysis)`,
  plNom: `- (besirin\u0303kdavusieji)`,
  plGen: `- (besirin\u0303kdavusiųjų)`,
  plDat: `- (besirin\u0303kdavusiesiems)`,
  plAcc: `- (besirin\u0303kdavusiuosius)`,
  plInst: `- (besirin\u0303kdavusiaisiais)`,
  plLoc: `- (besirin\u0303kdavusiuosiuose)`,
  plVoc: `- (besirin\u0303kdavusieji)`,
}
const RINKDAVUSIS = {
  sgNom: `rin\u0303kdavusis (besirin\u0303kdavusi)`,
  sgGen: `- (besirin\u0303kdavusios)`,
  sgDat: `- (besirin\u0303kdavusiai)`,
  sgAcc: `- (besirin\u0303kdavusią)`,
  sgInst: `- (besirin\u0303kdavusia)`,
  sgLoc: `- (besirin\u0303kdavusioje)`,
  sgVoc: `rin\u0303kdavusis (besirin\u0303kdavusi)`,
  plNom: `rin\u0303kdavusiosi (besirin\u0303kdavusios besirin\u0303kdavę)`,
  plGen: `- (besirin\u0303kdavusių)`,
  plDat: `- (besirin\u0303kdavusioms)`,
  plAcc: `- (besirin\u0303kdavusias)`,
  plInst: `- (besirin\u0303kdavusiomis)`,
  plLoc: `- (besirin\u0303kdavusiose)`,
  plVoc: `rin\u0303kdavusiosi (besirin\u0303kdavusios besirin\u0303kdavę)`,
}
const BESIRINKDAVUSIOJI = {
  sgNom: `- (besirin\u0303kdavusioji)`,
  sgGen: `- (besirin\u0303kdavusiosios)`,
  sgDat: `- (besirin\u0303kdavusiajai)`,
  sgAcc: `- (besirin\u0303kdavusiąją)`,
  sgInst: `- (besirin\u0303kdavusiąja)`,
  sgLoc: `- (besirin\u0303kdavusiojoje)`,
  sgVoc: `- (besirin\u0303kdavusioji)`,
  plNom: `- (besirin\u0303kdavusiosios)`,
  plGen: `- (besirin\u0303kdavusiųjų)`,
  plDat: `- (besirin\u0303kdavusiosioms)`,
  plAcc: `- (besirin\u0303kdavusiąsias)`,
  plInst: `- (besirin\u0303kdavusiosiomis)`,
  plLoc: `- (besirin\u0303kdavusiosiose)`,
  plVoc: `- (besirin\u0303kdavusiosios)`,
}

describe('ActivePastFrequentativeParticipleDecliner', () => {
  const decliner = new ActivePastFrequentativeParticipleDecliner()
  describe('rinkti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(RINKTI)).toMatchObject({
        masculine: RINKDAVES,
        feminine: RINKDAVUSI,
        neuter: `rin\u0303kdavę`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(RINKTI)).toMatchObject({
        masculine: RINKDAVUSYSIS,
        feminine: RINKDAVUSIOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(RINKTI)).toMatchObject({
        masculine: BRINKDAVESIS,
        feminine: RINKDAVUSIS,
        neuter: `-`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(RINKTI)).toMatchObject({
        masculine: BESIRINKDAVUSYSIS,
        feminine: BESIRINKDAVUSIOJI,
      })
    })
  })
  describe('nesirinkti', () => {
    it('conjugates default', () => {
      expect(decliner.getPrefixedReflexive(RINKTI, 'ne')).toMatchObject({
        masculine: NESIRINKDAVES,
        feminine: NESIRINKDAVUSI,
        neuter: `nesirin\u0303kdavę`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPrefixedReflexivePronominal(RINKTI, 'ne'))
        .toMatchObject({
          masculine: NESIRINKDAVUSYSIS,
          feminine: NESIRINKDAVUSIOJI,
        })
    })
  })
})
