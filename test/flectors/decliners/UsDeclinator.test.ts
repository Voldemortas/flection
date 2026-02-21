import { describe, it } from '@std/testing/bdd'
import { expect } from '@std/expect'
import { Gender } from '~src/types.ts'
import { makeDeclinedFromArray } from '~test/testHelpers.ts'
import UsDeclinator from '~decliners/UsDeclinator.ts'
import { notAttestedInLanguageError } from '~src/errors.ts'

const SUNUS_I = makeDeclinedFromArray(Gender.masculine, [
  [`sū\u0301nus`, `sū\u0301nūs`],
  [`sū\u0301naus`, `sū\u0301nų`],
  [`sū\u0301nui`, `sū\u0301nums`],
  [`sū\u0301nų`, `sū\u0301nus`],
  [`sū\u0301numi`, `sū\u0301numis`],
  [`sū\u0301nuje`, `sū\u0301nuose`],
  [`sū\u0301nau`, `sū\u0301nūs`],
])
const TURGUS = makeDeclinedFromArray(Gender.masculine, [
  [`tur\u0303gus`, `tur\u0303gūs`],
  [`tur\u0303gaus`, `tur\u0303gų`],
  [`tur\u0303gui`, `tur\u0303gums`],
  [`tur\u0303gų`, `turgu\u0300s`],
  [`tur\u0303gumi`, `tur\u0303gumis`],
  [`tur\u0303guje`, `tur\u0303guose`],
  [`tur\u0303gau`, `tur\u0303gūs`],
])
const SUNUS_III = makeDeclinedFromArray(Gender.masculine, [
  [`sūnu\u0300s`, `sū\u0301nūs`],
  [`sūnau\u0303s`, `sūnų\u0303`],
  [`sū\u0301nui`, `sūnu\u0300ms`],
  [`sū\u0301nų`, `sū\u0301nus`],
  [`sūnumi\u0300`, `sūnumi\u0300s`],
  [`sūnuje\u0300`, `sūnuose\u0300`],
  [`sūnau\u0303`, `sū\u0301nūs`],
])
const MEDUS = makeDeclinedFromArray(Gender.masculine, [
  [`medu\u0300s`, `me\u0303dūs`],
  [`medau\u0303s`, `medų\u0303`],
  [`me\u0303dui`, `medu\u0300ms`],
  [`me\u0303dų`, `medu\u0300s`],
  [`medumi\u0300`, `medumi\u0300s`],
  [`meduje\u0300`, `meduose\u0300`],
  [`medau\u0303`, `me\u0303dūs`],
])
const IZIDORIUS = makeDeclinedFromArray(Gender.masculine, [
  [`Izi\u0300dorius`, `Izi\u0300doriai`],
  [`Izi\u0300doriaus`, `Izi\u0300dorių`],
  [`Izi\u0300doriui`, `Izi\u0300doriams`],
  [`Izi\u0300dorių`, `Izi\u0300dorius`],
  [`Izi\u0300doriumi`, `Izi\u0300doriais`],
  [`Izi\u0300doriuje`, `Izi\u0300doriuose`],
  [`Izi\u0300doriau`, `Izi\u0300doriai`],
])
const BEZDZIUS = makeDeclinedFromArray(Gender.common, [
  [`be\u0300zdžius`, `be\u0300zdžiai`],
  [`be\u0300zdžiaus`, `be\u0300zdžių`],
  [`be\u0300zdžiui`, `be\u0300zdžiams`],
  [`be\u0300zdžių`, `bezdžiu\u0300s`],
  [`be\u0300zdžiumi`, `be\u0300zdžiais`],
  [`be\u0300zdžiuje`, `be\u0300zdžiuose`],
  [`be\u0300zdžiau`, `be\u0300zdžiai`],
])
const VEJUS = makeDeclinedFromArray(Gender.masculine, [
  [`vėju\u0300s`, `vėjai\u0303`],
  [`vėjau\u0303s`, `vėjų\u0303`],
  [`vė\u0301jui`, `vėja\u0301ms`],
  [`vė\u0301jų`, `vė\u0301jus`],
  [`vėjumi\u0300`, `vėjai\u0303s`],
  [`vėjuje\u0300`, `vėjuose\u0300`],
  [`vėjau\u0303`, `vėjai\u0303`],
])
//such illness, an actual noun
const RAJUS = makeDeclinedFromArray(Gender.masculine, [
  [`raju\u0300s`, `rajai\u0303`],
  [`rajau\u0303s`, `rajų\u0303`],
  [`ra\u0303jui`, `raja\u0301ms`],
  [`ra\u0303jų`, `raju\u0300s`],
  [`rajumi\u0300`, `rajai\u0303s`],
  [`rajuje\u0300`, `rajuose\u0300`],
  [`rajau\u0303`, `rajai\u0303`],
])
const LYGUS = makeDeclinedFromArray(Gender.masculine, [
  [`ly\u0301gus`, `ly\u0301gūs`],
  [`ly\u0301gaus`, `ly\u0301gių`],
  [`ly\u0301giam`, `ly\u0301giems`],
  [`ly\u0301gų`, `ly\u0301gius`],
  [`ly\u0301giu`, `ly\u0301giais`],
  [`ly\u0301giame`, `ly\u0301giuose`],
  [`ly\u0301gus`, `ly\u0301gūs`],
])
const PRIEKABUS = makeDeclinedFromArray(Gender.masculine, [
  [`priekabu\u0300s`, `pri\u0301ekabūs`],
  [`priekabau\u0303s`, `priekabių\u0303`],
  [`priekabia\u0301m`, `priekabi\u0301ems`],
  [`pri\u0301ekabų`, `pri\u0301ekabius`],
  [`pri\u0301ekabiu`, `priekabiai\u0303s`],
  [`priekabiame\u0300`, `priekabiuose\u0300`],
  [`priekabu\u0300s`, `pri\u0301ekabūs`],
])
const STATUS = makeDeclinedFromArray(Gender.masculine, [
  [`statu\u0300s`, `sta\u0303tūs`],
  [`statau\u0303s`, `stačių\u0303`],
  [`stačia\u0301m`, `stati\u0301ems`],
  [`sta\u0303tų`, `stačiu\u0300s`],
  [`stačiu\u0300`, `stačiai\u0303s`],
  [`stačiame\u0300`, `stačiuose\u0300`],
  [`statu\u0300s`, `sta\u0303tūs`],
])
const LYGUSIS = makeDeclinedFromArray(Gender.masculine, [
  [`ly\u0301gusis`, `ly\u0301gieji`],
  [`ly\u0301giojo`, `ly\u0301giųjų`],
  [`ly\u0301giajam`, `ly\u0301giesiems`],
  [`ly\u0301gųjį`, `ly\u0301giuosius`],
  [`ly\u0301giuoju`, `ly\u0301giaisiais`],
  [`ly\u0301giajame`, `ly\u0301giuosiuose`],
  [`ly\u0301gusis`, `ly\u0301gieji`],
])
const STATUSIS = makeDeclinedFromArray(Gender.masculine, [
  [`statu\u0300sis`, `stati\u0301eji`],
  [`sta\u0303čiojo`, `stačių\u0303jų`],
  [`stačia\u0301jam`, `stati\u0301esiems`],
  [`sta\u0303tųjį`, `stačiu\u0301osius`],
  [`stačiu\u0301oju`, `stačiai\u0303siais`],
  [`stačia\u0303jame`, `stačiuo\u0303siuose`],
  [`statu\u0300sis`, `stati\u0301eji`],
])
const ZMOGUS = makeDeclinedFromArray(Gender.masculine, [
  [`žmogu\u0300s`, `žmo\u0301nės`],
  [`žmogau\u0303s`, `žmonių\u0303`],
  [`žmo\u0303gui`, `žmonė\u0301ms`],
  [`žmo\u0303gų`, `žmo\u0301nes`],
  [`žmogumi\u0300`, `žmonėmi\u0300s`],
  [`žmoguje\u0300`, `žmonėse\u0300`],
  [`žmogau\u0303`, `žmo\u0301nės`],
])

