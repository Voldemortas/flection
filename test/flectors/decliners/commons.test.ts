import { describe, it } from '@std/testing/bdd'
import { expect } from '@std/expect'
import * as decliners from '~decliners/commons.ts'
import { makeDeclinedFromArray } from '~test/testHelpers.ts'
import checkUsedExports from '~test/coverage.ts'
import { stripAllAccentsFromParadigm } from '~src/utils.ts'
import { notAttestedInLanguageError } from '~src/errors.ts'

const SUNUS_I = makeDeclinedFromArray([
  [`sū\u0301nus`, `sū\u0301nūs`],
  [`sū\u0301naus`, `sū\u0301nų`],
  [`sū\u0301nui`, `sū\u0301nums sū\u0301num`],
  [`sū\u0301nų`, `sū\u0301nus`],
  [`sū\u0301numi sū\u0301num`, `sū\u0301numis`],
  [`sū\u0301nuje sū\u0301nuj`, `sū\u0301nuose sū\u0301nuos`],
  [`sū\u0301nau`, `sū\u0301nūs`],
])
const TURGUS = makeDeclinedFromArray([
  [`tur\u0303gus`, `tur\u0303gūs`],
  [`tur\u0303gaus`, `tur\u0303gų`],
  [`tur\u0303gui`, `tur\u0303gums tur\u0303gum`],
  [`tur\u0303gų`, `turgu\u0300s`],
  [`tur\u0303gumi tur\u0303gum`, `tur\u0303gumis`],
  [`tur\u0303guje tur\u0303guj`, `tur\u0303guose tur\u0303guos`],
  [`tur\u0303gau`, `tur\u0303gūs`],
])
const SUNUS_III = makeDeclinedFromArray([
  [`sūnu\u0300s`, `sū\u0301nūs`],
  [`sūnau\u0303s`, `sūnų\u0303`],
  [`sū\u0301nui`, `sūnu\u0300ms sūnu\u0300m`],
  [`sū\u0301nų`, `sū\u0301nus`],
  [`sūnumi\u0300 sūnum\u0303`, `sūnumi\u0300s`],
  [`sūnuje\u0300 sūnuj\u0303`, `sūnuose\u0300 sūnuo\u0303s`],
  [`sūnau\u0303`, `sū\u0301nūs`],
])
const MEDUS = makeDeclinedFromArray([
  [`medu\u0300s`, `me\u0303dūs`],
  [`medau\u0303s`, `medų\u0303`],
  [`me\u0303dui`, `medu\u0300ms medu\u0300m`],
  [`me\u0303dų`, `medu\u0300s`],
  [`medumi\u0300 medum\u0303`, `medumi\u0300s`],
  [`meduje\u0300 meduj\u0303`, `meduose\u0300 meduo\u0303s`],
  [`medau\u0303`, `me\u0303dūs`],
])
const IZIDORIUS = makeDeclinedFromArray([
  [`Izi\u0300dorius`, `Izi\u0300doriai`],
  [`Izi\u0300doriaus`, `Izi\u0300dorių`],
  [`Izi\u0300doriui`, `Izi\u0300doriams Izi\u0300doriam`],
  [`Izi\u0300dorių`, `Izi\u0300dorius`],
  [`Izi\u0300doriumi Izi\u0300dorium`, `Izi\u0300doriais`],
  [`Izi\u0300doriuje Izi\u0300doriuj`, `Izi\u0300doriuose Izi\u0300doriuos`],
  [`Izi\u0300doriau`, `Izi\u0300doriai`],
])
const BEZDZIUS = makeDeclinedFromArray([
  [`be\u0300zdžius`, `be\u0300zdžiai`],
  [`be\u0300zdžiaus`, `be\u0300zdžių`],
  [`be\u0300zdžiui`, `be\u0300zdžiams be\u0300zdžiam`],
  [`be\u0300zdžių`, `bezdžiu\u0300s`],
  [`be\u0300zdžiumi be\u0300zdžium`, `be\u0300zdžiais`],
  [`be\u0300zdžiuje be\u0300zdžiuj`, `be\u0300zdžiuose be\u0300zdžiuos`],
  [`be\u0300zdžiau`, `be\u0300zdžiai`],
])
const VEJUS = makeDeclinedFromArray([
  [`vėju\u0300s`, `vėjai\u0303`],
  [`vėjau\u0303s`, `vėjų\u0303`],
  [`vė\u0301jui`, `vėja\u0301ms vėja\u0301m`],
  [`vė\u0301jų`, `vė\u0301jus`],
  [`vėjumi\u0300 vėjum\u0303`, `vėjai\u0303s`],
  [`vėjuje\u0300 vėjuj\u0303`, `vėjuose\u0300 vėjuo\u0303s`],
  [`vėjau\u0303`, `vėjai\u0303`],
])
//such illness, an actual noun
const RAJUS = makeDeclinedFromArray([
  [`raju\u0300s`, `rajai\u0303`],
  [`rajau\u0303s`, `rajų\u0303`],
  [`ra\u0303jui`, `raja\u0301ms raja\u0301m`],
  [`ra\u0303jų`, `raju\u0300s`],
  [`rajumi\u0300 rajum\u0303`, `rajai\u0303s`],
  [`rajuje\u0300 rajuj\u0303`, `rajuose\u0300 rajuo\u0303s`],
  [`rajau\u0303`, `rajai\u0303`],
])
const LYGUS = makeDeclinedFromArray([
  [`ly\u0301gus`, `ly\u0301gūs`],
  [`ly\u0301gaus`, `ly\u0301gių`],
  [`ly\u0301giam`, `ly\u0301giems ly\u0301giem`],
  [`ly\u0301gų`, `ly\u0301gius`],
  [`ly\u0301giu`, `ly\u0301giais`],
  [`ly\u0301giame ly\u0301giam`, `ly\u0301giuose ly\u0301giuos`],
  [`ly\u0301gus`, `ly\u0301gūs`],
])
const PRIEKABUS = makeDeclinedFromArray([
  [`priekabu\u0300s`, `pri\u0301ekabūs`],
  [`priekabau\u0303s`, `priekabių\u0303`],
  [`priekabia\u0301m`, `priekabi\u0301ems priekabi\u0301em`],
  [`pri\u0301ekabų`, `pri\u0301ekabius`],
  [`pri\u0301ekabiu`, `priekabiai\u0303s`],
  [
    `priekabiame\u0300 priekabiam\u0303`,
    `priekabiuose\u0300 priekabiuo\u0303s`,
  ],
  [`priekabu\u0300s`, `pri\u0301ekabūs`],
])
const STATUS = makeDeclinedFromArray([
  [`statu\u0300s`, `sta\u0303tūs`],
  [`statau\u0303s`, `stačių\u0303`],
  [`stačia\u0301m`, `stati\u0301ems stati\u0301em`],
  [`sta\u0303tų`, `stačiu\u0300s`],
  [`stačiu\u0300`, `stačiai\u0303s`],
  [`stačiame\u0300 stačiam\u0303`, `stačiuose\u0300 stačiuo\u0303s`],
  [`statu\u0300s`, `sta\u0303tūs`],
])
const LYGUSIS = makeDeclinedFromArray([
  [`ly\u0301gusis`, `ly\u0301gieji`],
  [`ly\u0301giojo`, `ly\u0301giųjų`],
  [`ly\u0301giajam`, `ly\u0301giesiems ly\u0301giesiem`],
  [`ly\u0301gųjį`, `ly\u0301giuosius`],
  [`ly\u0301giuoju`, `ly\u0301giaisiais`],
  [`ly\u0301giajame ly\u0301giajam`, `ly\u0301giuosiuose ly\u0301giuosiuos`],
  [`ly\u0301gusis`, `ly\u0301gieji`],
])
const STATUSIS = makeDeclinedFromArray([
  [`statu\u0300sis`, `stati\u0301eji`],
  [`sta\u0303čiojo`, `stačių\u0303jų`],
  [`stačia\u0301jam`, `stati\u0301esiems stati\u0301esiem`],
  [`sta\u0303tųjį`, `stačiu\u0301osius`],
  [`stačiu\u0301oju`, `stačiai\u0303siais`],
  [
    `stačia\u0303jame stačia\u0303jam`,
    `stačiuo\u0303siuose stačiuo\u0303siuos`,
  ],
  [`statu\u0300sis`, `stati\u0301eji`],
])
const ZMOGUS = makeDeclinedFromArray([
  [`žmogu\u0300s`, `žmo\u0301nės`],
  [`žmogau\u0303s`, `žmonių\u0303`],
  [`žmo\u0303gui`, `žmonė\u0301ms žmonė\u0301m`],
  [`žmo\u0303gų`, `žmo\u0301nes`],
  [`žmogumi\u0300 žmogum\u0303`, `žmonėmi\u0300s žmonė\u0303m`],
  [`žmoguje\u0300 žmoguj\u0303`, `žmonėse\u0300`],
  [`žmogau\u0303`, `žmo\u0301nės`],
])
const VARNA = makeDeclinedFromArray([
  [`va\u0301rna`, `va\u0301rnos`],
  [`va\u0301rnos`, `va\u0301rnų`],
  [`va\u0301rnai`, `va\u0301rnoms va\u0301rnom`],
  [`va\u0301rną`, `va\u0301rnas`],
  [`va\u0301rna`, `va\u0301rnomis va\u0301rnom`],
  [`va\u0301rnoje va\u0301rnoj`, `va\u0301rnose`],
  [`va\u0301rna`, `va\u0301rnos`],
])
const RANKA = makeDeclinedFromArray([
  [`ranka\u0300`, `ran\u0303kos`],
  [`ran\u0303kos`, `ran\u0303kų`],
  [`ran\u0303kai`, `ran\u0303koms ran\u0303kom`],
  [`ran\u0303ką`, `ranka\u0300s`],
  [`ranka\u0300`, `ran\u0303komis ran\u0303kom`],
  [`ran\u0303koje ran\u0303koj`, `ran\u0303kose`],
  [`ran\u0303ka`, `ran\u0303kos`],
])
const KLAIDA = makeDeclinedFromArray([
  [`klaida\u0300`, `klai\u0303dos`],
  [`klaido\u0303s`, `klaidų\u0303`],
  [`klai\u0303dai`, `klaido\u0301ms klaido\u0301m`],
  [`klai\u0303dą`, `klaida\u0300s`],
  [`klaida\u0300`, `klaidomi\u0300s klaido\u0303m`],
  [`klaidoje\u0300 klaidoj\u0303`, `klaidose\u0300`],
  [`klai\u0303da`, `klai\u0303dos`],
])
const ATRAMA = makeDeclinedFromArray([
  [`atrama\u0300`, `a\u0303tramos`],
  [`atramo\u0303s`, `atramų\u0303`],
  [`a\u0303tramai`, `atramo\u0301ms atramo\u0301m`],
  [`a\u0303tramą`, `a\u0303tramas`],
  [`a\u0303trama`, `atramomi\u0300s atramo\u0303m`],
  [`atramoje\u0300 atramoj\u0303`, `atramose\u0300`],
  [`a\u0303trama`, `a\u0303tramos`],
])
const VALIA = makeDeclinedFromArray([
  [`valia\u0300`, `va\u0303lios`],
  [`va\u0303lios`, `va\u0303lių`],
  [`va\u0303liai`, `va\u0303lioms va\u0303liom`],
  [`va\u0303lią`, `valia\u0300s`],
  [`valia\u0300`, `va\u0303liomis va\u0303liom`],
  [`va\u0303lioje va\u0303lioj`, `va\u0303liose`],
  [`va\u0303lia`, `va\u0303lios`],
])
const VALDZIA = makeDeclinedFromArray([
  [`valdžia\u0300`, `val\u0303džios`],
  [`valdžio\u0303s`, `valdžių\u0303`],
  [`val\u0303džiai`, `valdžio\u0301ms valdžio\u0301m`],
  [`val\u0303džią`, `valdžia\u0300s`],
  [`valdžia\u0300`, `valdžiomi\u0300s valdžio\u0303m`],
  [`valdžioje\u0300 valdžioj\u0303`, `valdžiose\u0300`],
  [`val\u0303džia`, `val\u0303džios`],
])
const JUODA = makeDeclinedFromArray([
  [`juoda\u0300`, `ju\u0301odos`],
  [`juodo\u0303s`, `juodų\u0303`],
  [`ju\u0301odai`, `juodo\u0301ms juodo\u0301m`],
  [`ju\u0301odą`, `ju\u0301odas`],
  [`ju\u0301oda`, `juodomi\u0300s juodo\u0303m`],
  [`juodoje\u0300 juodoj\u0303`, `juodose\u0300`],
  [`juoda\u0300`, `ju\u0301odos`],
])
const TIKRA = makeDeclinedFromArray([
  [`tikra\u0300`, `ti\u0300kros`],
  [`tikro\u0303s`, `tikrų\u0303`],
  [`ti\u0300krai`, `tikro\u0301ms tikro\u0301m`],
  [`ti\u0300krą`, `tikra\u0300s`],
  [`tikra\u0300`, `tikromi\u0300s tikro\u0303m`],
  [`tikroje\u0300 tikroj\u0303`, `tikrose\u0300`],
  [`tikra\u0300`, `ti\u0300kros`],
])
const TIKROJI = makeDeclinedFromArray([
  [`tikro\u0301ji`, `ti\u0300krosios`],
  [`tikro\u0303sios`, `tikrų\u0303jų`],
  [`ti\u0300krajai`, `tikro\u0301sioms tikro\u0301siom`],
  [`ti\u0300krąją`, `tikrą\u0301sias`],
  [`tikrą\u0301ja`, `tikro\u0303siomis tikro\u0303siom`],
  [`tikro\u0303joje tikro\u0303joj`, `tikro\u0303siose`],
  [`tikro\u0301ji`, `ti\u0300krosios`],
])
const PALAIMINTOJI = makeDeclinedFromArray([
  [`pala\u0301imintoji`, `pala\u0301imintosios`],
  [`pala\u0301imintosios`, `pala\u0301imintųjų`],
  [`pala\u0301imintajai`, `pala\u0301imintosioms pala\u0301imintosiom`],
  [`pala\u0301imintąją`, `pala\u0301imintąsias`],
  [`pala\u0301imintąja`, `pala\u0301imintosiomis pala\u0301imintosiom`],
  [`pala\u0301imintojoje pala\u0301imintojoj`, `pala\u0301imintosiose`],
  [`pala\u0301imintoji`, `pala\u0301imintosios`],
])
const BULVE = makeDeclinedFromArray([
  [`bu\u0300lvė`, `bu\u0300lvės`],
  [`bu\u0300lvės`, `bu\u0300lvių`],
  [`bu\u0300lvei`, `bu\u0300lvėms bu\u0300lvėm`],
  [`bu\u0300lvę`, `bu\u0300lves`],
  [`bu\u0300lve`, `bu\u0300lvėmis bu\u0300lvėm`],
  [`bu\u0300lvėje bu\u0300lvėj`, `bu\u0300lvėse`],
  [`bu\u0300lve`, `bu\u0300lvės`],
])
const ZVAKE = makeDeclinedFromArray([
  [`žva\u0303kė`, `žva\u0303kės`],
  [`žva\u0303kės`, `žva\u0303kių`],
  [`žva\u0303kei`, `žva\u0303kėms žva\u0303kėm`],
  [`žva\u0303kę`, `žvake\u0300s`],
  [`žvake\u0300`, `žva\u0303kėmis žva\u0303kėm`],
  [`žva\u0303kėje žva\u0303kėj`, `žva\u0303kėse`],
  [`žva\u0303ke`, `žva\u0303kės`],
])
const GERKLE = makeDeclinedFromArray([
  [`gerklė\u0303`, `ge\u0301rklės`],
  [`gerklė\u0303s`, `gerklių\u0303`],
  [`ge\u0301rklei`, `gerklė\u0301ms gerklė\u0301m`],
  [`ge\u0301rklę`, `ge\u0301rkles`],
  [`ge\u0301rkle`, `gerklėmi\u0300s gerklė\u0303m`],
  [`gerklėje\u0300 gerklėj\u0303`, `gerklėse\u0300`],
  [`ge\u0301rkle`, `ge\u0301rklės`],
])
const LELE = makeDeclinedFromArray([
  [`lėlė\u0303`, `lė\u0303lės`],
  [`lėlė\u0303s`, `lėlių\u0303`],
  [`lė\u0303lei`, `lėlė\u0301ms lėlė\u0301m`],
  [`lė\u0303lę`, `lėle\u0300s`],
  [`lėle\u0300`, `lėlėmi\u0300s lėlė\u0303m`],
  [`lėlėje\u0300 lėlėj\u0303`, `lėlėse\u0300`],
  [`lė\u0303le`, `lė\u0303lės`],
])
const AKMUO = makeDeclinedFromArray([
  [`akmuo\u0303`, `a\u0303kmenys`],
  [`akmen\u0303s a\u0303kmenio`, `akmenų\u0303`],
  [`a\u0303kmeniui`, `akmeni\u0300ms akmeni\u0300m`],
  [`a\u0303kmenį`, `a\u0303kmenis`],
  [`a\u0303kmeniu`, `akmenimi\u0300s akmenim\u0303`],
  [`akmenyje\u0300 akmeny\u0303`, `akmenyse\u0300`],
  [`akmenie\u0303`, `a\u0303kmenys`],
])
const VYRAS = makeDeclinedFromArray([
  [`vy\u0301ras`, `vy\u0301rai`],
  [`vy\u0301ro`, `vy\u0301rų`],
  [`vy\u0301rui`, `vy\u0301rams vy\u0301ram`],
  [`vy\u0301rą`, `vy\u0301rus`],
  [`vy\u0301ru`, `vy\u0301rais`],
  [`vy\u0301re`, `vy\u0301ruose vy\u0301ruos`],
  [`vy\u0301re`, `vy\u0301rai`],
])
const RATAS = makeDeclinedFromArray([
  [`ra\u0303tas`, `ra\u0303tai`],
  [`ra\u0303to`, `ra\u0303tų`],
  [`ra\u0303tui`, `ra\u0303tams ra\u0303tam`],
  [`ra\u0303tą`, `ratu\u0300s`],
  [`ratu\u0300`, `ra\u0303tais`],
  [`rate\u0300`, `ra\u0303tuose ra\u0303tuos`],
  [`ra\u0303te`, `ra\u0303tai`],
])
const LANGAS = makeDeclinedFromArray([
  [`la\u0301ngas`, `langai\u0303`],
  [`la\u0301ngo`, `langų\u0303`],
  [`la\u0301ngui`, `langa\u0301ms langa\u0301m`],
  [`la\u0301ngą`, `la\u0301ngus`],
  [`la\u0301ngu`, `langai\u0303s`],
  [`lange\u0300`, `languose\u0300 languo\u0303s`],
  [`la\u0301nge`, `langai\u0303`],
])
const NAMAS = makeDeclinedFromArray([
  [`na\u0303mas`, `namai\u0303`],
  [`na\u0303mo`, `namų\u0303`],
  [`na\u0303mui`, `nama\u0301ms nama\u0301m`],
  [`na\u0303mą`, `namu\u0300s`],
  [`namu\u0300`, `namai\u0303s`],
  [`name\u0300`, `namuose\u0300 namuo\u0303s`],
  [`na\u0303me`, `namai\u0303`],
])
const VEJAS = makeDeclinedFromArray([
  [`vė\u0301jas`, `vė\u0301jai`],
  [`vė\u0301jo`, `vė\u0301jų`],
  [`vė\u0301jui`, `vė\u0301jams vė\u0301jam`],
  [`vė\u0301ją`, `vė\u0301jus`],
  [`vė\u0301ju`, `vė\u0301jais`],
  [
    `vė\u0301jyje vė\u0301juje vė\u0301jy vė\u0301juj`,
    `vė\u0301juose vė\u0301juos`,
  ],
  [`vė\u0301jau`, `vė\u0301jai`],
])
const GEJAS = makeDeclinedFromArray([
  [`gė\u0303jas`, `gė\u0303jai`],
  [`gė\u0303jo`, `gė\u0303jų`],
  [`gė\u0303jui`, `gė\u0303jams gė\u0303jam`],
  [`gė\u0303ją`, `gėju\u0300s`],
  [`gėju\u0300`, `gė\u0303jais`],
  [
    `gė\u0303jyje gė\u0303juje gė\u0303jy gė\u0303juj`,
    `gė\u0303juose gė\u0303juos`,
  ],
  [`gė\u0303jau`, `gė\u0303jai`],
])
const SEJAS = makeDeclinedFromArray([
  [`sė\u0301jas`, `sėjai\u0303`],
  [`sė\u0301jo`, `sėjų\u0303`],
  [`sė\u0301jui`, `sėja\u0301ms sėja\u0301m`],
  [`sė\u0301ją`, `sė\u0301jus`],
  [`sė\u0301ju`, `sėjai\u0303s`],
  [
    `sė\u0301jyje sė\u0301juje sė\u0301jy sė\u0301juj`,
    `sėjuose\u0300 sėjuo\u0303s`,
  ],
  [`sė\u0301jau`, `sėjai\u0303`],
])
const KRAUJAS = makeDeclinedFromArray([
  [`krau\u0303jas`, `kraujai\u0303`],
  [`krau\u0303jo`, `kraujų\u0303`],
  [`krau\u0303jui`, `krauja\u0301ms krauja\u0301m`],
  [`krau\u0303ją`, `krauju\u0300s`],
  [`krauju\u0300`, `kraujai\u0303s`],
  [
    `krau\u0303jyje krau\u0303juje krau\u0303jy krau\u0303juj`,
    `kraujuose\u0300 kraujuo\u0303s`,
  ],
  [`krau\u0303jau`, `kraujai\u0303`],
])
const VIREJAS_I = makeDeclinedFromArray([
  [`virė\u0301jas`, `virė\u0301jai`],
  [`virė\u0301jo`, `virė\u0301jų`],
  [`virė\u0301jui`, `virė\u0301jams virė\u0301jam`],
  [`virė\u0301ją`, `virė\u0301jus`],
  [`virė\u0301ju`, `virė\u0301jais`],
  [`virė\u0301juje virė\u0301juj`, `virė\u0301juose virė\u0301juos`],
  [`virė\u0301jau`, `virė\u0301jai`],
])
const VIREJAS_II = makeDeclinedFromArray([
  [`virė\u0303jas`, `virė\u0303jai`],
  [`virė\u0303jo`, `virė\u0303jų`],
  [`virė\u0303jui`, `virė\u0303jams virė\u0303jam`],
  [`virė\u0303ją`, `virėju\u0300s`],
  [`virėju\u0300`, `virė\u0303jais`],
  [`virė\u0303juje virė\u0303juj`, `virė\u0303juose virė\u0303juos`],
  [`virė\u0303jau`, `virė\u0303jai`],
])
const VIREJAS_III = makeDeclinedFromArray([
  [`virė\u0301jas`, `virėjai\u0303`],
  [`virė\u0301jo`, `virėjų\u0303`],
  [`virė\u0301jui`, `virėja\u0301ms virėja\u0301m`],
  [`virė\u0301ją`, `virė\u0301jus`],
  [`virė\u0301ju`, `virėjai\u0303s`],
  [`virė\u0301juje virė\u0301juj`, `virėjuose\u0300 virėjuo\u0303s`],
  [`virė\u0301jau`, `virėjai\u0303`],
])
const VIREJAS_IV = makeDeclinedFromArray([
  [`virė\u0303jas`, `virėjai\u0303`],
  [`virė\u0303jo`, `virėjų\u0303`],
  [`virė\u0303jui`, `virėja\u0301ms virėja\u0301m`],
  [`virė\u0303ją`, `virėju\u0300s`],
  [`virėju\u0300`, `virėjai\u0303s`],
  [`virė\u0303juje virė\u0303juj`, `virėjuose\u0300 virėjuo\u0303s`],
  [`virė\u0303jau`, `virėjai\u0303`],
])
const ELNIAS = makeDeclinedFromArray([
  [`e\u0301lnias`, `e\u0301lniai`],
  [`e\u0301lnio`, `e\u0301lnių`],
  [`e\u0301lniui`, `e\u0301lniams e\u0301lniam`],
  [`e\u0301lnią`, `e\u0301lnius`],
  [`e\u0301lniu`, `e\u0301lniais`],
  [`e\u0301lnyje e\u0301lny`, `e\u0301lniuose e\u0301lniuos`],
  [`e\u0301lni e\u0301lniau`, `e\u0301lniai`],
])
const KELIAS_II = makeDeclinedFromArray([
  [`ke\u0303lias`, `ke\u0303liai`],
  [`ke\u0303lio`, `ke\u0303lių`],
  [`ke\u0303liui`, `ke\u0303liams ke\u0303liam`],
  [`ke\u0303lią`, `keliu\u0300s`],
  [`keliu\u0300`, `ke\u0303liais`],
  [`ke\u0303lyje ke\u0303ly`, `ke\u0303liuose ke\u0303liuos`],
  [`ke\u0303li ke\u0303liau`, `ke\u0303liai`],
])
const VELNIAS = makeDeclinedFromArray([
  [`ve\u0301lnias`, `velniai\u0303`],
  [`ve\u0301lnio`, `velnių\u0303`],
  [`ve\u0301lniui`, `velnia\u0301ms velnia\u0301m`],
  [`ve\u0301lnią`, `ve\u0301lnius`],
  [`ve\u0301lniu`, `velniai\u0303s`],
  [`velnyje\u0300 velny\u0303`, `velniuose\u0300 velniuo\u0303s`],
  [`velny\u0303`, `velniai\u0303`],
])
const KELIAS_IV = makeDeclinedFromArray([
  [`ke\u0303lias`, `keliai\u0303`],
  [`ke\u0303lio`, `kelių\u0303`],
  [`ke\u0303liui`, `kelia\u0301ms kelia\u0301m`],
  [`ke\u0303lią`, `keliu\u0300s`],
  [`keliu\u0300`, `keliai\u0303s`],
  [`kelyje\u0300 kely\u0303`, `keliuose\u0300 keliuo\u0303s`],
  [`kely\u0303`, `keliai\u0303`],
])
const ILGOKAS = makeDeclinedFromArray([
  [`ilgo\u0301kas`, `ilgo\u0301ki`],
  [`ilgo\u0301ko`, `ilgo\u0301kų`],
  [`ilgo\u0301kam`, `ilgo\u0301kiems ilgo\u0301kiem`],
  [`ilgo\u0301ką`, `ilgo\u0301kus`],
  [`ilgo\u0301ku`, `ilgo\u0301kais`],
  [`ilgo\u0301kame ilgo\u0301kam`, `ilgo\u0301kuose ilgo\u0301kuos`],
  [`ilgo\u0301kas`, `ilgo\u0301ki`],
])
const STORAS = makeDeclinedFromArray([
  [`sto\u0301ras`, `stori\u0300`],
  [`sto\u0301ro`, `storų\u0303`],
  [`stora\u0301m`, `stori\u0301ems stori\u0301em`],
  [`sto\u0301rą`, `sto\u0301rus`],
  [`sto\u0301ru`, `storai\u0303s`],
  [`storame\u0300 storam\u0303`, `storuose\u0300 storuo\u0303s`],
  [`sto\u0301ras`, `stori\u0300`],
])
const MAZAS = makeDeclinedFromArray([
  [`ma\u0303žas`, `maži\u0300`],
  [`ma\u0303žo`, `mažų\u0303`],
  [`maža\u0301m`, `maži\u0301ems maži\u0301em`],
  [`ma\u0303žą`, `mažu\u0300s`],
  [`mažu\u0300`, `mažai\u0303s`],
  [`mažame\u0300 mažam\u0303`, `mažuose\u0300 mažuo\u0303s`],
  [`ma\u0303žas`, `maži\u0300`],
])
const PESCIAS = makeDeclinedFromArray([
  [`pė\u0301sčias`, `pė\u0301sti`],
  [`pė\u0301sčio`, `pė\u0301sčių`],
  [`pė\u0301sčiam`, `pė\u0301stiems pė\u0301stiem`],
  [`pė\u0301sčią`, `pė\u0301sčius`],
  [`pė\u0301sčiu`, `pė\u0301sčiais`],
  [`pė\u0301sčiame pė\u0301sčiam`, `pė\u0301sčiuose pė\u0301sčiuos`],
  [`pė\u0301sčias`, `pė\u0301sti`],
])
const PLOKSCIAS = makeDeclinedFromArray([
  [`plo\u0301kščias`, `plokšti\u0300`],
  [`plo\u0301kščio`, `plokščių\u0303`],
  [`plokščia\u0301m`, `plokšti\u0301ems plokšti\u0301em`],
  [`plo\u0301kščią`, `plo\u0301kščius`],
  [`plo\u0301kščiu`, `plokščiai\u0303s`],
  [`plokščiame\u0300 plokščiam\u0303`, `plokščiuose\u0300 plokščiuo\u0303s`],
  [`plo\u0301kščias`, `plokšti\u0300`],
])
const STACIAS = makeDeclinedFromArray([
  [`sta\u0303čias`, `stati\u0300`],
  [`sta\u0303čio`, `stačių\u0303`],
  [`stačia\u0301m`, `stati\u0301ems stati\u0301em`],
  [`sta\u0303čią`, `stačiu\u0300s`],
  [`stačiu\u0300`, `stačiai\u0303s`],
  [`stačiame\u0300 stačiam\u0303`, `stačiuose\u0300 stačiuo\u0303s`],
  [`sta\u0303čias`, `stati\u0300`],
])
const KREIPIMASIS = makeDeclinedFromArray([
  [`kreipi\u0300masis`, `kreipi\u0300maisi`],
  [`kreipi\u0300mosi`, `kreipi\u0300mųsi`],
  [`kreipi\u0300muisi`, `kreipi\u0300mamsi`],
  [`kreipi\u0300mąsi`, `kreipi\u0300musis`],
  [`kreipi\u0300musi`, `kreipi\u0300maisi`],
  [`kreipi\u0300mesi`, `kreipi\u0300muosesi`],
  [`kreipi\u0300mesi`, `kreipi\u0300maisi`],
])
const GERASIS_4 = makeDeclinedFromArray([
  [`gera\u0300sis`, `geri\u0301eji`],
  [`ge\u0303rojo`, `gerų\u0303jų`],
  [`gera\u0301jam`, `geri\u0301esiems geri\u0301esiem`],
  [`ge\u0303rąjį`, `geru\u0301osius`],
  [`geru\u0301oju`, `gerai\u0303siais`],
  [`gera\u0303jame gera\u0303jam`, `geruo\u0303siuose geruo\u0303siuos`],
  [`gera\u0300sis`, `geri\u0301eji`],
])
const PESCIASIS_3 = makeDeclinedFromArray([
  [`pėsčia\u0300sis`, `pėsti\u0301eji`],
  [`pė\u0301sčiojo`, `pėsčių\u0303jų`],
  [`pėsčia\u0301jam`, `pėsti\u0301esiems pėsti\u0301esiem`],
  [`pė\u0301sčiąjį`, `pėsčiu\u0301osius`],
  [`pėsčiu\u0301oju`, `pėsčiai\u0303siais`],
  [
    `pėsčia\u0303jame pėsčia\u0303jam`,
    `pėsčiuo\u0303siuose pėsčiuo\u0303siuos`,
  ],
  [`pėsčia\u0300sis`, `pėsti\u0301eji`],
])
const KUJIS = makeDeclinedFromArray([
  [`kū\u0301jis`, `kū\u0301jai`],
  [`kū\u0301jo`, `kū\u0301jų`],
  [`kū\u0301jui`, `kū\u0301jams kū\u0301jam`],
  [`kū\u0301jį`, `kū\u0301jus`],
  [`kū\u0301ju`, `kū\u0301jais`],
  [`kū\u0301jyje kū\u0301jy`, `kū\u0301juose kū\u0301juos`],
  [`kū\u0301ji`, `kū\u0301jai`],
])
const SMUGIS = makeDeclinedFromArray([
  [`smū\u0303gis`, `smū\u0303giai`],
  [`smū\u0303gio`, `smū\u0303gių`],
  [`smū\u0303giui`, `smū\u0303giams smū\u0303giam`],
  [`smū\u0303gį`, `smūgiu\u0300s`],
  [`smūgiu\u0300`, `smū\u0303giais`],
  [`smū\u0303gyje smū\u0303gy`, `smū\u0303giuose smū\u0303giuos`],
  [`smū\u0303gi`, `smū\u0303giai`],
])
const ZMONAMUSYS = makeDeclinedFromArray([
  [`žmonamušy\u0303s`, `žmonamušiai\u0303`],
  [`žmona\u0303mušio`, `žmonamušių\u0303`],
  [`žmona\u0303mušiui`, `žmonamušia\u0301ms žmonamušia\u0301m`],
  [`žmona\u0303mušį`, `žmona\u0303mušius`],
  [`žmona\u0303mušiu`, `žmonamušiai\u0303s`],
  [
    `žmonamušyje\u0300 žmonamušy\u0303`,
    `žmonamušiuose\u0300 žmonamušiuo\u0303s`,
  ],
  [`žmonamušy\u0303`, `žmonamušiai\u0303`],
])
const VEPLYS = makeDeclinedFromArray([
  [`vėply\u0303s`, `vėpliai\u0303`],
  [`vė\u0303plio`, `vėplių\u0303`],
  [`vė\u0303pliui`, `vėplia\u0301ms vėplia\u0301m`],
  [`vė\u0303plį`, `vėpliu\u0300s`],
  [`vėpliu\u0300`, `vėpliai\u0303s`],
  [`vėplyje\u0300 vėply\u0303`, `vėpliuose\u0300 vėpliuo\u0303s`],
  [`vėply\u0303`, `vėpliai\u0303`],
])
const VAGIS = makeDeclinedFromArray([
  [`vagis`, `vagys`],
  [`vagies`, `vagių`],
  [`vagiui`, `vagims vagim`],
  [`vagį`, `vagis`],
  [`vagimi vagim`, `vagimis vagim`],
  [`vagyje vagy`, `vagyse`],
  [`vagie`, `vagys`],
])
const SMERTIS_MASC = makeDeclinedFromArray([
  [`smer\u0303tis`, `smer\u0303tys`],
  [`smer\u0303ties`, `smer\u0303čių`],
  [`smer\u0303čiui`, `smer\u0303tims smer\u0303tim`],
  [`smer\u0303tį`, `smerti\u0300s`],
  [`smer\u0303timi smer\u0303tim`, `smer\u0303timis smer\u0303tim`],
  [`smer\u0303tyje smer\u0303ty`, `smer\u0303tyse`],
  [`smer\u0303tie`, `smer\u0303tys`],
])
const ZVERIS = makeDeclinedFromArray([
  [`žvėri\u0300s`, `žvė\u0301rys`],
  [`žvėrie\u0303s`, `žvėrių\u0303`],
  [`žvė\u0301riui`, `žvėri\u0300ms žvėri\u0300m`],
  [`žvė\u0301rį`, `žvė\u0301ris`],
  [`žvėrimi\u0300 žvėrim\u0303`, `žvėrimi\u0300s žvėrim\u0303`],
  [`žvėryje\u0300 žvėry\u0303`, `žvėryse\u0300`],
  [`žvėrie\u0303`, `žvė\u0301rys`],
])
const SUNIS = makeDeclinedFromArray([
  [`šuni\u0300s`, `šu\u0300nys`],
  [`šunie\u0303s`, `šunių\u0303`],
  [`šu\u0300niui`, `šuni\u0300ms šuni\u0300m`],
  [`šu\u0300nį`, `šuni\u0300s`],
  [`šunimi\u0300 šunim\u0303`, `šunimi\u0300s šunim\u0303`],
  [`šunyje\u0300 šuny\u0303`, `šunyse\u0300`],
  [`šunie\u0303`, `šu\u0300nys`],
])
const LUSIS = makeDeclinedFromArray([
  [`lū\u0301šis`, `lū\u0301šys`],
  [`lū\u0301šies`, `lū\u0301šių`],
  [`lū\u0301šiai`, `lū\u0301šims lū\u0301šim`],
  [`lū\u0301šį`, `lū\u0301šis`],
  [`lū\u0301šimi lū\u0301šim`, `lū\u0301šimis lū\u0301šim`],
  [`lū\u0301šyje lū\u0301šy`, `lū\u0301šyse`],
  [`lū\u0301šie`, `lū\u0301šys`],
])
const SMERTIS_FEM = makeDeclinedFromArray([
  [`smer\u0303tis`, `smer\u0303tys`],
  [`smer\u0303ties`, `smer\u0303čių`],
  [`smer\u0303čiai`, `smer\u0303tims smer\u0303tim`],
  [`smer\u0303tį`, `smerti\u0300s`],
  [`smer\u0303timi smer\u0303tim`, `smer\u0303timis smer\u0303tim`],
  [`smer\u0303tyje smer\u0303ty`, `smer\u0303tyse`],
  [`smer\u0303tie`, `smer\u0303tys`],
])
const SIRDIS = makeDeclinedFromArray([
  [`širdi\u0300s`, `ši\u0300rdys`],
  [`širdie\u0303s`, `širdžių\u0303`],
  [`ši\u0300rdžiai`, `širdi\u0300ms širdi\u0300m`],
  [`ši\u0300rdį`, `ši\u0300rdis`],
  [`širdimi\u0300 širdim\u0303`, `širdimi\u0300s širdim\u0303`],
  [`širdyje\u0300 širdy\u0303`, `širdyse\u0300`],
  [`širdie\u0303`, `ši\u0300rdys`],
])
const VINIS = makeDeclinedFromArray([
  [`vini\u0300s`, `vi\u0300nys`],
  [`vinie\u0303s`, `vinių\u0303`],
  [`vi\u0300niai`, `vini\u0300ms vini\u0300m`],
  [`vi\u0300nį`, `vini\u0300s`],
  [`vinimi\u0300 vinim\u0303`, `vinimi\u0300s vinim\u0303`],
  [`vinyje\u0300 viny\u0303`, `vinyse\u0300`],
  [`vinie\u0303`, `vi\u0300nys`],
])
const APYNAUJIS = makeDeclinedFromArray([
  [`apy\u0301naujis`, `apy\u0301naujai`],
  [`apy\u0301naujo`, `apy\u0301naujų`],
  [`apy\u0301naujam`, `apy\u0301naujams apy\u0301naujam`],
  [`apy\u0301naujį`, `apy\u0301naujus`],
  [`apy\u0301nauju`, `apy\u0301naujais`],
  [`apy\u0301naujame apy\u0301naujam`, `apy\u0301naujuose apy\u0301naujuos`],
  [`apy\u0301nauji`, `apy\u0301naujai`],
])
const MEDINIS = makeDeclinedFromArray([
  [`medi\u0300nis`, `medi\u0300niai`],
  [`medi\u0300nio`, `medi\u0300nių`],
  [`medi\u0300niam`, `medi\u0300niams medi\u0300niam`],
  [`medi\u0300nį`, `mediniu\u0300s`],
  [`mediniu\u0300`, `medi\u0300niais`],
  [`medi\u0300niame medi\u0300niam`, `medi\u0300niuose medi\u0300niuos`],
  [`medi\u0300ni`, `medi\u0300niai`],
])
const AISKI = makeDeclinedFromArray([
  [`a\u0301iški`, `a\u0301iškios`],
  [`aiškio\u0303s`, `aiškių\u0303`],
  [`a\u0301iškiai`, `aiškio\u0301ms aiškio\u0301m`],
  [`a\u0301iškią`, `a\u0301iškias`],
  [`a\u0301iškia`, `aiškiomi\u0300s aiškio\u0303m`],
  [`aiškioje\u0300 aiškioj\u0303`, `aiškiose\u0300`],
  [`a\u0301iški`, `a\u0301iškios`],
])
const PRAVARTI = makeDeclinedFromArray([
  [`pravarti\u0300`, `pravar\u0303čios`],
  [`pravarčio\u0303s`, `pravarčių\u0303`],
  [`pravar\u0303čiai`, `pravarčio\u0301ms pravarčio\u0301m`],
  [`pravar\u0303čią`, `pravarčia\u0300s`],
  [`pravarčia\u0300`, `pravarčiomi\u0300s pravarčio\u0303m`],
  [`pravarčioje\u0300 pravarčioj\u0303`, `pravarčiose\u0300`],
  [`pravarti\u0300`, `pravar\u0303čios`],
])
const SOTI = makeDeclinedFromArray([
  [`soti`, `sočios`],
  [`sočios`, `sočių`],
  [`sočiai`, `sočioms sočiom`],
  [`sočią`, `sočias`],
  [`sočia`, `sočiomis sočiom`],
  [`sočioje sočioj`, `sočiose`],
  [`soti`, `sočios`],
])
const DIDELIS = makeDeclinedFromArray([
  ['di\u0300delis', 'dideli\u0300'],
  ['di\u0300delio', 'didelių\u0303'],
  ['didelia\u0301m', 'dideli\u0301ems dideli\u0301em'],
  ['di\u0300delį', 'di\u0300delius'],
  ['di\u0300deliu', 'dideliai\u0303s'],
  ['dideliame\u0300 dideliam\u0303', 'dideliuose\u0300 dideliuo\u0303s'],
  ['di\u0300deli', 'dideli\u0300'],
])
const KAIRYS = makeDeclinedFromArray([
  ['kairy\u0303s', 'kairi\u0300'],
  ['kai\u0303rio', 'kairių\u0303'],
  ['kairia\u0301m', 'kairi\u0301ems kairi\u0301em'],
  ['kai\u0303rį', 'kairiu\u0300s'],
  ['kairiu\u0300', 'kairiai\u0303s'],
  ['kairiame\u0300 kairiam\u0303', 'kairiuose\u0300 kairiuo\u0303s'],
  ['kairy\u0303', 'kairi\u0300'],
])
const DESINYS = makeDeclinedFromArray([
  ['dešiny\u0303s', 'dešini\u0300'],
  ['de\u0303šinio', 'dešinių\u0303'],
  ['dešinia\u0301m', 'dešini\u0301ems dešini\u0301em'],
  ['de\u0303šinį', 'de\u0303šinius'],
  ['de\u0303šiniu', 'dešiniai\u0303s'],
  ['dešiniame\u0300 dešiniam\u0303', 'dešiniuose\u0300 dešiniuo\u0303s'],
  ['dešiny\u0303', 'dešini\u0300'],
])
const PASKUTINIOJI = makeDeclinedFromArray([
  ['paskutinióji', 'paskutìniosios'],
  ['paskutiniõsios', 'paskutinių̃jų'],
  ['paskutìniajai', 'paskutiniósioms paskutiniósiom'],
  ['paskutìniąją', 'paskutinią́sias'],
  ['paskutinią́ja', 'paskutiniõsiomis paskutiniõsiom'],
  ['paskutiniõjoje paskutiniõjoj', 'paskutiniõsiose'],
  ['paskutinióji', 'paskutìniosios'],
])
const DESINYSIS = makeDeclinedFromArray([
  ['dešinỹsis', 'dešiníeji'],
  ['dẽšiniojo', 'dešinių̃jų'],
  ['dešiniájam', 'dešiníesiems dešiníesiem'],
  ['dẽšinįjį', 'dešiniúosius'],
  ['dešiniúoju', 'dešiniaĩsiais'],
  ['dešiniãjame dešiniãjam', 'dešiniuõsiuose dešiniuõsiuos'],
  ['dešinỹsis', 'dešiníeji'],
])
const DARANTIS = makeDeclinedFromArray([
  ['dãrantis', 'dãrantys'],
  ['dãrančio', 'dãrančių'],
  ['dãrančiam', 'dãrantiems dãrantiem'],
  ['dãrantį', 'dãrančius'],
  ['dãrančiu', 'dãrančiais'],
  ['dãrančiame dãrančiam', 'dãrančiuose dãrančiuos'],
  ['dãrantis', 'dãrantys'],
])

