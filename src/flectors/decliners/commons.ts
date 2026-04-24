import AccentedInflector, { palataliseParadigm } from './AccentedInflector.ts'
import type { AccentuatedDeclinedType, DeclinedType } from '~src/types.ts'
import { stripAllAccentsFromParadigm } from '~src/utils.ts'

const bisyllabic = { sgLoc: [`yje`, `uje`, 'y', 'uj'], sgVoc: [`au`] }
const polysyllabic = { sgLoc: [[`uje`], [`uj`]], sgVoc: [`au`] }

const asNounsStatic: AccentuatedDeclinedType = {
  sgNom: [`as`],
  sgGen: [`o`],
  sgDat: [`ui`],
  sgAcc: [`ą`],
  sgInst: [[`u`, `u\u0300`]],
  sgLoc: [[`e`, `e\u0300`]],
  sgVoc: [[`e`]],
  plNom: [`ai`],
  plGen: [`ų`],
  plDat: [[`ams`], [`am`]],
  plAcc: [[`us`, `u\u0300s`]],
  plInst: [`ais`],
  plLoc: [[`uose`], [`uos`]],
  plVoc: [[`ai`]],
}
const asNounsDynamic: AccentuatedDeclinedType = {
  ...asNounsStatic,
  sgLoc: [`e\u0300`],
  plNom: [`ai\u0303`],
  plGen: [`ų\u0303`],
  plDat: [[`a\u0301ms`], [`a\u0301m`]],
  plAcc: [[`us`, `u\u0300s`]],
  plInst: [`ai\u0303s`],
  plLoc: [[`uose\u0300`], [`uo\u0303s`]],
  plVoc: [[`ai\u0303`]],
}
const asAdjectiveStatic: AccentuatedDeclinedType = {
  ...asNounsStatic,
  sgDat: [[`am`]],
  sgLoc: [[`ame`], [`am`]],
  sgVoc: [[`as`]],
  plNom: [[`i`, `i\u0300`]],
  plDat: [[`iems`, `i\u0301ems`], [`iem`, `i\u0301em`]],
  plVoc: [[`i`, `i\u0300`]],
}
const asAdjectiveDynamic: AccentuatedDeclinedType = {
  ...asNounsDynamic,
  sgDat: [[`a\u0301m`]],
  sgLoc: [[`ame\u0300`], [`am\u0303`]],
  sgVoc: [[`as`]],
  plNom: [[`i\u0300`]],
  plDat: [[`i\u0301ems`], [`i\u0301em`]],
  plVoc: [[`i\u0300`]],
}
const asReflexiveStatic: AccentuatedDeclinedType = {
  sgNom: [`asis`],
  sgGen: [`osi`],
  sgDat: [`uisi`],
  sgAcc: [`ąsi`],
  sgInst: [[`usi`]],
  sgLoc: [[`esi`]],
  sgVoc: [[`esi`]],
  plNom: [`aisi`],
  plGen: [`ųsi`],
  plDat: [[`amsi`]],
  plAcc: [[`usis`]],
  plInst: [`aisi`],
  plLoc: [[`uosesi`]],
  plVoc: [[`aisi`]],
}
const jasNounsBisyllabicStatic: AccentuatedDeclinedType = {
  ...asNounsStatic,
  ...bisyllabic,
}
const jasNounsBisyllabicDynamic: AccentuatedDeclinedType = {
  ...asNounsDynamic,
  ...bisyllabic,
}
//@ts-ignore good
const jasNounsPolysyllabicStatic: AccentuatedDeclinedType = {
  ...asNounsStatic,
  ...polysyllabic,
}
//@ts-ignore good
const jasNounsPolysyllabicDynamic: AccentuatedDeclinedType = {
  ...asNounsDynamic,
  ...polysyllabic,
}
const iasNounsStatic: AccentuatedDeclinedType = {
  ...palataliseParadigm(asNounsStatic),
  sgLoc: [`yje`, `y`],
  sgVoc: [`i`, `iau`],
}
const iasNounsDynamic: AccentuatedDeclinedType = {
  ...palataliseParadigm(asNounsDynamic),
  sgLoc: [`yje\u0300`, `y\u0303`],
  sgVoc: [`y\u0303`],
}
const iasAdjectiveStatic: AccentuatedDeclinedType = {
  ...palataliseParadigm(asAdjectiveStatic),
}
const iasAdjectiveDynamic: AccentuatedDeclinedType = {
  ...palataliseParadigm(asAdjectiveDynamic),
}
const asPronominalDynamic: AccentuatedDeclinedType = {
  sgNom: [`a\u0300sis`],
  sgGen: [`ojo`],
  sgDat: [`a\u0301jam`],
  sgAcc: [`ąjį`],
  sgInst: [[`u\u0301oju`]],
  sgLoc: [[`a\u0303jame`], [`a\u0303jam`]],
  sgVoc: [[`a\u0300sis`]],
  plNom: [`i\u0301eji`],
  plGen: [`ų\u0303jų`],
  plDat: [[`i\u0301esiems`], [`i\u0301esiem`]],
  plAcc: [[`u\u0301osius`]],
  plInst: [`ai\u0303siais`],
  plLoc: [[`uo\u0303siuose`], [`uo\u0303siuos`]],
  plVoc: [[`i\u0301eji`]],
}
const asPronominalStatic: AccentuatedDeclinedType = {
  ...stripAllAccentsFromParadigm(asPronominalDynamic),
  sgInst: [[`uoju`, `u\u0301oju`]],
  plNom: [[`ieji`, `i\u0301eji`]],
  plDat: [[`iesiems`, `i\u0301esiems`], [`iesiem`, `i\u0301esiem`]],
  plAcc: [[`uosius`, `u\u0301osius`]],
  plVoc: [[`ieji`, `i\u0301eji`]],
}
const eStatic: AccentuatedDeclinedType = {
  sgNom: [`ė`],
  sgGen: [`ės`],
  sgDat: [`ei`],
  sgAcc: [`ę`],
  sgInst: [[`e`, `e\u0300`]],
  sgLoc: [[`ėje`], [`ėj`]],
  sgVoc: [`e`],
  plNom: [`ės`],
  plGen: [`ių`],
  plDat: [[`ėms`], [`ėm`]],
  plAcc: [[`es`, `e\u0300s`]],
  plInst: [[`ėmis`], [`ėm`]],
  plLoc: [`ėse`],
  plVoc: [`ės`],
}
const eDynamic: AccentuatedDeclinedType = {
  ...eStatic,
  sgNom: [`ė\u0303`],
  sgGen: [`ė\u0303s`],
  sgLoc: [[`ėje\u0300`], [`ėj\u0303`]],
  plGen: [`ių\u0303`],
  plDat: [[`ė\u0301ms`], [`ė\u0301m`]],
  plInst: [[`ėmi\u0300s`], [`ė\u0303m`]],
  plLoc: [`ėse\u0300`],
}
const aNounStatic: AccentuatedDeclinedType = {
  sgNom: [[`a`, `a\u0300`]],
  sgGen: [`os`],
  sgDat: [`ai`],
  sgAcc: [`ą`],
  sgInst: [[`a`, `a\u0300`]],
  sgLoc: [[`oje`], [`oj`]],
  sgVoc: [`a`],
  plNom: [`os`],
  plGen: [`ų`],
  plDat: [[`oms`], [`om`]],
  plAcc: [[`as`, `a\u0300s`]],
  plInst: [[`omis`], [`om`]],
  plLoc: [`ose`],
  plVoc: [`os`],
}
const aNounDynamic: AccentuatedDeclinedType = {
  ...aNounStatic,
  sgNom: [`a\u0300`],
  sgGen: [`o\u0303s`],
  sgLoc: [[`oje\u0300`], [`o\u0303j`]],
  plGen: [`ų\u0303`],
  plDat: [[`o\u0301ms`], [`o\u0301m`]],
  plInst: [[`omi\u0300s`], [`o\u0303m`]],
  plLoc: [`ose\u0300`],
}
const iaNounStatic: AccentuatedDeclinedType = palataliseParadigm(aNounStatic)
const iaNounDynamic: AccentuatedDeclinedType = palataliseParadigm(aNounDynamic)
const aAdjectiveStatic: AccentuatedDeclinedType = {
  ...aNounStatic,
  sgVoc: [`a`],
}
const aAdjectiveDynamic: AccentuatedDeclinedType = {
  ...aNounDynamic,
  sgVoc: [`a\u0300`],
}
const aPronominalDynamic: AccentuatedDeclinedType = {
  sgNom: [`o\u0301ji`],
  sgGen: [`o\u0303sios`],
  sgDat: [`ajai`],
  sgAcc: [`ąją`],
  sgInst: [[`ą\u0301ja`]],
  sgLoc: [[`o\u0303joje`], [`o\u0303joj`]],
  sgVoc: [`o\u0301ji`],
  plNom: [`osios`],
  plGen: [`ų\u0303jų`],
  plDat: [[`o\u0301sioms`], [`o\u0301siom`]],
  plAcc: [[`ą\u0301sias`]],
  plInst: [[`o\u0303siomis`], [`o\u0303siom`]],
  plLoc: [[`o\u0303siose`]],
  plVoc: [[`osios`]],
}
const aPronominalStatic: AccentuatedDeclinedType = {
  ...stripAllAccentsFromParadigm(aPronominalDynamic),
  sgNom: [[`oji`, `o\u0301ji`]],
  sgInst: [[`ąja`, `ą\u0301ja`]],
  sgVoc: [[`oji`, `o\u0301ji`]],
  plDat: [[`osioms`, `o\u0301sioms`], [`osiom`, `o\u0301siom`]],
  plAcc: [[`ąsias`, `ą\u0301sias`]],
}
const uoDynamic: AccentuatedDeclinedType = {
  sgNom: [`uo\u0303`],
  sgGen: [`en\u0303s`, `enio`],
  sgDat: [`eniui`],
  sgAcc: [`enį`],
  sgInst: [`eniu`],
  sgLoc: [`enyje\u0300`, `eny\u0303`],
  sgVoc: [`enie\u0303`],
  plNom: [`enys`],
  plGen: [`enų\u0303`],
  plDat: [`eni\u0300ms`, `eni\u0300m`],
  plAcc: [`enis`],
  plInst: [`enimi\u0300s`, `enim\u0303`],
  plLoc: [`enyse\u0300`],
  plVoc: [`enys`],
}
const uoStatic: AccentuatedDeclinedType = stripAllAccentsFromParadigm(uoDynamic)
const usNounStatic: AccentuatedDeclinedType = {
  sgNom: [`us`],
  sgGen: [`aus`],
  sgDat: [`ui`],
  sgAcc: [`ų`],
  sgInst: [[`umi`], [`um`]],
  sgLoc: [[`uje`], [`uj`]],
  sgVoc: [`au`],
  plNom: [`ūs`],
  plGen: [`ų`],
  plDat: [[`ums`], [`um`]],
  plAcc: [[`us`, `u\u0300s`]],
  plInst: [`umis`],
  plLoc: [[`uose`], [`uos`]],
  plVoc: [`ūs`],
}
const usNounDynamic: AccentuatedDeclinedType = {
  ...usNounStatic,
  sgNom: [`u\u0300s`],
  sgGen: [`au\u0303s`],
  sgInst: [[`umi\u0300`], [`um\u0303`]],
  sgLoc: [[`uje\u0300`], [`uj\u0303`]],
  sgVoc: [`au\u0303`],
  plGen: [`ų\u0303`],
  plDat: [[`u\u0300ms`], [`u\u0300m`]],
  plInst: [`umi\u0300s`],
  plLoc: [[`uose\u0300`], [`uo\u0303s`]],
}
const iusNounStatic: AccentuatedDeclinedType = {
  ...palataliseParadigm(asNounsStatic),
  //@ts-ignore all good
  ...pickSingularSingular(palataliseParadigm(usNounStatic)),
}
const iusNounDynamic: AccentuatedDeclinedType = {
  ...palataliseParadigm(asNounsDynamic),
  //@ts-ignore all good
  ...pickSingularSingular(palataliseParadigm(usNounDynamic)),
}
const usAdjectiveDynamic: AccentuatedDeclinedType = {
  sgNom: [`u\u0300s`],
  sgGen: [`au\u0303s`],
  sgDat: [`ia\u0301m`],
  sgAcc: [`ų`],
  sgInst: [[`iu`, `iu\u0300`]],
  sgLoc: [[`iame\u0300`], [`iam\u0303`]],
  sgVoc: [`u\u0300s`],
  plNom: [`ūs`],
  plGen: [`ių\u0303`],
  plDat: [[`i\u0301ems`], [`i\u0301em`]],
  plAcc: [[`ius`, `iu\u0300s`]],
  plInst: [`iai\u0303s`],
  plLoc: [[`iuose\u0300`], [`iuo\u0303s`]],
  plVoc: [`ūs`],
}
const usAdjectiveStatic: AccentuatedDeclinedType = {
  ...stripAllAccentsFromParadigm(usAdjectiveDynamic),
  sgInst: [[`iu`, `iu\u0300`]],
  plAcc: [[`ius`, `iu\u0300s`]],
}
const usPronominalStatic: AccentuatedDeclinedType = {
  ...palataliseParadigm(asPronominalStatic),
  sgNom: [`usis`],
  sgAcc: [`ųjį`],
  sgVoc: [`usis`],
}
const usPronominalDynamic: AccentuatedDeclinedType = {
  ...palataliseParadigm(asPronominalDynamic),
  sgNom: [`u\u0300sis`],
  sgAcc: [`ųjį`],
  sgVoc: [`u\u0300sis`],
}
const ioNounDynamic: AccentuatedDeclinedType = {
  sgNom: [`y\u0303s`],
  sgGen: [`io`],
  sgDat: [`iui`],
  sgAcc: [`į`],
  sgInst: [[`iu`, `iu\u0300`]],
  sgLoc: [[`yje\u0300`], [`y\u0303`]],
  sgVoc: [`y\u0303`],
  plNom: [`iai\u0303`],
  plGen: [`ių\u0303`],
  plDat: [`ia\u0301ms`, `ia\u0301m`],
  plAcc: [[`ius`, `iu\u0300s`]],
  plInst: [`iai\u0303s`],
  plLoc: [[`iuose\u0300`], [`iuo\u0303s`]],
  plVoc: [`iai\u0303`],
}
const ioNounStatic: AccentuatedDeclinedType = {
  ...stripAllAccentsFromParadigm(ioNounDynamic),
  sgNom: [`is`],
  sgVoc: [`i`],
  sgInst: [[`iu`, `iu\u0300`]],
  plAcc: [[`ius`, `iu\u0300s`]],
}
const iesNounDynamic: AccentuatedDeclinedType = {
  ...ioNounDynamic,
  sgNom: [`i\u0300s`],
  sgGen: [`ie\u0303s`],
  sgInst: [[`imi\u0300`], [`im\u0303`]],
  sgVoc: [`ie\u0303`],
  plNom: [`ys`],
  plDat: [[`i\u0300ms`], [`i\u0300m`]],
  plAcc: [[`is`, `i\u0300s`]],
  plInst: [[`imi\u0300s`], [`im\u0303`]],
  plLoc: [`yse\u0300`],
  plVoc: [`ys`],
}
const iesNounStatic: AccentuatedDeclinedType = {
  ...stripAllAccentsFromParadigm(iesNounDynamic),
  plAcc: [[`is`, `i\u0300s`]],
}
const isFeminineNounStatic: AccentuatedDeclinedType = {
  ...iesNounStatic,
  sgDat: [`iai`],
}
const isFeminineNounDynamic: AccentuatedDeclinedType = {
  ...iesNounDynamic,
  sgDat: [`iai`],
}
const isFeminineAdjectiveStatic: AccentuatedDeclinedType = {
  ...palataliseParadigm(aAdjectiveStatic),
  sgNom: [[`i`, `i\u0300`]],
  sgVoc: [[`i`, `i\u0300`]],
}
const isFeminineAdjectiveDynamic: AccentuatedDeclinedType = {
  ...palataliseParadigm(aAdjectiveDynamic),
  sgNom: [[`i`, `i\u0300`]],
  sgVoc: [[`i`, `i\u0300`]],
}
const isMasculinePronominalStatic: AccentuatedDeclinedType = {
  ...palataliseParadigm(asPronominalStatic),
  sgNom: [`ysis`],
  sgAcc: [`įjį`],
  sgVoc: [`ysis`],
}
const isMasculinePronominalDynamic: AccentuatedDeclinedType = {
  ...palataliseParadigm(asPronominalDynamic),
  sgNom: [`y\u0303sis`],
  sgAcc: [`įjį`],
  sgVoc: [`y\u0303sis`],
}
const isMasculineRelationalStatic: AccentuatedDeclinedType = {
  ...palataliseParadigm(asNounsStatic),
  ...pickSingularSingular(palataliseParadigm(asAdjectiveStatic)),
  sgNom: [[`is`]],
  sgAcc: [[`į`]],
  sgVoc: [[`i`]],
}
const isMasculineRelationalDynamic: AccentuatedDeclinedType = {
  ...palataliseParadigm(asNounsDynamic),
  ...pickSingularSingular(palataliseParadigm(asAdjectiveDynamic)),
  sgNom: [[`is`]],
  sgAcc: [[`į`]],
  sgVoc: [[`i`]],
}
const isMasculineAdjectiveStatic: AccentuatedDeclinedType = {
  ...palataliseParadigm(iasAdjectiveStatic),
  ...pickSingularSingular(isMasculineRelationalStatic),
}
const isMasculineAdjectiveDynamic: AccentuatedDeclinedType = {
  ...palataliseParadigm(iasAdjectiveDynamic),
  ...pickSingularSingular(isMasculineRelationalDynamic),
}
const ysMasculineAdjectiveStatic: AccentuatedDeclinedType = {
  ...isMasculineAdjectiveStatic,
  sgNom: [`ys`],
  sgVoc: [`y`],
}
const ysMasculineAdjectiveDynamic: AccentuatedDeclinedType = {
  ...isMasculineAdjectiveDynamic,
  sgNom: [`y\u0303s`],
  sgVoc: [`y\u0303`],
}
const isMasculineParticipleStatic: AccentuatedDeclinedType = {
  ...isMasculineAdjectiveStatic,
  sgVoc: [`is`],
  plNom: [`ys`],
  plVoc: [`ys`],
}

