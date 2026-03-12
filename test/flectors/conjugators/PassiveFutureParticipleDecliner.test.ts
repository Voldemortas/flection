import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { PrincipalPartsType } from '~src/types.ts'
import PassiveFutureParticipleDecliner from '~conjugators/PassiveFutureParticipleDecliner.ts'
import { declinedEmpty } from '~src/commons.ts'

const BEGTI: PrincipalPartsType = [
  `bė\u0301gti`,
  `bė\u0303ga`,
  `bė\u0303go`,
]
const DAINUOTI: PrincipalPartsType = [
  `dainu\u0301oti`,
  `dainu\u0301oja`,
  `daina\u0303vo`,
]
const BEGSIMAS = {
  sgNom: 'bė\u0301gsimas',
  sgGen: 'bė\u0301gsimo',
  sgDat: 'bėgsima\u0301m',
  sgAcc: 'bė\u0301gsimą',
  sgInst: 'bė\u0301gsimu',
  sgLoc: 'bėgsimame\u0300 bėgsimam\u0303',
  sgVoc: 'bė\u0301gsimas',
  plNom: 'bėgsimi\u0300',
  plGen: 'bėgsimų\u0303',
  plDat: 'bėgsimi\u0301ems bėgsimi\u0301em',
  plAcc: 'bė\u0301gsimus',
  plInst: 'bėgsimai\u0303s',
  plLoc: 'bėgsimuose\u0300 bėgsimuo\u0303s',
  plVoc: 'bėgsimi\u0300',
}
const BEGSIMASIS = {
  sgNom: 'bėgsima\u0300sis',
  sgGen: 'bė\u0301gsimojo',
  sgDat: 'bėgsima\u0301jam',
  sgAcc: 'bė\u0301gsimąjį',
  sgInst: 'bėgsimu\u0301oju',
  sgLoc: 'bėgsima\u0303jame bėgsima\u0303jam',
  sgVoc: 'bėgsima\u0300sis',
  plNom: 'bėgsimi\u0301eji',
  plGen: 'bėgsimų\u0303jų',
  plDat: 'bėgsimi\u0301esiems bėgsimi\u0301esiem',
  plAcc: 'bėgsimu\u0301osius',
  plInst: 'bėgsimai\u0303siais',
  plLoc: 'bėgsimuo\u0303siuose bėgsimuo\u0303siuos',
  plVoc: 'bėgsimi\u0301eji',
}
const BEGSIMA = {
  sgNom: 'bėgsima\u0300',
  sgGen: 'bėgsimo\u0303s',
  sgDat: 'bė\u0301gsimai',
  sgAcc: 'bė\u0301gsimą',
  sgInst: 'bė\u0301gsima',
  sgLoc: 'bėgsimoje\u0300 bėgsimoj\u0303',
  sgVoc: 'bėgsima\u0300',
  plNom: 'bė\u0301gsimos',
  plGen: 'bėgsimų\u0303',
  plDat: 'bėgsimo\u0301ms bėgsimo\u0301m',
  plAcc: 'bė\u0301gsimas',
  plInst: 'bėgsimomi\u0300s bėgsimo\u0303m',
  plLoc: 'bėgsimose\u0300',
  plVoc: 'bė\u0301gsimos',
}
const BEGSIMOJI = {
  sgNom: 'bėgsimo\u0301ji',
  sgGen: 'bėgsimo\u0303sios',
  sgDat: 'bė\u0301gsimajai',
  sgAcc: 'bė\u0301gsimąją',
  sgInst: 'bėgsimą\u0301ja',
  sgLoc: 'bėgsimo\u0303joje bėgsimo\u0303joj',
  sgVoc: 'bėgsimo\u0301ji',
  plNom: 'bė\u0301gsimosios',
  plGen: 'bėgsimų\u0303jų',
  plDat: 'bėgsimo\u0301sioms bėgsimo\u0301siom',
  plAcc: 'bėgsimą\u0301sias',
  plInst: 'bėgsimo\u0303siomis bėgsimo\u0303siom',
  plLoc: 'bėgsimo\u0303siose',
  plVoc: 'bė\u0301gsimosios',
}
const NESIBEGSIMAS = {
  sgNom: 'nesibė\u0301gsimas',
  sgGen: 'nesibė\u0301gsimo',
  sgDat: 'nesibė\u0301gsimam',
  sgAcc: 'nesibė\u0301gsimą',
  sgInst: 'nesibė\u0301gsimu',
  sgLoc: 'nesibė\u0301gsimame nesibė\u0301gsimam',
  sgVoc: 'nesibė\u0301gsimas',
  plNom: 'nesibė\u0301gsimi',
  plGen: 'nesibė\u0301gsimų',
  plDat: 'nesibė\u0301gsimiems nesibė\u0301gsimiem',
  plAcc: 'nesibė\u0301gsimus',
  plInst: 'nesibė\u0301gsimais',
  plLoc: 'nesibė\u0301gsimuose nesibė\u0301gsimuos',
  plVoc: 'nesibė\u0301gsimi',
}
const NESIBEGSIMASIS = {
  sgNom: 'nesibė\u0301gsimasis',
  sgGen: 'nesibė\u0301gsimojo',
  sgDat: 'nesibė\u0301gsimajam',
  sgAcc: 'nesibė\u0301gsimąjį',
  sgInst: 'nesibė\u0301gsimuoju',
  sgLoc: 'nesibė\u0301gsimajame nesibė\u0301gsimajam',
  sgVoc: 'nesibė\u0301gsimasis',
  plNom: 'nesibė\u0301gsimieji',
  plGen: 'nesibė\u0301gsimųjų',
  plDat: 'nesibė\u0301gsimiesiems nesibė\u0301gsimiesiem',
  plAcc: 'nesibė\u0301gsimuosius',
  plInst: 'nesibė\u0301gsimaisiais',
  plLoc: 'nesibė\u0301gsimuosiuose nesibė\u0301gsimuosiuos',
  plVoc: 'nesibė\u0301gsimieji',
}
const NESIBEGSIMA = {
  sgNom: 'nesibė\u0301gsima',
  sgGen: 'nesibė\u0301gsimos',
  sgDat: 'nesibė\u0301gsimai',
  sgAcc: 'nesibė\u0301gsimą',
  sgInst: 'nesibė\u0301gsima',
  sgLoc: 'nesibė\u0301gsimoje nesibė\u0301gsimoj',
  sgVoc: 'nesibė\u0301gsima',
  plNom: 'nesibė\u0301gsimos',
  plGen: 'nesibė\u0301gsimų',
  plDat: 'nesibė\u0301gsimoms nesibė\u0301gsimom',
  plAcc: 'nesibė\u0301gsimas',
  plInst: 'nesibė\u0301gsimomis nesibė\u0301gsimom',
  plLoc: 'nesibė\u0301gsimose',
  plVoc: 'nesibė\u0301gsimos',
}
const NESIBEGSIMOJI = {
  sgNom: 'nesibė\u0301gsimoji',
  sgGen: 'nesibė\u0301gsimosios',
  sgDat: 'nesibė\u0301gsimajai',
  sgAcc: 'nesibė\u0301gsimąją',
  sgInst: 'nesibė\u0301gsimąja',
  sgLoc: 'nesibė\u0301gsimojoje nesibė\u0301gsimojoj',
  sgVoc: 'nesibė\u0301gsimoji',
  plNom: 'nesibė\u0301gsimosios',
  plGen: 'nesibė\u0301gsimųjų',
  plDat: 'nesibė\u0301gsimosioms nesibė\u0301gsimosiom',
  plAcc: 'nesibė\u0301gsimąsias',
  plInst: 'nesibė\u0301gsimosiomis nesibė\u0301gsimosiom',
  plLoc: 'nesibė\u0301gsimosiose',
  plVoc: 'nesibė\u0301gsimosios',
}

