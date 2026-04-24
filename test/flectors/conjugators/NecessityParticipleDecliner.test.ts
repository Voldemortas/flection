import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { PrincipalPartsType } from '~src/types.ts'
import NecessityParticipleDecliner from '~conjugators/NecessityParticipleDecliner.ts'
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
const BEGTINAS = {
  sgNom: 'bė\u0301gtinas',
  sgGen: 'bė\u0301gtino',
  sgDat: 'bėgtina\u0301m',
  sgAcc: 'bė\u0301gtiną',
  sgInst: 'bė\u0301gtinu',
  sgLoc: 'bėgtiname\u0300 bėgtinam\u0303',
  sgVoc: 'bė\u0301gtinas',
  plNom: 'bėgtini\u0300',
  plGen: 'bėgtinų\u0303',
  plDat: 'bėgtini\u0301ems bėgtini\u0301em',
  plAcc: 'bė\u0301gtinus',
  plInst: 'bėgtinai\u0303s',
  plLoc: 'bėgtinuose\u0300 bėgtinuo\u0303s',
  plVoc: 'bėgtini\u0300',
}
const BEGTINASIS = {
  sgNom: 'bėgtina\u0300sis',
  sgGen: 'bė\u0301gtinojo',
  sgDat: 'bėgtina\u0301jam',
  sgAcc: 'bė\u0301gtinąjį',
  sgInst: 'bėgtinu\u0301oju',
  sgLoc: 'bėgtina\u0303jame bėgtina\u0303jam',
  sgVoc: 'bėgtina\u0300sis',
  plNom: 'bėgtini\u0301eji',
  plGen: 'bėgtinų\u0303jų',
  plDat: 'bėgtini\u0301esiems bėgtini\u0301esiem',
  plAcc: 'bėgtinu\u0301osius',
  plInst: 'bėgtinai\u0303siais',
  plLoc: 'bėgtinuo\u0303siuose bėgtinuo\u0303siuos',
  plVoc: 'bėgtini\u0301eji',
}
const BEGTINA = {
  sgNom: 'bėgtina\u0300',
  sgGen: 'bėgtino\u0303s',
  sgDat: 'bė\u0301gtinai',
  sgAcc: 'bė\u0301gtiną',
  sgInst: 'bė\u0301gtina',
  sgLoc: 'bėgtinoje\u0300 bėgtino\u0303j',
  sgVoc: 'bėgtina\u0300',
  plNom: 'bė\u0301gtinos',
  plGen: 'bėgtinų\u0303',
  plDat: 'bėgtino\u0301ms bėgtino\u0301m',
  plAcc: 'bė\u0301gtinas',
  plInst: 'bėgtinomi\u0300s bėgtino\u0303m',
  plLoc: 'bėgtinose\u0300',
  plVoc: 'bė\u0301gtinos',
}
const BEGTINOJI = {
  sgNom: 'bėgtino\u0301ji',
  sgGen: 'bėgtino\u0303sios',
  sgDat: 'bė\u0301gtinajai',
  sgAcc: 'bė\u0301gtinąją',
  sgInst: 'bėgtiną\u0301ja',
  sgLoc: 'bėgtino\u0303joje bėgtino\u0303joj',
  sgVoc: 'bėgtino\u0301ji',
  plNom: 'bė\u0301gtinosios',
  plGen: 'bėgtinų\u0303jų',
  plDat: 'bėgtino\u0301sioms bėgtino\u0301siom',
  plAcc: 'bėgtiną\u0301sias',
  plInst: 'bėgtino\u0303siomis bėgtino\u0303siom',
  plLoc: 'bėgtino\u0303siose',
  plVoc: 'bė\u0301gtinosios',
}
const NESIBEGTINAS = {
  sgNom: 'nesibė\u0301gtinas',
  sgGen: 'nesibė\u0301gtino',
  sgDat: 'nesibėgtina\u0301m',
  sgAcc: 'nesibė\u0301gtiną',
  sgInst: 'nesibė\u0301gtinu',
  sgLoc: 'nesibėgtiname\u0300 nesibėgtinam\u0303',
  sgVoc: 'nesibė\u0301gtinas',
  plNom: 'nesibėgtini\u0300',
  plGen: 'nesibėgtinų\u0303',
  plDat: 'nesibėgtini\u0301ems nesibėgtini\u0301em',
  plAcc: 'nesibė\u0301gtinus',
  plInst: 'nesibėgtinai\u0303s',
  plLoc: 'nesibėgtinuose\u0300 nesibėgtinuo\u0303s',
  plVoc: 'nesibėgtini\u0300',
}
const NESIBEGTINASIS = {
  sgNom: 'nesibėgtina\u0300sis',
  sgGen: 'nesibė\u0301gtinojo',
  sgDat: 'nesibėgtina\u0301jam',
  sgAcc: 'nesibė\u0301gtinąjį',
  sgInst: 'nesibėgtinu\u0301oju',
  sgLoc: 'nesibėgtina\u0303jame nesibėgtina\u0303jam',
  sgVoc: 'nesibėgtina\u0300sis',
  plNom: 'nesibėgtini\u0301eji',
  plGen: 'nesibėgtinų\u0303jų',
  plDat: 'nesibėgtini\u0301esiems nesibėgtini\u0301esiem',
  plAcc: 'nesibėgtinu\u0301osius',
  plInst: 'nesibėgtinai\u0303siais',
  plLoc: 'nesibėgtinuo\u0303siuose nesibėgtinuo\u0303siuos',
  plVoc: 'nesibėgtini\u0301eji',
}
const NESIBEGTINA = {
  sgNom: 'nesibėgtina\u0300',
  sgGen: 'nesibėgtino\u0303s',
  sgDat: 'nesibė\u0301gtinai',
  sgAcc: 'nesibė\u0301gtiną',
  sgInst: 'nesibė\u0301gtina',
  sgLoc: 'nesibėgtinoje\u0300 nesibėgtino\u0303j',
  sgVoc: 'nesibėgtina\u0300',
  plNom: 'nesibė\u0301gtinos',
  plGen: 'nesibėgtinų\u0303',
  plDat: 'nesibėgtino\u0301ms nesibėgtino\u0301m',
  plAcc: 'nesibė\u0301gtinas',
  plInst: 'nesibėgtinomi\u0300s nesibėgtino\u0303m',
  plLoc: 'nesibėgtinose\u0300',
  plVoc: 'nesibė\u0301gtinos',
}
const NESIBEGTINOJI = {
  sgNom: 'nesibėgtino\u0301ji',
  sgGen: 'nesibėgtino\u0303sios',
  sgDat: 'nesibė\u0301gtinajai',
  sgAcc: 'nesibė\u0301gtinąją',
  sgInst: 'nesibėgtiną\u0301ja',
  sgLoc: 'nesibėgtino\u0303joje nesibėgtino\u0303joj',
  sgVoc: 'nesibėgtino\u0301ji',
  plNom: 'nesibė\u0301gtinosios',
  plGen: 'nesibėgtinų\u0303jų',
  plDat: 'nesibėgtino\u0301sioms nesibėgtino\u0301siom',
  plAcc: 'nesibėgtiną\u0301sias',
  plInst: 'nesibėgtino\u0303siomis nesibėgtino\u0303siom',
  plLoc: 'nesibėgtino\u0303siose',
  plVoc: 'nesibė\u0301gtinosios',
}