describe('Decliners', () => {
  const { assertSpies } = checkUsedExports(decliners)
  describe('us decliner', () => {
    it('correctly declines žmogus', () => {
      expect(
        decliners.ZMOGUS,
      ).toMatchObject(ZMOGUS)
    })
    it('declines 1st accentuation -us adjective', () => {
      expect(decliners.UsAdjectiveDecliner.inflectStatic(`ly\u0301g`))
        .toMatchObject(LYGUS)
    })
    it('declines 3rd accentuation -us adjective', () => {
      expect(decliners.UsAdjectiveDecliner.inflectDynamic(`priekab`, 'a'))
        .toMatchObject(PRIEKABUS)
    })
    it('declines 4th accentuation -us adjective', () => {
      expect(decliners.UsAdjectiveDecliner.inflectDynamic(`stat`, '4'))
        .toMatchObject(STATUS)
    })
    it('declines immobile -us pronominal adjective', () => {
      expect(decliners.UsPronominalDecliner.inflectStatic(`ly\u0301g`))
        .toMatchObject(LYGUSIS)
    })
    it('declines mobile -us pronominal adjective', () => {
      expect(decliners.UsPronominalDecliner.inflectDynamic(`stat`, '4'))
        .toMatchObject(STATUSIS)
    })

    it('declines 1st accentuation -us noun', () => {
      expect(decliners.UsNounDecliner.inflectStatic(`sū\u0301n`))
        .toMatchObject(SUNUS_I)
    })
    it('declines 2nd accentuation -us noun', () => {
      expect(decliners.UsNounDecliner.inflectStatic(`tur\u0303g`))
        .toMatchObject(TURGUS)
    })
    it('declines 3rd accentuation -us noun', () => {
      expect(decliners.UsNounDecliner.inflectDynamic(`sūn`, '3'))
        .toMatchObject(SUNUS_III)
    })
    it('declines 4th accentuation -us noun', () => {
      expect(decliners.UsNounDecliner.inflectDynamic(`med`, '4'))
        .toMatchObject(MEDUS)
    })
    it('declines 1st accentuation -[i/j]us noun', () => {
      expect(decliners.IusNounDecliner.inflectStatic(`Izi\u0300dor`))
        .toMatchObject(IZIDORIUS)
    })
    it('declines 2nd accentuation -[i/j]us noun', () => {
      expect(decliners.IusNounDecliner.inflectStatic(`be\u0300zdž`))
        .toMatchObject(BEZDZIUS)
    })
    it('declines 3rd accentuation -[i/j]us noun', () => {
      expect(decliners.IusNounDecliner.inflectDynamic(`vėj`, '3'))
        .toMatchObject(VEJUS)
    })
    it('declines 4th accentuation -[i/j]us noun', () => {
      expect(decliners.IusNounDecliner.inflectDynamic(`raj`, '4'))
        .toMatchObject(RAJUS)
    })
  })

  describe('a decliner', () => {
    it('declines 1st accentuation nominal', () => {
      expect(decliners.ANounDecliner.inflectStatic(`va\u0301rn`))
        .toMatchObject(VARNA)
    })
    it('declines 2nd accentuation nominal', () => {
      expect(decliners.ANounDecliner.inflectStatic(`rank`, '2b'))
        .toMatchObject(RANKA)
    })
    it('declines 3rd B accentuation noun', () => {
      expect(decliners.ANounDecliner.inflectDynamic(`atram`, 'b'))
        .toMatchObject(ATRAMA)
    })
    it('declines 4th accentuation noun', () => {
      expect(decliners.ANounDecliner.inflectDynamic(`klaid`, '4'))
        .toMatchObject(KLAIDA)
    })
    it('declines 2nd accentuation -ia noun', () => {
      expect(decliners.IaNounDecliner.inflectStatic(`val`, '2b'))
        .toMatchObject(VALIA)
    })
    it('declines 4th accentuation -ia noun', () => {
      expect(decliners.IaNounDecliner.inflectDynamic(`vald`, '4'))
        .toMatchObject(VALDZIA)
    })
    it('declines 1s accentuation adjective', () => {
      expect(decliners.AAdjectiveDecliner.inflectStatic(`juod`))
        .toMatchObject(stripAllAccentsFromParadigm(JUODA))
    })
    it('declines 3rd accentuation adjective', () => {
      expect(decliners.AAdjectiveDecliner.inflectDynamic(`ju\u0301od`))
        .toMatchObject(JUODA)
    })
    it('declines 4th accentuation adjective', () => {
      expect(decliners.AAdjectiveDecliner.inflectDynamic(`tikr`, '4'))
        .toMatchObject(TIKRA)
    })
    it('declines 4th accentuation pronominal adjective', () => {
      expect(decliners.APronominalDecliner.inflectDynamic(`tikr`, '4'))
        .toMatchObject(TIKROJI)
    })
    it('declines 1st accentuation pronominal adjective', () => {
      expect(decliners.APronominalDecliner.inflectStatic(`pala\u0301imint`))
        .toMatchObject(PALAIMINTOJI)
    })
  })

  describe('e decliner', () => {
    it('declines 1st accentuation nominal', () => {
      expect(decliners.EDecliner.inflectStatic(`bu\u0300lv`))
        .toMatchObject(BULVE)
    })
    it('declines 2nd accentuation nominal', () => {
      expect(decliners.EDecliner.inflectStatic(`žva\u0303k`))
        .toMatchObject(ZVAKE)
    })
    it('declines 3rd accentuation nominal', () => {
      expect(decliners.EDecliner.inflectDynamic(`gerkl`, '3'))
        .toMatchObject(GERKLE)
    })
    it('declines 4th accentuation nominal', () => {
      expect(decliners.EDecliner.inflectDynamic(`lėl`, '4'))
        .toMatchObject(LELE)
    })
  })

  describe('uo decliner', () => {
    it('declines 1st accentuation nominal', () => {
      expect(decliners.UoDecliner.inflectStatic(`akm`))
        .toMatchObject(stripAllAccentsFromParadigm(AKMUO))
    })
    it('declines 3b accentuation nominal', () => {
      expect(decliners.UoDecliner.inflectDynamic(`akm`, '2b'))
        .toMatchObject(AKMUO)
    })
  })

  describe('as decliner', () => {
    it('declines reflexive noun', () => {
      expect(decliners.AsReflexiveDecliner.inflectStatic(`kreipi\u0300m`))
        .toMatchObject(KREIPIMASIS)
      expect(() =>
        decliners.AsReflexiveDecliner.inflectDynamic(`kreipi\u0300m`)
      )
        .toThrow(notAttestedInLanguageError)
    })
    it('declines 1st accentuation noun', () => {
      expect(decliners.AsNounDecliner.inflectStatic(`vy\u0301r`))
        .toMatchObject(VYRAS)
    })
    it('declines 2nd accentuation noun', () => {
      expect(decliners.AsNounDecliner.inflectStatic(`ra\u0303t`))
        .toMatchObject(RATAS)
    })
    it('declines 3rd accentuation noun', () => {
      expect(decliners.AsNounDecliner.inflectDynamic(`la\u0301ng`))
        .toMatchObject(LANGAS)
    })
    it('declines 4th accentuation noun', () => {
      expect(decliners.AsNounDecliner.inflectDynamic(`na\u0303m`))
        .toMatchObject(NAMAS)
    })
    it('declines 1st accentuation bisyllabic noun', () => {
      expect(decliners.JasBisyllabicNounDecliner.inflectStatic(`vė\u0301j`))
        .toMatchObject(VEJAS)
    })
    it('declines 2nd accentuation bisyllabic noun', () => {
      expect(decliners.JasBisyllabicNounDecliner.inflectStatic(`gė\u0303j`))
        .toMatchObject(GEJAS)
    })
    it('declines 3rd accentuation bisyllabic noun', () => {
      expect(decliners.JasBisyllabicNounDecliner.inflectDynamic(`sė\u0301j`))
        .toMatchObject(SEJAS)
    })
    it('declines 4th accentuation bisyllabic noun', () => {
      expect(decliners.JasBisyllabicNounDecliner.inflectDynamic(`krau\u0303j`))
        .toMatchObject(KRAUJAS)
    })
    it('declines 1st accentuation polysyllabic noun', () => {
      expect(
        decliners.JasPolysyllabicNounsDecliner.inflectStatic(`virė\u0301j`),
      )
        .toMatchObject(VIREJAS_I)
    })
    it('declines 2nd accentuation polysyllabic noun', () => {
      expect(
        decliners.JasPolysyllabicNounsDecliner.inflectStatic(`virė\u0303j`),
      )
        .toMatchObject(VIREJAS_II)
    })
    it('declines 3rd accentuation polysyllabic noun', () => {
      expect(
        decliners.JasPolysyllabicNounsDecliner.inflectDynamic(`virė\u0301j`),
      )
        .toMatchObject(VIREJAS_III)
    })
    it('declines 4th accentuation polysyllabic noun', () => {
      expect(
        decliners.JasPolysyllabicNounsDecliner.inflectDynamic(`virė\u0303j`),
      )
        .toMatchObject(VIREJAS_IV)
    })
    it('declines 1st accentuation -ias noun', () => {
      expect(decliners.IasNounDecliner.inflectStatic(`e\u0301ln`))
        .toMatchObject(ELNIAS)
    })
    it('declines 2nd accentuation -ias noun', () => {
      expect(decliners.IasNounDecliner.inflectStatic(`ke\u0303l`))
        .toMatchObject(KELIAS_II)
    })
    it('declines 3rd accentuation -ias noun', () => {
      expect(decliners.IasNounDecliner.inflectDynamic(`ve\u0301ln`))
        .toMatchObject(VELNIAS)
    })
    it('declines 4th accentuation -ias noun', () => {
      expect(decliners.IasNounDecliner.inflectDynamic(`ke\u0303l`))
        .toMatchObject(KELIAS_IV)
    })
    it('declines 1st accentuation -as adjective', () => {
      expect(decliners.AsAdjectiveDecliner.inflectStatic(`ilgo\u0301k`))
        .toMatchObject(ILGOKAS)
    })
    it('declines 3rd accentuation -as adjective', () => {
      expect(decliners.AsAdjectiveDecliner.inflectDynamic(`sto\u0301r`))
        .toMatchObject(STORAS)
    })
    it('declines 4th accentuation -as adjective', () => {
      expect(decliners.AsAdjectiveDecliner.inflectDynamic(`ma\u0303ž`))
        .toMatchObject(MAZAS)
    })
    it('declines 1st accentuation -ias adjective', () => {
      expect(decliners.IasAdjectiveDecliner.inflectStatic(`pė\u0301st`))
        .toMatchObject(PESCIAS)
    })
    it('declines 3rd accentuation -ias adjective', () => {
      expect(decliners.IasAdjectiveDecliner.inflectDynamic(`plo\u0301kšt`))
        .toMatchObject(PLOKSCIAS)
    })
    it('declines 4th accentuation -ias adjective', () => {
      expect(decliners.IasAdjectiveDecliner.inflectDynamic(`sta\u0303t`))
        .toMatchObject(STACIAS)
    })
    it('declines immobile pronominal -as adjective', () => {
      expect(decliners.AsPronominalDecliner.inflectStatic(`ger`))
        .toMatchObject(stripAllAccentsFromParadigm(GERASIS_4))
    })
    it('declines 4th accentuation pronominal -as adjective', () => {
      expect(decliners.AsPronominalDecliner.inflectDynamic(`ge\u0303r`))
        .toMatchObject(GERASIS_4)
    })
    it('declines immobile pronominal -ias adjective', () => {
      expect(decliners.IasPronominalDecliner.inflectStatic(`pėst`))
        .toMatchObject(stripAllAccentsFromParadigm(PESCIASIS_3))
    })
    it('declines 3rd accentuation pronominal -ias adjective', () => {
      expect(decliners.IasPronominalDecliner.inflectDynamic(`pė\u0301st`))
        .toMatchObject(PESCIASIS_3)
    })
  })

  describe('is decliner', () => {
    it('declines 1st accentuation -io noun', () => {
      expect(decliners.IsMasculineNounDecliner.inflectStatic(`kū\u0301j`))
        .toMatchObject(KUJIS)
    })
    it('declines 2nd accentuation -io noun', () => {
      expect(decliners.IsMasculineNounDecliner.inflectStatic(`smū\u0303g`))
        .toMatchObject(SMUGIS)
    })
    it('declines 3rd accentuation -io noun', () => {
      expect(decliners.IsMasculineNounDecliner.inflectDynamic(`žmonamuš`, '3b'))
        .toMatchObject(ZMONAMUSYS)
    })
    it('declines 4th accentuation -io noun', () => {
      expect(decliners.IsMasculineNounDecliner.inflectDynamic(`vėpl`, '4'))
        .toMatchObject(VEPLYS)
    })
    it('declines unaccented -ys noun', () => {
      expect(decliners.YsMasculineNounDecliner.inflectStatic(`vėpl`))
        .toMatchObject(stripAllAccentsFromParadigm(VEPLYS))
    })
    it('declines 4th accentuation -ys noun', () => {
      expect(decliners.YsMasculineNounDecliner.inflectDynamic(`vėpl`, '4'))
        .toMatchObject(VEPLYS)
    })
    it('declines 1st accentuation masculine -ies noun', () => {
      expect(decliners.IesMasculineNounDecliner.inflectStatic(`vag`))
        .toMatchObject(VAGIS)
    })
    it('declines 2nd accentuation masculine -ies noun', () => {
      expect(decliners.IesMasculineNounDecliner.inflectStatic(`smer\u0303t`))
        .toMatchObject(SMERTIS_MASC)
    })
    it('declines 3rd accentuation masculine -ies noun', () => {
      expect(decliners.IesMasculineNounDecliner.inflectDynamic(`žvėr`, '3'))
        .toMatchObject(ZVERIS)
    })
    it('declines 4th accentuation masculine -ies noun', () => {
      expect(decliners.IesMasculineNounDecliner.inflectDynamic(`šun`, '4'))
        .toMatchObject(SUNIS)
    })
    it('declines 1st accentuation feminine -ies noun', () => {
      expect(decliners.IsFeminineNounDecliner.inflectStatic(`lū\u0301š`))
        .toMatchObject(LUSIS)
    })
    it('declines 2nd accentuation feminine -ies noun', () => {
      expect(decliners.IsFeminineNounDecliner.inflectStatic(`smer\u0303t`))
        .toMatchObject(SMERTIS_FEM)
    })
    it('declines 3rd accentuation feminine -ies noun', () => {
      expect(decliners.IsFeminineNounDecliner.inflectDynamic(`šird`, '3'))
        .toMatchObject(SIRDIS)
    })
    it('declines 4th accentuation feminine -ies noun', () => {
      expect(decliners.IsFeminineNounDecliner.inflectDynamic(`vin`, '4'))
        .toMatchObject(VINIS)
    })
    it('declines 1st accentuation masculine adjective', () => {
      expect(
        decliners.IsRelationalAdjectiveDecliner.inflectStatic(`apy\u0301nauj`),
      )
        .toMatchObject(APYNAUJIS)
    })
    it('declines 2nd accentuation relational masculine adjective', () => {
      expect(
        decliners.IsRelationalAdjectiveDecliner.inflectStatic(`medi\u0300n`),
      )
        .toMatchObject(MEDINIS)
    })
    it('throws error on dynamic relational masculine adjective', () => {
      expect(() =>
        decliners.IsRelationalAdjectiveDecliner.inflectDynamic(`medi\u0300n`)
      ).toThrow(notAttestedInLanguageError)
    })
    it('declines 3rd accentuation -is masculine adjective', () => {
      expect(
        decliners.IsMasculineAdjectiveDecliner.inflectDynamic(`di\u0300del`),
      )
        .toMatchObject(DIDELIS)
    })
    it('declines unaccneted -is masculine adjective', () => {
      expect(
        decliners.IsMasculineAdjectiveDecliner.inflectStatic(`didel`),
      )
        .toMatchObject(stripAllAccentsFromParadigm(DIDELIS))
    })
    it('declines 3rd accentuation -ys masculine adjective', () => {
      expect(
        decliners.YsMasculineAdjectiveDecliner.inflectDynamic(`dešin`, '3b'),
      )
        .toMatchObject(DESINYS)
    })
    it('declines 4th accentuation -ys masculine adjective', () => {
      expect(decliners.YsMasculineAdjectiveDecliner.inflectDynamic(`kair`, '4'))
        .toMatchObject(KAIRYS)
    })
    it('declines unaccented -ys masculine adjective', () => {
      expect(decliners.YsMasculineAdjectiveDecliner.inflectStatic(`kair`))
        .toMatchObject(stripAllAccentsFromParadigm(KAIRYS))
    })
    it('declines feminine adjective', () => {
      expect(decliners.IsFeminineAdjectiveDecliner.inflectStatic(`sot`))
        .toMatchObject(SOTI)
    })
    it('declines 3rd accentuation feminine adjective', () => {
      expect(decliners.IsFeminineAdjectiveDecliner.inflectDynamic(`aišk`, '3'))
        .toMatchObject(AISKI)
    })
    it('declines 4th accentuation feminine adjective', () => {
      expect(
        decliners.IsFeminineAdjectiveDecliner.inflectDynamic(`pravart`, '4'),
      )
        .toMatchObject(PRAVARTI)
    })
    it('declines 4th accentuation feminine pronominal adjective', () => {
      expect(
        decliners.IsFemininePronominalDecliner.inflectDynamic(`paskutin`, {
          isAcute: false,
          syllable: 2,
        }),
      )
        .toMatchObject(PASKUTINIOJI)
    })
    it('declines unaccented  feminine pronominal adjective', () => {
      expect(
        decliners.IsFemininePronominalDecliner.inflectStatic(`paskutin`),
      )
        .toMatchObject(stripAllAccentsFromParadigm(PASKUTINIOJI))
    })
    it('declines mobile masculine pronominal adjective', () => {
      expect(
        decliners.IsMasculinePronominalDecliner.inflectDynamic(`dešin`, '3b'),
      )
        .toMatchObject(DESINYSIS)
    })
    it('declines immobile masculine pronominal adjective', () => {
      expect(decliners.IsMasculinePronominalDecliner.inflectStatic(`dešin`))
        .toMatchObject(stripAllAccentsFromParadigm(DESINYSIS))
    })
    it('declines active participle', () => {
      expect(
        decliners.IsMasculineParticipleDecliner.inflectStatic(`da\u0303rant`),
      )
        .toMatchObject(DARANTIS)
    })
    it('throws error for dynamic participle', () => {
      expect(() =>
        decliners.IsMasculineParticipleDecliner.inflectDynamic(`da\u0303rant`)
      ).toThrow(notAttestedInLanguageError)
    })
  })

  assertSpies()
})