const DAINUOSIMAS = {
  sgNom: `dainu\u0301osimas`,
  sgGen: `dainu\u0301osimo`,
  sgDat: `dainu\u0301osimam`,
  sgAcc: `dainu\u0301osimą`,
  sgInst: `dainu\u0301osimu`,
  sgLoc: `dainu\u0301osimame dainu\u0301osimam`,
  sgVoc: `dainu\u0301osimas`,
  plNom: `dainu\u0301osimi`,
  plGen: `dainu\u0301osimų`,
  plDat: `dainu\u0301osimiems dainu\u0301osimiem`,
  plAcc: `dainu\u0301osimus`,
  plInst: `dainu\u0301osimais`,
  plLoc: `dainu\u0301osimuose dainu\u0301osimuos`,
  plVoc: `dainu\u0301osimi`,
}
const DAINUOSIMASIS = {
  sgNom: `dainu\u0301osimasis`,
  sgGen: `dainu\u0301osimojo`,
  sgDat: `dainu\u0301osimajam`,
  sgAcc: `dainu\u0301osimąjį`,
  sgInst: `dainu\u0301osimuoju`,
  sgLoc: `dainu\u0301osimajame dainu\u0301osimajam`,
  sgVoc: `dainu\u0301osimasis`,
  plNom: `dainu\u0301osimieji`,
  plGen: `dainu\u0301osimųjų`,
  plDat: `dainu\u0301osimiesiems dainu\u0301osimiesiem`,
  plAcc: `dainu\u0301osimuosius`,
  plInst: `dainu\u0301osimaisiais`,
  plLoc: `dainu\u0301osimuosiuose dainu\u0301osimuosiuos`,
  plVoc: `dainu\u0301osimieji`,
}
const DAINUOSIMA = {
  sgNom: `dainu\u0301osima`,
  sgGen: `dainu\u0301osimos`,
  sgDat: `dainu\u0301osimai`,
  sgAcc: `dainu\u0301osimą`,
  sgInst: `dainu\u0301osima`,
  sgLoc: `dainu\u0301osimoje dainu\u0301osimoj`,
  sgVoc: `dainu\u0301osima`,
  plNom: `dainu\u0301osimos`,
  plGen: `dainu\u0301osimų`,
  plDat: `dainu\u0301osimoms dainu\u0301osimom`,
  plAcc: `dainu\u0301osimas`,
  plInst: `dainu\u0301osimomis dainu\u0301osimom`,
  plLoc: `dainu\u0301osimose`,
  plVoc: `dainu\u0301osimos`,
}
const DAINUOSIMOJI = {
  sgNom: `dainu\u0301osimoji`,
  sgGen: `dainu\u0301osimosios`,
  sgDat: `dainu\u0301osimajai`,
  sgAcc: `dainu\u0301osimąją`,
  sgInst: `dainu\u0301osimąja`,
  sgLoc: `dainu\u0301osimojoje dainu\u0301osimojoj`,
  sgVoc: `dainu\u0301osimoji`,
  plNom: `dainu\u0301osimosios`,
  plGen: `dainu\u0301osimųjų`,
  plDat: `dainu\u0301osimosioms dainu\u0301osimosiom`,
  plAcc: `dainu\u0301osimąsias`,
  plInst: `dainu\u0301osimosiomis dainu\u0301osimosiom`,
  plLoc: `dainu\u0301osimosiose`,
  plVoc: `dainu\u0301osimosios`,
}
const NESIDAINUOSIMAS = {
  sgNom: `nesidainu\u0301osimas`,
  sgGen: `nesidainu\u0301osimo`,
  sgDat: `nesidainu\u0301osimam`,
  sgAcc: `nesidainu\u0301osimą`,
  sgInst: `nesidainu\u0301osimu`,
  sgLoc: `nesidainu\u0301osimame nesidainu\u0301osimam`,
  sgVoc: `nesidainu\u0301osimas`,
  plNom: `nesidainu\u0301osimi`,
  plGen: `nesidainu\u0301osimų`,
  plDat: `nesidainu\u0301osimiems nesidainu\u0301osimiem`,
  plAcc: `nesidainu\u0301osimus`,
  plInst: `nesidainu\u0301osimais`,
  plLoc: `nesidainu\u0301osimuose nesidainu\u0301osimuos`,
  plVoc: `nesidainu\u0301osimi`,
}
const NESIDAINUOSIMASIS = {
  sgNom: `nesidainu\u0301osimasis`,
  sgGen: `nesidainu\u0301osimojo`,
  sgDat: `nesidainu\u0301osimajam`,
  sgAcc: `nesidainu\u0301osimąjį`,
  sgInst: `nesidainu\u0301osimuoju`,
  sgLoc: `nesidainu\u0301osimajame nesidainu\u0301osimajam`,
  sgVoc: `nesidainu\u0301osimasis`,
  plNom: `nesidainu\u0301osimieji`,
  plGen: `nesidainu\u0301osimųjų`,
  plDat: `nesidainu\u0301osimiesiems nesidainu\u0301osimiesiem`,
  plAcc: `nesidainu\u0301osimuosius`,
  plInst: `nesidainu\u0301osimaisiais`,
  plLoc: `nesidainu\u0301osimuosiuose nesidainu\u0301osimuosiuos`,
  plVoc: `nesidainu\u0301osimieji`,
}
const NESIDAINUOSIMA = {
  sgNom: `nesidainu\u0301osima`,
  sgGen: `nesidainu\u0301osimos`,
  sgDat: `nesidainu\u0301osimai`,
  sgAcc: `nesidainu\u0301osimą`,
  sgInst: `nesidainu\u0301osima`,
  sgLoc: `nesidainu\u0301osimoje nesidainu\u0301osimoj`,
  sgVoc: `nesidainu\u0301osima`,
  plNom: `nesidainu\u0301osimos`,
  plGen: `nesidainu\u0301osimų`,
  plDat: `nesidainu\u0301osimoms nesidainu\u0301osimom`,
  plAcc: `nesidainu\u0301osimas`,
  plInst: `nesidainu\u0301osimomis nesidainu\u0301osimom`,
  plLoc: `nesidainu\u0301osimose`,
  plVoc: `nesidainu\u0301osimos`,
}
const NESIDAINUOSIMOJI = {
  sgNom: `nesidainu\u0301osimoji`,
  sgGen: `nesidainu\u0301osimosios`,
  sgDat: `nesidainu\u0301osimajai`,
  sgAcc: `nesidainu\u0301osimąją`,
  sgInst: `nesidainu\u0301osimąja`,
  sgLoc: `nesidainu\u0301osimojoje nesidainu\u0301osimojoj`,
  sgVoc: `nesidainu\u0301osimoji`,
  plNom: `nesidainu\u0301osimosios`,
  plGen: `nesidainu\u0301osimųjų`,
  plDat: `nesidainu\u0301osimosioms nesidainu\u0301osimosiom`,
  plAcc: `nesidainu\u0301osimąsias`,
  plInst: `nesidainu\u0301osimosiomis nesidainu\u0301osimosiom`,
  plLoc: `nesidainu\u0301osimosiose`,
  plVoc: `nesidainu\u0301osimosios`,
}