const BAUSTINAS = {
  sgNom: 'bau\u0303stinas',
  sgGen: 'bau\u0303stino',
  sgDat: 'baustina\u0301m',
  sgAcc: 'bau\u0303stiną',
  sgInst: 'bau\u0303stinu',
  sgLoc: 'baustiname\u0300 baustinam\u0303',
  sgVoc: 'bau\u0303stinas',
  plNom: 'baustini\u0300',
  plGen: 'baustinų\u0303',
  plDat: 'baustini\u0301ems baustini\u0301em',
  plAcc: 'bau\u0303stinus',
  plInst: 'baustinai\u0303s',
  plLoc: 'baustinuose\u0300 baustinuo\u0303s',
  plVoc: 'baustini\u0300',
}
const BAUSTINASIS = {
  sgNom: 'baustina\u0300sis',
  sgGen: 'bau\u0303stinojo',
  sgDat: 'baustina\u0301jam',
  sgAcc: 'bau\u0303stinąjį',
  sgInst: 'baustinu\u0301oju',
  sgLoc: 'baustina\u0303jame baustina\u0303jam',
  sgVoc: 'baustina\u0300sis',
  plNom: 'baustini\u0301eji',
  plGen: 'baustinų\u0303jų',
  plDat: 'baustini\u0301esiems baustini\u0301esiem',
  plAcc: 'baustinu\u0301osius',
  plInst: 'baustinai\u0303siais',
  plLoc: 'baustinuo\u0303siuose baustinuo\u0303siuos',
  plVoc: 'baustini\u0301eji',
}
const BAUSTINA = {
  sgNom: 'baustina\u0300',
  sgGen: 'baustino\u0303s',
  sgDat: 'bau\u0303stinai',
  sgAcc: 'bau\u0303stiną',
  sgInst: 'bau\u0303stina',
  sgLoc: 'baustinoje\u0300 baustino\u0303j',
  sgVoc: 'baustina\u0300',
  plNom: 'bau\u0303stinos',
  plGen: 'baustinų\u0303',
  plDat: 'baustino\u0301ms baustino\u0301m',
  plAcc: 'bau\u0303stinas',
  plInst: 'baustinomi\u0300s baustino\u0303m',
  plLoc: 'baustinose\u0300',
  plVoc: 'bau\u0303stinos',
}
const BAUSTINOJI = {
  sgNom: 'baustino\u0301ji',
  sgGen: 'baustino\u0303sios',
  sgDat: 'bau\u0303stinajai',
  sgAcc: 'bau\u0303stinąją',
  sgInst: 'baustiną\u0301ja',
  sgLoc: 'baustino\u0303joje baustino\u0303joj',
  sgVoc: 'baustino\u0301ji',
  plNom: 'bau\u0303stinosios',
  plGen: 'baustinų\u0303jų',
  plDat: 'baustino\u0301sioms baustino\u0301siom',
  plAcc: 'baustiną\u0301sias',
  plInst: 'baustino\u0303siomis baustino\u0303siom',
  plLoc: 'baustino\u0303siose',
  plVoc: 'bau\u0303stinosios',
}
const NESIBAUSTINAS = {
  sgNom: 'nesibau\u0303stinas',
  sgGen: 'nesibau\u0303stino',
  sgDat: 'nesibaustina\u0301m',
  sgAcc: 'nesibau\u0303stiną',
  sgInst: 'nesibau\u0303stinu',
  sgLoc: 'nesibaustiname\u0300 nesibaustinam\u0303',
  sgVoc: 'nesibau\u0303stinas',
  plNom: 'nesibaustini\u0300',
  plGen: 'nesibaustinų\u0303',
  plDat: 'nesibaustini\u0301ems nesibaustini\u0301em',
  plAcc: 'nesibau\u0303stinus',
  plInst: 'nesibaustinai\u0303s',
  plLoc: 'nesibaustinuose\u0300 nesibaustinuo\u0303s',
  plVoc: 'nesibaustini\u0300',
}
const NESIBAUSTINASIS = {
  sgNom: 'nesibaustina\u0300sis',
  sgGen: 'nesibau\u0303stinojo',
  sgDat: 'nesibaustina\u0301jam',
  sgAcc: 'nesibau\u0303stinąjį',
  sgInst: 'nesibaustinu\u0301oju',
  sgLoc: 'nesibaustina\u0303jame nesibaustina\u0303jam',
  sgVoc: 'nesibaustina\u0300sis',
  plNom: 'nesibaustini\u0301eji',
  plGen: 'nesibaustinų\u0303jų',
  plDat: 'nesibaustini\u0301esiems nesibaustini\u0301esiem',
  plAcc: 'nesibaustinu\u0301osius',
  plInst: 'nesibaustinai\u0303siais',
  plLoc: 'nesibaustinuo\u0303siuose nesibaustinuo\u0303siuos',
  plVoc: 'nesibaustini\u0301eji',
}
const NESIBAUSTINA = {
  sgNom: 'nesibaustina\u0300',
  sgGen: 'nesibaustino\u0303s',
  sgDat: 'nesibau\u0303stinai',
  sgAcc: 'nesibau\u0303stiną',
  sgInst: 'nesibau\u0303stina',
  sgLoc: 'nesibaustinoje\u0300 nesibaustino\u0303j',
  sgVoc: 'nesibaustina\u0300',
  plNom: 'nesibau\u0303stinos',
  plGen: 'nesibaustinų\u0303',
  plDat: 'nesibaustino\u0301ms nesibaustino\u0301m',
  plAcc: 'nesibau\u0303stinas',
  plInst: 'nesibaustinomi\u0300s nesibaustino\u0303m',
  plLoc: 'nesibaustinose\u0300',
  plVoc: 'nesibau\u0303stinos',
}
const NESIBAUSTINOJI = {
  sgNom: 'nesibaustino\u0301ji',
  sgGen: 'nesibaustino\u0303sios',
  sgDat: 'nesibau\u0303stinajai',
  sgAcc: 'nesibau\u0303stinąją',
  sgInst: 'nesibaustiną\u0301ja',
  sgLoc: 'nesibaustino\u0303joje nesibaustino\u0303joj',
  sgVoc: 'nesibaustino\u0301ji',
  plNom: 'nesibau\u0303stinosios',
  plGen: 'nesibaustinų\u0303jų',
  plDat: 'nesibaustino\u0301sioms nesibaustino\u0301siom',
  plAcc: 'nesibaustiną\u0301sias',
  plInst: 'nesibaustino\u0303siomis nesibaustino\u0303siom',
  plLoc: 'nesibaustino\u0303siose',
  plVoc: 'nesibau\u0303stinosios',
}

