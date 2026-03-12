import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { PrincipalPartsType } from '~src/types.ts'
import ActiveFutureParticipleDecliner from '~conjugators/ActiveFutureParticipleDecliner.ts'

const RINKTI: PrincipalPartsType = [
  `rin\u0303kti`,
  `ren\u0303ka`,
  `rin\u0303ko`,
]

const RINKSIAS = {
  sgNom: `rin\u0303ksiąs rin\u0303ksiantis`,
  sgGen: `rin\u0303ksiančio`,
  sgDat: `rin\u0303ksiančiam`,
  sgAcc: `rin\u0303ksiantį`,
  sgInst: `rin\u0303ksiančiu`,
  sgLoc: `rin\u0303ksiančiame rin\u0303ksiančiam`,
  sgVoc: `rin\u0303ksiąs rin\u0303ksiantis`,
  plNom: `rin\u0303ksią rin\u0303ksiantys`,
  plGen: `rin\u0303ksiančių`,
  plDat: `rin\u0303ksiantiems rin\u0303ksiantiem`,
  plAcc: `rin\u0303ksiančius`,
  plInst: `rin\u0303ksiančiais`,
  plLoc: `rin\u0303ksiančiuose rin\u0303ksiančiuos`,
  plVoc: `rin\u0303ksią rin\u0303ksiantys`,
}

const RINKSIANTYSIS = {
  sgNom: `rin\u0303ksiantysis`,
  sgGen: `rin\u0303ksiančiojo`,
  sgDat: `rin\u0303ksiančiajam`,
  sgAcc: `rin\u0303ksiantįjį`,
  sgInst: `rin\u0303ksiančiuoju`,
  sgLoc: `rin\u0303ksiančiajame rin\u0303ksiančiajam`,
  sgVoc: `rin\u0303ksiantysis`,
  plNom: `rin\u0303ksiantieji`,
  plGen: `rin\u0303ksiančiųjų`,
  plDat: `rin\u0303ksiantiesiems rin\u0303ksiantiesiem`,
  plAcc: `rin\u0303ksiančiuosius`,
  plInst: `rin\u0303ksiančiaisiais`,
  plLoc: `rin\u0303ksiančiuosiuose rin\u0303ksiančiuosiuos`,
  plVoc: `rin\u0303ksiantieji`,
}

const RINKSIANTI = {
  sgNom: `rin\u0303ksianti`,
  sgGen: `rin\u0303ksiančios`,
  sgDat: `rin\u0303ksiančiai`,
  sgAcc: `rin\u0303ksiančią`,
  sgInst: `rin\u0303ksiančia`,
  sgLoc: `rin\u0303ksiančioje rin\u0303ksiančioj`,
  sgVoc: `rin\u0303ksianti`,
  plNom: `rin\u0303ksiančios rin\u0303ksią`,
  plGen: `rin\u0303ksiančių`,
  plDat: `rin\u0303ksiančioms rin\u0303ksiančiom`,
  plAcc: `rin\u0303ksiančias`,
  plInst: `rin\u0303ksiančiomis rin\u0303ksiančiom`,
  plLoc: `rin\u0303ksiančiose`,
  plVoc: `rin\u0303ksiančios rin\u0303ksią`,
}
const RINKSIANCIOJI = {
  sgNom: `rin\u0303ksiančioji`,
  sgGen: `rin\u0303ksiančiosios`,
  sgDat: `rin\u0303ksiančiajai`,
  sgAcc: `rin\u0303ksiančiąją`,
  sgInst: `rin\u0303ksiančiąja`,
  sgLoc: `rin\u0303ksiančiojoje rin\u0303ksiančiojoj`,
  sgVoc: `rin\u0303ksiančioji`,
  plNom: `rin\u0303ksiančiosios`,
  plGen: `rin\u0303ksiančiųjų`,
  plDat: `rin\u0303ksiančiosioms rin\u0303ksiančiosiom`,
  plAcc: `rin\u0303ksiančiąsias`,
  plInst: `rin\u0303ksiančiosiomis rin\u0303ksiančiosiom`,
  plLoc: `rin\u0303ksiančiosiose`,
  plVoc: `rin\u0303ksiančiosios`,
}

