import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { PrincipalPartsType } from '~src/types.ts'
import ActivePastSimpleParticipleDecliner from '~conjugators/ActivePastSimpleParticipleDecliner.ts'

const PIESTI: PrincipalPartsType = [
  `pie\u0303šti`,
  `pie\u0303šia`,
  `pie\u0303šė`,
]
const LAIKYTI: PrincipalPartsType = [
  `laiky\u0301ti`,
  `lai\u0303ko`,
  `lai\u0303kė`,
]

const PIESES = {
  sgNom: `pie\u0303šęs`,
  sgGen: `pie\u0303šusio`,
  sgDat: `pie\u0303šusiam`,
  sgAcc: `pie\u0303šusį`,
  sgInst: `pie\u0303šusiu`,
  sgLoc: `pie\u0303šusiame pie\u0303šusiam`,
  sgVoc: `pie\u0303šęs`,
  plNom: `pie\u0303šę`,
  plGen: `pie\u0303šusių`,
  plDat: `pie\u0303šusiems pie\u0303šusiem`,
  plAcc: `pie\u0303šusius`,
  plInst: `pie\u0303šusiais`,
  plLoc: `pie\u0303šusiuose pie\u0303šusiuos`,
  plVoc: `pie\u0303šę`,
}
const PIESUSYSIS = {
  sgNom: `pie\u0303šusysis`,
  sgGen: `pie\u0303šusiojo`,
  sgDat: `pie\u0303šusiajam`,
  sgAcc: `pie\u0303šusįjį`,
  sgInst: `pie\u0303šusiuoju`,
  sgLoc: `pie\u0303šusiajame pie\u0303šusiajam`,
  sgVoc: `pie\u0303šusysis`,
  plNom: `pie\u0303šusieji`,
  plGen: `pie\u0303šusiųjų`,
  plDat: `pie\u0303šusiesiems pie\u0303šusiesiem`,
  plAcc: `pie\u0303šusiuosius`,
  plInst: `pie\u0303šusiaisiais`,
  plLoc: `pie\u0303šusiuosiuose pie\u0303šusiuosiuos`,
  plVoc: `pie\u0303šusieji`,
}
const PIESUSI = {
  sgNom: `pie\u0303šusi`,
  sgGen: `pie\u0303šusios`,
  sgDat: `pie\u0303šusiai`,
  sgAcc: `pie\u0303šusią`,
  sgInst: `pie\u0303šusia`,
  sgLoc: `pie\u0303šusioje pie\u0303šusioj`,
  sgVoc: `pie\u0303šusi`,
  plNom: `pie\u0303šusios pie\u0303šę`,
  plGen: `pie\u0303šusių`,
  plDat: `pie\u0303šusioms pie\u0303šusiom`,
  plAcc: `pie\u0303šusias`,
  plInst: `pie\u0303šusiomis pie\u0303šusiom`,
  plLoc: `pie\u0303šusiose`,
  plVoc: `pie\u0303šusios pie\u0303šę`,
}
const PIESUSIOJI = {
  sgNom: `pie\u0303šusioji`,
  sgGen: `pie\u0303šusiosios`,
  sgDat: `pie\u0303šusiajai`,
  sgAcc: `pie\u0303šusiąją`,
  sgInst: `pie\u0303šusiąja`,
  sgLoc: `pie\u0303šusiojoje pie\u0303šusiojoj`,
  sgVoc: `pie\u0303šusioji`,
  plNom: `pie\u0303šusiosios`,
  plGen: `pie\u0303šusiųjų`,
  plDat: `pie\u0303šusiosioms pie\u0303šusiosiom`,
  plAcc: `pie\u0303šusiąsias`,
  plInst: `pie\u0303šusiosiomis pie\u0303šusiosiom`,
  plLoc: `pie\u0303šusiosiose`,
  plVoc: `pie\u0303šusiosios`,
}
const BESIPIESES = {
  sgNom: `pie\u0303šęsis (besipie\u0303šęs)`,
  sgGen: `- (besipie\u0303šusio)`,
  sgDat: `- (besipie\u0303šusiam)`,
  sgAcc: `- (besipie\u0303šusį)`,
  sgInst: `- (besipie\u0303šusiu)`,
  sgLoc: `- (besipie\u0303šusiame besipie\u0303šusiam)`,
  sgVoc: `pie\u0303šęsis (besipie\u0303šęs)`,
  plNom: `pie\u0303šęsi (besipie\u0303šę)`,
  plGen: `- (besipie\u0303šusių)`,
  plDat: `- (besipie\u0303šusiems besipie\u0303šusiem)`,
  plAcc: `- (besipie\u0303šusius)`,
  plInst: `- (besipie\u0303šusiais)`,
  plLoc: `- (besipie\u0303šusiuose besipie\u0303šusiuos)`,
  plVoc: `pie\u0303šęsi (besipie\u0303šę)`,
}
const BESIPIESYSYSIS = {
  sgNom: `- (besipie\u0303šusysis)`,
  sgGen: `- (besipie\u0303šusiojo)`,
  sgDat: `- (besipie\u0303šusiajam)`,
  sgAcc: `- (besipie\u0303šusįjį)`,
  sgInst: `- (besipie\u0303šusiuoju)`,
  sgLoc: `- (besipie\u0303šusiajame besipie\u0303šusiajam)`,
  sgVoc: `- (besipie\u0303šusysis)`,
  plNom: `- (besipie\u0303šusieji)`,
  plGen: `- (besipie\u0303šusiųjų)`,
  plDat: `- (besipie\u0303šusiesiems besipie\u0303šusiesiem)`,
  plAcc: `- (besipie\u0303šusiuosius)`,
  plInst: `- (besipie\u0303šusiaisiais)`,
  plLoc: `- (besipie\u0303šusiuosiuose besipie\u0303šusiuosiuos)`,
  plVoc: `- (besipie\u0303šusieji)`,
}
const BESIPIESUSI = {
  sgNom: `pie\u0303šusis (besipie\u0303šusi)`,
  sgGen: `- (besipie\u0303šusios)`,
  sgDat: `- (besipie\u0303šusiai)`,
  sgAcc: `- (besipie\u0303šusią)`,
  sgInst: `- (besipie\u0303šusia)`,
  sgLoc: `- (besipie\u0303šusioje besipie\u0303šusioj)`,
  sgVoc: `pie\u0303šusis (besipie\u0303šusi)`,
  plNom: `pie\u0303šusiosi (besipie\u0303šusios besipie\u0303šę)`,
  plGen: `- (besipie\u0303šusių)`,
  plDat: `- (besipie\u0303šusioms besipie\u0303šusiom)`,
  plAcc: `- (besipie\u0303šusias)`,
  plInst: `- (besipie\u0303šusiomis besipie\u0303šusiom)`,
  plLoc: `- (besipie\u0303šusiose)`,
  plVoc: `pie\u0303šusiosi (besipie\u0303šusios besipie\u0303šę)`,
}
const BESIPIESUSIOJI = {
  sgNom: `- (besipie\u0303šusioji)`,
  sgGen: `- (besipie\u0303šusiosios)`,
  sgDat: `- (besipie\u0303šusiajai)`,
  sgAcc: `- (besipie\u0303šusiąją)`,
  sgInst: `- (besipie\u0303šusiąja)`,
  sgLoc: `- (besipie\u0303šusiojoje besipie\u0303šusiojoj)`,
  sgVoc: `- (besipie\u0303šusioji)`,
  plNom: `- (besipie\u0303šusiosios)`,
  plGen: `- (besipie\u0303šusiųjų)`,
  plDat: `- (besipie\u0303šusiosioms besipie\u0303šusiosiom)`,
  plAcc: `- (besipie\u0303šusiąsias)`,
  plInst: `- (besipie\u0303šusiosiomis besipie\u0303šusiosiom)`,
  plLoc: `- (besipie\u0303šusiosiose)`,
  plVoc: `- (besipie\u0303šusiosios)`,
}

