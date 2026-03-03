import { describe, it } from '@std/testing/bdd'
import { expect } from '@std/expect'
import { makeDeclinedFromArray } from '~test/testHelpers.ts'
import AsDeclinator from '~decliners/AsDeclinator.ts'
import { notAttestedInLanguageError } from '~src/errors.ts'

const VYRAS = makeDeclinedFromArray([
  [`vy\u0301ras`, `vy\u0301rai`],
  [`vy\u0301ro`, `vy\u0301rų`],
  [`vy\u0301rui`, `vy\u0301rams`],
  [`vy\u0301rą`, `vy\u0301rus`],
  [`vy\u0301ru`, `vy\u0301rais`],
  [`vy\u0301re`, `vy\u0301ruose`],
  [`vy\u0301re`, `vy\u0301rai`],
])
const RATAS = makeDeclinedFromArray([
  [`ra\u0303tas`, `ra\u0303tai`],
  [`ra\u0303to`, `ra\u0303tų`],
  [`ra\u0303tui`, `ra\u0303tams`],
  [`ra\u0303tą`, `ratu\u0300s`],
  [`ratu\u0300`, `ra\u0303tais`],
  [`rate\u0300`, `ra\u0303tuose`],
  [`ra\u0303te`, `ra\u0303tai`],
])
const LANGAS = makeDeclinedFromArray([
  [`la\u0301ngas`, `langai\u0303`],
  [`la\u0301ngo`, `langų\u0303`],
  [`la\u0301ngui`, `langa\u0301ms`],
  [`la\u0301ngą`, `la\u0301ngus`],
  [`la\u0301ngu`, `langai\u0303s`],
  [`lange\u0300`, `languose\u0300`],
  [`la\u0301nge`, `langai\u0303`],
])
const NAMAS = makeDeclinedFromArray([
  [`na\u0303mas`, `namai\u0303`],
  [`na\u0303mo`, `namų\u0303`],
  [`na\u0303mui`, `nama\u0301ms`],
  [`na\u0303mą`, `namu\u0300s`],
  [`namu\u0300`, `namai\u0303s`],
  [`name\u0300`, `namuose\u0300`],
  [`na\u0303me`, `namai\u0303`],
])

const VEJAS = makeDeclinedFromArray([
  [`vė\u0301jas`, `vė\u0301jai`],
  [`vė\u0301jo`, `vė\u0301jų`],
  [`vė\u0301jui`, `vė\u0301jams`],
  [`vė\u0301ją`, `vė\u0301jus`],
  [`vė\u0301ju`, `vė\u0301jais`],
  [`vė\u0301jyje vė\u0301juje`, `vė\u0301juose`],
  [`vė\u0301jau`, `vė\u0301jai`],
])
const GEJAS = makeDeclinedFromArray([
  [`gė\u0303jas`, `gė\u0303jai`],
  [`gė\u0303jo`, `gė\u0303jų`],
  [`gė\u0303jui`, `gė\u0303jams`],
  [`gė\u0303ją`, `gėju\u0300s`],
  [`gėju\u0300`, `gė\u0303jais`],
  [`gė\u0303jyje gė\u0303juje`, `gė\u0303juose`],
  [`gė\u0303jau`, `gė\u0303jai`],
])
const SEJAS = makeDeclinedFromArray([
  [`sė\u0301jas`, `sėjai\u0303`],
  [`sė\u0301jo`, `sėjų\u0303`],
  [`sė\u0301jui`, `sėja\u0301ms`],
  [`sė\u0301ją`, `sė\u0301jus`],
  [`sė\u0301ju`, `sėjai\u0303s`],
  [`sė\u0301jyje sė\u0301juje`, `sėjuose\u0300`],
  [`sė\u0301jau`, `sėjai\u0303`],
])
const KRAUJAS = makeDeclinedFromArray([
  [`krau\u0303jas`, `kraujai\u0303`],
  [`krau\u0303jo`, `kraujų\u0303`],
  [`krau\u0303jui`, `krauja\u0301ms`],
  [`krau\u0303ją`, `krauju\u0300s`],
  [`krauju\u0300`, `kraujai\u0303s`],
  [`krau\u0303jyje krau\u0303juje`, `kraujuose\u0300`],
  [`krau\u0303jau`, `kraujai\u0303`],
])

