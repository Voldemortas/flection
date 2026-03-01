import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import { makeConjugatedFromArray } from '~test/testHelpers.ts'
import PresentIndicativeConjugator from '~conjugators/PresentIndicativeConjugator.ts'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'
import { stripAllAccents, stripAllAccentsFromParadigm } from '~src/utils.ts'
import { assertPrefixedReflexive, assertReflexive } from './commons.ts'

const COPULA_PARTS: PrincipalPartsType = [
  `bū\u0301ti`,
  `yra\u0300`,
  `bu\u0300vo`,
]
const EITI_PARTS: PrincipalPartsType = [`ei\u0303ti`, `ei\u0303na`, `ė\u0303jo`]
const SVIESTI_PARTS: PrincipalPartsType = [
  `švie\u0303sti`,
  `švie\u0303čia`,
  `švie\u0303tė`,
]
const GALETI_PARTS: PrincipalPartsType = [
  `galė\u0301ti`,
  `ga\u0303li`,
  `galė\u0301jo`,
]
const TURETI_PARTS: PrincipalPartsType = [
  `turė\u0301ti`,
  `tu\u0300ri`,
  `turė\u0301jo`,
]
const GALVOTI_PARTS: PrincipalPartsType = [
  `galvo\u0301ti`,
  `galvo\u0301ja`,
  `galvo\u0301jo`,
]
const DARYTI: PrincipalPartsType = [`dary\u0301ti`, `da\u0303ro`, `da\u0303rė`]
const MOKYTI: PrincipalPartsType = [`mo\u0301kyti`, `mo\u0301ko`, `mo\u0301kė`]
const LASETI: PrincipalPartsType = [
  `lašė\u0301ti`,
  `la\u0303ša`,
  `lašė\u0301jo`,
]
const LESTI: PrincipalPartsType = [`le\u0300sti`, `le\u0303sa`, `le\u0303sė`]
const MUSTI: PrincipalPartsType = [`mu\u0300šti`, `mu\u0300ša`, `mu\u0300šė`]
const SIKTI: PrincipalPartsType = [`ši\u0300kti`, `ši\u0300ka`, `ši\u0300ko`]
const GIMTI: PrincipalPartsType = [`gi\u0300mti`, `gi\u0300msta`, `gi\u0300mė`]
const BRISTI: PrincipalPartsType = [
  `bri\u0300sti`,
  `bren\u0303da`,
  `bri\u0300do`,
]
const RINKTI: PrincipalPartsType = [
  `rin\u0303kti`,
  `ren\u0303ka`,
  `rin\u0303ko`,
]
const VILKTI: PrincipalPartsType = [
  `vil\u0303kti`,
  `vel\u0303ka`,
  `vil\u0303ko`,
]
const KALBETI: PrincipalPartsType = [
  `kalbė\u0301ti`,
  `kal\u0303ba`,
  `kalbė\u0301jo`,
]
const VARGTI: PrincipalPartsType = [
  `var\u0303gti`,
  `var\u0303gsta`,
  `var\u0303go`,
]
const COPULA = makeConjugatedFromArray([
  [`esu\u0300`, `esi\u0300`, `yra\u0300`],
  [
    `e\u0303same e\u0303sam`,
    `e\u0303sate e\u0303sat`,
    `yra\u0300`,
  ],
])
const EINA = makeConjugatedFromArray([
  [`einu\u0300`, `eini\u0300`, `ei\u0303na`],
  [
    `ei\u0303name ei\u0303nam`,
    `ei\u0303nate ei\u0303nat`,
    `ei\u0303na`,
  ],
])
const SVIECIA = makeConjugatedFromArray([
  [`šviečiu\u0300`, `švieti\u0300`, `švie\u0303čia`],
  [
    `švie\u0303čiame švie\u0303čiam`,
    `švie\u0303čiate švie\u0303čiat`,
    `švie\u0303čia`,
  ],
])
const GALI = makeConjugatedFromArray([
  [`galiu\u0300`, `gali\u0300`, `ga\u0303li`],
  [
    `ga\u0303lime ga\u0303lim`,
    `ga\u0303lite ga\u0303lit`,
    `ga\u0303li`,
  ],
])
const TURI = makeConjugatedFromArray([
  [`turiu\u0300`, `turi\u0300`, `tu\u0300ri`],
  [
    `tu\u0300rime tu\u0300rim`,
    `tu\u0300rite tu\u0300rit`,
    `tu\u0300ri`,
  ],
])
const GALVOJA = makeConjugatedFromArray([
  [`galvo\u0301ju`, `galvo\u0301ji`, `galvo\u0301ja`],
  [
    `galvo\u0301jame galvo\u0301jam`,
    `galvo\u0301jate galvo\u0301jat`,
    `galvo\u0301ja`,
  ],
])
const DARO = makeConjugatedFromArray([
  [`darau\u0303`, `darai\u0303`, `da\u0303ro`],
  [
    `da\u0303rome da\u0303rom`,
    `da\u0303rote da\u0303rot`,
    `da\u0303ro`,
  ],
])
const MOKO = makeConjugatedFromArray([
  [`mo\u0301kau`, `mo\u0301kai`, `mo\u0301ko`],
  [
    `mo\u0301kome mo\u0301kom`,
    `mo\u0301kote mo\u0301kot`,
    `mo\u0301ko`,
  ],
])
const LASA = makeConjugatedFromArray([
  [`lašu\u0300`, `laši\u0300`, `la\u0303ša`],
  [
    `la\u0303šame la\u0303šam`,
    `la\u0303šate la\u0303šat`,
    `la\u0303ša`,
  ],
])
const LESA = makeConjugatedFromArray([
  [`lesu\u0300`, `lesi\u0300`, `le\u0303sa`],
  [
    `le\u0303same le\u0303sam`,
    `le\u0303sate le\u0303sat`,
    `le\u0303sa`,
  ],
])
const MUSA = makeConjugatedFromArray([
  [`mušu\u0300`, `muši\u0300`, `mu\u0300ša`],
  [
    `mu\u0300šame mu\u0300šam`,
    `mu\u0300šate mu\u0300šat`,
    `mu\u0300ša`,
  ],
])
const SIKA = makeConjugatedFromArray([
  [`šiku\u0300`, `šiki\u0300`, `ši\u0300ka`],
  [
    `ši\u0300kame ši\u0300kam`,
    `ši\u0300kate ši\u0300kat`,
    `ši\u0300ka`,
  ],
])
const GIMSTA = makeConjugatedFromArray([
  [`gi\u0300mstu`, `gi\u0300msti`, `gi\u0300msta`],
  [
    `gi\u0300mstame gi\u0300mstam`,
    `gi\u0300mstate gi\u0300mstat`,
    `gi\u0300msta`,
  ],
])
const BRENDA = makeConjugatedFromArray([
  [`brendu\u0300`, `brendi\u0300`, `bren\u0303da`],
  [
    `bren\u0303dame bren\u0303dam`,
    `bren\u0303date bren\u0303dat`,
    `bren\u0303da`,
  ],
])
const RENKA = makeConjugatedFromArray([
  [`renku\u0300`, `renki\u0300`, `ren\u0303ka`],
  [
    `ren\u0303kame ren\u0303kam`,
    `ren\u0303kate ren\u0303kat`,
    `ren\u0303ka`,
  ],
])
const VELKA = makeConjugatedFromArray([
  [`velku\u0300`, `velki\u0300`, `vel\u0303ka`],
  [
    `vel\u0303kame vel\u0303kam`,
    `vel\u0303kate vel\u0303kat`,
    `vel\u0303ka`,
  ],
])
const KALBA = makeConjugatedFromArray([
  [`kalbu\u0300`, `kalbi\u0300`, `kal\u0303ba`],
  [
    `kal\u0303bame kal\u0303bam`,
    `kal\u0303bate kal\u0303bat`,
    `kal\u0303ba`,
  ],
])
const VARGSTA = makeConjugatedFromArray([
  [`vargstu\u0300`, `vargsti\u0300`, `var\u0303gsta`],
  [
    `var\u0303gstame var\u0303gstam`,
    `var\u0303gstate var\u0303gstat`,
    `var\u0303gsta`,
  ],
])
const NEG_COPULA = makeConjugatedFromArray([
  [`nesu\u0300`, `nesi\u0300`, `nėra\u0300`],
  [
    `ne\u0303same ne\u0303sam`,
    `ne\u0303sate ne\u0303sat`,
    `nėra\u0300`,
  ],
])
const NEG_EINA = makeConjugatedFromArray([
  [`neinu\u0300`, `neini\u0300`, `nei\u0303na`],
  [
    `nei\u0303name nei\u0303nam`,
    `nei\u0303nate nei\u0303nat`,
    `nei\u0303na`,
  ],
])
const NEG_SVIECIA = makeConjugatedFromArray([
  [`nešviečiu\u0300`, `nešvieti\u0300`, `nešvie\u0303čia`],
  [
    `nešvie\u0303čiame nešvie\u0303čiam`,
    `nešvie\u0303čiate nešvie\u0303čiat`,
    `nešvie\u0303čia`,
  ],
])
const NEG_GALI = makeConjugatedFromArray([
  [`negaliu\u0300`, `negali\u0300`, `nega\u0303li`],
  [
    `nega\u0303lime nega\u0303lim`,
    `nega\u0303lite nega\u0303lit`,
    `nega\u0303li`,
  ],
])
const NEG_TURI = makeConjugatedFromArray([
  [`neturiu\u0300`, `neturi\u0300`, `netu\u0300ri`],
  [
    `netu\u0300rime netu\u0300rim`,
    `netu\u0300rite netu\u0300rit`,
    `netu\u0300ri`,
  ],
])
const NEG_GALVOJA = makeConjugatedFromArray([
  [`negalvo\u0301ju`, `negalvo\u0301ji`, `negalvo\u0301ja`],
  [
    `negalvo\u0301jame negalvo\u0301jam`,
    `negalvo\u0301jate negalvo\u0301jat`,
    `negalvo\u0301ja`,
  ],
])
const NEG_DARO = makeConjugatedFromArray([
  [`nedarau\u0303`, `nedarai\u0303`, `neda\u0303ro`],
  [
    `neda\u0303rome neda\u0303rom`,
    `neda\u0303rote neda\u0303rot`,
    `neda\u0303ro`,
  ],
])
const NEG_MOKO = makeConjugatedFromArray([
  [`nemo\u0301kau`, `nemo\u0301kai`, `nemo\u0301ko`],
  [
    `nemo\u0301kome nemo\u0301kom`,
    `nemo\u0301kote nemo\u0301kot`,
    `nemo\u0301ko`,
  ],
])
const NEG_LASA = makeConjugatedFromArray([
  [`ne\u0300lašu`, `ne\u0300laši`, `ne\u0300laša`],
  [
    `ne\u0300lašame ne\u0300lašam`,
    `ne\u0300lašate ne\u0300lašat`,
    `ne\u0300laša`,
  ],
])
const NEG_LESA = makeConjugatedFromArray([
  [`ne\u0300lesu`, `ne\u0300lesi`, `ne\u0300lesa`],
  [
    `ne\u0300lesame ne\u0300lesam`,
    `ne\u0300lesate ne\u0300lesat`,
    `ne\u0300lesa`,
  ],
])
const NEG_MUSA = makeConjugatedFromArray([
  [`ne\u0300mušu`, `ne\u0300muši`, `ne\u0300muša`],
  [
    `ne\u0300mušame ne\u0300mušam`,
    `ne\u0300mušate ne\u0300mušat`,
    `ne\u0300muša`,
  ],
])
const NEG_SIKA = makeConjugatedFromArray([
  [`ne\u0300šiku`, `ne\u0300šiki`, `ne\u0300šika`],
  [
    `ne\u0300šikame ne\u0300šikam`,
    `ne\u0300šikate ne\u0300šikat`,
    `ne\u0300šika`,
  ],
])
const NEG_GIMSTA = makeConjugatedFromArray([
  [`negi\u0300mstu`, `negi\u0300msti`, `negi\u0300msta`],
  [
    `negi\u0300mstame negi\u0300mstam`,
    `negi\u0300mstate negi\u0300mstat`,
    `negi\u0300msta`,
  ],
])
const NEG_BRENDA = makeConjugatedFromArray([
  [`ne\u0300brendu`, `ne\u0300brendi`, `ne\u0300brenda`],
  [
    `ne\u0300brendame ne\u0300brendam`,
    `ne\u0300brendate ne\u0300brendat`,
    `ne\u0300brenda`,
  ],
])
const NEG_RENKA = makeConjugatedFromArray([
  [`ne\u0300renku`, `ne\u0300renki`, `ne\u0300renka`],
  [
    `ne\u0300renkame ne\u0300renkam`,
    `ne\u0300renkate ne\u0300renkat`,
    `ne\u0300renka`,
  ],
])
const NEG_VELKA = makeConjugatedFromArray([
  [`ne\u0300velku`, `ne\u0300velki`, `ne\u0300velka`],
  [`ne\u0300velkame ne\u0300velkam`],
  [`ne\u0300velkate ne\u0300velkat`],
])
const NEG_KALBA = makeConjugatedFromArray([
  [`ne\u0300kalbu`, `ne\u0300kalbi`, `ne\u0300kalba`],
  [
    `ne\u0300kalbame ne\u0300kalbam`,
    `ne\u0300kalbate ne\u0300kalbat`,
    `ne\u0300kalba`,
  ],
])
const NEG_VARGSTA = makeConjugatedFromArray([
  [`nevargstu\u0300`, `nevargsti\u0300`, `nevar\u0303gsta`],
  [
    `nevar\u0303gstame nevar\u0303gstam`,
    `nevar\u0303gstate nevar\u0303gstat`,
    `nevar\u0303gsta`,
  ],
])