export const AsNounDecliner = new AccentedInflector<keyof DeclinedType>(
  asNounsStatic,
  asNounsDynamic,
)

export const AsReflexiveDecliner = new AccentedInflector<keyof DeclinedType>(
  asReflexiveStatic,
  undefined,
)

export const JasBisyllabicNounDecliner = new AccentedInflector<
  keyof DeclinedType
>(
  jasNounsBisyllabicStatic,
  jasNounsBisyllabicDynamic,
)

export const JasPolysyllabicNounsDecliner = new AccentedInflector<
  keyof DeclinedType
>(
  jasNounsPolysyllabicStatic,
  jasNounsPolysyllabicDynamic,
)

export const IasNounDecliner = new AccentedInflector<keyof DeclinedType>(
  iasNounsStatic,
  iasNounsDynamic,
)

export const AsAdjectiveDecliner = new AccentedInflector<keyof DeclinedType>(
  asAdjectiveStatic,
  asAdjectiveDynamic,
)

export const IasAdjectiveDecliner = new AccentedInflector<keyof DeclinedType>(
  iasAdjectiveStatic,
  iasAdjectiveDynamic,
)

export const AsPronominalDecliner = new AccentedInflector<keyof DeclinedType>(
  asPronominalStatic,
  asPronominalDynamic,
)