const VIREJAS_I = makeDeclinedFromArray([
  [`virė\u0301jas`, `virė\u0301jai`],
  [`virė\u0301jo`, `virė\u0301jų`],
  [`virė\u0301jui`, `virė\u0301jams`],
  [`virė\u0301ją`, `virė\u0301jus`],
  [`virė\u0301ju`, `virė\u0301jais`],
  [`virė\u0301juje`, `virė\u0301juose`],
  [`virė\u0301jau`, `virė\u0301jai`],
])
const VIREJAS_II = makeDeclinedFromArray([
  [`virė\u0303jas`, `virė\u0303jai`],
  [`virė\u0303jo`, `virė\u0303jų`],
  [`virė\u0303jui`, `virė\u0303jams`],
  [`virė\u0303ją`, `virėju\u0300s`],
  [`virėju\u0300`, `virė\u0303jais`],
  [`virė\u0303juje`, `virė\u0303juose`],
  [`virė\u0303jau`, `virė\u0303jai`],
])
const VIREJAS_III = makeDeclinedFromArray([
  [`virė\u0301jas`, `virėjai\u0303`],
  [`virė\u0301jo`, `virėjų\u0303`],
  [`virė\u0301jui`, `virėja\u0301ms`],
  [`virė\u0301ją`, `virė\u0301jus`],
  [`virė\u0301ju`, `virėjai\u0303s`],
  [`virė\u0301juje`, `virėjuose\u0300`],
  [`virė\u0301jau`, `virėjai\u0303`],
])
const VIREJAS_IV = makeDeclinedFromArray([
  [`virė\u0303jas`, `virėjai\u0303`],
  [`virė\u0303jo`, `virėjų\u0303`],
  [`virė\u0303jui`, `virėja\u0301ms`],
  [`virė\u0303ją`, `virėju\u0300s`],
  [`virėju\u0300`, `virėjai\u0303s`],
  [`virė\u0303juje`, `virėjuose\u0300`],
  [`virė\u0303jau`, `virėjai\u0303`],
])

const ELNIAS = makeDeclinedFromArray([
  [`e\u0301lnias`, `e\u0301lniai`],
  [`e\u0301lnio`, `e\u0301lnių`],
  [`e\u0301lniui`, `e\u0301lniams`],
  [`e\u0301lnią`, `e\u0301lnius`],
  [`e\u0301lniu`, `e\u0301lniais`],
  [`e\u0301lnyje`, `e\u0301lniuose`],
  [`e\u0301lni e\u0301lniau`, `e\u0301lniai`],
])
const KELIAS_II = makeDeclinedFromArray([
  [`ke\u0303lias`, `ke\u0303liai`],
  [`ke\u0303lio`, `ke\u0303lių`],
  [`ke\u0303liui`, `ke\u0303liams`],
  [`ke\u0303lią`, `keliu\u0300s`],
  [`keliu\u0300`, `ke\u0303liais`],
  [`ke\u0303lyje`, `ke\u0303liuose`],
  [`ke\u0303li`, `ke\u0303liai`],
])
const VELNIAS = makeDeclinedFromArray([
  [`ve\u0301lnias`, `velniai\u0303`],
  [`ve\u0301lnio`, `velnių\u0303`],
  [`ve\u0301lniui`, `velnia\u0301ms`],
  [`ve\u0301lnią`, `ve\u0301lnius`],
  [`ve\u0301lniu`, `velniai\u0303s`],
  [`velnyje\u0300`, `velniuose\u0300`],
  [`velny\u0303`, `velniai\u0303`],
])
const KELIAS_IV = makeDeclinedFromArray([
  [`ke\u0303lias`, `keliai\u0303`],
  [`ke\u0303lio`, `kelių\u0303`],
  [`ke\u0303liui`, `kelia\u0301ms`],
  [`ke\u0303lią`, `keliu\u0300s`],
  [`keliu\u0300`, `keliai\u0303s`],
  [`kelyje\u0300`, `keliuose\u0300`],
  [`kely\u0303`, `keliai\u0303`],
])