const DAINUOTINAS = {
  sgNom: `dainu\u0301otinas`,
  sgGen: `dainu\u0301otino`,
  sgDat: `dainu\u0301otinam`,
  sgAcc: `dainu\u0301otiną`,
  sgInst: `dainu\u0301otinu`,
  sgLoc: `dainu\u0301otiname dainu\u0301otinam`,
  sgVoc: `dainu\u0301otinas`,
  plNom: `dainu\u0301otini`,
  plGen: `dainu\u0301otinų`,
  plDat: `dainu\u0301otiniems dainu\u0301otiniem`,
  plAcc: `dainu\u0301otinus`,
  plInst: `dainu\u0301otinais`,
  plLoc: `dainu\u0301otinuose dainu\u0301otinuos`,
  plVoc: `dainu\u0301otini`,
}
const DAINUOTINASIS = {
  sgNom: `dainu\u0301otinasis`,
  sgGen: `dainu\u0301otinojo`,
  sgDat: `dainu\u0301otinajam`,
  sgAcc: `dainu\u0301otinąjį`,
  sgInst: `dainu\u0301otinuoju`,
  sgLoc: `dainu\u0301otinajame dainu\u0301otinajam`,
  sgVoc: `dainu\u0301otinasis`,
  plNom: `dainu\u0301otinieji`,
  plGen: `dainu\u0301otinųjų`,
  plDat: `dainu\u0301otiniesiems dainu\u0301otiniesiem`,
  plAcc: `dainu\u0301otinuosius`,
  plInst: `dainu\u0301otinaisiais`,
  plLoc: `dainu\u0301otinuosiuose dainu\u0301otinuosiuos`,
  plVoc: `dainu\u0301otinieji`,
}
const DAINUOTINA = {
  sgNom: `dainu\u0301otina`,
  sgGen: `dainu\u0301otinos`,
  sgDat: `dainu\u0301otinai`,
  sgAcc: `dainu\u0301otiną`,
  sgInst: `dainu\u0301otina`,
  sgLoc: `dainu\u0301otinoje dainu\u0301otinoj`,
  sgVoc: `dainu\u0301otina`,
  plNom: `dainu\u0301otinos`,
  plGen: `dainu\u0301otinų`,
  plDat: `dainu\u0301otinoms dainu\u0301otinom`,
  plAcc: `dainu\u0301otinas`,
  plInst: `dainu\u0301otinomis dainu\u0301otinom`,
  plLoc: `dainu\u0301otinose`,
  plVoc: `dainu\u0301otinos`,
}
const DAINUOTINOJI = {
  sgNom: `dainu\u0301otinoji`,
  sgGen: `dainu\u0301otinosios`,
  sgDat: `dainu\u0301otinajai`,
  sgAcc: `dainu\u0301otinąją`,
  sgInst: `dainu\u0301otinąja`,
  sgLoc: `dainu\u0301otinojoje dainu\u0301otinojoj`,
  sgVoc: `dainu\u0301otinoji`,
  plNom: `dainu\u0301otinosios`,
  plGen: `dainu\u0301otinųjų`,
  plDat: `dainu\u0301otinosioms dainu\u0301otinosiom`,
  plAcc: `dainu\u0301otinąsias`,
  plInst: `dainu\u0301otinosiomis dainu\u0301otinosiom`,
  plLoc: `dainu\u0301otinosiose`,
  plVoc: `dainu\u0301otinosios`,
}
const NESIDAINUOTINAS = {
  sgNom: `nesidainu\u0301otinas`,
  sgGen: `nesidainu\u0301otino`,
  sgDat: `nesidainu\u0301otinam`,
  sgAcc: `nesidainu\u0301otiną`,
  sgInst: `nesidainu\u0301otinu`,
  sgLoc: `nesidainu\u0301otiname nesidainu\u0301otinam`,
  sgVoc: `nesidainu\u0301otinas`,
  plNom: `nesidainu\u0301otini`,
  plGen: `nesidainu\u0301otinų`,
  plDat: `nesidainu\u0301otiniems nesidainu\u0301otiniem`,
  plAcc: `nesidainu\u0301otinus`,
  plInst: `nesidainu\u0301otinais`,
  plLoc: `nesidainu\u0301otinuose nesidainu\u0301otinuos`,
  plVoc: `nesidainu\u0301otini`,
}
const NESIDAINUOTINASIS = {
  sgNom: `nesidainu\u0301otinasis`,
  sgGen: `nesidainu\u0301otinojo`,
  sgDat: `nesidainu\u0301otinajam`,
  sgAcc: `nesidainu\u0301otinąjį`,
  sgInst: `nesidainu\u0301otinuoju`,
  sgLoc: `nesidainu\u0301otinajame nesidainu\u0301otinajam`,
  sgVoc: `nesidainu\u0301otinasis`,
  plNom: `nesidainu\u0301otinieji`,
  plGen: `nesidainu\u0301otinųjų`,
  plDat: `nesidainu\u0301otiniesiems nesidainu\u0301otiniesiem`,
  plAcc: `nesidainu\u0301otinuosius`,
  plInst: `nesidainu\u0301otinaisiais`,
  plLoc: `nesidainu\u0301otinuosiuose nesidainu\u0301otinuosiuos`,
  plVoc: `nesidainu\u0301otinieji`,
}
const NESIDAINUOTINA = {
  sgNom: `nesidainu\u0301otina`,
  sgGen: `nesidainu\u0301otinos`,
  sgDat: `nesidainu\u0301otinai`,
  sgAcc: `nesidainu\u0301otiną`,
  sgInst: `nesidainu\u0301otina`,
  sgLoc: `nesidainu\u0301otinoje nesidainu\u0301otinoj`,
  sgVoc: `nesidainu\u0301otina`,
  plNom: `nesidainu\u0301otinos`,
  plGen: `nesidainu\u0301otinų`,
  plDat: `nesidainu\u0301otinoms nesidainu\u0301otinom`,
  plAcc: `nesidainu\u0301otinas`,
  plInst: `nesidainu\u0301otinomis nesidainu\u0301otinom`,
  plLoc: `nesidainu\u0301otinose`,
  plVoc: `nesidainu\u0301otinos`,
}
const NESIDAINUOTINOJI = {
  sgNom: `nesidainu\u0301otinoji`,
  sgGen: `nesidainu\u0301otinosios`,
  sgDat: `nesidainu\u0301otinajai`,
  sgAcc: `nesidainu\u0301otinąją`,
  sgInst: `nesidainu\u0301otinąja`,
  sgLoc: `nesidainu\u0301otinojoje nesidainu\u0301otinojoj`,
  sgVoc: `nesidainu\u0301otinoji`,
  plNom: `nesidainu\u0301otinosios`,
  plGen: `nesidainu\u0301otinųjų`,
  plDat: `nesidainu\u0301otinosioms nesidainu\u0301otinosiom`,
  plAcc: `nesidainu\u0301otinąsias`,
  plInst: `nesidainu\u0301otinosiomis nesidainu\u0301otinosiom`,
  plLoc: `nesidainu\u0301otinosiose`,
  plVoc: `nesidainu\u0301otinosios`,
}

