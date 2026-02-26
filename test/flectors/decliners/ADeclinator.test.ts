import { describe, it } from '@std/testing/bdd'
import { expect } from '@std/expect'
import { Gender } from '~src/types.ts'
import { makeDeclinedFromArray } from '~test/testHelpers.ts'
import ADeclinator from '~decliners/ADeclinator.ts'

const VARNA = makeDeclinedFromArray(Gender.feminine, [
  [`va\u0301rna`, `va\u0301rnos`],
  [`va\u0301rnos`, `va\u0301rnų`],
  [`va\u0301rnai`, `va\u0301rnoms`],
  [`va\u0301rną`, `va\u0301rnas`],
  [`va\u0301rna`, `va\u0301rnomis`],
  [`va\u0301rnoje`, `va\u0301rnose`],
  [`va\u0301rna`, `va\u0301rnos`],
])
const RANKA = makeDeclinedFromArray(Gender.feminine, [
  [`ranka\u0300`, `ran\u0303kos`],
  [`ran\u0303kos`, `ran\u0303kų`],
  [`ran\u0303kai`, `ran\u0303koms`],
  [`ran\u0303ką`, `ranka\u0300s`],
  [`ranka\u0300`, `ran\u0303komis`],
  [`ran\u0303koje`, `ran\u0303kose`],
  [`ran\u0303ka`, `ran\u0303kos`],
])
const KLAIDA = makeDeclinedFromArray(Gender.feminine, [
  [`klaida\u0300`, `klai\u0303dos`],
  [`klaido\u0303s`, `klaidų\u0303`],
  [`klai\u0303dai`, `klaido\u0301ms`],
  [`klai\u0303dą`, `klaida\u0300s`],
  [`klaida\u0300`, `klaidomi\u0300s`],
  [`klaidoje\u0300`, `klaidose\u0300`],
  [`klai\u0303da`, `klai\u0303dos`],
])
const ATRAMA = makeDeclinedFromArray(Gender.feminine, [
  [`atrama\u0300`, `a\u0303tramos`],
  [`atramo\u0303s`, `atramų\u0303`],
  [`a\u0303tramai`, `atramo\u0301ms`],
  [`a\u0303tramą`, `a\u0303tramas`],
  [`a\u0303trama`, `atramomi\u0300s`],
  [`atramoje\u0300`, `atramose\u0300`],
  [`a\u0303trama`, `a\u0303tramos`],
])
const JUODA = makeDeclinedFromArray(Gender.feminine, [
  [`juoda\u0300`, `ju\u0301odos`],
  [`juodo\u0303s`, `juodų\u0303`],
  [`ju\u0301odai`, `juodo\u0301ms`],
  [`ju\u0301odą`, `ju\u0301odas`],
  [`ju\u0301oda`, `juodomi\u0300s`],
  [`juodoje\u0300`, `juodose\u0300`],
  [`juoda\u0300`, `ju\u0301odos`],
])
const TIKRA = makeDeclinedFromArray(Gender.feminine, [
  [`tikra\u0300`, `ti\u0300kros`],
  [`tikro\u0303s`, `tikrų\u0303`],
  [`ti\u0300krai`, `tikro\u0301ms`],
  [`ti\u0300krą`, `tikra\u0300s`],
  [`tikra\u0300`, `tikromi\u0300s`],
  [`tikroje\u0300`, `tikrose\u0300`],
  [`tikra\u0300`, `ti\u0300kros`],
])
const TIKROJI = makeDeclinedFromArray(Gender.feminine, [
  [`tikro\u0301ji`, `ti\u0300krosios`],
  [`tikro\u0303sios`, `tikrų\u0303jų`],
  [`ti\u0300krajai`, `tikro\u0301sioms`],
  [`ti\u0300krąją`, `tikrą\u0301sias`],
  [`tikrą\u0301ja`, `tikro\u0303siomis`],
  [`tikro\u0303joje`, `tikro\u0303siose`],
  [`tikro\u0301ji`, `ti\u0300krosios`],
])
const PALAIMINTOJI = makeDeclinedFromArray(Gender.feminine, [
  [`pala\u0301imintoji`, `pala\u0301imintosios`],
  [`pala\u0301imintosios`, `pala\u0301imintųjų`],
  [`pala\u0301imintajai`, `pala\u0301imintosioms`],
  [`pala\u0301imintąją`, `pala\u0301imintąsias`],
  [`pala\u0301imintąja`, `pala\u0301imintosiomis`],
  [`pala\u0301imintojoje`, `pala\u0301imintosiose`],
  [`pala\u0301imintoji`, `pala\u0301imintosios`],
])

describe('ADeclinator', () => {
  it('declines 1st accentuation nominal', () => {
    expect(ADeclinator.declineI(`va\u0301rn`))
      .toMatchObject(VARNA)
  })
  it('declines 2nd accentuation nominal', () => {
    expect(ADeclinator.declineII(`rank`))
      .toMatchObject(RANKA)
  })
  it('declines 3rd B accentuation noun', () => {
    expect(ADeclinator.declineNounIII(`atram`, 'b'))
      .toMatchObject(ATRAMA)
  })
  it('declines 4th accentuation noun', () => {
    expect(ADeclinator.declineNounIV(`klaid`))
      .toMatchObject(KLAIDA)
  })
  it('declines 3rd accentuation adjective', () => {
    expect(ADeclinator.declineAdjectivalIII(`ju\u0301od`))
      .toMatchObject(JUODA)
  })
  it('declines 4th accentuation adjective', () => {
    expect(ADeclinator.declineAdjectivalIV(`tikr`))
      .toMatchObject(TIKRA)
  })
  it('declines 4th accentuation pronominal adjective', () => {
    expect(ADeclinator.declinePronominalMobile(`tikr`, '4'))
      .toMatchObject(TIKROJI)
  })
  it('declines 1st accentuation pronominal adjective', () => {
    expect(ADeclinator.declinePronominalImmobile(`pala\u0301imint`))
      .toMatchObject(PALAIMINTOJI)
  })
})
