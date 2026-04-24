import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { PrincipalPartsType } from '~src/types.ts'
import PassiveFutureParticipleDecliner from '~conjugators/PassiveFutureParticipleDecliner.ts'
import { NOMINAL_EMPTY } from '~src/commons.ts'

const BEGTI: PrincipalPartsType = [
  `bė\u0301gti`,
  `bė\u0303ga`,
  `bė\u0303go`,
]
const BAUSTI: PrincipalPartsType = [
  `bau\u0303sti`,
  `bau\u0303džia`,
  `bau\u0303dė`,
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
  sgLoc: 'bėgsimoje\u0300 bėgsimo\u0303j',
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
  sgDat: 'nesibėgsima\u0301m',
  sgAcc: 'nesibė\u0301gsimą',
  sgInst: 'nesibė\u0301gsimu',
  sgLoc: 'nesibėgsimame\u0300 nesibėgsimam\u0303',
  sgVoc: 'nesibė\u0301gsimas',
  plNom: 'nesibėgsimi\u0300',
  plGen: 'nesibėgsimų\u0303',
  plDat: 'nesibėgsimi\u0301ems nesibėgsimi\u0301em',
  plAcc: 'nesibė\u0301gsimus',
  plInst: 'nesibėgsimai\u0303s',
  plLoc: 'nesibėgsimuose\u0300 nesibėgsimuo\u0303s',
  plVoc: 'nesibėgsimi\u0300',
}
const NESIBEGSIMASIS = {
  sgNom: 'nesibėgsima\u0300sis',
  sgGen: 'nesibė\u0301gsimojo',
  sgDat: 'nesibėgsima\u0301jam',
  sgAcc: 'nesibė\u0301gsimąjį',
  sgInst: 'nesibėgsimu\u0301oju',
  sgLoc: 'nesibėgsima\u0303jame nesibėgsima\u0303jam',
  sgVoc: 'nesibėgsima\u0300sis',
  plNom: 'nesibėgsimi\u0301eji',
  plGen: 'nesibėgsimų\u0303jų',
  plDat: 'nesibėgsimi\u0301esiems nesibėgsimi\u0301esiem',
  plAcc: 'nesibėgsimu\u0301osius',
  plInst: 'nesibėgsimai\u0303siais',
  plLoc: 'nesibėgsimuo\u0303siuose nesibėgsimuo\u0303siuos',
  plVoc: 'nesibėgsimi\u0301eji',
}
const NESIBEGSIMA = {
  sgNom: 'nesibėgsima\u0300',
  sgGen: 'nesibėgsimo\u0303s',
  sgDat: 'nesibė\u0301gsimai',
  sgAcc: 'nesibė\u0301gsimą',
  sgInst: 'nesibė\u0301gsima',
  sgLoc: 'nesibėgsimoje\u0300 nesibėgsimo\u0303j',
  sgVoc: 'nesibėgsima\u0300',
  plNom: 'nesibė\u0301gsimos',
  plGen: 'nesibėgsimų\u0303',
  plDat: 'nesibėgsimo\u0301ms nesibėgsimo\u0301m',
  plAcc: 'nesibė\u0301gsimas',
  plInst: 'nesibėgsimomi\u0300s nesibėgsimo\u0303m',
  plLoc: 'nesibėgsimose\u0300',
  plVoc: 'nesibė\u0301gsimos',
}
const NESIBEGSIMOJI = {
  sgNom: 'nesibėgsimo\u0301ji',
  sgGen: 'nesibėgsimo\u0303sios',
  sgDat: 'nesibė\u0301gsimajai',
  sgAcc: 'nesibė\u0301gsimąją',
  sgInst: 'nesibėgsimą\u0301ja',
  sgLoc: 'nesibėgsimo\u0303joje nesibėgsimo\u0303joj',
  sgVoc: 'nesibėgsimo\u0301ji',
  plNom: 'nesibė\u0301gsimosios',
  plGen: 'nesibėgsimų\u0303jų',
  plDat: 'nesibėgsimo\u0301sioms nesibėgsimo\u0301siom',
  plAcc: 'nesibėgsimą\u0301sias',
  plInst: 'nesibėgsimo\u0303siomis nesibėgsimo\u0303siom',
  plLoc: 'nesibėgsimo\u0303siose',
  plVoc: 'nesibė\u0301gsimosios',
}

