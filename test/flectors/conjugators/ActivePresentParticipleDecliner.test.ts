import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { PrincipalPartsType } from '~src/types.ts'
import ActivePresentParticipleDecliner from '~conjugators/ActivePresentParticipleDecliner.ts'

const BUTI: PrincipalPartsType = [
  `būti`,
  `yra`,
  `buvo`,
]
const RINKTI: PrincipalPartsType = [
  `rin\u0303kti`,
  `ren\u0303ka`,
  `rin\u0303ko`,
]
const GULETI: PrincipalPartsType = [
  `gulė\u0301ti`,
  `gu\u0300li`,
  `gulė\u0301jo`,
]
const DAINUOTI: PrincipalPartsType = [
  `dainu\u0301oti`,
  `dainu\u0301oja`,
  `daina\u0303vo`,
]
const DAZYTI: PrincipalPartsType = [
  `dažy\u0301ti`,
  `da\u0303žo`,
  `da\u0303žė`,
]

const ESANTIS = {
  sgNom: `esąs esantis`,
  sgGen: `esančio`,
  sgDat: `esančiam`,
  sgAcc: `esantį`,
  sgInst: `esančiu`,
  sgLoc: `esančiame`,
  sgVoc: `esąs esantis`,
  plNom: `esą esantys`,
  plGen: `esančių`,
  plDat: `esantiems`,
  plAcc: `esančius`,
  plInst: `esančiais`,
  plLoc: `esančiuose`,
  plVoc: `esą esantys`,
}
const ESANTI = {
  sgNom: `esanti`,
  sgGen: `esančios`,
  sgDat: `esančiai`,
  sgAcc: `esančią`,
  sgInst: `esančia`,
  sgLoc: `esančioje`,
  sgVoc: `esanti`,
  plNom: `esančios esą`,
  plGen: `esančių`,
  plDat: `esančioms`,
  plAcc: `esančias`,
  plInst: `esančiomis`,
  plLoc: `esančiose`,
  plVoc: `esančios esą`,
}
const ESANTYSIS = {
  sgNom: `esantysis`,
  sgGen: `esančiojo`,
  sgDat: `esančiajam`,
  sgAcc: `esantįjį`,
  sgInst: `esančiuoju`,
  sgLoc: `esančiajame`,
  sgVoc: `esantysis`,
  plNom: `esantieji`,
  plGen: `esančiųjų`,
  plDat: `esantiesiems`,
  plAcc: `esančiuosius`,
  plInst: `esančiaisiais`,
  plLoc: `esančiuosiuose`,
  plVoc: `esantieji`,
}
const ESANCIOJI = {
  sgNom: `esančioji`,
  sgGen: `esančiosios`,
  sgDat: `esančiajai`,
  sgAcc: `esančiąją`,
  sgInst: `esančiąja`,
  sgLoc: `esančiojoje`,
  sgVoc: `esančioji`,
  plNom: `esančiosios`,
  plGen: `esančiųjų`,
  plDat: `esančiosioms`,
  plAcc: `esančiąsias`,
  plInst: `esančiosiomis`,
  plLoc: `esančiosiose`,
  plVoc: `esančiosios`,
}

const NESANTIS = {
  sgNom: `nesąs nesantis`,
  sgGen: `nesančio`,
  sgDat: `nesančiam`,
  sgAcc: `nesantį`,
  sgInst: `nesančiu`,
  sgLoc: `nesančiame`,
  sgVoc: `nesąs nesantis`,
  plNom: `nesą nesantys`,
  plGen: `nesančių`,
  plDat: `nesantiems`,
  plAcc: `nesančius`,
  plInst: `nesančiais`,
  plLoc: `nesančiuose`,
  plVoc: `nesą nesantys`,
}
const NESANTI = {
  sgNom: `nesanti`,
  sgGen: `nesančios`,
  sgDat: `nesančiai`,
  sgAcc: `nesančią`,
  sgInst: `nesančia`,
  sgLoc: `nesančioje`,
  sgVoc: `nesanti`,
  plNom: `nesančios nesą`,
  plGen: `nesančių`,
  plDat: `nesančioms`,
  plAcc: `nesančias`,
  plInst: `nesančiomis`,
  plLoc: `nesančiose`,
  plVoc: `nesančios nesą`,
}
const NESANTYSIS = {
  sgNom: `nesantysis`,
  sgGen: `nesančiojo`,
  sgDat: `nesančiajam`,
  sgAcc: `nesantįjį`,
  sgInst: `nesančiuoju`,
  sgLoc: `nesančiajame`,
  sgVoc: `nesantysis`,
  plNom: `nesantieji`,
  plGen: `nesančiųjų`,
  plDat: `nesantiesiems`,
  plAcc: `nesančiuosius`,
  plInst: `nesančiaisiais`,
  plLoc: `nesančiuosiuose`,
  plVoc: `nesantieji`,
}
const NESANCIOJI = {
  sgNom: `nesančioji`,
  sgGen: `nesančiosios`,
  sgDat: `nesančiajai`,
  sgAcc: `nesančiąją`,
  sgInst: `nesančiąja`,
  sgLoc: `nesančiojoje`,
  sgVoc: `nesančioji`,
  plNom: `nesančiosios`,
  plGen: `nesančiųjų`,
  plDat: `nesančiosioms`,
  plAcc: `nesančiąsias`,
  plInst: `nesančiosiomis`,
  plLoc: `nesančiosiose`,
  plVoc: `nesančiosios`,
}