describe('UsDeclinator', () => {
  it('declines 1st accentuation -us noun', () => {
    expect(UsDeclinator.declineUsNounI(`sū\u0301n`))
      .toMatchObject(SUNUS_I)
  })
  it('declines 2nd accentuation -us noun', () => {
    expect(UsDeclinator.declineUsNounII(`tur\u0303g`))
      .toMatchObject(TURGUS)
  })
  it('declines 3rd accentuation -us noun', () => {
    expect(UsDeclinator.declineUsNounIII(`sūn`))
      .toMatchObject(SUNUS_III)
  })
  it('declines 4th accentuation -us noun', () => {
    expect(UsDeclinator.declineUsNounIV(`med`))
      .toMatchObject(MEDUS)
  })
  it('declines 1st accentuation -[i/j]us noun', () => {
    expect(UsDeclinator.declineIusNounI(`Izi\u0300dori`))
      .toMatchObject(IZIDORIUS)
  })
  it('declines 2nd accentuation -[i/j]us noun', () => {
    expect(UsDeclinator.declineIusNounII(`be\u0300zdži`, Gender.common))
      .toMatchObject(BEZDZIUS)
  })
  it('declines 3rd accentuation -[i/j]us noun', () => {
    expect(UsDeclinator.declineIusNounIII(`vėj`))
      .toMatchObject(VEJUS)
  })
  it('declines 4th accentuation -[i/j]us noun', () => {
    expect(UsDeclinator.declineIusNounIV(`raj`))
      .toMatchObject(RAJUS)
  })
  it('declines 1st accentuation -us adjective', () => {
    expect(UsDeclinator.declineUsAdjectivalI(`ly\u0301g`))
      .toMatchObject(LYGUS)
  })
  it('declines 2nd accentuation -us adjective', () => {
    expect(() => UsDeclinator.declineUsAdjectivalII(`gar\u0303dži`)).toThrow(
      notAttestedInLanguageError,
    )
  })
  it('declines 3rd accentuation -us adjective', () => {
    expect(UsDeclinator.declineUsAdjectivalIII(`priekab`, 'a'))
      .toMatchObject(PRIEKABUS)
  })
  it('declines 4th accentuation -us adjective', () => {
    expect(UsDeclinator.declineUsAdjectivalIV(`stat`))
      .toMatchObject(STATUS)
  })
  it('declines immobile -us pronominal adjective', () => {
    expect(UsDeclinator.declineUsPronominalImmobile(`ly\u0301g`))
      .toMatchObject(LYGUSIS)
  })
  it('declines mobile -us pronominal adjective', () => {
    expect(UsDeclinator.declineUsPronominalMobile(`stat`, '2b'))
      .toMatchObject(STATUSIS)
  })
  it('declines žmogus correctly', () => {
    expect(UsDeclinator.ZMOGUS).toMatchObject(ZMOGUS)
  })
})
