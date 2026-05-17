import { expect } from '@std/expect'
import { describe, test } from '@std/testing/bdd'
import Accent, { type AcuteInterface } from '~decliners/Accent.ts'
import {
  explicitNonAcuteError,
  explicitShortError,
  finalAcuteError,
  lemmaNoStressError,
} from '~src/errors.ts'

const ACUTE_STATIC_2: AcuteInterface = {
  strongAccent: 'acute',
  position: 2,
  isStatic: true,
}
const SHORT_DYNAMIC_1: AcuteInterface = {
  strongAccent: 'short',
  position: 1,
  isStatic: false,
}
const NONACUTE_DYNAMIC_3: AcuteInterface = {
  strongAccent: 'nonAcute',
  position: 3,
  isStatic: false,
}

type AnyRecord = Record<string, unknown>

describe('Accent', () => {
  test('constructor', () => {
    expect(new Accent('acute', 2, true)).toMatchObject(
      ACUTE_STATIC_2 as AnyRecord,
    )
    expect(new Accent('short', 1, false)).toMatchObject(
      SHORT_DYNAMIC_1 as AnyRecord,
    )
    expect(new Accent('nonAcute', 3, false)).toMatchObject(
      NONACUTE_DYNAMIC_3 as AnyRecord,
    )
  })
  test('FromObject', () => {
    expect(Accent.FromObject(ACUTE_STATIC_2)).toMatchObject(
      ACUTE_STATIC_2 as AnyRecord,
    )
    expect(Accent.FromObject(SHORT_DYNAMIC_1)).toMatchObject(
      SHORT_DYNAMIC_1 as AnyRecord,
    )
    expect(Accent.FromObject(NONACUTE_DYNAMIC_3)).toMatchObject(
      NONACUTE_DYNAMIC_3 as AnyRecord,
    )
  })
  test('FromAccentedLemma', () => {
    expect(Accent.FromAccentedLemma(`pi\u0301enas`, '1')).toMatchObject(
      ACUTE_STATIC_2 as AnyRecord,
    )
    expect(Accent.FromAccentedLemma(`saga\u0300`, '4', true))
      .toMatchObject(SHORT_DYNAMIC_1 as AnyRecord)
    expect(Accent.FromAccentedLemma(`ne\u0303galia`, '3')).toMatchObject(
      NONACUTE_DYNAMIC_3 as AnyRecord,
    )
    expect(Accent.FromAccentedLemma(`e\u0300pas`, '2'))
      .toMatchObject({ strongAccent: 'short', position: 2, isStatic: true })
    expect(Accent.FromAccentedLemma(`re\u0303pas`, '2'))
      .toMatchObject({ strongAccent: 'nonAcute', position: 2, isStatic: true })
    expect(() => Accent.FromAccentedLemma(`gėlė`, '3')).toThrow(
      lemmaNoStressError,
    )
    expect(() => Accent.FromAccentedLemma(`gėlė\u0301`, '3')).toThrow(
      finalAcuteError,
    )
    expect(() => Accent.FromAccentedLemma(`gėlė\u0303`, '3', true)).toThrow(
      explicitShortError,
    )
    expect(() => Accent.FromAccentedLemma(`gė\u0301lė`, '2')).toThrow(
      explicitNonAcuteError,
    )
  })
  test('FromAccentType', () => {
    expect(Accent.FromAccentType(undefined, 'mė\u0301ta')).toBeUndefined()
    expect(Accent.FromAccentType(new Accent('acute', 2, true), 'mė\u0301ta'))
      .toMatchObject({ strongAccent: 'acute', position: 2, isStatic: true })
    expect(Accent.FromAccentType('1', 'mė\u0301ta'))
      .toMatchObject({ strongAccent: 'acute', position: 2, isStatic: true })
    expect(Accent.FromAccentType({ type: '1' }, 'mė\u0301ta'))
      .toMatchObject({ strongAccent: 'acute', position: 2, isStatic: true })
  })
})