const ILGOKAS = makeDeclinedFromArray([
  [`ilgo\u0301kas`, `ilgo\u0301ki`],
  [`ilgo\u0301ko`, `ilgo\u0301kų`],
  [`ilgo\u0301kam`, `ilgo\u0301kiems`],
  [`ilgo\u0301ką`, `ilgo\u0301kus`],
  [`ilgo\u0301ku`, `ilgo\u0301kais`],
  [`ilgo\u0301kame`, `ilgo\u0301kuose`],
  [`ilgo\u0301kas`, `ilgo\u0301ki`],
])
const STORAS = makeDeclinedFromArray([
  [`sto\u0301ras`, `stori\u0300`],
  [`sto\u0301ro`, `storų\u0303`],
  [`stora\u0301m`, `stori\u0301ems`],
  [`sto\u0301rą`, `sto\u0301rus`],
  [`sto\u0301ru`, `storai\u0303s`],
  [`storame\u0300`, `storuose\u0300`],
  [`sto\u0301ras`, `stori\u0300`],
])
const MAZAS = makeDeclinedFromArray([
  [`ma\u0303žas`, `maži\u0300`],
  [`ma\u0303žo`, `mažų\u0303`],
  [`maža\u0301m`, `maži\u0301ems`],
  [`ma\u0303žą`, `mažu\u0300s`],
  [`mažu\u0300`, `mažai\u0303s`],
  [`mažame\u0300`, `mažuose\u0300`],
  [`ma\u0303žas`, `maži\u0300`],
])

const PESCIAS = makeDeclinedFromArray([
  [`pė\u0301sčias`, `pė\u0301sti`],
  [`pė\u0301sčio`, `pė\u0301sčių`],
  [`pė\u0301sčiam`, `pė\u0301stiems`],
  [`pė\u0301sčią`, `pė\u0301sčius`],
  [`pė\u0301sčiu`, `pė\u0301sčiais`],
  [`pė\u0301sčiame`, `pė\u0301sčiuose`],
  [`pė\u0301sčias`, `pė\u0301sti`],
])
const PLOKSCIAS = makeDeclinedFromArray([
  [`plo\u0301kščias`, `plokšti\u0300`],
  [`plo\u0301kščio`, `plokščių\u0303`],
  [`plokščia\u0301m`, `plokšti\u0301ems`],
  [`plo\u0301kščią`, `plo\u0301kščius`],
  [`plo\u0301kščiu`, `plokščiai\u0303s`],
  [`plokščiame\u0300`, `plokščiuose\u0300`],
  [`plo\u0301kščias`, `plokšti\u0300`],
])
const STACIAS = makeDeclinedFromArray([
  [`sta\u0303čias`, `stati\u0300`],
  [`sta\u0303čio`, `stačių\u0303`],
  [`stačia\u0301m`, `stati\u0301ems`],
  [`sta\u0303čią`, `stačiu\u0300s`],
  [`stačiu\u0300`, `stačiai\u0303s`],
  [`stačiame\u0300`, `stačiuose\u0300`],
  [`sta\u0303čias`, `stati\u0300`],
])

