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
  `riñkdavęs  riñkdavusio  riñkdavusiam  riñkdavusį  riñkdavusiu  riñkdavusiame riñkdavusiam  riñkdavęs 
riñkdavę  riñkdavusių  riñkdavusiems riñkdavusiem  riñkdavusius  riñkdavusiais  riñkdavusiuose riñkdavusiuos  riñkdavę`
    .split(/\s\s/),
)
const RINKDAVUSYSIS = makeDeclinedFromArray(
  `riñkdavusysis  riñkdavusiojo  riñkdavusiajam  riñkdavusįjį  riñkdavusiuoju  riñkdavusiajame riñkdavusiajam  riñkdavusysis 
riñkdavusieji  riñkdavusiųjų  riñkdavusiesiems riñkdavusiesiem  riñkdavusiuosius  riñkdavusiaisiais  riñkdavusiuosiuose riñkdavusiuosiuos  riñkdavusieji`
    .split(/\s\s/),
)
const RINKDAVUSI = makeDeclinedFromArray(
  `riñkdavusi  riñkdavusios  riñkdavusiai  riñkdavusią  riñkdavusia  riñkdavusioje riñkdavusioj  riñkdavusi 
riñkdavusios  riñkdavusių  riñkdavusioms riñkdavusiom  riñkdavusias  riñkdavusiomis riñkdavusiom  riñkdavusiose  riñkdavusios`
    .split(/\s\s/).map((v, i) => i === 7 || i === 13 ? v + ` riñkdavę` : v),
)
const RINKDAVUSIOJI = makeDeclinedFromArray(
  `riñkdavusioji  riñkdavusiosios  riñkdavusiajai  riñkdavusiąją  riñkdavusiąja  riñkdavusiojoje riñkdavusiojoj  riñkdavusioji 
riñkdavusiosios  riñkdavusiųjų  riñkdavusiosioms riñkdavusiosiom  riñkdavusiąsias  riñkdavusiosiomis riñkdavusiosiom  riñkdavusiosiose  riñkdavusiosios`
    .split(/\s\s/),
)

const NESIRINKDAVES = makeDeclinedFromArray(
  `nesiriñkdavęs  nesiriñkdavusio  nesiriñkdavusiam  nesiriñkdavusį  nesiriñkdavusiu  nesiriñkdavusiame nesiriñkdavusiam  nesiriñkdavęs 
nesiriñkdavę  nesiriñkdavusių  nesiriñkdavusiems nesiriñkdavusiem  nesiriñkdavusius  nesiriñkdavusiais  nesiriñkdavusiuose nesiriñkdavusiuos  nesiriñkdavę`
    .split(/\s\s/),
)
const NESIRINKDAVUSYSIS = makeDeclinedFromArray(
  `nesiriñkdavusysis  nesiriñkdavusiojo  nesiriñkdavusiajam  nesiriñkdavusįjį  nesiriñkdavusiuoju  nesiriñkdavusiajame nesiriñkdavusiajam  nesiriñkdavusysis 
nesiriñkdavusieji  nesiriñkdavusiųjų  nesiriñkdavusiesiems nesiriñkdavusiesiem  nesiriñkdavusiuosius  nesiriñkdavusiaisiais  nesiriñkdavusiuosiuose nesiriñkdavusiuosiuos  nesiriñkdavusieji`
    .split(/\s\s/),
)
const NESIRINKDAVUSI = makeDeclinedFromArray(
  `nesiriñkdavusi  nesiriñkdavusios  nesiriñkdavusiai  nesiriñkdavusią  nesiriñkdavusia  nesiriñkdavusioje nesiriñkdavusioj  nesiriñkdavusi 
nesiriñkdavusios  nesiriñkdavusių  nesiriñkdavusioms nesiriñkdavusiom  nesiriñkdavusias  nesiriñkdavusiomis nesiriñkdavusiom  nesiriñkdavusiose  nesiriñkdavusios`
    .split(/\s\s/).map((v, i) => i === 7 || i === 13 ? v + ` nesiriñkdavę` : v),
)
const NESIRINKDAVUSIOJI = makeDeclinedFromArray(
  `nesiriñkdavusioji  nesiriñkdavusiosios  nesiriñkdavusiajai  nesiriñkdavusiąją  nesiriñkdavusiąja  nesiriñkdavusiojoje nesiriñkdavusiojoj  nesiriñkdavusioji 
nesiriñkdavusiosios  nesiriñkdavusiųjų  nesiriñkdavusiosioms nesiriñkdavusiosiom  nesiriñkdavusiąsias  nesiriñkdavusiosiomis nesiriñkdavusiosiom  nesiriñkdavusiosiose  nesiriñkdavusiosios`
    .split(/\s\s/),
)