const NESIRINKSIAS = {
  sgNom: `nesirin\u0303ksiąs nesirin\u0303ksiantis`,
  sgGen: `nesirin\u0303ksiančio`,
  sgDat: `nesirin\u0303ksiančiam`,
  sgAcc: `nesirin\u0303ksiantį`,
  sgInst: `nesirin\u0303ksiančiu`,
  sgLoc: `nesirin\u0303ksiančiame nesirin\u0303ksiančiam`,
  sgVoc: `nesirin\u0303ksiąs nesirin\u0303ksiantis`,
  plNom: `nesirin\u0303ksią nesirin\u0303ksiantys`,
  plGen: `nesirin\u0303ksiančių`,
  plDat: `nesirin\u0303ksiantiems nesirin\u0303ksiantiem`,
  plAcc: `nesirin\u0303ksiančius`,
  plInst: `nesirin\u0303ksiančiais`,
  plLoc: `nesirin\u0303ksiančiuose nesirin\u0303ksiančiuos`,
  plVoc: `nesirin\u0303ksią nesirin\u0303ksiantys`,
}
const NESIRINKSIANTYSIS = {
  sgNom: `nesirin\u0303ksiantysis`,
  sgGen: `nesirin\u0303ksiančiojo`,
  sgDat: `nesirin\u0303ksiančiajam`,
  sgAcc: `nesirin\u0303ksiantįjį`,
  sgInst: `nesirin\u0303ksiančiuoju`,
  sgLoc: `nesirin\u0303ksiančiajame nesirin\u0303ksiančiajam`,
  sgVoc: `nesirin\u0303ksiantysis`,
  plNom: `nesirin\u0303ksiantieji`,
  plGen: `nesirin\u0303ksiančiųjų`,
  plDat: `nesirin\u0303ksiantiesiems nesirin\u0303ksiantiesiem`,
  plAcc: `nesirin\u0303ksiančiuosius`,
  plInst: `nesirin\u0303ksiančiaisiais`,
  plLoc: `nesirin\u0303ksiančiuosiuose nesirin\u0303ksiančiuosiuos`,
  plVoc: `nesirin\u0303ksiantieji`,
}
const NESIRINSIANTI = {
  sgNom: `nesirin\u0303ksianti`,
  sgGen: `nesirin\u0303ksiančios`,
  sgDat: `nesirin\u0303ksiančiai`,
  sgAcc: `nesirin\u0303ksiančią`,
  sgInst: `nesirin\u0303ksiančia`,
  sgLoc: `nesirin\u0303ksiančioje nesirin\u0303ksiančioj`,
  sgVoc: `nesirin\u0303ksianti`,
  plNom: `nesirin\u0303ksiančios nesirin\u0303ksią`,
  plGen: `nesirin\u0303ksiančių`,
  plDat: `nesirin\u0303ksiančioms nesirin\u0303ksiančiom`,
  plAcc: `nesirin\u0303ksiančias`,
  plInst: `nesirin\u0303ksiančiomis nesirin\u0303ksiančiom`,
  plLoc: `nesirin\u0303ksiančiose`,
  plVoc: `nesirin\u0303ksiančios nesirin\u0303ksią`,
}
const NESIRINKSIANCIOJI = {
  sgNom: `nesirin\u0303ksiančioji`,
  sgGen: `nesirin\u0303ksiančiosios`,
  sgDat: `nesirin\u0303ksiančiajai`,
  sgAcc: `nesirin\u0303ksiančiąją`,
  sgInst: `nesirin\u0303ksiančiąja`,
  sgLoc: `nesirin\u0303ksiančiojoje nesirin\u0303ksiančiojoj`,
  sgVoc: `nesirin\u0303ksiančioji`,
  plNom: `nesirin\u0303ksiančiosios`,
  plGen: `nesirin\u0303ksiančiųjų`,
  plDat: `nesirin\u0303ksiančiosioms nesirin\u0303ksiančiosiom`,
  plAcc: `nesirin\u0303ksiančiąsias`,
  plInst: `nesirin\u0303ksiančiosiomis nesirin\u0303ksiančiosiom`,
  plLoc: `nesirin\u0303ksiančiosiose`,
  plVoc: `nesirin\u0303ksiančiosios`,
}