const BAUSIMAS = {
  sgNom: 'bau\u0303simas',
  sgGen: 'bau\u0303simo',
  sgDat: 'bausima\u0301m',
  sgAcc: 'bau\u0303simą',
  sgInst: 'bau\u0303simu',
  sgLoc: 'bausimame\u0300 bausimam\u0303',
  sgVoc: 'bau\u0303simas',
  plNom: 'bausimi\u0300',
  plGen: 'bausimų\u0303',
  plDat: 'bausimi\u0301ems bausimi\u0301em',
  plAcc: 'bau\u0303simus',
  plInst: 'bausimai\u0303s',
  plLoc: 'bausimuose\u0300 bausimuo\u0303s',
  plVoc: 'bausimi\u0300',
}
const BAUSIMASIS = {
  sgNom: 'bausima\u0300sis',
  sgGen: 'bau\u0303simojo',
  sgDat: 'bausima\u0301jam',
  sgAcc: 'bau\u0303simąjį',
  sgInst: 'bausimu\u0301oju',
  sgLoc: 'bausima\u0303jame bausima\u0303jam',
  sgVoc: 'bausima\u0300sis',
  plNom: 'bausimi\u0301eji',
  plGen: 'bausimų\u0303jų',
  plDat: 'bausimi\u0301esiems bausimi\u0301esiem',
  plAcc: 'bausimu\u0301osius',
  plInst: 'bausimai\u0303siais',
  plLoc: 'bausimuo\u0303siuose bausimuo\u0303siuos',
  plVoc: 'bausimi\u0301eji',
}
const BAUSIMA = {
  sgNom: 'bausima\u0300',
  sgGen: 'bausimo\u0303s',
  sgDat: 'bau\u0303simai',
  sgAcc: 'bau\u0303simą',
  sgInst: 'bau\u0303sima',
  sgLoc: 'bausimoje\u0300 bausimo\u0303j',
  sgVoc: 'bausima\u0300',
  plNom: 'bau\u0303simos',
  plGen: 'bausimų\u0303',
  plDat: 'bausimo\u0301ms bausimo\u0301m',
  plAcc: 'bau\u0303simas',
  plInst: 'bausimomi\u0300s bausimo\u0303m',
  plLoc: 'bausimose\u0300',
  plVoc: 'bau\u0303simos',
}
const BAUSIMOJI = {
  sgNom: 'bausimo\u0301ji',
  sgGen: 'bausimo\u0303sios',
  sgDat: 'bau\u0303simajai',
  sgAcc: 'bau\u0303simąją',
  sgInst: 'bausimą\u0301ja',
  sgLoc: 'bausimo\u0303joje bausimo\u0303joj',
  sgVoc: 'bausimo\u0301ji',
  plNom: 'bau\u0303simosios',
  plGen: 'bausimų\u0303jų',
  plDat: 'bausimo\u0301sioms bausimo\u0301siom',
  plAcc: 'bausimą\u0301sias',
  plInst: 'bausimo\u0303siomis bausimo\u0303siom',
  plLoc: 'bausimo\u0303siose',
  plVoc: 'bau\u0303simosios',
}
const NESIBAUSIMAS = {
  sgNom: 'nesibau\u0303simas',
  sgGen: 'nesibau\u0303simo',
  sgDat: 'nesibausima\u0301m',
  sgAcc: 'nesibau\u0303simą',
  sgInst: 'nesibau\u0303simu',
  sgLoc: 'nesibausimame\u0300 nesibausimam\u0303',
  sgVoc: 'nesibau\u0303simas',
  plNom: 'nesibausimi\u0300',
  plGen: 'nesibausimų\u0303',
  plDat: 'nesibausimi\u0301ems nesibausimi\u0301em',
  plAcc: 'nesibau\u0303simus',
  plInst: 'nesibausimai\u0303s',
  plLoc: 'nesibausimuose\u0300 nesibausimuo\u0303s',
  plVoc: 'nesibausimi\u0300',
}
const NESIBAUSIMASIS = {
  sgNom: 'nesibausima\u0300sis',
  sgGen: 'nesibau\u0303simojo',
  sgDat: 'nesibausima\u0301jam',
  sgAcc: 'nesibau\u0303simąjį',
  sgInst: 'nesibausimu\u0301oju',
  sgLoc: 'nesibausima\u0303jame nesibausima\u0303jam',
  sgVoc: 'nesibausima\u0300sis',
  plNom: 'nesibausimi\u0301eji',
  plGen: 'nesibausimų\u0303jų',
  plDat: 'nesibausimi\u0301esiems nesibausimi\u0301esiem',
  plAcc: 'nesibausimu\u0301osius',
  plInst: 'nesibausimai\u0303siais',
  plLoc: 'nesibausimuo\u0303siuose nesibausimuo\u0303siuos',
  plVoc: 'nesibausimi\u0301eji',
}
const NESIBAUSIMA = {
  sgNom: 'nesibausima\u0300',
  sgGen: 'nesibausimo\u0303s',
  sgDat: 'nesibau\u0303simai',
  sgAcc: 'nesibau\u0303simą',
  sgInst: 'nesibau\u0303sima',
  sgLoc: 'nesibausimoje\u0300 nesibausimo\u0303j',
  sgVoc: 'nesibausima\u0300',
  plNom: 'nesibau\u0303simos',
  plGen: 'nesibausimų\u0303',
  plDat: 'nesibausimo\u0301ms nesibausimo\u0301m',
  plAcc: 'nesibau\u0303simas',
  plInst: 'nesibausimomi\u0300s nesibausimo\u0303m',
  plLoc: 'nesibausimose\u0300',
  plVoc: 'nesibau\u0303simos',
}
const NESIBAUSIMOJI = {
  sgNom: 'nesibausimo\u0301ji',
  sgGen: 'nesibausimo\u0303sios',
  sgDat: 'nesibau\u0303simajai',
  sgAcc: 'nesibau\u0303simąją',
  sgInst: 'nesibausimą\u0301ja',
  sgLoc: 'nesibausimo\u0303joje nesibausimo\u0303joj',
  sgVoc: 'nesibausimo\u0301ji',
  plNom: 'nesibau\u0303simosios',
  plGen: 'nesibausimų\u0303jų',
  plDat: 'nesibausimo\u0301sioms nesibausimo\u0301siom',
  plAcc: 'nesibausimą\u0301sias',
  plInst: 'nesibausimo\u0303siomis nesibausimo\u0303siom',
  plLoc: 'nesibausimo\u0303siose',
  plVoc: 'nesibau\u0303simosios',
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
        masculine: NOMINAL_EMPTY,
        feminine: NOMINAL_EMPTY,
        neuter: `bė\u0301gsimasi`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(BEGTI)).toMatchObject({
        masculine: NOMINAL_EMPTY,
        feminine: NOMINAL_EMPTY,
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
      expect(decliner.getPrefixed(BEGTI, 'nesi')).toMatchObject({
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
        masculine: NOMINAL_EMPTY,
        feminine: NOMINAL_EMPTY,
        neuter: `dainu\u0301osimasi`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(DAINUOTI)).toMatchObject({
        masculine: NOMINAL_EMPTY,
        feminine: NOMINAL_EMPTY,
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
      expect(decliner.getPrefixed(DAINUOTI, 'nesi')).toMatchObject({
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
  describe('bausti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(BAUSTI)).toMatchObject({
        masculine: BAUSIMAS,
        feminine: BAUSIMA,
        neuter: `bau\u0303sima`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(BAUSTI)).toMatchObject({
        masculine: BAUSIMASIS,
        feminine: BAUSIMOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(BAUSTI)).toMatchObject({
        masculine: NOMINAL_EMPTY,
        feminine: NOMINAL_EMPTY,
        neuter: `bau\u0303simasi`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(BAUSTI)).toMatchObject({
        masculine: NOMINAL_EMPTY,
        feminine: NOMINAL_EMPTY,
      })
    })
  })
  describe('nesibausti', () => {
    it('conjugates reflexive', () => {
      expect(decliner.getPrefixedReflexive(BAUSTI, 'ne')).toMatchObject({
        masculine: NESIBAUSIMAS,
        feminine: NESIBAUSIMA,
        neuter: `nesibau\u0303sima`,
      })
      expect(decliner.getPrefixed(BAUSTI, 'nesi')).toMatchObject({
        masculine: NESIBAUSIMAS,
        feminine: NESIBAUSIMA,
        neuter: `nesibau\u0303sima`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getPrefixedReflexivePronominal(BAUSTI, 'ne'))
        .toMatchObject({
          masculine: NESIBAUSIMASIS,
          feminine: NESIBAUSIMOJI,
        })
    })
  })
})