const RENKANTIS = {
  sgNom: `renką\u0303s ren\u0303kantis`,
  sgGen: `ren\u0303kančio`,
  sgDat: `ren\u0303kančiam`,
  sgAcc: `ren\u0303kantį`,
  sgInst: `ren\u0303kančiu`,
  sgLoc: `ren\u0303kančiame`,
  sgVoc: `renką\u0303s ren\u0303kantis`,
  plNom: `renką\u0303 ren\u0303kantys`,
  plGen: `ren\u0303kančių`,
  plDat: `ren\u0303kantiems`,
  plAcc: `ren\u0303kančius`,
  plInst: `ren\u0303kančiais`,
  plLoc: `ren\u0303kančiuose`,
  plVoc: `renką\u0303 ren\u0303kantys`,
}
const RENKANTYSIS = {
  sgNom: `ren\u0303kantysis renkanty\u0303sis`,
  sgGen: `ren\u0303kančiojo`,
  sgDat: `ren\u0303kančiajam renkančia\u0301jam`,
  sgAcc: `ren\u0303kantįjį`,
  sgInst: `ren\u0303kančiuoju renkančiu\u0301oju`,
  sgLoc: `ren\u0303kančiajame renkančia\u0303jame`,
  sgVoc: `ren\u0303kantysis renkanty\u0303sis`,
  plNom: `ren\u0303kantieji renkanti\u0301eji`,
  plGen: `ren\u0303kančiųjų renkančių\u0303jų`,
  plDat: `ren\u0303kantiesiems renkanti\u0301esiems`,
  plAcc: `ren\u0303kančiuosius renkančiu\u0301osius`,
  plInst: `ren\u0303kančiaisiais renkančiai\u0303siais`,
  plLoc: `ren\u0303kančiuosiuose renkančiuo\u0303siuose`,
  plVoc: `ren\u0303kantieji renkanti\u0301eji`,
}
const RENKANTI = {
  sgNom: `ren\u0303kanti`,
  sgGen: `ren\u0303kančios`,
  sgDat: `ren\u0303kančiai`,
  sgAcc: `ren\u0303kančią`,
  sgInst: `ren\u0303kančia`,
  sgLoc: `ren\u0303kančioje`,
  sgVoc: `ren\u0303kanti`,
  plNom: `ren\u0303kančios renką\u0303`,
  plGen: `ren\u0303kančių`,
  plDat: `ren\u0303kančioms`,
  plAcc: `ren\u0303kančias`,
  plInst: `ren\u0303kančiomis`,
  plLoc: `ren\u0303kančiose`,
  plVoc: `ren\u0303kančios renką\u0303`,
}
const RENKANCIOJI = {
  sgNom: `ren\u0303kančioji renkančio\u0301ji`,
  sgGen: `ren\u0303kančiosios renkančio\u0303sios`,
  sgDat: `ren\u0303kančiajai`,
  sgAcc: `ren\u0303kančiąją`,
  sgInst: `ren\u0303kančiąja renkančią\u0301ja`,
  sgLoc: `ren\u0303kančiojoje renkančio\u0303joje`,
  sgVoc: `ren\u0303kančioji renkančio\u0301ji`,
  plNom: `ren\u0303kančiosios`,
  plGen: `ren\u0303kančiųjų renkančių\u0303jų`,
  plDat: `ren\u0303kančiosioms renkančio\u0301sioms`,
  plAcc: `ren\u0303kančiąsias renkančią\u0301sias`,
  plInst: `ren\u0303kančiosiomis renkančio\u0303siomis`,
  plLoc: `ren\u0303kančiosiose renkančio\u0303siose`,
  plVoc: `ren\u0303kančiosios`,
}

