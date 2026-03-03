import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { PrincipalPartsType } from '~src/types.ts'
import PastPassiveParticipleDecliner from '~conjugators/PastPassiveParticipleDecliner.ts'
import { makeDeclinedFromArray } from '~test/testHelpers.ts'
import { declinedEmpty } from '~src/utils.ts'

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
  `riñktas riñkto rinktám riñktą rinktù rinktamè riñktas
rinktì rinktų̃ rinktíems rinktùs rinktaĩs rinktuosè rinktì`
    .split(/\s/),
)
const RINKTASIS = makeDeclinedFromArray(
  `rinktàsis riñktojo rinktájam riñktąjį rinktúoju rinktãjame rinktàsis
rinktíeji rinktų̃jų rinktíesiems rinktúosius rinktaĩsiais rinktuõsiuose rinktíeji`
    .split(/\s/),
)
const RINKTA = makeDeclinedFromArray(
  `rinktà rinktõs riñktai riñktą rinktà rinktojè rinktà
riñktos rinktų̃ rinktóms rinktàs rinktomìs rinktosè riñktos`
    .split(/\s/),
)
const RINKTOJI = makeDeclinedFromArray(
  `rinktóji rinktõsios riñktajai riñktąją rinktą́ja rinktõjoje rinktóji
riñktosios rinktų̃jų rinktósioms rinktą́sias rinktõsiomis rinktõsiose riñktosios`
    .split(/\s/),
)

const NESIRINKTAS = makeDeclinedFromArray(
  `nesìrinktas nesìrinkto nesirinktám nesìrinktą nesìrinktu nesirinktamè nesìrinktas
nesirinktì nesirinktų̃ nesirinktíems nesìrinktus nesirinktaĩs nesirinktuosè nesirinktì`
    .split(/\s/),
)
const NESIRINKTASIS = makeDeclinedFromArray(
  `nesirinktàsis nesìrinktojo nesirinktájam nesìrinktąjį nesirinktúoju nesirinktãjame nesirinktàsis
nesirinktíeji nesirinktų̃jų nesirinktíesiems nesirinktúosius nesirinktaĩsiais nesirinktuõsiuose nesirinktíeji`
    .split(/\s/),
)
const NESIRINKTA = makeDeclinedFromArray(
  `nesirinktà nesirinktõs nesìrinktai nesìrinktą nesìrinkta nesirinktojè nesirinktà
nesìrinktos nesirinktų̃ nesirinktóms nesìrinktas nesirinktomìs nesirinktosè nesìrinktos`
    .split(/\s/),
)
const NESIRINKTOJI = makeDeclinedFromArray(
  `nesirinktóji nesirinktõsios nesìrinktajai nesìrinktąją nesirinktą́ja nesirinktõjoje nesirinktóji
nesìrinktosios nesirinktų̃jų nesirinktósioms nesirinktą́sias nesirinktõsiomis nesirinktõsiose nesìrinktosios`
    .split(/\s/),
)

const DAZYTAS = makeDeclinedFromArray(
  `dažýtas dažýto dažýtam dažýtą dažýtu dažýtame dažýtas
dažýti dažýtų dažýtiems dažýtus dažýtais dažýtuose dažýti`
    .split(/\s/),
)
const DAZYTASIS = makeDeclinedFromArray(
  `dažýtasis dažýtojo dažýtajam dažýtąjį dažýtuoju dažýtajame dažýtasis
dažýtieji dažýtųjų dažýtiesiems dažýtuosius dažýtaisiais dažýtuosiuose dažýtieji`
    .split(/\s/),
)
const DAZYTA = makeDeclinedFromArray(
  `dažýta dažýtos dažýtai dažýtą dažýta dažýtoje dažýta
dažýtos dažýtų dažýtoms dažýtas dažýtomis dažýtose dažýtos`
    .split(/\s/),
)
const DAZYTOJI = makeDeclinedFromArray(
  `dažýtoji dažýtosios dažýtajai dažýtąją dažýtąja dažýtojoje dažýtoji
dažýtosios dažýtųjų dažýtosioms dažýtąsias dažýtosiomis dažýtosiose dažýtosios`
    .split(/\s/),
)

const BEGTAS = makeDeclinedFromArray(
  `bė́gtas bė́gto bėgtám bė́gtą bė́gtu bėgtamè bė́gtas
bėgtì bėgtų̃ bėgtíems bė́gtus bėgtaĩs bėgtuosè bėgtì`
    .split(/\s/),
)
const BEGTASIS = makeDeclinedFromArray(
  `bėgtàsis bė́gtojo bėgtájam bė́gtąjį bėgtúoju bėgtãjame bėgtàsis
bėgtíeji bėgtų̃jų bėgtíesiems bėgtúosius bėgtaĩsiais bėgtuõsiuose bėgtíeji`
    .split(/\s/),
)
const BEGTA = makeDeclinedFromArray(
  `bėgtà bėgtõs bė́gtai bė́gtą bė́gta bėgtojè bėgtà
bė́gtos bėgtų̃ bėgtóms bė́gtas bėgtomìs bėgtosè bė́gtos`
    .split(/\s/),
)
const BEGTOJI = makeDeclinedFromArray(
  `bėgtóji bėgtõsios bė́gtajai bė́gtąją bėgtą́ja bėgtõjoje bėgtóji
bė́gtosios bėgtų̃jų bėgtósioms bėgtą́sias bėgtõsiomis bėgtõsiose bė́gtosios`
    .split(/\s/),
)

const NEDAINUOTAS = makeDeclinedFromArray(
  `nedainúotas nedainúoto nedainúotam nedainúotą nedainúotu nedainúotame nedainúotas
nedainúoti nedainúotų nedainúotiems nedainúotus nedainúotais nedainúotuose nedainúoti`
    .split(/\s/),
)
const NEDAINUOTASIS = makeDeclinedFromArray(
  `nedainúotasis nedainúotojo nedainúotajam nedainúotąjį nedainúotuoju nedainúotajame nedainúotasis
nedainúotieji nedainúotųjų nedainúotiesiems nedainúotuosius nedainúotaisiais nedainúotuosiuose nedainúotieji`
    .split(/\s/),
)
const NEDAINUOTA = makeDeclinedFromArray(
  `nedainúota nedainúotos nedainúotai nedainúotą nedainúota nedainúotoje nedainúota
nedainúotos nedainúotų nedainúotoms nedainúotas nedainúotomis nedainúotose nedainúotos`
    .split(/\s/),
)
const NEDAINUOTOJI = makeDeclinedFromArray(
  `nedainúotoji nedainúotosios nedainúotajai nedainúotąją nedainúotąja nedainúotojoje nedainúotoji
nedainúotosios nedainúotųjų nedainúotosioms nedainúotąsias nedainúotosiomis nedainúotosiose nedainúotosios`
    .split(/\s/),
)

describe('PastPassiveParticipleDecliner', () => {
  const decliner = new PastPassiveParticipleDecliner()
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
})
