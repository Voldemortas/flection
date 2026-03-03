import { describe, it } from '@std/testing/bdd'
import { expect } from '@std/expect'
import { makeDeclinedFromArray } from '~test/testHelpers.ts'
import IsDeclinator from '~decliners/IsDeclinator.ts'

const KUJIS = makeDeclinedFromArray([
  [`kū\u0301jis`, `kū\u0301jai`],
  [`kū\u0301jo`, `kū\u0301jų`],
  [`kū\u0301jui`, `kū\u0301jams`],
  [`kū\u0301jį`, `kū\u0301jus`],
  [`kū\u0301ju`, `kū\u0301jais`],
  [`kū\u0301jyje`, `kū\u0301juose`],
  [`kū\u0301ji`, `kū\u0301jai`],
])
const SMUGIS = makeDeclinedFromArray([
  [`smū\u0303gis`, `smū\u0303giai`],
  [`smū\u0303gio`, `smū\u0303gių`],
  [`smū\u0303giui`, `smū\u0303giams`],
  [`smū\u0303gį`, `smūgiu\u0300s`],
  [`smūgiu\u0300`, `smū\u0303giais`],
  [`smū\u0303gyje`, `smū\u0303giuose`],
  [`smū\u0303gi`, `smū\u0303giai`],
])
const ZMONAMUSYS = makeDeclinedFromArray([
  [`žmonamušy\u0303s`, `žmonamušiai\u0303`],
  [`žmona\u0303mušio`, `žmonamušių\u0303`],
  [`žmona\u0303mušiui`, `žmonamušia\u0301ms`],
  [`žmona\u0303mušį`, `žmona\u0303mušius`],
  [`žmona\u0303mušiu`, `žmonamušiai\u0303s`],
  [`žmonamušyje\u0300`, `žmonamušiuose\u0300`],
  [`žmonamušy\u0303`, `žmonamušiai\u0303`],
])
const VEPLYS = makeDeclinedFromArray([
  [`vėply\u0303s`, `vėpliai\u0303`],
  [`vė\u0303plio`, `vėplių\u0303`],
  [`vė\u0303pliui`, `vėplia\u0301ms`],
  [`vė\u0303plį`, `vėpliu\u0300s`],
  [`vėpliu\u0300`, `vėpliai\u0303s`],
  [`vėplyje\u0300`, `vėpliuose\u0300`],
  [`vėply\u0303`, `vėpliai\u0303`],
])
const VAGIS = makeDeclinedFromArray([
  [`vagis`, `vagys`],
  [`vagies`, `vagių`],
  [`vagiui`, `vagims`],
  [`vagį`, `vagis`],
  [`vagimi`, `vagimis`],
  [`vagyje`, `vagyse`],
  [`vagie`, `vagys`],
])
const SMERTIS_MASC = makeDeclinedFromArray([
  [`smer\u0303tis`, `smer\u0303tys`],
  [`smer\u0303ties`, `smer\u0303čių`],
  [`smer\u0303čiui`, `smer\u0303tims`],
  [`smer\u0303tį`, `smerti\u0300s`],
  [`smer\u0303timi`, `smer\u0303timis`],
  [`smer\u0303tyje`, `smer\u0303tyse`],
  [`smer\u0303tie`, `smer\u0303tys`],
])
const ZVERIS = makeDeclinedFromArray([
  [`žvėri\u0300s`, `žvė\u0301rys`],
  [`žvėrie\u0303s`, `žvėrių\u0303`],
  [`žvė\u0301riui`, `žvėri\u0300ms`],
  [`žvė\u0301rį`, `žvė\u0301ris`],
  [`žvėrimi\u0300`, `žvėrimi\u0300s`],
  [`žvėryje\u0300`, `žvėryse\u0300`],
  [`žvėrie\u0303`, `žvė\u0301rys`],
])
const SUNIS = makeDeclinedFromArray([
  [`šuni\u0300s`, `šu\u0300nys`],
  [`šunie\u0303s`, `šunių\u0303`],
  [`šu\u0300niui`, `šuni\u0300ms`],
  [`šu\u0300nį`, `šuni\u0300s`],
  [`šunimi\u0300`, `šunimi\u0300s`],
  [`šunyje\u0300`, `šunyse\u0300`],
  [`šunie\u0303`, `šu\u0300nys`],
])
const LUSIS = makeDeclinedFromArray([
  [`lū\u0301šis`, `lū\u0301šys`],
  [`lū\u0301šies`, `lū\u0301šių`],
  [`lū\u0301šiai`, `lū\u0301šims`],
  [`lū\u0301šį`, `lū\u0301šis`],
  [`lū\u0301šimi`, `lū\u0301šimis`],
  [`lū\u0301šyje`, `lū\u0301šyse`],
  [`lū\u0301šie`, `lū\u0301šys`],
])
const SMERTIS_FEM = makeDeclinedFromArray([
  [`smer\u0303tis`, `smer\u0303tys`],
  [`smer\u0303ties`, `smer\u0303čių`],
  [`smer\u0303čiai`, `smer\u0303tims`],
  [`smer\u0303tį`, `smerti\u0300s`],
  [`smer\u0303timi`, `smer\u0303timis`],
  [`smer\u0303tyje`, `smer\u0303tyse`],
  [`smer\u0303tie`, `smer\u0303tys`],
])
const SIRDIS = makeDeclinedFromArray([
  [`širdi\u0300s`, `ši\u0300rdys`],
  [`širdie\u0303s`, `širdžių\u0303`],
  [`ši\u0300rdžiai`, `širdi\u0300ms`],
  [`ši\u0300rdį`, `ši\u0300rdis`],
  [`širdimi\u0300`, `širdimi\u0300s`],
  [`širdyje\u0300`, `širdyse\u0300`],
  [`širdie\u0303`, `ši\u0300rdys`],
])
const VINIS = makeDeclinedFromArray([
  [`vini\u0300s`, `vi\u0300nys`],
  [`vinie\u0303s`, `vinių\u0303`],
  [`vi\u0300niai`, `vini\u0300ms`],
  [`vi\u0300nį`, `vini\u0300s`],
  [`vinimi\u0300`, `vinimi\u0300s`],
  [`vinyje\u0300`, `vinyse\u0300`],
  [`vinie\u0303`, `vi\u0300nys`],
])
const APYNAUJIS = makeDeclinedFromArray([
  [`apy\u0301naujis`, `apy\u0301naujai`],
  [`apy\u0301naujo`, `apy\u0301naujų`],
  [`apy\u0301naujam`, `apy\u0301naujams`],
  [`apy\u0301naujį`, `apy\u0301naujus`],
  [`apy\u0301nauju`, `apy\u0301naujais`],
  [`apy\u0301naujame`, `apy\u0301naujuose`],
  [`apy\u0301nauji`, `apy\u0301naujai`],
])
const MEDINIS = makeDeclinedFromArray([
  [`medi\u0300nis`, `medi\u0300niai`],
  [`medi\u0300nio`, `medi\u0300nių`],
  [`medi\u0300niam`, `medi\u0300niams`],
  [`medi\u0300nį`, `mediniu\u0300s`],
  [`mediniu\u0300`, `medi\u0300niais`],
  [`medi\u0300niame`, `medi\u0300niuose`],
  [`medi\u0300ni`, `medi\u0300niai`],
])
const AISKI = makeDeclinedFromArray([
  [`aiški\u0300`, `a\u0301iškios`],
  [`aiškio\u0303s`, `aiškių\u0303`],
  [`a\u0301iškiai`, `aiškio\u0301ms`],
  [`a\u0301iškią`, `a\u0301iškias`],
  [`a\u0301iškia`, `aiškiomi\u0300s`],
  [`aiškioje\u0300`, `aiškiose\u0300`],
  [`aiški\u0300`, `a\u0301iškios`],
])
const PRAVARTI = makeDeclinedFromArray([
  [`pravarti\u0300`, `pravar\u0303čios`],
  [`pravarčio\u0303s`, `pravarčių\u0303`],
  [`pravar\u0303čiai`, `pravarčio\u0301ms`],
  [`pravar\u0303čią`, `pravarčia\u0300s`],
  [`pravarčia\u0300`, `pravarčiomi\u0300s`],
  [`pravarčioje\u0300`, `pravarčiose\u0300`],
  [`pravarti\u0300`, `pravar\u0303čios`],
])
const SOTI = makeDeclinedFromArray([
  [`soti`, `sočios`],
  [`sočios`, `sočių`],
  [`sočiai`, `sočioms`],
  [`sočią`, `sočias`],
  [`sočia`, `sočiomis`],
  [`sočioje`, `sočiose`],
  [`soti`, `sočios`],
])
const DIDELIS = makeDeclinedFromArray([
  ['di\u0300delis', 'dideli\u0300'],
  ['di\u0300delio', 'didelių\u0303'],
  ['didelia\u0301m', 'dideli\u0301ems'],
  ['di\u0300delį', 'di\u0300delius'],
  ['di\u0300deliu', 'dideliai\u0303s'],
  ['dideliame\u0300', 'dideliuose\u0300'],
  ['di\u0300delis', 'dideli\u0300'],
])
const DIDIS = makeDeclinedFromArray([
  ['di\u0300dis', 'didi\u0300'],
  ['di\u0300džio', 'didžių\u0303'],
  ['didžia\u0301m', 'didi\u0301ems'],
  ['di\u0300dį', 'didžiu\u0300s'],
  ['didžiu\u0300', 'didžiai\u0303s'],
  ['didžiame\u0300', 'didžiuose\u0300'],
  ['di\u0300dis', 'didi\u0300'],
])
const KAIRYS = makeDeclinedFromArray([
  ['kairy\u0303s', 'kairi\u0300'],
  ['kai\u0303rio', 'kairių\u0303'],
  ['kairia\u0301m', 'kairi\u0301ems'],
  ['kai\u0303rį', 'kairiu\u0300s'],
  ['kairiu\u0300', 'kairiai\u0303s'],
  ['kairiame\u0300', 'kairiuose\u0300'],
  ['kairy\u0303', 'kairi\u0300'],
])
const DESINYS = makeDeclinedFromArray([
  ['dešiny\u0303s', 'dešini\u0300'],
  ['de\u0303šinio', 'dešinių\u0303'],
  ['dešinia\u0301m', 'dešini\u0301ems'],
  ['de\u0303šinį', 'de\u0303šinius'],
  ['de\u0303šiniu', 'dešiniai\u0303s'],
  ['dešiniame\u0300', 'dešiniuose\u0300'],
  ['dešiny\u0303', 'dešini\u0300'],
])
const PASKUTINIOJI = makeDeclinedFromArray([
  'paskutinióji paskutiniõsios paskutìniajai paskutìniąją paskutinią́ja paskutiniõjoje paskutinióji'
    .split(' '),
  'paskutìniosios paskutinių̃jų paskutiniósioms paskutinią́sias paskutiniõsiomis paskutiniõsiose paskutìniosios'
    .split(' '),
])
const STACIOJI = makeDeclinedFromArray([
  'stačioji stačiosios stačiajai stačiąją stačiąja stačiojoje stačioji'
    .split(' '),
  'stačiosios stačiųjų stačiosioms stačiąsias stačiosiomis stačiosiose stačiosios'
    .split(' '),
])
const DESINYSIS_3B = makeDeclinedFromArray(
  `dešinỹsis dẽšiniojo dešiniájam dẽšinįjį dešiniúoju dešiniãjame dešinỹsis
dešiníeji dešinių̃jų dešiníesiems dešiniúosius dešiniaĩsiais dešiniuõsiuose dešiníeji`
    .split(/\s/),
)
const DESINYSIS_0 = makeDeclinedFromArray(
  `dešinysis dešiniojo dešiniajam dešinįjį dešiniuoju dešiniajame dešinysis
dešinieji dešiniųjų dešiniesiems dešiniuosius dešiniaisiais dešiniuosiuose dešinieji`
    .split(/\s/),
)