const NESIRENKANTIS = {
  sgNom: `nesirenką\u0303s nesi\u0300renkantis`,
  sgGen: `nesi\u0300renkančio`,
  sgDat: `nesi\u0300renkančiam`,
  sgAcc: `nesi\u0300renkantį`,
  sgInst: `nesi\u0300renkančiu`,
  sgLoc: `nesi\u0300renkančiame`,
  sgVoc: `nesirenką\u0303s nesi\u0300renkantis`,
  plNom: `nesirenką\u0303 nesi\u0300renkantys`,
  plGen: `nesi\u0300renkančių`,
  plDat: `nesi\u0300renkantiems`,
  plAcc: `nesi\u0300renkančius`,
  plInst: `nesi\u0300renkančiais`,
  plLoc: `nesi\u0300renkančiuose`,
  plVoc: `nesirenką\u0303 nesi\u0300renkantys`,
}
const NESIRENKANTYSIS = {
  sgNom: `nesi\u0300renkantysis nesirenkanty\u0303sis`,
  sgGen: `nesi\u0300renkančiojo nesiren\u0303kančiojo`,
  sgDat: `nesi\u0300renkančiajam nesirenkančia\u0301jam`,
  sgAcc: `nesi\u0300renkantįjį nesiren\u0303kantįjį`,
  sgInst: `nesi\u0300renkančiuoju nesirenkančiu\u0301oju`,
  sgLoc: `nesi\u0300renkančiajame nesirenkančia\u0303jame`,
  sgVoc: `nesi\u0300renkantysis nesirenkanty\u0303sis`,
  plNom: `nesi\u0300renkantieji nesirenkanti\u0301eji`,
  plGen: `nesi\u0300renkančiųjų nesirenkančių\u0303jų`,
  plDat: `nesi\u0300renkantiesiems nesirenkanti\u0301esiems`,
  plAcc: `nesi\u0300renkančiuosius nesirenkančiu\u0301osius`,
  plInst: `nesi\u0300renkančiaisiais nesirenkančiai\u0303siais`,
  plLoc: `nesi\u0300renkančiuosiuose nesirenkančiuo\u0303siuose`,
  plVoc: `nesi\u0300renkantieji nesirenkanti\u0301eji`,
}
const NESIRENKANTI = {
  sgNom: `nesi\u0300renkanti`,
  sgGen: `nesi\u0300renkančios`,
  sgDat: `nesi\u0300renkančiai`,
  sgAcc: `nesi\u0300renkančią`,
  sgInst: `nesi\u0300renkančia`,
  sgLoc: `nesi\u0300renkančioje`,
  sgVoc: `nesi\u0300renkanti`,
  plNom: `nesi\u0300renkančios nesirenką\u0303`,
  plGen: `nesi\u0300renkančių`,
  plDat: `nesi\u0300renkančioms`,
  plAcc: `nesi\u0300renkančias`,
  plInst: `nesi\u0300renkančiomis`,
  plLoc: `nesi\u0300renkančiose`,
  plVoc: `nesi\u0300renkančios nesirenką\u0303`,
}
const NESIRENKANCIOJI = {
  sgNom: `nesi\u0300renkančioji nesirenkančio\u0301ji`,
  sgGen: `nesi\u0300renkančiosios nesirenkančio\u0303sios`,
  sgDat: `nesi\u0300renkančiajai nesiren\u0303kančiajai`,
  sgAcc: `nesi\u0300renkančiąją nesiren\u0303kančiąją`,
  sgInst: `nesi\u0300renkančiąja nesirenkančią\u0301ja`,
  sgLoc: `nesi\u0300renkančiojoje nesirenkančio\u0303joje`,
  sgVoc: `nesi\u0300renkančioji nesirenkančio\u0301ji`,
  plNom: `nesi\u0300renkančiosios nesiren\u0303kančiosios`,
  plGen: `nesi\u0300renkančiųjų nesirenkančių\u0303jų`,
  plDat: `nesi\u0300renkančiosioms nesirenkančio\u0301sioms`,
  plAcc: `nesi\u0300renkančiąsias nesirenkančią\u0301sias`,
  plInst: `nesi\u0300renkančiosiomis nesirenkančio\u0303siomis`,
  plLoc: `nesi\u0300renkančiosiose nesirenkančio\u0303siose`,
  plVoc: `nesi\u0300renkančiosios nesiren\u0303kančiosios`,
}