describe('NecessityParticipleDecliner', () => {
  const decliner = new NecessityParticipleDecliner()
  describe('bėgti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(BEGTI)).toMatchObject({
        masculine: BEGTINAS,
        feminine: BEGTINA,
        neuter: `bė\u0301gtina`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(BEGTI)).toMatchObject({
        masculine: BEGTINASIS,
        feminine: BEGTINOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(BEGTI)).toMatchObject({
        masculine: NOMINAL_EMPTY,
        feminine: NOMINAL_EMPTY,
        neuter: `bė\u0301gtinasi`,
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
        masculine: NESIBEGTINAS,
        feminine: NESIBEGTINA,
        neuter: `nesibė\u0301gtina`,
      })
      expect(decliner.getPrefixed(BEGTI, 'nesi')).toMatchObject({
        masculine: NESIBEGTINAS,
        feminine: NESIBEGTINA,
        neuter: `nesibė\u0301gtina`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getPrefixedReflexivePronominal(BEGTI, 'ne'))
        .toMatchObject({
          masculine: NESIBEGTINASIS,
          feminine: NESIBEGTINOJI,
        })
    })
  })
  describe('dainuoti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(DAINUOTI)).toMatchObject({
        masculine: DAINUOTINAS,
        feminine: DAINUOTINA,
        neuter: `dainu\u0301otina`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(DAINUOTI)).toMatchObject({
        masculine: DAINUOTINASIS,
        feminine: DAINUOTINOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(DAINUOTI)).toMatchObject({
        masculine: NOMINAL_EMPTY,
        feminine: NOMINAL_EMPTY,
        neuter: `dainu\u0301otinasi`,
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
        masculine: NESIDAINUOTINAS,
        feminine: NESIDAINUOTINA,
        neuter: `nesidainu\u0301otina`,
      })
      expect(decliner.getPrefixed(DAINUOTI, 'nesi')).toMatchObject({
        masculine: NESIDAINUOTINAS,
        feminine: NESIDAINUOTINA,
        neuter: `nesidainu\u0301otina`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getPrefixedReflexivePronominal(DAINUOTI, 'ne'))
        .toMatchObject({
          masculine: NESIDAINUOTINASIS,
          feminine: NESIDAINUOTINOJI,
        })
    })
  })
  describe('bausti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(BAUSTI)).toMatchObject({
        masculine: BAUSTINAS,
        feminine: BAUSTINA,
        neuter: `bau\u0303stina`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(BAUSTI)).toMatchObject({
        masculine: BAUSTINASIS,
        feminine: BAUSTINOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(BAUSTI)).toMatchObject({
        masculine: NOMINAL_EMPTY,
        feminine: NOMINAL_EMPTY,
        neuter: `bau\u0303stinasi`,
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
        masculine: NESIBAUSTINAS,
        feminine: NESIBAUSTINA,
        neuter: `nesibau\u0303stina`,
      })
      expect(decliner.getPrefixed(BAUSTI, 'nesi')).toMatchObject({
        masculine: NESIBAUSTINAS,
        feminine: NESIBAUSTINA,
        neuter: `nesibau\u0303stina`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getPrefixedReflexivePronominal(BAUSTI, 'ne'))
        .toMatchObject({
          masculine: NESIBAUSTINASIS,
          feminine: NESIBAUSTINOJI,
        })
    })
  })
})