const LAIKES = {
  sgNom: `lai\u0303kęs`,
  sgGen: `lai\u0303kiusio`,
  sgDat: `lai\u0303kiusiam`,
  sgAcc: `lai\u0303kiusį`,
  sgInst: `lai\u0303kiusiu`,
  sgLoc: `lai\u0303kiusiame lai\u0303kiusiam`,
  sgVoc: `lai\u0303kęs`,
  plNom: `lai\u0303kę`,
  plGen: `lai\u0303kiusių`,
  plDat: `lai\u0303kiusiems lai\u0303kiusiem`,
  plAcc: `lai\u0303kiusius`,
  plInst: `lai\u0303kiusiais`,
  plLoc: `lai\u0303kiusiuose lai\u0303kiusiuos`,
  plVoc: `lai\u0303kę`,
}
const LAIKIUSYSIS = {
  sgNom: `lai\u0303kiusysis`,
  sgGen: `lai\u0303kiusiojo`,
  sgDat: `lai\u0303kiusiajam`,
  sgAcc: `lai\u0303kiusįjį`,
  sgInst: `lai\u0303kiusiuoju`,
  sgLoc: `lai\u0303kiusiajame lai\u0303kiusiajam`,
  sgVoc: `lai\u0303kiusysis`,
  plNom: `lai\u0303kiusieji`,
  plGen: `lai\u0303kiusiųjų`,
  plDat: `lai\u0303kiusiesiems lai\u0303kiusiesiem`,
  plAcc: `lai\u0303kiusiuosius`,
  plInst: `lai\u0303kiusiaisiais`,
  plLoc: `lai\u0303kiusiuosiuose lai\u0303kiusiuosiuos`,
  plVoc: `lai\u0303kiusieji`,
}
const LAIKIUSI = {
  sgNom: `lai\u0303kiusi`,
  sgGen: `lai\u0303kiusios`,
  sgDat: `lai\u0303kiusiai`,
  sgAcc: `lai\u0303kiusią`,
  sgInst: `lai\u0303kiusia`,
  sgLoc: `lai\u0303kiusioje lai\u0303kiusioj`,
  sgVoc: `lai\u0303kiusi`,
  plNom: `lai\u0303kiusios lai\u0303kę`,
  plGen: `lai\u0303kiusių`,
  plDat: `lai\u0303kiusioms lai\u0303kiusiom`,
  plAcc: `lai\u0303kiusias`,
  plInst: `lai\u0303kiusiomis lai\u0303kiusiom`,
  plLoc: `lai\u0303kiusiose`,
  plVoc: `lai\u0303kiusios lai\u0303kę`,
}
const LAIKIUSIOJI = {
  sgNom: `lai\u0303kiusioji`,
  sgGen: `lai\u0303kiusiosios`,
  sgDat: `lai\u0303kiusiajai`,
  sgAcc: `lai\u0303kiusiąją`,
  sgInst: `lai\u0303kiusiąja`,
  sgLoc: `lai\u0303kiusiojoje lai\u0303kiusiojoj`,
  sgVoc: `lai\u0303kiusioji`,
  plNom: `lai\u0303kiusiosios`,
  plGen: `lai\u0303kiusiųjų`,
  plDat: `lai\u0303kiusiosioms lai\u0303kiusiosiom`,
  plAcc: `lai\u0303kiusiąsias`,
  plInst: `lai\u0303kiusiosiomis lai\u0303kiusiosiom`,
  plLoc: `lai\u0303kiusiosiose`,
  plVoc: `lai\u0303kiusiosios`,
}
const BESILAIKES = {
  sgNom: `lai\u0303kęsis (besilai\u0303kęs)`,
  sgGen: `- (besilai\u0303kiusio)`,
  sgDat: `- (besilai\u0303kiusiam)`,
  sgAcc: `- (besilai\u0303kiusį)`,
  sgInst: `- (besilai\u0303kiusiu)`,
  sgLoc: `- (besilai\u0303kiusiame besilai\u0303kiusiam)`,
  sgVoc: `lai\u0303kęsis (besilai\u0303kęs)`,
  plNom: `lai\u0303kęsi (besilai\u0303kę)`,
  plGen: `- (besilai\u0303kiusių)`,
  plDat: `- (besilai\u0303kiusiems besilai\u0303kiusiem)`,
  plAcc: `- (besilai\u0303kiusius)`,
  plInst: `- (besilai\u0303kiusiais)`,
  plLoc: `- (besilai\u0303kiusiuose besilai\u0303kiusiuos)`,
  plVoc: `lai\u0303kęsi (besilai\u0303kę)`,
}
const BESILAIKIUSYSIS = {
  sgNom: `- (besilai\u0303kiusysis)`,
  sgGen: `- (besilai\u0303kiusiojo)`,
  sgDat: `- (besilai\u0303kiusiajam)`,
  sgAcc: `- (besilai\u0303kiusįjį)`,
  sgInst: `- (besilai\u0303kiusiuoju)`,
  sgLoc: `- (besilai\u0303kiusiajame besilai\u0303kiusiajam)`,
  sgVoc: `- (besilai\u0303kiusysis)`,
  plNom: `- (besilai\u0303kiusieji)`,
  plGen: `- (besilai\u0303kiusiųjų)`,
  plDat: `- (besilai\u0303kiusiesiems besilai\u0303kiusiesiem)`,
  plAcc: `- (besilai\u0303kiusiuosius)`,
  plInst: `- (besilai\u0303kiusiaisiais)`,
  plLoc: `- (besilai\u0303kiusiuosiuose besilai\u0303kiusiuosiuos)`,
  plVoc: `- (besilai\u0303kiusieji)`,
}
const BESILAIKIUSI = {
  sgNom: `lai\u0303kiusis (besilai\u0303kiusi)`,
  sgGen: `- (besilai\u0303kiusios)`,
  sgDat: `- (besilai\u0303kiusiai)`,
  sgAcc: `- (besilai\u0303kiusią)`,
  sgInst: `- (besilai\u0303kiusia)`,
  sgLoc: `- (besilai\u0303kiusioje besilai\u0303kiusioj)`,
  sgVoc: `lai\u0303kiusis (besilai\u0303kiusi)`,
  plNom: `lai\u0303kiusiosi (besilai\u0303kiusios besilai\u0303kę)`,
  plGen: `- (besilai\u0303kiusių)`,
  plDat: `- (besilai\u0303kiusioms besilai\u0303kiusiom)`,
  plAcc: `- (besilai\u0303kiusias)`,
  plInst: `- (besilai\u0303kiusiomis besilai\u0303kiusiom)`,
  plLoc: `- (besilai\u0303kiusiose)`,
  plVoc: `lai\u0303kiusiosi (besilai\u0303kiusios besilai\u0303kę)`,
}
const BESILAIKIUSIOJI = {
  sgNom: `- (besilai\u0303kiusioji)`,
  sgGen: `- (besilai\u0303kiusiosios)`,
  sgDat: `- (besilai\u0303kiusiajai)`,
  sgAcc: `- (besilai\u0303kiusiąją)`,
  sgInst: `- (besilai\u0303kiusiąja)`,
  sgLoc: `- (besilai\u0303kiusiojoje besilai\u0303kiusiojoj)`,
  sgVoc: `- (besilai\u0303kiusioji)`,
  plNom: `- (besilai\u0303kiusiosios)`,
  plGen: `- (besilai\u0303kiusiųjų)`,
  plDat: `- (besilai\u0303kiusiosioms besilai\u0303kiusiosiom)`,
  plAcc: `- (besilai\u0303kiusiąsias)`,
  plInst: `- (besilai\u0303kiusiosiomis besilai\u0303kiusiosiom)`,
  plLoc: `- (besilai\u0303kiusiosiose)`,
  plVoc: `- (besilai\u0303kiusiosios)`,
}