const BESIRENKANTIS = {
  sgNom: `ren\u0303kąsis (besirenką\u0303s besi\u0300renkantis)`,
  sgGen: `- (besi\u0300renkančio)`,
  sgDat: `- (besi\u0300renkančiam)`,
  sgAcc: `- (besi\u0300renkantį)`,
  sgInst: `- (besi\u0300renkančiu)`,
  sgLoc: `- (besi\u0300renkančiame)`,
  sgVoc: `ren\u0303kąsis (besirenką\u0303s besi\u0300renkantis)`,
  plNom: `ren\u0303kąsi (besirenką\u0303 besi\u0300renkantys)`,
  plGen: `- (besi\u0300renkančių)`,
  plDat: `- (besi\u0300renkantiems)`,
  plAcc: `- (besi\u0300renkančius)`,
  plInst: `- (besi\u0300renkančiais)`,
  plLoc: `- (besi\u0300renkančiuose)`,
  plVoc: `ren\u0303kąsi (besirenką\u0303 besi\u0300renkantys)`,
}
const BESIRENKANTYSIS = {
  sgNom: `- (besi\u0300renkantysis besirenkanty\u0303sis)`,
  sgGen: `- (besi\u0300renkančiojo besiren\u0303kančiojo)`,
  sgDat: `- (besi\u0300renkančiajam besirenkančia\u0301jam)`,
  sgAcc: `- (besi\u0300renkantįjį besiren\u0303kantįjį)`,
  sgInst: `- (besi\u0300renkančiuoju besirenkančiu\u0301oju)`,
  sgLoc: `- (besi\u0300renkančiajame besirenkančia\u0303jame)`,
  sgVoc: `- (besi\u0300renkantysis besirenkanty\u0303sis)`,
  plNom: `- (besi\u0300renkantieji besirenkanti\u0301eji)`,
  plGen: `- (besi\u0300renkančiųjų besirenkančių\u0303jų)`,
  plDat: `- (besi\u0300renkantiesiems besirenkanti\u0301esiems)`,
  plAcc: `- (besi\u0300renkančiuosius besirenkančiu\u0301osius)`,
  plInst: `- (besi\u0300renkančiaisiais besirenkančiai\u0303siais)`,
  plLoc: `- (besi\u0300renkančiuosiuose besirenkančiuo\u0303siuose)`,
  plVoc: `- (besi\u0300renkantieji besirenkanti\u0301eji)`,
}
const BESIRENKANTI = {
  sgNom: `ren\u0303kantis (besi\u0300renkanti)`,
  sgGen: `- (besi\u0300renkančios)`,
  sgDat: `- (besi\u0300renkančiai)`,
  sgAcc: `- (besi\u0300renkančią)`,
  sgInst: `- (besi\u0300renkančia)`,
  sgLoc: `- (besi\u0300renkančioje)`,
  sgVoc: `ren\u0303kantis (besi\u0300renkanti)`,
  plNom: `ren\u0303kančiosi (besi\u0300renkančios besirenką\u0303)`,
  plGen: `- (besi\u0300renkančių)`,
  plDat: `- (besi\u0300renkančioms)`,
  plAcc: `- (besi\u0300renkančias)`,
  plInst: `- (besi\u0300renkančiomis)`,
  plLoc: `- (besi\u0300renkančiose)`,
  plVoc: `ren\u0303kančiosi (besi\u0300renkančios besirenką\u0303)`,
}
const BESIRENKANCIOJI = {
  sgNom: `- (besi\u0300renkančioji besirenkančio\u0301ji)`,
  sgGen: `- (besi\u0300renkančiosios besirenkančio\u0303sios)`,
  sgDat: `- (besi\u0300renkančiajai besiren\u0303kančiajai)`,
  sgAcc: `- (besi\u0300renkančiąją besiren\u0303kančiąją)`,
  sgInst: `- (besi\u0300renkančiąja besirenkančią\u0301ja)`,
  sgLoc: `- (besi\u0300renkančiojoje besirenkančio\u0303joje)`,
  sgVoc: `- (besi\u0300renkančioji besirenkančio\u0301ji)`,
  plNom: `- (besi\u0300renkančiosios besiren\u0303kančiosios)`,
  plGen: `- (besi\u0300renkančiųjų besirenkančių\u0303jų)`,
  plDat: `- (besi\u0300renkančiosioms besirenkančio\u0301sioms)`,
  plAcc: `- (besi\u0300renkančiąsias besirenkančią\u0301sias)`,
  plInst: `- (besi\u0300renkančiosiomis besirenkančio\u0303siomis)`,
  plLoc: `- (besi\u0300renkančiosiose besirenkančio\u0303siose)`,
  plVoc: `- (besi\u0300renkančiosios besiren\u0303kančiosios)`,
}

