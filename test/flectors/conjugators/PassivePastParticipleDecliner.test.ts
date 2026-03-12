import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { PrincipalPartsType } from '~src/types.ts'
import PassivePastParticipleDecliner from '~conjugators/PassivePastParticipleDecliner.ts'
import { EITI, makeDeclinedFromArray } from '~test/testHelpers.ts'

import { declinedEmpty } from '~src/commons.ts'

const RINKTI: PrincipalPartsType = [
  `rin\u0303kti`,
  `ren\u0303ka`,
  `rin\u0303ko`,
]
const DAZYTI: PrincipalPartsType = [
  `dažy\u0301ti`,
  `da\u0303žo`,
  `da\u0303žė`,
]
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

const RINKTAS = makeDeclinedFromArray(
  `riñktas  riñkto  rinktám  riñktą  rinktù  rinktamè rinktam\u0303  riñktas 
rinktì  rinktų̃  rinktíems rinktíem  rinktùs  rinktaĩs  rinktuosè rinktuo\u0303s  rinktì`
    .split(/\s\s/),
)
const RINKTASIS = makeDeclinedFromArray(
  `rinktàsis  riñktojo  rinktájam  riñktąjį  rinktúoju  rinktãjame rinktãjam  rinktàsis 
rinktíeji  rinktų̃jų  rinktíesiems rinktíesiem  rinktúosius  rinktaĩsiais  rinktuõsiuose rinktuõsiuos  rinktíeji`
    .split(/\s\s/),
)
const RINKTA = makeDeclinedFromArray(
  `rinktà  rinktõs  riñktai  riñktą  rinktà  rinktojè rinktoj\u0303  rinktà 
riñktos  rinktų̃  rinktóms rinktóm  rinktàs  rinktomìs rinkto\u0303m  rinktosè  riñktos`
    .split(/\s\s/),
)
const RINKTOJI = makeDeclinedFromArray(
  `rinktóji  rinktõsios  riñktajai  riñktąją  rinktą́ja  rinktõjoje rinktõjoj  rinktóji 
riñktosios  rinktų̃jų  rinktósioms rinktósiom  rinktą́sias  rinktõsiomis rinktõsiom  rinktõsiose  riñktosios`
    .split(/\s\s/),
)

const NESIRINKTAS = makeDeclinedFromArray(
  `nesìrinktas  nesìrinkto  nesirinktám  nesìrinktą  nesìrinktu  nesirinktamè nesirinktam\u0303  nesìrinktas 
nesirinktì  nesirinktų̃  nesirinktíems nesirinktíem  nesìrinktus  nesirinktaĩs  nesirinktuosè nesirinktuo\u0303s  nesirinktì`
    .split(/\s\s/),
)
const NESIRINKTASIS = makeDeclinedFromArray(
  `nesirinktàsis  nesìrinktojo  nesirinktájam  nesìrinktąjį  nesirinktúoju  nesirinktãjame nesirinktãjam  nesirinktàsis 
nesirinktíeji  nesirinktų̃jų  nesirinktíesiems nesirinktíesiem  nesirinktúosius  nesirinktaĩsiais  nesirinktuõsiuose nesirinktuõsiuos  nesirinktíeji`
    .split(/\s\s/),
)
const NESIRINKTA = makeDeclinedFromArray(
  `nesirinktà  nesirinktõs  nesìrinktai  nesìrinktą  nesìrinkta  nesirinktojè nesirinktoj\u0303  nesirinktà 
nesìrinktos  nesirinktų̃  nesirinktóms nesirinktóm  nesìrinktas  nesirinktomìs nesirinkto\u0303m  nesirinktosè  nesìrinktos`
    .split(/\s\s/),
)
const NESIRINKTOJI = makeDeclinedFromArray(
  `nesirinktóji  nesirinktõsios  nesìrinktajai  nesìrinktąją  nesirinktą́ja  nesirinktõjoje nesirinktõjoj  nesirinktóji 
nesìrinktosios  nesirinktų̃jų  nesirinktósioms nesirinktósiom  nesirinktą́sias  nesirinktõsiomis nesirinktõsiom  nesirinktõsiose  nesìrinktosios`
    .split(/\s\s/),
)