export const IasPronominalDecliner = new AccentedInflector<keyof DeclinedType>(
  palataliseParadigm(asPronominalStatic),
  palataliseParadigm(asPronominalDynamic),
)

export const EDecliner = new AccentedInflector<keyof DeclinedType>(
  eStatic,
  eDynamic,
)

export const ANounDecliner = new AccentedInflector<keyof DeclinedType>(
  aNounStatic,
  aNounDynamic,
)

export const IaNounDecliner = new AccentedInflector<keyof DeclinedType>(
  iaNounStatic,
  iaNounDynamic,
)

export const AAdjectiveDecliner = new AccentedInflector<keyof DeclinedType>(
  aAdjectiveStatic,
  aAdjectiveDynamic,
)

export const APronominalDecliner = new AccentedInflector<keyof DeclinedType>(
  aPronominalStatic,
  aPronominalDynamic,
)

export const UoDecliner = new AccentedInflector<keyof DeclinedType>(
  uoStatic,
  uoDynamic,
)

export const UsNounDecliner = new AccentedInflector<keyof DeclinedType>(
  usNounStatic,
  usNounDynamic,
)

export const IusNounDecliner = new AccentedInflector<keyof DeclinedType>(
  iusNounStatic,
  iusNounDynamic,
)

export const UsAdjectiveDecliner = new AccentedInflector<keyof DeclinedType>(
  usAdjectiveStatic,
  usAdjectiveDynamic,
)