const GULINTIS = {
  sgNom: `gulį\u0303s gu\u0300lintis`,
  sgGen: `gu\u0300linčio`,
  sgDat: `gu\u0300linčiam`,
  sgAcc: `gu\u0300lintį`,
  sgInst: `gu\u0300linčiu`,
  sgLoc: `gu\u0300linčiame`,
  sgVoc: `gulį\u0303s gu\u0300lintis`,
  plNom: `gulį\u0303 gu\u0300lintys`,
  plGen: `gu\u0300linčių`,
  plDat: `gu\u0300lintiems`,
  plAcc: `gu\u0300linčius`,
  plInst: `gu\u0300linčiais`,
  plLoc: `gu\u0300linčiuose`,
  plVoc: `gulį\u0303 gu\u0300lintys`,
}
const GULINTYSIS = {
  sgNom: `gu\u0300lintysis gulinty\u0303sis`,
  sgGen: `gu\u0300linčiojo`,
  sgDat: `gu\u0300linčiajam gulinčia\u0301jam`,
  sgAcc: `gu\u0300lintįjį`,
  sgInst: `gu\u0300linčiuoju gulinčiu\u0301oju`,
  sgLoc: `gu\u0300linčiajame gulinčia\u0303jame`,
  sgVoc: `gu\u0300lintysis gulinty\u0303sis`,
  plNom: `gu\u0300lintieji gulinti\u0301eji`,
  plGen: `gu\u0300linčiųjų gulinčių\u0303jų`,
  plDat: `gu\u0300lintiesiems gulinti\u0301esiems`,
  plAcc: `gu\u0300linčiuosius gulinčiu\u0301osius`,
  plInst: `gu\u0300linčiaisiais gulinčiai\u0303siais`,
  plLoc: `gu\u0300linčiuosiuose gulinčiuo\u0303siuose`,
  plVoc: `gu\u0300lintieji gulinti\u0301eji`,
}
const GULINTI = {
  sgNom: `gu\u0300linti`,
  sgGen: `gu\u0300linčios`,
  sgDat: `gu\u0300linčiai`,
  sgAcc: `gu\u0300linčią`,
  sgInst: `gu\u0300linčia`,
  sgLoc: `gu\u0300linčioje`,
  sgVoc: `gu\u0300linti`,
  plNom: `gu\u0300linčios gulį\u0303`,
  plGen: `gu\u0300linčių`,
  plDat: `gu\u0300linčioms`,
  plAcc: `gu\u0300linčias`,
  plInst: `gu\u0300linčiomis`,
  plLoc: `gu\u0300linčiose`,
  plVoc: `gu\u0300linčios gulį\u0303`,
}
const GULINCIOJI = {
  sgNom: `gu\u0300linčioji gulinčio\u0301ji`,
  sgGen: `gu\u0300linčiosios gulinčio\u0303sios`,
  sgDat: `gu\u0300linčiajai`,
  sgAcc: `gu\u0300linčiąją`,
  sgInst: `gu\u0300linčiąja gulinčią\u0301ja`,
  sgLoc: `gu\u0300linčiojoje gulinčio\u0303joje`,
  sgVoc: `gu\u0300linčioji gulinčio\u0301ji`,
  plNom: `gu\u0300linčiosios`,
  plGen: `gu\u0300linčiųjų gulinčių\u0303jų`,
  plDat: `gu\u0300linčiosioms gulinčio\u0301sioms`,
  plAcc: `gu\u0300linčiąsias gulinčią\u0301sias`,
  plInst: `gu\u0300linčiosiomis gulinčio\u0303siomis`,
  plLoc: `gu\u0300linčiosiose gulinčio\u0303siose`,
  plVoc: `gu\u0300linčiosios`,
}

