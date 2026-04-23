import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { DeclinedType, PrincipalPartsType } from '~src/types.ts'
import PassivePresentParticipleDecliner from '~conjugators/PassivePresentParticipleDecliner.ts'
import { NOMINAL_EMPTY } from '~src/commons.ts'

const PREFIX = 'ne'
const RINKTI: PrincipalPartsType = [
  `rin\u0303kti`,
  `ren\u0303ka`,
  `rin\u0303ko`,
]
const DARYTI: PrincipalPartsType = [
  `dary\u0301ti`,
  `da\u0303ro`,
  `da\u0303rė`,
]

const RENKAMAS: DeclinedType = {
  sgNom: `ren\u0303kamas`,
  sgGen: `ren\u0303kamo`,
  sgDat: `renkama\u0301m`,
  sgAcc: `ren\u0303kamą`,
  sgInst: `ren\u0303kamu`,
  sgLoc: `renkamame\u0300 renkamam\u0303`,
  sgVoc: `ren\u0303kamas`,
  plNom: `renkami\u0300`,
  plGen: `renkamų\u0303`,
  plDat: `renkami\u0301ems renkami\u0301em`,
  plAcc: `ren\u0303kamus`,
  plInst: `renkamai\u0303s`,
  plLoc: `renkamuose\u0300 renkamuo\u0303s`,
  plVoc: `renkami\u0300`,
}
const RENKAMASIS: DeclinedType = {
  sgNom: `renkama\u0300sis`,
  sgGen: `ren\u0303kamojo`,
  sgDat: `renkama\u0301jam`,
  sgAcc: `ren\u0303kamąjį`,
  sgInst: `renkamu\u0301oju`,
  sgLoc: `renkama\u0303jame renkama\u0303jam`,
  sgVoc: `renkama\u0300sis`,
  plNom: `renkami\u0301eji`,
  plGen: `renkamų\u0303jų`,
  plDat: `renkami\u0301esiems renkami\u0301esiem`,
  plAcc: `renkamu\u0301osius`,
  plInst: `renkamai\u0303siais`,
  plLoc: `renkamuo\u0303siuose renkamuo\u0303siuos`,
  plVoc: `renkami\u0301eji`,
}
const RENKAMA: DeclinedType = {
  sgNom: `renkama\u0300`,
  sgGen: `renkamo\u0303s`,
  sgDat: `ren\u0303kamai`,
  sgAcc: `ren\u0303kamą`,
  sgInst: `ren\u0303kama`,
  sgLoc: `renkamoje\u0300 renkamo\u0303j`,
  sgVoc: `renkama\u0300`,
  plNom: `ren\u0303kamos`,
  plGen: `renkamų\u0303`,
  plDat: `renkamo\u0301ms renkamo\u0301m`,
  plAcc: `ren\u0303kamas`,
  plInst: `renkamomi\u0300s renkamo\u0303m`,
  plLoc: `renkamose\u0300`,
  plVoc: `ren\u0303kamos`,
}
const RENKAMOJI: DeclinedType = {
  sgNom: `renkamo\u0301ji`,
  sgGen: `renkamo\u0303sios`,
  sgDat: `ren\u0303kamajai`,
  sgAcc: `ren\u0303kamąją`,
  sgInst: `renkamą\u0301ja`,
  sgLoc: `renkamo\u0303joje renkamo\u0303joj`,
  sgVoc: `renkamo\u0301ji`,
  plNom: `ren\u0303kamosios`,
  plGen: `renkamų\u0303jų`,
  plDat: `renkamo\u0301sioms renkamo\u0301siom`,
  plAcc: `renkamą\u0301sias`,
  plInst: `renkamo\u0303siomis renkamo\u0303siom`,
  plLoc: `renkamo\u0303siose`,
  plVoc: `ren\u0303kamosios`,
}
const NERENKAMAS: DeclinedType = {
  sgNom: `ne\u0300renkamas`,
  sgGen: `ne\u0300renkamo`,
  sgDat: `nerenkama\u0301m`,
  sgAcc: `ne\u0300renkamą`,
  sgInst: `ne\u0300renkamu`,
  sgLoc: `nerenkamame\u0300 nerenkamam\u0303`,
  sgVoc: `ne\u0300renkamas`,
  plNom: `nerenkami\u0300`,
  plGen: `nerenkamų\u0303`,
  plDat: `nerenkami\u0301ems nerenkami\u0301em`,
  plAcc: `ne\u0300renkamus`,
  plInst: `nerenkamai\u0303s`,
  plLoc: `nerenkamuose\u0300 nerenkamuo\u0303s`,
  plVoc: `nerenkami\u0300`,
}
const NERENKAMASIS: DeclinedType = {
  sgNom: `nerenkama\u0300sis`,
  sgGen: `ne\u0300renkamojo`,
  sgDat: `nerenkama\u0301jam`,
  sgAcc: `ne\u0300renkamąjį`,
  sgInst: `nerenkamu\u0301oju`,
  sgLoc: `nerenkama\u0303jame nerenkama\u0303jam`,
  sgVoc: `nerenkama\u0300sis`,
  plNom: `nerenkami\u0301eji`,
  plGen: `nerenkamų\u0303jų`,
  plDat: `nerenkami\u0301esiems nerenkami\u0301esiem`,
  plAcc: `nerenkamu\u0301osius`,
  plInst: `nerenkamai\u0303siais`,
  plLoc: `nerenkamuo\u0303siuose nerenkamuo\u0303siuos`,
  plVoc: `nerenkami\u0301eji`,
}
const NERENKAMA: DeclinedType = {
  sgNom: `nerenkama\u0300`,
  sgGen: `nerenkamo\u0303s`,
  sgDat: `ne\u0300renkamai`,
  sgAcc: `ne\u0300renkamą`,
  sgInst: `ne\u0300renkama`,
  sgLoc: `nerenkamoje\u0300 nerenkamo\u0303j`,
  sgVoc: `nerenkama\u0300`,
  plNom: `ne\u0300renkamos`,
  plGen: `nerenkamų\u0303`,
  plDat: `nerenkamo\u0301ms nerenkamo\u0301m`,
  plAcc: `ne\u0300renkamas`,
  plInst: `nerenkamomi\u0300s nerenkamo\u0303m`,
  plLoc: `nerenkamose\u0300`,
  plVoc: `ne\u0300renkamos`,
}
const NERENKAMOJI: DeclinedType = {
  sgNom: `nerenkamo\u0301ji`,
  sgGen: `nerenkamo\u0303sios`,
  sgDat: `ne\u0300renkamajai`,
  sgAcc: `ne\u0300renkamąją`,
  sgInst: `nerenkamą\u0301ja`,
  sgLoc: `nerenkamo\u0303joje nerenkamo\u0303joj`,
  sgVoc: `nerenkamo\u0301ji`,
  plNom: `ne\u0300renkamosios`,
  plGen: `nerenkamų\u0303jų`,
  plDat: `nerenkamo\u0301sioms nerenkamo\u0301siom`,
  plAcc: `nerenkamą\u0301sias`,
  plInst: `nerenkamo\u0303siomis nerenkamo\u0303siom`,
  plLoc: `nerenkamo\u0303siose`,
  plVoc: `ne\u0300renkamosios`,
}
const DAROMAS: DeclinedType = {
  sgNom: `da\u0303romas`,
  sgGen: `da\u0303romo`,
  sgDat: `da\u0303romam`,
  sgAcc: `da\u0303romą`,
  sgInst: `da\u0303romu`,
  sgLoc: `da\u0303romame da\u0303romam`,
  sgVoc: `da\u0303romas`,
  plNom: `da\u0303romi`,
  plGen: `da\u0303romų`,
  plDat: `da\u0303romiems da\u0303romiem`,
  plAcc: `da\u0303romus`,
  plInst: `da\u0303romais`,
  plLoc: `da\u0303romuose da\u0303romuos`,
  plVoc: `da\u0303romi`,
}
const DAROMASIS: DeclinedType = {
  sgNom: `da\u0303romasis|daroma\u0300sis`,
  sgGen: `da\u0303romojo`,
  sgDat: `da\u0303romajam|daroma\u0301jam`,
  sgAcc: `da\u0303romąjį`,
  sgInst: `da\u0303romuoju|daromu\u0301oju`,
  sgLoc: `da\u0303romajame|daroma\u0303jame da\u0303romajam|daroma\u0303jam`,
  sgVoc: `da\u0303romasis|daroma\u0300sis`,
  plNom: `da\u0303romieji|daromi\u0301eji`,
  plGen: `da\u0303romųjų|daromų\u0303jų`,
  plDat:
    `da\u0303romiesiems|daromi\u0301esiems da\u0303romiesiem|daromi\u0301esiem`,
  plAcc: `da\u0303romuosius|daromu\u0301osius`,
  plInst: `da\u0303romaisiais|daromai\u0303siais`,
  plLoc:
    `da\u0303romuosiuose|daromuo\u0303siuose da\u0303romuosiuos|daromuo\u0303siuos`,
  plVoc: `da\u0303romieji|daromi\u0301eji`,
}
const DAROMA: DeclinedType = {
  sgNom: `da\u0303roma`,
  sgGen: `da\u0303romos`,
  sgDat: `da\u0303romai`,
  sgAcc: `da\u0303romą`,
  sgInst: `da\u0303roma`,
  sgLoc: `da\u0303romoje da\u0303romoj`,
  sgVoc: `da\u0303roma`,
  plNom: `da\u0303romos`,
  plGen: `da\u0303romų`,
  plDat: `da\u0303romoms da\u0303romom`,
  plAcc: `da\u0303romas`,
  plInst: `da\u0303romomis da\u0303romom`,
  plLoc: `da\u0303romose`,
  plVoc: `da\u0303romos`,
}
const DAROMOJI: DeclinedType = {
  sgNom: `da\u0303romoji|daromo\u0301ji`,
  sgGen: `da\u0303romosios|daromo\u0303sios`,
  sgDat: `da\u0303romajai`,
  sgAcc: `da\u0303romąją`,
  sgInst: `da\u0303romąja|daromą\u0301ja`,
  sgLoc: `da\u0303romojoje|daromo\u0303joje da\u0303romojoj|daromo\u0303joj`,
  sgVoc: `da\u0303romoji|daromo\u0301ji`,
  plNom: `da\u0303romosios`,
  plGen: `da\u0303romųjų|daromų\u0303jų`,
  plDat:
    `da\u0303romosioms|daromo\u0301sioms da\u0303romosiom|daromo\u0301siom`,
  plAcc: `da\u0303romąsias|daromą\u0301sias`,
  plInst:
    `da\u0303romosiomis|daromo\u0303siomis da\u0303romosiom|daromo\u0303siom`,
  plLoc: `da\u0303romosiose|daromo\u0303siose`,
  plVoc: `da\u0303romosios`,
}
const NEDAROMAS = {
  sgNom: `neda\u0303romas`,
  sgGen: `neda\u0303romo`,
  sgDat: `neda\u0303romam`,
  sgAcc: `neda\u0303romą`,
  sgInst: `neda\u0303romu`,
  sgLoc: `neda\u0303romame neda\u0303romam`,
  sgVoc: `neda\u0303romas`,
  plNom: `neda\u0303romi`,
  plGen: `neda\u0303romų`,
  plDat: `neda\u0303romiems neda\u0303romiem`,
  plAcc: `neda\u0303romus`,
  plInst: `neda\u0303romais`,
  plLoc: `neda\u0303romuose neda\u0303romuos`,
  plVoc: `neda\u0303romi`,
}
const NEDAROMASIS = {
  sgNom: `neda\u0303romasis|nedaroma\u0300sis`,
  sgGen: `neda\u0303romojo`,
  sgDat: `neda\u0303romajam|nedaroma\u0301jam`,
  sgAcc: `neda\u0303romąjį`,
  sgInst: `neda\u0303romuoju|nedaromu\u0301oju`,
  sgLoc:
    `neda\u0303romajame|nedaroma\u0303jame neda\u0303romajam|nedaroma\u0303jam`,
  sgVoc: `neda\u0303romasis|nedaroma\u0300sis`,
  plNom: `neda\u0303romieji|nedaromi\u0301eji`,
  plGen: `neda\u0303romųjų|nedaromų\u0303jų`,
  plDat:
    `neda\u0303romiesiems|nedaromi\u0301esiems neda\u0303romiesiem|nedaromi\u0301esiem`,
  plAcc: `neda\u0303romuosius|nedaromu\u0301osius`,
  plInst: `neda\u0303romaisiais|nedaromai\u0303siais`,
  plLoc:
    `neda\u0303romuosiuose|nedaromuo\u0303siuose neda\u0303romuosiuos|nedaromuo\u0303siuos`,
  plVoc: `neda\u0303romieji|nedaromi\u0301eji`,
}
const NEDAROMA: DeclinedType = {
  sgNom: `neda\u0303roma`,
  sgGen: `neda\u0303romos`,
  sgDat: `neda\u0303romai`,
  sgAcc: `neda\u0303romą`,
  sgInst: `neda\u0303roma`,
  sgLoc: `neda\u0303romoje neda\u0303romoj`,
  sgVoc: `neda\u0303roma`,
  plNom: `neda\u0303romos`,
  plGen: `neda\u0303romų`,
  plDat: `neda\u0303romoms neda\u0303romom`,
  plAcc: `neda\u0303romas`,
  plInst: `neda\u0303romomis neda\u0303romom`,
  plLoc: `neda\u0303romose`,
  plVoc: `neda\u0303romos`,
}
const NEDAROMOJI: DeclinedType = {
  sgNom: `neda\u0303romoji|nedaromo\u0301ji`,
  sgGen: `neda\u0303romosios|nedaromo\u0303sios`,
  sgDat: `neda\u0303romajai`,
  sgAcc: `neda\u0303romąją`,
  sgInst: `neda\u0303romąja|nedaromą\u0301ja`,
  sgLoc:
    `neda\u0303romojoje|nedaromo\u0303joje neda\u0303romojoj|nedaromo\u0303joj`,
  sgVoc: `neda\u0303romoji|nedaromo\u0301ji`,
  plNom: `neda\u0303romosios`,
  plGen: `neda\u0303romųjų|nedaromų\u0303jų`,
  plDat:
    `neda\u0303romosioms|nedaromo\u0301sioms neda\u0303romosiom|nedaromo\u0301siom`,
  plAcc: `neda\u0303romąsias|nedaromą\u0301sias`,
  plInst:
    `neda\u0303romosiomis|nedaromo\u0303siomis neda\u0303romosiom|nedaromo\u0303siom`,
  plLoc: `neda\u0303romosiose|nedaromo\u0303siose`,
  plVoc: `neda\u0303romosios`,
}