export const UsPronominalDecliner = new AccentedInflector<keyof DeclinedType>(
  usPronominalStatic,
  usPronominalDynamic,
)

export const IsMasculineNounDecliner = new AccentedInflector<
  keyof DeclinedType
>(
  ioNounStatic,
  ioNounDynamic,
)

export const YsMasculineNounDecliner = new AccentedInflector<
  keyof DeclinedType
>(
  stripAllAccentsFromParadigm(ioNounDynamic),
  ioNounDynamic,
)

export const IesMasculineNounDecliner = new AccentedInflector<
  keyof DeclinedType
>(
  iesNounStatic,
  iesNounDynamic,
)

export const IsFeminineNounDecliner = new AccentedInflector<keyof DeclinedType>(
  isFeminineNounStatic,
  isFeminineNounDynamic,
)

export const IsFeminineAdjectiveDecliner = new AccentedInflector<
  keyof DeclinedType
>(
  isFeminineAdjectiveStatic,
  isFeminineAdjectiveDynamic,
)

export const IsFemininePronominalDecliner = new AccentedInflector<
  keyof DeclinedType
>(
  palataliseParadigm(aPronominalStatic),
  palataliseParadigm(aPronominalDynamic),
)

export const IsMasculinePronominalDecliner = new AccentedInflector<
  keyof DeclinedType