const KREIPIMASIS = makeDeclinedFromArray([
  [`kreipi\u0300masis`, `kreipi\u0300maisi`],
  [`kreipi\u0300mosi`, `kreipi\u0300mųsi`],
  [`kreipi\u0300muisi`, `kreipi\u0300mamsis`],
  [`kreipi\u0300mąsi`, `kreipi\u0300musis`],
  [`kreipi\u0300musi`, `kreipi\u0300maisis`],
  [`kreipi\u0300mesi`, `kreipi\u0300muosesi`],
  [`kreipi\u0300mesi`, `kreipi\u0300maisi`],
])

const GERASIS_0 = makeDeclinedFromArray([
  'gerasis gerojo gerajam gerąjį geruoju gerajame gerasis'.split(' '),
  'gerieji gerųjų geriesiems geruosius geraisiais geruosiuose gerieji'.split(
    ' ',
  ),
])
const GERASIS_4 = makeDeclinedFromArray([
  'geràsis gẽrojo gerájam gẽrąjį gerúoju gerãjame geràsis'.split(' '),
  'geríeji gerų̃jų geríesiems gerúosius geraĩsiais geruõsiuose geríeji'.split(
    ' ',
  ),
])
const PESCIASIS_0 = makeDeclinedFromArray([
  'pėsčiasis pėsčiojo pėsčiajam pėsčiąjį pėsčiuoju pėsčiajame pėsčiasis'.split(
    ' ',
  ),
  'pėstieji pėsčiųjų pėstiesiems pėsčiuosius pėsčiaisiais pėsčiuosiuose pėstieji'
    .split(
      ' ',
    ),
])
const PESCIASIS_3 = makeDeclinedFromArray([
  'pėsčiàsis pė́sčiojo pėsčiájam pė́sčiąjį pėsčiúoju pėsčiãjame pėsčiàsis'.split(
    ' ',
  ),
  'pėstíeji pėsčių̃jų pėstíesiems pėsčiúosius pėsčiaĩsiais pėsčiuõsiuose pėstíeji'
    .split(' '),
])