describe('IsDeclinator', () => {
  it('declines 1st accentuation -io noun', () => {
    expect(IsDeclinator.declineIoNounI(`kū\u0301j`))
      .toMatchObject(KUJIS)
  })
  it('declines 2nd accentuation -io noun', () => {
    expect(IsDeclinator.declineIoNounII(`smū\u0303g`))
      .toMatchObject(SMUGIS)
  })
  it('declines 3rd accentuation -io noun', () => {
    expect(IsDeclinator.declineIoNounIII(`žmonamuš`, '3b'))
      .toMatchObject(ZMONAMUSYS)
  })
  it('declines 4th accentuation -io noun', () => {
    expect(IsDeclinator.declineIoNounIV(`vėpl`))
      .toMatchObject(VEPLYS)
  })
  it('declines 1st accentuation masculine -ies noun', () => {
    expect(IsDeclinator.declineMasculineIesNounI(`vag`))
      .toMatchObject(VAGIS)
  })
  it('declines 2nd accentuation masculine -ies noun', () => {
    expect(IsDeclinator.declineMasculineIesNounII(`smer\u0303t`))
      .toMatchObject(SMERTIS_MASC)
  })
  it('declines 3rd accentuation masculine -ies noun', () => {
    expect(IsDeclinator.declineMasculineIesNounIII(`žvėr`))
      .toMatchObject(ZVERIS)
  })
  it('declines 4th accentuation masculine -ies noun', () => {
    expect(IsDeclinator.declineMasculineIesNounIV(`šun`))
      .toMatchObject(SUNIS)
  })
  it('declines 1st accentuation feminine -ies noun', () => {
    expect(IsDeclinator.declineFeminineIesNounI(`lū\u0301š`))
      .toMatchObject(LUSIS)
  })
  it('declines 2nd accentuation feminine -ies noun', () => {
    expect(IsDeclinator.declineFeminineIesNounII(`smer\u0303t`))
      .toMatchObject(SMERTIS_FEM)
  })
  it('declines 3rd accentuation feminine -ies noun', () => {
    expect(IsDeclinator.declineFeminineIesNounIII(`šird`))
      .toMatchObject(SIRDIS)
  })
  it('declines 4th accentuation feminine -ies noun', () => {
    expect(IsDeclinator.declineFeminineIesNounIV(`vin`))
      .toMatchObject(VINIS)
  })
  it('declines 1st accentuation masculine adjective', () => {
    expect(IsDeclinator.declineMasculineIsAdjectiveI(`apy\u0301nauj`))
      .toMatchObject(APYNAUJIS)
  })
  it('declines 2nd accentuation masculine adjective', () => {
    expect(IsDeclinator.declineMasculineIsAdjectiveII(`medi\u0300n`))
      .toMatchObject(MEDINIS)
  })
  it('declines 3rd accentuation -is masculine adjective', () => {
    expect(IsDeclinator.declineMasculineIsAdjectiveIII(`di\u0300del`))
      .toMatchObject(DIDELIS)
  })
  it('declines 4th accentuation -is masculine adjective', () => {
    expect(IsDeclinator.declineMasculineIsAdjectiveIV(`did`))
      .toMatchObject(DIDIS)
  })
  it('declines 3rd accentuation -ys masculine adjective', () => {
    expect(IsDeclinator.declineMasculineYsAdjectiveIII(`dešin`, '3b'))
      .toMatchObject(DESINYS)
  })
  it('declines 4th accentuation -ys masculine adjective', () => {
    expect(IsDeclinator.declineMasculineYsAdjectiveIV(`kair`))
      .toMatchObject(KAIRYS)
  })
  it('declines feminine adjective', () => {
    expect(IsDeclinator.declineFeminineIAdjective(`sot`))
      .toMatchObject(SOTI)
  })
  it('declines 3rd accentuation feminine adjective', () => {
    expect(IsDeclinator.declineFeminineIAdjectiveIII(`aišk`))
      .toMatchObject(AISKI)
  })
  it('declines 4th accentuation feminine adjective', () => {
    expect(IsDeclinator.declineFeminineIAdjectiveIV(`pravart`))
      .toMatchObject(PRAVARTI)
  })
  it('declines 2nd accentuation feminine pronominal adjective', () => {
    expect(IsDeclinator.declineFemininePronominalMobile(`paskutin`, '2'))
      .toMatchObject(PASKUTINIOJI)
  })
  it('declines immobile feminine pronominal adjective', () => {
    expect(IsDeclinator.declineFemininePronominalImmobile(`stat`))
      .toMatchObject(STACIOJI)
  })
  it('declines mobile masculine pronominal adjective', () => {
    expect(IsDeclinator.declineMasculinePronominalMobile(`dešin`, '3b'))
      .toMatchObject(DESINYSIS_3B)
  })
  it('declines immobile masculine pronominal adjective', () => {
    expect(IsDeclinator.declineMasculinePronominalImmobile(`dešin`))
      .toMatchObject(DESINYSIS_0)
  })
})