>(
  isMasculinePronominalStatic,
  isMasculinePronominalDynamic,
)

export const IsRelationalAdjectiveDecliner = new AccentedInflector<
  keyof DeclinedType
>(
  isMasculineRelationalStatic,
  undefined,
)

export const IsMasculineAdjectiveDecliner = new AccentedInflector<
  keyof DeclinedType
>(
  isMasculineAdjectiveStatic,
  isMasculineAdjectiveDynamic,
)

export const YsMasculineAdjectiveDecliner = new AccentedInflector<
  keyof DeclinedType
>(
  ysMasculineAdjectiveStatic,
  ysMasculineAdjectiveDynamic,
)

export const IsMasculineParticipleDecliner = new AccentedInflector<
  keyof DeclinedType
>(
  isMasculineParticipleStatic,
  undefined,
)

export const DUKTE: DeclinedType = {
  sgNom: `duktė\u0303`,
  sgGen: `dukter\u0303s`,
  sgDat: `du\u0300kteriai`,
  sgAcc: `du\u0300kterį`,
  sgInst: `du\u0300kteria`,
  sgLoc: `dukteryje\u0300`,
  sgVoc: `dukterie\u0303`,
  plNom: `du\u0300kterys`,
  plGen: `dukterų\u0303`,
  plDat: `dukteri\u0300ms`,
  plAcc: `du\u0300kteris`,
  plInst: `dukterimi\u0300s`,
  plLoc: `dukteryse\u0300`,
  plVoc: `du\u0300kterys`,
}