describe('ActivePastSimpleParticipleDecliner', () => {
  const decliner = new ActivePastSimpleParticipleDecliner()
  describe('piešti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(PIESTI)).toMatchObject({
        masculine: PIESES,
        feminine: PIESUSI,
        neuter: `pie\u0303šę`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(PIESTI)).toMatchObject({
        masculine: PIESUSYSIS,
        feminine: PIESUSIOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(PIESTI)).toMatchObject({
        masculine: BESIPIESES,
        feminine: BESIPIESUSI,
        neuter: `- (besipie\u0303šę)`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(PIESTI)).toMatchObject({
        masculine: BESIPIESYSYSIS,
        feminine: BESIPIESUSIOJI,
      })
    })
  })
  describe('laikyti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(LAIKYTI)).toMatchObject({
        masculine: LAIKES,
        feminine: LAIKIUSI,
        neuter: `lai\u0303kę`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(LAIKYTI)).toMatchObject({
        masculine: LAIKIUSYSIS,
        feminine: LAIKIUSIOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(LAIKYTI)).toMatchObject({
        masculine: BESILAIKES,
        feminine: BESILAIKIUSI,
        neuter: `- (besilai\u0303kę)`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(LAIKYTI)).toMatchObject({
        masculine: BESILAIKIUSYSIS,
        feminine: BESILAIKIUSIOJI,
      })
    })
  })
})