const DAZYTAS = makeDeclinedFromArray(
  `dažýtas  dažýto  dažýtam  dažýtą  dažýtu  dažýtame dažýtam  dažýtas 
dažýti  dažýtų  dažýtiems dažýtiem  dažýtus  dažýtais  dažýtuose dažýtuos  dažýti`
    .split(/\s\s/),
)
const DAZYTASIS = makeDeclinedFromArray(
  `dažýtasis  dažýtojo  dažýtajam  dažýtąjį  dažýtuoju  dažýtajame dažýtajam  dažýtasis 
dažýtieji  dažýtųjų  dažýtiesiems dažýtiesiem  dažýtuosius  dažýtaisiais  dažýtuosiuose dažýtuosiuos  dažýtieji`
    .split(/\s\s/),
)
const DAZYTA = makeDeclinedFromArray(
  `dažýta  dažýtos  dažýtai  dažýtą  dažýta  dažýtoje dažýtoj  dažýta 
dažýtos  dažýtų  dažýtoms dažýtom  dažýtas  dažýtomis dažýtom  dažýtose  dažýtos`
    .split(/\s\s/),
)
const DAZYTOJI = makeDeclinedFromArray(
  `dažýtoji  dažýtosios  dažýtajai  dažýtąją  dažýtąja  dažýtojoje dažýtojoj  dažýtoji 
dažýtosios  dažýtųjų  dažýtosioms dažýtosiom  dažýtąsias  dažýtosiomis dažýtosiom  dažýtosiose  dažýtosios`
    .split(/\s\s/),
)

const BEGTAS = makeDeclinedFromArray(
  `bė́gtas  bė́gto  bėgtám  bė́gtą  bė́gtu  bėgtamè bėgtam\u0303  bė́gtas 
bėgtì  bėgtų̃  bėgtíems bėgtíem  bė́gtus  bėgtaĩs  bėgtuosè bėgtuo\u0303s  bėgtì`
    .split(/\s\s/),
)
const BEGTASIS = makeDeclinedFromArray(
  `bėgtàsis  bė́gtojo  bėgtájam  bė́gtąjį  bėgtúoju  bėgtãjame bėgtãjam  bėgtàsis 
bėgtíeji  bėgtų̃jų  bėgtíesiems bėgtíesiem  bėgtúosius  bėgtaĩsiais  bėgtuõsiuose bėgtuõsiuos  bėgtíeji`
    .split(/\s\s/),
)
const BEGTA = makeDeclinedFromArray(
  `bėgtà  bėgtõs  bė́gtai  bė́gtą  bė́gta  bėgtojè bėgtoj\u0303  bėgtà 
bė́gtos  bėgtų̃  bėgtóms bėgtóm  bė́gtas  bėgtomìs bėgto\u0303m  bėgtosè  bė́gtos`
    .split(/\s\s/),
)
const BEGTOJI = makeDeclinedFromArray(
  `bėgtóji  bėgtõsios  bė́gtajai  bė́gtąją  bėgtą́ja  bėgtõjoje bėgtõjoj  bėgtóji 
bė́gtosios  bėgtų̃jų  bėgtósioms bėgtósiom  bėgtą́sias  bėgtõsiomis bėgtõsiom  bėgtõsiose  bė́gtosios`
    .split(/\s\s/),
)

const NEDAINUOTAS = makeDeclinedFromArray(
  `nedainúotas  nedainúoto  nedainúotam  nedainúotą  nedainúotu  nedainúotame nedainúotam  nedainúotas 
nedainúoti  nedainúotų  nedainúotiems nedainúotiem  nedainúotus  nedainúotais  nedainúotuose nedainúotuos  nedainúoti`
    .split(/\s\s/),
)
const NEDAINUOTASIS = makeDeclinedFromArray(
  `nedainúotasis  nedainúotojo  nedainúotajam  nedainúotąjį  nedainúotuoju  nedainúotajame nedainúotajam  nedainúotasis 
nedainúotieji  nedainúotųjų  nedainúotiesiems nedainúotiesiem  nedainúotuosius  nedainúotaisiais  nedainúotuosiuose nedainúotuosiuos  nedainúotieji`
    .split(/\s\s/),
)
const NEDAINUOTA = makeDeclinedFromArray(
  `nedainúota  nedainúotos  nedainúotai  nedainúotą  nedainúota  nedainúotoje nedainúotoj  nedainúota 
nedainúotos  nedainúotų  nedainúotoms nedainúotom  nedainúotas  nedainúotomis nedainúotom  nedainúotose  nedainúotos`
    .split(/\s\s/),
)
const NEDAINUOTOJI = makeDeclinedFromArray(
  `nedainúotoji  nedainúotosios  nedainúotajai  nedainúotąją  nedainúotąja  nedainúotojoje nedainúotojoj  nedainúotoji 
nedainúotosios  nedainúotųjų  nedainúotosioms nedainúotosiom  nedainúotąsias  nedainúotosiomis nedainúotosiom  nedainúotosiose  nedainúotosios`
    .split(/\s\s/),
)