export const SUO: DeclinedType = {
  sgNom: `šuo\u0303`,
  sgGen: `šun\u0303s`,
  sgDat: `šu\u0300niui`,
  sgAcc: `šu\u0300nį`,
  sgInst: `šuniu\u0300`,
  sgLoc: `šunyje\u0300`,
  sgVoc: `šunie\u0303`,
  plNom: `šu\u0300nys`,
  plGen: `šunų\u0303`,
  plDat: `šuni\u0300ms`,
  plAcc: `šuni\u0300s`,
  plInst: `šunimi\u0300s`,
  plLoc: `šunyse\u0300`,
  plVoc: `šu\u0300nys`,
}

export const MENUO: DeclinedType = {
  ...IsMasculineNounDecliner.inflectStatic(`mė\u0301nes`),
  sgNom: `mė\u0301nuo`,
}

export const SESUO: DeclinedType = {
  sgNom: `sesuo\u0303`,
  sgGen: `seser\u0303s`,
  sgDat: `se\u0303seriai`,
  sgAcc: `se\u0303serį`,
  sgInst: `se\u0303seria`,
  sgLoc: `seseryje\u0300`,
  sgVoc: `seserie\u0303`,
  plNom: `se\u0303serys`,
  plGen: `seserų\u0303`,
  plDat: `seseri\u0300ms`,
  plAcc: `se\u0303seris`,
  plInst: `seserimi\u0300s`,
  plLoc: `seseryse\u0300`,
  plVoc: `se\u0303serys`,
}
//@ts-ignore all good
export const ZMOGUS: DeclinedType = {
  ...EDecliner.inflectDynamic(`žmo\u0301n`),
  //@ts-ignore all good
  ...pickSingularSingular(UsNounDecliner.inflectDynamic(`žmo\u0303g`)),
}
//@ts-ignore all good
export const DIDIS: DeclinedType = {
  ...UsAdjectiveDecliner.inflectDynamic(`di\u0300d`),
  ...pickSingularSingular(
    //@ts-ignore all good
    IsMasculineAdjectiveDecliner.inflectDynamic(`di\u0300d`),
  ),
  sgVoc: `di\u0300dis`,
}

function pickSingularSingular(
  paradigm: Pick<
    AccentuatedDeclinedType,
    'sgNom' | 'sgGen' | 'sgDat' | 'sgAcc' | 'sgInst' | 'sgLoc' | 'sgVoc'
  >,
): Pick<
  AccentuatedDeclinedType,
  'sgNom' | 'sgGen' | 'sgDat' | 'sgAcc' | 'sgInst' | 'sgLoc' | 'sgVoc'
> {
  return {
    sgNom: paradigm.sgNom,
    sgGen: paradigm.sgGen,
    sgDat: paradigm.sgDat,
    sgAcc: paradigm.sgAcc,
    sgInst: paradigm.sgInst,
    sgLoc: paradigm.sgLoc,
    sgVoc: paradigm.sgVoc,
  }
}