describe('PassivePresentParticipleDecliner', () => {
  const decliner = new PassivePresentParticipleDecliner()
  describe('rinkt', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(RINKTI)).toMatchObject({
        masculine: RENKAMAS,
        feminine: RENKAMA,
        neuter: `ren\u0303kama`,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(RINKTI)).toMatchObject({
        masculine: NOMINAL_EMPTY,
        feminine: NOMINAL_EMPTY,
        neuter: `ren\u0303kamasi`,
      })
    })
    it('conjugates prefixed', () => {
      expect(decliner.getPrefixed(RINKTI, PREFIX)).toMatchObject({
        masculine: NERENKAMAS,
        feminine: NERENKAMA,
        neuter: `ne\u0300renkama`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(RINKTI)).toMatchObject({
        masculine: RENKAMASIS,
        feminine: RENKAMOJI,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(RINKTI)).toMatchObject({
        masculine: NOMINAL_EMPTY,
        feminine: NOMINAL_EMPTY,
      })
    })
    it('conjugates prefixed pronominal', () => {
      expect(decliner.getPrefixedPronominal(RINKTI, PREFIX)).toMatchObject({
        masculine: NERENKAMASIS,
        feminine: NERENKAMOJI,
      })
    })
  })
  describe('daryti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(DARYTI)).toMatchObject({
        masculine: DAROMAS,
        feminine: DAROMA,
        neuter: `da\u0303roma`,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(DARYTI)).toMatchObject({
        masculine: NOMINAL_EMPTY,
        feminine: NOMINAL_EMPTY,
        neuter: `da\u0303romasi`,
      })
    })
    it('conjugates prefixed', () => {
      expect(decliner.getPrefixed(DARYTI, PREFIX)).toMatchObject({
        masculine: NEDAROMAS,
        feminine: NEDAROMA,
        neuter: `neda\u0303roma`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(DARYTI)).toMatchObject({
        masculine: DAROMASIS,
        feminine: DAROMOJI,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(DARYTI)).toMatchObject({
        masculine: NOMINAL_EMPTY,
        feminine: NOMINAL_EMPTY,
      })
    })
    it('conjugates prefixed pronominal', () => {
      expect(decliner.getPrefixedPronominal(DARYTI, PREFIX)).toMatchObject({
        masculine: NEDAROMASIS,
        feminine: NEDAROMOJI,
      })
    })
  })
})