const DAINUOJANTIS = {
  sgNom: `dainu\u0301ojąs dainu\u0301ojantis`,
  sgGen: `dainu\u0301ojančio`,
  sgDat: `dainu\u0301ojančiam`,
  sgAcc: `dainu\u0301ojantį`,
  sgInst: `dainu\u0301ojančiu`,
  sgLoc: `dainu\u0301ojančiame`,
  sgVoc: `dainu\u0301ojąs dainu\u0301ojantis`,
  plNom: `dainu\u0301oją dainu\u0301ojantys`,
  plGen: `dainu\u0301ojančių`,
  plDat: `dainu\u0301ojantiems`,
  plAcc: `dainu\u0301ojančius`,
  plInst: `dainu\u0301ojančiais`,
  plLoc: `dainu\u0301ojančiuose`,
  plVoc: `dainu\u0301oją dainu\u0301ojantys`,
}
const DAINUOJANTYSIS = {
  sgNom: `dainu\u0301ojantysis`,
  sgGen: `dainu\u0301ojančiojo`,
  sgDat: `dainu\u0301ojančiajam`,
  sgAcc: `dainu\u0301ojantįjį`,
  sgInst: `dainu\u0301ojančiuoju`,
  sgLoc: `dainu\u0301ojančiajame`,
  sgVoc: `dainu\u0301ojantysis`,
  plNom: `dainu\u0301ojantieji`,
  plGen: `dainu\u0301ojančiųjų`,
  plDat: `dainu\u0301ojantiesiems`,
  plAcc: `dainu\u0301ojančiuosius`,
  plInst: `dainu\u0301ojančiaisiais`,
  plLoc: `dainu\u0301ojančiuosiuose`,
  plVoc: `dainu\u0301ojantieji`,
}
const DAINUOJANTI = {
  sgNom: `dainu\u0301ojanti`,
  sgGen: `dainu\u0301ojančios`,
  sgDat: `dainu\u0301ojančiai`,
  sgAcc: `dainu\u0301ojančią`,
  sgInst: `dainu\u0301ojančia`,
  sgLoc: `dainu\u0301ojančioje`,
  sgVoc: `dainu\u0301ojanti`,
  plNom: `dainu\u0301ojančios dainu\u0301oją`,
  plGen: `dainu\u0301ojančių`,
  plDat: `dainu\u0301ojančioms`,
  plAcc: `dainu\u0301ojančias`,
  plInst: `dainu\u0301ojančiomis`,
  plLoc: `dainu\u0301ojančiose`,
  plVoc: `dainu\u0301ojančios dainu\u0301oją`,
}
const DAINUOJANCIOJI = {
  sgNom: `dainu\u0301ojančioji`,
  sgGen: `dainu\u0301ojančiosios`,
  sgDat: `dainu\u0301ojančiajai`,
  sgAcc: `dainu\u0301ojančiąją`,
  sgInst: `dainu\u0301ojančiąja`,
  sgLoc: `dainu\u0301ojančiojoje`,
  sgVoc: `dainu\u0301ojančioji`,
  plNom: `dainu\u0301ojančiosios`,
  plGen: `dainu\u0301ojančiųjų`,
  plDat: `dainu\u0301ojančiosioms`,
  plAcc: `dainu\u0301ojančiąsias`,
  plInst: `dainu\u0301ojančiosiomis`,
  plLoc: `dainu\u0301ojančiosiose`,
  plVoc: `dainu\u0301ojančiosios`,
}