const RINKDAVESIS = {
  sgNom: `rin\u0303kdavęsis (besirin\u0303kdavęs)`,
  sgGen: `- (besirin\u0303kdavusio)`,
  sgDat: `- (besirin\u0303kdavusiam)`,
  sgAcc: `- (besirin\u0303kdavusį)`,
  sgInst: `- (besirin\u0303kdavusiu)`,
  sgLoc: `- (besirin\u0303kdavusiame besirin\u0303kdavusiam)`,
  sgVoc: `rin\u0303kdavęsis (besirin\u0303kdavęs)`,
  plNom: `rin\u0303kdavęsi (besirin\u0303kdavę)`,
  plGen: `- (besirin\u0303kdavusių)`,
  plDat: `- (besirin\u0303kdavusiems besirin\u0303kdavusiem)`,
  plAcc: `- (besirin\u0303kdavusius)`,
  plInst: `- (besirin\u0303kdavusiais)`,
  plLoc: `- (besirin\u0303kdavusiuose besirin\u0303kdavusiuos)`,
  plVoc: `rin\u0303kdavęsi (besirin\u0303kdavę)`,
}
const BESIRINKDAVUSYSIS = {
  sgNom: `- (besirin\u0303kdavusysis)`,
  sgGen: `- (besirin\u0303kdavusiojo)`,
  sgDat: `- (besirin\u0303kdavusiajam)`,
  sgAcc: `- (besirin\u0303kdavusįjį)`,
  sgInst: `- (besirin\u0303kdavusiuoju)`,
  sgLoc: `- (besirin\u0303kdavusiajame besirin\u0303kdavusiajam)`,
  sgVoc: `- (besirin\u0303kdavusysis)`,
  plNom: `- (besirin\u0303kdavusieji)`,
  plGen: `- (besirin\u0303kdavusiųjų)`,
  plDat: `- (besirin\u0303kdavusiesiems besirin\u0303kdavusiesiem)`,
  plAcc: `- (besirin\u0303kdavusiuosius)`,
  plInst: `- (besirin\u0303kdavusiaisiais)`,
  plLoc: `- (besirin\u0303kdavusiuosiuose besirin\u0303kdavusiuosiuos)`,
  plVoc: `- (besirin\u0303kdavusieji)`,
}
const RINKDAVUSIS = {
  sgNom: `rin\u0303kdavusis (besirin\u0303kdavusi)`,
  sgGen: `- (besirin\u0303kdavusios)`,
  sgDat: `- (besirin\u0303kdavusiai)`,
  sgAcc: `- (besirin\u0303kdavusią)`,
  sgInst: `- (besirin\u0303kdavusia)`,
  sgLoc: `- (besirin\u0303kdavusioje besirin\u0303kdavusioj)`,
  sgVoc: `rin\u0303kdavusis (besirin\u0303kdavusi)`,
  plNom: `rin\u0303kdavusiosi (besirin\u0303kdavusios besirin\u0303kdavę)`,
  plGen: `- (besirin\u0303kdavusių)`,
  plDat: `- (besirin\u0303kdavusioms besirin\u0303kdavusiom)`,
  plAcc: `- (besirin\u0303kdavusias)`,
  plInst: `- (besirin\u0303kdavusiomis besirin\u0303kdavusiom)`,
  plLoc: `- (besirin\u0303kdavusiose)`,
  plVoc: `rin\u0303kdavusiosi (besirin\u0303kdavusios besirin\u0303kdavę)`,
}
const BESIRINKDAVUSIOJI = {
  sgNom: `- (besirin\u0303kdavusioji)`,
  sgGen: `- (besirin\u0303kdavusiosios)`,
  sgDat: `- (besirin\u0303kdavusiajai)`,
  sgAcc: `- (besirin\u0303kdavusiąją)`,
  sgInst: `- (besirin\u0303kdavusiąja)`,
  sgLoc: `- (besirin\u0303kdavusiojoje besirin\u0303kdavusiojoj)`,
  sgVoc: `- (besirin\u0303kdavusioji)`,
  plNom: `- (besirin\u0303kdavusiosios)`,
  plGen: `- (besirin\u0303kdavusiųjų)`,
  plDat: `- (besirin\u0303kdavusiosioms besirin\u0303kdavusiosiom)`,
  plAcc: `- (besirin\u0303kdavusiąsias)`,
  plInst: `- (besirin\u0303kdavusiosiomis besirin\u0303kdavusiosiom)`,
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
        masculine: RINKDAVESIS,
        feminine: RINKDAVUSIS,
        neuter: `- (besirin\u0303kdavę)`,
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