describe('PassiveFutureParticipleDecliner', () => {
  const decliner = new PassiveFutureParticipleDecliner()
  describe('bėgti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(BEGTI)).toMatchObject({
        masculine: BEGSIMAS,
        feminine: BEGSIMA,
        neuter: `bė\u0301gsima`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(BEGTI)).toMatchObject({
        masculine: BEGSIMASIS,
        feminine: BEGSIMOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(BEGTI)).toMatchObject({
        masculine: declinedEmpty,
        feminine: declinedEmpty,
        neuter: `bė\u0301gsimasi`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(BEGTI)).toMatchObject({
        masculine: declinedEmpty,
        feminine: declinedEmpty,
      })
    })
  })
  describe('nesibėgti', () => {
    it('conjugates reflexive', () => {
      expect(decliner.getPrefixedReflexive(BEGTI, 'ne')).toMatchObject({
        masculine: NESIBEGSIMAS,
        feminine: NESIBEGSIMA,
        neuter: `nesibė\u0301gsima`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getPrefixedReflexivePronominal(BEGTI, 'ne'))
        .toMatchObject({
          masculine: NESIBEGSIMASIS,
          feminine: NESIBEGSIMOJI,
        })
    })
  })
  describe('dainuoti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(DAINUOTI)).toMatchObject({
        masculine: DAINUOSIMAS,
        feminine: DAINUOSIMA,
        neuter: `dainu\u0301osima`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(DAINUOTI)).toMatchObject({
        masculine: DAINUOSIMASIS,
        feminine: DAINUOSIMOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(DAINUOTI)).toMatchObject({
        masculine: declinedEmpty,
        feminine: declinedEmpty,
        neuter: `dainu\u0301osimasi`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(DAINUOTI)).toMatchObject({
        masculine: declinedEmpty,
        feminine: declinedEmpty,
      })
    })
  })
  describe('nesidainuoti', () => {
    it('conjugates reflexive', () => {
      expect(decliner.getPrefixedReflexive(DAINUOTI, 'ne')).toMatchObject({
        masculine: NESIDAINUOSIMAS,
        feminine: NESIDAINUOSIMA,
        neuter: `nesidainu\u0301osima`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getPrefixedReflexivePronominal(DAINUOTI, 'ne'))
        .toMatchObject({
          masculine: NESIDAINUOSIMASIS,
          feminine: NESIDAINUOSIMOJI,
        })
    })
  })
})
