import { describe, it } from '@std/testing/bdd'
import { expect } from '@std/expect'
import { Gender } from '~src/types.ts'
import { makeDeclinedFromArray } from '~test/testHelpers.ts'
import EDeclinator from '~decliners/EDeclinator.ts'

const BULVE = makeDeclinedFromArray(Gender.feminine, [
  [`bu\u0300lvė`, `bu\u0300lvės`],
  [`bu\u0300lvės`, `bu\u0300lvių`],
  [`bu\u0300lvei`, `bu\u0300lvėms`],
  [`bu\u0300lvę`, `bu\u0300lves`],
  [`bu\u0300lve`, `bu\u0300lvėmis`],
  [`bu\u0300lvėje`, `bu\u0300lvėse`],
  [`bu\u0300lve`, `bu\u0300lvės`],
])
const ZVAKE = makeDeclinedFromArray(Gender.feminine, [
  [`žva\u0303kė`, `žva\u0303kės`],
  [`žva\u0303kės`, `žva\u0303kių`],
  [`žva\u0303kei`, `žva\u0303kėms`],
  [`žva\u0303kę`, `žvake\u0300s`],
  [`žvake\u0300`, `žva\u0303kėmis`],
  [`žva\u0303kėje`, `žva\u0303kėse`],
  [`žva\u0303ke`, `žva\u0303kės`],
])
const GERKLE = makeDeclinedFromArray(Gender.feminine, [
  [`gerklė\u0303`, `ge\u0301rklės`],
  [`gerklė\u0303s`, `gerklių\u0303`],
  [`ge\u0301rklei`, `gerklė\u0301ms`],
  [`ge\u0301rklę`, `ge\u0301rkles`],
  [`ge\u0301rkle`, `gerklėmi\u0300s`],
  [`gerklėje\u0300`, `gerklėse\u0300`],
  [`ge\u0301rkle`, `ge\u0301rklės`],
])
const EKETE = makeDeclinedFromArray(Gender.feminine, [
  [`eketė\u0303`, `e\u0303ketės`],
  [`eketė\u0303s`, `ekečių\u0303`],
  [`e\u0303ketei`, `eketė\u0301ms`],
  [`e\u0303ketę`, `e\u0303ketes`],
  [`e\u0303kete`, `eketėmi\u0300s`],
  [`eketėje\u0300`, `eketėse\u0300`],
  [`e\u0303kete`, `e\u0303ketės`],
])
const LELE = makeDeclinedFromArray(Gender.feminine, [
  [`lėlė\u0303`, `lė\u0303lės`],
  [`lėlė\u0303s`, `lėlių\u0303`],
  [`lė\u0303lei`, `lėlė\u0301ms`],
  [`lė\u0303lę`, `lėle\u0300s`],
  [`lėle\u0300`, `lėlėmi\u0300s`],
  [`lėlėje\u0300`, `lėlėse\u0300`],
  [`lė\u0303le`, `lė\u0303lės`],
])

describe('EDeclinator', () => {
  it('declines 1st accentuation nominal', () => {
    expect(EDeclinator.declineI(`bu\u0300lv`))
      .toMatchObject(BULVE)
  })
  it('declines 2nd accentuation nominal', () => {
    expect(EDeclinator.declineII(`žva\u0303k`))
      .toMatchObject(ZVAKE)
  })
  it('declines 3rd accentuation nominal', () => {
    expect(EDeclinator.declineIII(`gerkl`))
      .toMatchObject(GERKLE)
  })
  it('declines 3rd B accentuation nominal', () => {
    expect(EDeclinator.declineIII(`eket`, 'b'))
      .toMatchObject(EKETE)
  })
  it('declines 4th accentuation nominal', () => {
    expect(EDeclinator.declineIV(`lėl`))
      .toMatchObject(LELE)
  })
})