const DAZANTIS = {
  sgNom: `da\u0303žąs dažą\u0303s da\u0303žantis`,
  sgGen: `da\u0303žančio`,
  sgDat: `da\u0303žančiam`,
  sgAcc: `da\u0303žantį`,
  sgInst: `da\u0303žančiu`,
  sgLoc: `da\u0303žančiame`,
  sgVoc: `da\u0303žąs dažą\u0303s da\u0303žantis`,
  plNom: `da\u0303žą dažą\u0303 da\u0303žantys`,
  plGen: `da\u0303žančių`,
  plDat: `da\u0303žantiems`,
  plAcc: `da\u0303žančius`,
  plInst: `da\u0303žančiais`,
  plLoc: `da\u0303žančiuose`,
  plVoc: `da\u0303žą dažą\u0303 da\u0303žantys`,
}
const DAZANTYSIS = {
  sgNom: `da\u0303žantysis`,
  sgGen: `da\u0303žančiojo`,
  sgDat: `da\u0303žančiajam`,
  sgAcc: `da\u0303žantįjį`,
  sgInst: `da\u0303žančiuoju`,
  sgLoc: `da\u0303žančiajame`,
  sgVoc: `da\u0303žantysis`,
  plNom: `da\u0303žantieji`,
  plGen: `da\u0303žančiųjų`,
  plDat: `da\u0303žantiesiems`,
  plAcc: `da\u0303žančiuosius`,
  plInst: `da\u0303žančiaisiais`,
  plLoc: `da\u0303žančiuosiuose`,
  plVoc: `da\u0303žantieji`,
}
const DAZANTI = {
  sgNom: `da\u0303žanti`,
  sgGen: `da\u0303žančios`,
  sgDat: `da\u0303žančiai`,
  sgAcc: `da\u0303žančią`,
  sgInst: `da\u0303žančia`,
  sgLoc: `da\u0303žančioje`,
  sgVoc: `da\u0303žanti`,
  plNom: `da\u0303žančios da\u0303žą dažą\u0303`,
  plGen: `da\u0303žančių`,
  plDat: `da\u0303žančioms`,
  plAcc: `da\u0303žančias`,
  plInst: `da\u0303žančiomis`,
  plLoc: `da\u0303žančiose`,
  plVoc: `da\u0303žančios da\u0303žą dažą\u0303`,
}
const DAZANCIOJI = {
  sgNom: `da\u0303žančioji`,
  sgGen: `da\u0303žančiosios`,
  sgDat: `da\u0303žančiajai`,
  sgAcc: `da\u0303žančiąją`,
  sgInst: `da\u0303žančiąja`,
  sgLoc: `da\u0303žančiojoje`,
  sgVoc: `da\u0303žančioji`,
  plNom: `da\u0303žančiosios`,
  plGen: `da\u0303žančiųjų`,
  plDat: `da\u0303žančiosioms`,
  plAcc: `da\u0303žančiąsias`,
  plInst: `da\u0303žančiosiomis`,
  plLoc: `da\u0303žančiosiose`,
  plVoc: `da\u0303žančiosios`,
}
const BESIDAZANTIS = {
  sgNom: `da\u0303žąsis (besida\u0303žąs besidažą\u0303s besida\u0303žantis)`,
  sgGen: `- (besida\u0303žančio)`,
  sgDat: `- (besida\u0303žančiam)`,
  sgAcc: `- (besida\u0303žantį)`,
  sgInst: `- (besida\u0303žančiu)`,
  sgLoc: `- (besida\u0303žančiame)`,
  sgVoc: `da\u0303žąsis (besida\u0303žąs besidažą\u0303s besida\u0303žantis)`,
  plNom: `da\u0303žąsi (besida\u0303žą besidažą\u0303 besida\u0303žantys)`,
  plGen: `- (besida\u0303žančių)`,
  plDat: `- (besida\u0303žantiems)`,
  plAcc: `- (besida\u0303žančius)`,
  plInst: `- (besida\u0303žančiais)`,
  plLoc: `- (besida\u0303žančiuose)`,
  plVoc: `da\u0303žąsi (besida\u0303žą besidažą\u0303 besida\u0303žantys)`,
}
const BESIDAZANTYSIS = {
  sgNom: `- (besida\u0303žantysis)`,
  sgGen: `- (besida\u0303žančiojo)`,
  sgDat: `- (besida\u0303žančiajam)`,
  sgAcc: `- (besida\u0303žantįjį)`,
  sgInst: `- (besida\u0303žančiuoju)`,
  sgLoc: `- (besida\u0303žančiajame)`,
  sgVoc: `- (besida\u0303žantysis)`,
  plNom: `- (besida\u0303žantieji)`,
  plGen: `- (besida\u0303žančiųjų)`,
  plDat: `- (besida\u0303žantiesiems)`,
  plAcc: `- (besida\u0303žančiuosius)`,
  plInst: `- (besida\u0303žančiaisiais)`,
  plLoc: `- (besida\u0303žančiuosiuose)`,
  plVoc: `- (besida\u0303žantieji)`,
}
const BESIDAZANTI = {
  sgNom: `da\u0303žantis (besida\u0303žanti)`,
  sgGen: `- (besida\u0303žančios)`,
  sgDat: `- (besida\u0303žančiai)`,
  sgAcc: `- (besida\u0303žančią)`,
  sgInst: `- (besida\u0303žančia)`,
  sgLoc: `- (besida\u0303žančioje)`,
  sgVoc: `da\u0303žantis (besida\u0303žanti)`,
  plNom: `da\u0303žančiosi (besida\u0303žančios besida\u0303žą besidažą\u0303)`,
  plGen: `- (besida\u0303žančių)`,
  plDat: `- (besida\u0303žančioms)`,
  plAcc: `- (besida\u0303žančias)`,
  plInst: `- (besida\u0303žančiomis)`,
  plLoc: `- (besida\u0303žančiose)`,
  plVoc: `da\u0303žančiosi (besida\u0303žančios besida\u0303žą besidažą\u0303)`,
}
const BESIDAZANCIOJI = {
  sgNom: `- (besida\u0303žančioji)`,
  sgGen: `- (besida\u0303žančiosios)`,
  sgDat: `- (besida\u0303žančiajai)`,
  sgAcc: `- (besida\u0303žančiąją)`,
  sgInst: `- (besida\u0303žančiąja)`,
  sgLoc: `- (besida\u0303žančiojoje)`,
  sgVoc: `- (besida\u0303žančioji)`,
  plNom: `- (besida\u0303žančiosios)`,
  plGen: `- (besida\u0303žančiųjų)`,
  plDat: `- (besida\u0303žančiosioms)`,
  plAcc: `- (besida\u0303žančiąsias)`,
  plInst: `- (besida\u0303žančiosiomis)`,
  plLoc: `- (besida\u0303žančiosiose)`,
  plVoc: `- (besida\u0303žančiosios)`,
}