describe('AsDeclinator', () => {
  it('declines reflexive noun', () => {
    expect(AsDeclinator.declineAsReflexiveNoun(`kreipi\u0300m`))
      .toMatchObject(KREIPIMASIS)
  })
  it('declines 1st accentuation noun', () => {
    expect(AsDeclinator.declineAsNounI(`vy\u0301r`))
      .toMatchObject(VYRAS)
  })
  it('declines 2nd accentuation noun', () => {
    expect(AsDeclinator.declineAsNounII(`ra\u0303t`))
      .toMatchObject(RATAS)
  })
  it('declines 3rd accentuation noun', () => {
    expect(AsDeclinator.declineAsNounIII(`la\u0301ng`))
      .toMatchObject(LANGAS)
  })
  it('declines 4th accentuation noun', () => {
    expect(AsDeclinator.declineAsNounIV(`na\u0303m`))
      .toMatchObject(NAMAS)
  })
  it('declines 1st accentuation bisyllabic noun', () => {
    expect(AsDeclinator.declineBisyllabicJasNounI(`vė\u0301j`))
      .toMatchObject(VEJAS)
  })
  it('declines 2nd accentuation bisyllabic noun', () => {
    expect(AsDeclinator.declineBisyllabicJasNounII(`gė\u0303j`))
      .toMatchObject(GEJAS)
  })
  it('declines 3rd accentuation bisyllabic noun', () => {
    expect(AsDeclinator.declineBisyllabicJasNounIII(`sė\u0301j`))
      .toMatchObject(SEJAS)
  })
  it('declines 4th accentuation bisyllabic noun', () => {
    expect(AsDeclinator.declineBisyllabicJasNounIV(`krau\u0303j`))
      .toMatchObject(KRAUJAS)
  })
  it('declines 1st accentuation polysyllabic noun', () => {
    expect(AsDeclinator.declinePolysyllabicJasNounI(`virė\u0301j`))
      .toMatchObject(VIREJAS_I)
  })
  it('declines 2nd accentuation polysyllabic noun', () => {
    expect(AsDeclinator.declinePolysyllabicJasNounII(`virė\u0303j`))
      .toMatchObject(VIREJAS_II)
  })
  it('declines 3rd accentuation polysyllabic noun', () => {
    expect(AsDeclinator.declinePolysyllabicJasNounIII(`virė\u0301j`))
      .toMatchObject(VIREJAS_III)
  })
  it('declines 4th accentuation polysyllabic noun', () => {
    expect(AsDeclinator.declinePolysyllabicJasNounIV(`virė\u0303j`))
      .toMatchObject(VIREJAS_IV)
  })
  it('declines 1st accentuation -ias noun', () => {
    expect(AsDeclinator.declineIasNounI(`e\u0301lni`))
      .toMatchObject(ELNIAS)
  })
  it('declines 2nd accentuation -ias noun', () => {
    expect(AsDeclinator.declineIasNounII(`ke\u0303li`))
      .toMatchObject(KELIAS_II)
  })
  it('declines 3rd accentuation -ias noun', () => {
    expect(AsDeclinator.declineIasNounIII(`ve\u0301lni`))
      .toMatchObject(VELNIAS)
  })
  it('declines 4th accentuation -ias noun', () => {
    expect(AsDeclinator.declineIasNounIV(`ke\u0303li`))
      .toMatchObject(KELIAS_IV)
  })
  it('declines 1st accentuation -as adjective', () => {
    expect(AsDeclinator.declineAsAdjectivalI(`ilgo\u0301k`))
      .toMatchObject(ILGOKAS)
  })
  it('declines 2nd accentuation -as adjective', () => {
    expect(() => AsDeclinator.declineAsAdjectivalII(`trumpa\u0303n`)).toThrow(
      notAttestedInLanguageError,
    )
  })
  it('declines 3rd accentuation -as adjective', () => {
    expect(AsDeclinator.declineAsAdjectivalIII(`sto\u0301r`))
      .toMatchObject(STORAS)
  })
  it('declines 4th accentuation -as adjective', () => {
    expect(AsDeclinator.declineAsAdjectivalIV(`ma\u0303ž`))
      .toMatchObject(MAZAS)
  })
  it('declines 1st accentuation -ias adjective', () => {
    expect(AsDeclinator.declineIasAdjectivalI(`pė\u0301sči`))
      .toMatchObject(PESCIAS)
  })
  it('declines 2nd accentuation -ias adjective', () => {
    expect(() => AsDeclinator.declineIasAdjectivalII(`gar\u0303dži`)).toThrow(
      notAttestedInLanguageError,
    )
  })
  it('declines 3rd accentuation -ias adjective', () => {
    expect(AsDeclinator.declineIasAdjectivalIII(`plo\u0301kšči`))
      .toMatchObject(PLOKSCIAS)
  })
  it('declines 4th accentuation -ias adjective', () => {
    expect(AsDeclinator.declineIasAdjectivalIV(`sta\u0303či`))
      .toMatchObject(STACIAS)
  })
  it('declines immobile pronominal -as adjective', () => {
    expect(AsDeclinator.declineAsPronominalImmobile(`ger`))
      .toMatchObject(GERASIS_0)
  })
  it('declines 4th accentuation pronominal -as adjective', () => {
    expect(AsDeclinator.declineAsPronominalMobile(`ge\u0303r`))
      .toMatchObject(GERASIS_4)
  })
  it('declines immobile pronominal -ias adjective', () => {
    expect(AsDeclinator.declineIasPronominalImmobile(`pėsči`))
      .toMatchObject(PESCIASIS_0)
  })
  it('declines 3rd accentuation pronominal -ias adjective', () => {
    expect(AsDeclinator.declineIasPronominalMobile(`pė\u0301sči`))
      .toMatchObject(PESCIASIS_3)
  })
})