const RINKSIASIS = {
  sgNom: `rin\u0303ksiąsis (besirin\u0303ksiąs besirin\u0303ksiantis)`,
  sgGen: `- (besirin\u0303ksiančio)`,
  sgDat: `- (besirin\u0303ksiančiam)`,
  sgAcc: `- (besirin\u0303ksiantį)`,
  sgInst: `- (besirin\u0303ksiančiu)`,
  sgLoc: `- (besirin\u0303ksiančiame besirin\u0303ksiančiam)`,
  sgVoc: `rin\u0303ksiąsis (besirin\u0303ksiąs besirin\u0303ksiantis)`,
  plNom: `rin\u0303ksiąsi (besirin\u0303ksią besirin\u0303ksiantys)`,
  plGen: `- (besirin\u0303ksiančių)`,
  plDat: `- (besirin\u0303ksiantiems besirin\u0303ksiantiem)`,
  plAcc: `- (besirin\u0303ksiančius)`,
  plInst: `- (besirin\u0303ksiančiais)`,
  plLoc: `- (besirin\u0303ksiančiuose besirin\u0303ksiančiuos)`,
  plVoc: `rin\u0303ksiąsi (besirin\u0303ksią besirin\u0303ksiantys)`,
}
const BESIRINKSIANTYSIS = {
  sgNom: `- (besirin\u0303ksiantysis)`,
  sgGen: `- (besirin\u0303ksiančiojo)`,
  sgDat: `- (besirin\u0303ksiančiajam)`,
  sgAcc: `- (besirin\u0303ksiantįjį)`,
  sgInst: `- (besirin\u0303ksiančiuoju)`,
  sgLoc: `- (besirin\u0303ksiančiajame besirin\u0303ksiančiajam)`,
  sgVoc: `- (besirin\u0303ksiantysis)`,
  plNom: `- (besirin\u0303ksiantieji)`,
  plGen: `- (besirin\u0303ksiančiųjų)`,
  plDat: `- (besirin\u0303ksiantiesiems besirin\u0303ksiantiesiem)`,
  plAcc: `- (besirin\u0303ksiančiuosius)`,
  plInst: `- (besirin\u0303ksiančiaisiais)`,
  plLoc: `- (besirin\u0303ksiančiuosiuose besirin\u0303ksiančiuosiuos)`,
  plVoc: `- (besirin\u0303ksiantieji)`,
}

const RINKSIANTIS = {
  sgNom: `rin\u0303ksiantis (besirin\u0303ksianti)`,
  sgGen: `- (besirin\u0303ksiančios)`,
  sgDat: `- (besirin\u0303ksiančiai)`,
  sgAcc: `- (besirin\u0303ksiančią)`,
  sgInst: `- (besirin\u0303ksiančia)`,
  sgLoc: `- (besirin\u0303ksiančioje besirin\u0303ksiančioj)`,
  sgVoc: `rin\u0303ksiantis (besirin\u0303ksianti)`,
  plNom: `rin\u0303ksiančiosi (besirin\u0303ksiančios besirin\u0303ksią)`,
  plGen: `- (besirin\u0303ksiančių)`,
  plDat: `- (besirin\u0303ksiančioms besirin\u0303ksiančiom)`,
  plAcc: `- (besirin\u0303ksiančias)`,
  plInst: `- (besirin\u0303ksiančiomis besirin\u0303ksiančiom)`,
  plLoc: `- (besirin\u0303ksiančiose)`,
  plVoc: `rin\u0303ksiančiosi (besirin\u0303ksiančios besirin\u0303ksią)`,
}
const BESIRINSIANCIOJI = {
  sgNom: `- (besirin\u0303ksiančioji)`,
  sgGen: `- (besirin\u0303ksiančiosios)`,
  sgDat: `- (besirin\u0303ksiančiajai)`,
  sgAcc: `- (besirin\u0303ksiančiąją)`,
  sgInst: `- (besirin\u0303ksiančiąja)`,
  sgLoc: `- (besirin\u0303ksiančiojoje besirin\u0303ksiančiojoj)`,
  sgVoc: `- (besirin\u0303ksiančioji)`,
  plNom: `- (besirin\u0303ksiančiosios)`,
  plGen: `- (besirin\u0303ksiančiųjų)`,
  plDat: `- (besirin\u0303ksiančiosioms besirin\u0303ksiančiosiom)`,
  plAcc: `- (besirin\u0303ksiančiąsias)`,
  plInst: `- (besirin\u0303ksiančiosiomis besirin\u0303ksiančiosiom)`,
  plLoc: `- (besirin\u0303ksiančiosiose)`,
  plVoc: `- (besirin\u0303ksiančiosios)`,
}

describe('ActiveFutureParticipleDecliner', () => {
  const decliner = new ActiveFutureParticipleDecliner()
  describe('rinkti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(RINKTI)).toMatchObject({
        masculine: RINKSIAS,
        feminine: RINKSIANTI,
        neuter: `rin\u0303ksią`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(RINKTI)).toMatchObject({
        masculine: RINKSIANTYSIS,
        feminine: RINKSIANCIOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(RINKTI)).toMatchObject({
        masculine: RINKSIASIS,
        feminine: RINKSIANTIS,
        neuter: `- (besirin\u0303ksią)`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(RINKTI)).toMatchObject({
        masculine: BESIRINKSIANTYSIS,
        feminine: BESIRINSIANCIOJI,
      })
    })
  })
  describe('nesirinkti', () => {
    it('conjugates default', () => {
      expect(decliner.getPrefixedReflexive(RINKTI, 'ne')).toMatchObject({
        masculine: NESIRINKSIAS,
        feminine: NESIRINSIANTI,
        neuter: `nesirin\u0303ksią`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPrefixedReflexivePronominal(RINKTI, 'ne'))
        .toMatchObject({
          masculine: NESIRINKSIANTYSIS,
          feminine: NESIRINKSIANCIOJI,
        })
    })
  })
})