describe('ActivePresentParticipleDecliner', () => {
  const decliner = new ActivePresentParticipleDecliner()
  describe('būti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(BUTI)).toMatchObject({
        masculine: ESANTIS,
        feminine: ESANTI,
        neuter: `esą`,
      })
    })
    it('conjugates negated', () => {
      expect(decliner.getPrefixed(BUTI, 'ne')).toMatchObject({
        masculine: NESANTIS,
        feminine: NESANTI,
        neuter: `nesą`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(BUTI)).toMatchObject({
        masculine: ESANTYSIS,
        feminine: ESANCIOJI,
      })
    })
    it('conjugates negated pronominal', () => {
      expect(decliner.getPrefixedPronominal(BUTI, 'ne')).toMatchObject({
        masculine: NESANTYSIS,
        feminine: NESANCIOJI,
      })
    })
  })
  describe('rinkti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(RINKTI)).toMatchObject({
        masculine: RENKANTIS,
        feminine: RENKANTI,
        neuter: `ren\u0303ką`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(RINKTI)).toMatchObject({
        masculine: RENKANTYSIS,
        feminine: RENKANCIOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(RINKTI)).toMatchObject({
        masculine: BESIRENKANTIS,
        feminine: BESIRENKANTI,
        neuter: `- (besi\u0300renką)`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(RINKTI)).toMatchObject({
        masculine: BESIRENKANTYSIS,
        feminine: BESIRENKANCIOJI,
      })
    })
  })
  describe('nesirinkti', () => {
    it('conjugates default', () => {
      expect(decliner.getPrefixedReflexive(RINKTI, 'ne')).toMatchObject({
        masculine: NESIRENKANTIS,
        feminine: NESIRENKANTI,
        neuter: `nesi\u0300renką`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPrefixedReflexivePronominal(RINKTI, 'ne'))
        .toMatchObject({
          masculine: NESIRENKANTYSIS,
          feminine: NESIRENKANCIOJI,
        })
    })
  })
  describe('gulėti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(GULETI)).toMatchObject({
        masculine: GULINTIS,
        feminine: GULINTI,
        neuter: `gu\u0300lį`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(GULETI)).toMatchObject({
        masculine: GULINTYSIS,
        feminine: GULINCIOJI,
      })
    })
  })
  describe('dainuoti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(DAINUOTI)).toMatchObject({
        masculine: DAINUOJANTIS,
        feminine: DAINUOJANTI,
        neuter: `dainu\u0301oją`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(DAINUOTI)).toMatchObject({
        masculine: DAINUOJANTYSIS,
        feminine: DAINUOJANCIOJI,
      })
    })
  })
  describe('dažyti', () => {
    it('conjugates default', () => {
      expect(decliner.getDefault(DAZYTI)).toMatchObject({
        masculine: DAZANTIS,
        feminine: DAZANTI,
        neuter: `da\u0303žą`,
      })
    })
    it('conjugates pronominal', () => {
      expect(decliner.getPronominal(DAZYTI)).toMatchObject({
        masculine: DAZANTYSIS,
        feminine: DAZANCIOJI,
      })
    })
    it('conjugates reflexive', () => {
      expect(decliner.getReflexive(DAZYTI)).toMatchObject({
        masculine: BESIDAZANTIS,
        feminine: BESIDAZANTI,
        neuter: `- (besida\u0303žą)`,
      })
    })
    it('conjugates reflexive pronominal', () => {
      expect(decliner.getReflexivePronominal(DAZYTI)).toMatchObject({
        masculine: BESIDAZANTYSIS,
        feminine: BESIDAZANCIOJI,
      })
    })
  })
})