describe('PassivePastParticipleDecliner', () => {
  const decliner = new PassivePastParticipleDecliner()
  describe('rinkti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(RINKTI)).toMatchObject({
        masculine: RINKTAS,
        feminine: RINKTA,
        neuter: `rin\u0303kta`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(RINKTI)).toMatchObject({
        masculine: RINKTASIS,
        feminine: RINKTOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(RINKTI)).toMatchObject({
        masculine: declinedEmpty,
        feminine: declinedEmpty,
        neuter: `rin\u0303ktasi`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(RINKTI)).toMatchObject({
        masculine: declinedEmpty,
        feminine: declinedEmpty,
      })
    })
  })
  describe('dažyti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(DAZYTI)).toMatchObject({
        masculine: DAZYTAS,
        feminine: DAZYTA,
        neuter: `dažy\u0301ta`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(DAZYTI)).toMatchObject({
        masculine: DAZYTASIS,
        feminine: DAZYTOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(DAZYTI)).toMatchObject({
        masculine: declinedEmpty,
        feminine: declinedEmpty,
        neuter: `dažy\u0301tasi`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(DAZYTI)).toMatchObject({
        masculine: declinedEmpty,
        feminine: declinedEmpty,
      })
    })
  })
  describe('bėgti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(BEGTI)).toMatchObject({
        masculine: BEGTAS,
        feminine: BEGTA,
        neuter: `bė\u0301gta`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(BEGTI)).toMatchObject({
        masculine: BEGTASIS,
        feminine: BEGTOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(BEGTI)).toMatchObject({
        masculine: declinedEmpty,
        feminine: declinedEmpty,
        neuter: `bė\u0301gtasi`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(BEGTI)).toMatchObject({
        masculine: declinedEmpty,
        feminine: declinedEmpty,
      })
    })
  })
  describe('nesirinkti', () => {
    it('conjugates default', () => {
      expect(decliner.getPrefixedReflexive(RINKTI, 'ne')).toMatchObject({
        masculine: NESIRINKTAS,
        feminine: NESIRINKTA,
        neuter: `nesi\u0300rinkta`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPrefixedReflexivePronominal(RINKTI, 'ne'))
        .toMatchObject({
          masculine: NESIRINKTASIS,
          feminine: NESIRINKTOJI,
        })
    })
  })
  describe('nesirinkti', () => {
    it('conjugates default', () => {
      expect(decliner.getPrefixedReflexive(RINKTI, 'ne')).toMatchObject({
        masculine: NESIRINKTAS,
        feminine: NESIRINKTA,
        neuter: `nesi\u0300rinkta`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPrefixedReflexivePronominal(RINKTI, 'ne'))
        .toMatchObject({
          masculine: NESIRINKTASIS,
          feminine: NESIRINKTOJI,
        })
    })
  })
  describe('nedainuoti', () => {
    it('conjugates default', () => {
      expect(decliner.getPrefixed(DAINUOTI, 'ne')).toMatchObject({
        masculine: NEDAINUOTAS,
        feminine: NEDAINUOTA,
        neuter: `nedainu\u0301ota`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPrefixedPronominal(DAINUOTI, 'ne'))
        .toMatchObject({
          masculine: NEDAINUOTASIS,
          feminine: NEDAINUOTOJI,
        })
    })
  })
  describe('neiti', () => {
    it('conjugates default', () => {
      expect(decliner.getPrefixed(EITI, 'ne').masculine.sgNom).toStrictEqual(
        'neitas',
      )
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPrefixedPronominal(EITI, 'ne').masculine.sgNom)
        .toStrictEqual('neitasis')
    })
  })
})