const DATA: [PrincipalPartsType[], ConjugationType[], ConjugationType[]] = [
  [
    COPULA_PARTS,
    EITI_PARTS,
    SVIESTI_PARTS,
    GALETI_PARTS,
    TURETI_PARTS,
    GALVOTI_PARTS,
    DARYTI,
    MOKYTI,
    LASETI,
    LESTI,
    MUSTI,
    SIKTI,
    GIMTI,
    BRISTI,
    RINKTI,
    VILKTI,
    KALBETI,
    VARGTI,
  ],
  [
    COPULA,
    EINA,
    SVIECIA,
    GALI,
    TURI,
    GALVOJA,
    DARO,
    MOKO,
    LASA,
    LESA,
    MUSA,
    SIKA,
    GIMSTA,
    BRENDA,
    RENKA,
    VELKA,
    KALBA,
    VARGSTA,
  ],
  [
    NEG_COPULA,
    NEG_EINA,
    NEG_SVIECIA,
    NEG_GALI,
    NEG_TURI,
    NEG_GALVOJA,
    NEG_DARO,
    NEG_MOKO,
    NEG_LASA,
    NEG_LESA,
    NEG_MUSA,
    NEG_SIKA,
    NEG_GIMSTA,
    NEG_BRENDA,
    NEG_RENKA,
    NEG_VELKA,
    NEG_KALBA,
    NEG_VARGSTA,
  ],
]

describe('PresentIndicativeConjugator', () => {
  const conjugator = new PresentIndicativeConjugator()
  describe('default', () => {
    for (let i = 0; i < DATA[0].length; i++) {
      it(`Conjugates default ${DATA[0][i].join('-')}`, () => {
        expect(conjugator.getDefault(DATA[0][i])).toMatchObject(
          DATA[1][i],
        )
        expect(
          conjugator.getDefault(
            DATA[0][i].map(stripAllAccents) as PrincipalPartsType,
          ),
        )
          .toMatchObject(
            stripAllAccentsFromParadigm(DATA[1][i]),
          )
      })
    }
  })
  describe('negated', () => {
    for (let i = 0; i < DATA[0].length; i++) {
      it(`Conjugates negated ${DATA[0][i].join('-')}`, () => {
        expect(conjugator.getPrefixed(DATA[0][i], 'ne'))
          .toMatchObject(DATA[2][i])
        expect(
          conjugator.getPrefixed(
            DATA[0][i].map(stripAllAccents) as PrincipalPartsType,
            'ne',
          ),
        )
          .toMatchObject(stripAllAccentsFromParadigm(DATA[2][i]))
      })
    }
  })
  assertReflexive(conjugator)
  assertPrefixedReflexive(conjugator)
})
