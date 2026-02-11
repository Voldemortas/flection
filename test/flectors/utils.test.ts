import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import {
  decorateConjugatedReflexive,
  isRootMonosyllabic,
  metatonise3rdFuture,
} from '~src/flectors/utils.ts'
import type { ConjugationType } from '~src/types.ts'

describe('flector utils', () => {
  describe('decorateConjugatedReflexive', () => {
    it('decorates already conjugated reflexive with longer forms', () => {
      const conjugated: ConjugationType = {
        sg1: 'as',
        sg2: 'bs',
        sg3: 'cs',
        pl1: 'es',
        pl2: 'fs',
        pl3: 'gs',
      }
      const expected: ConjugationType = {
        sg1: 'asi as',
        sg2: 'bsi bs',
        sg3: 'csi cs',
        pl1: 'es',
        pl2: 'fs',
        pl3: 'gsi gs',
      }
      expect(decorateConjugatedReflexive(conjugated)).toMatchObject(expected)
    })
  })
  describe('isRootMonosyllabic', () => {
    const data: [string, boolean][] = [
      ['duod', true],
      ['duo', true],
      ['uod', true],
      ['liuod', true],
      ['liuo', true],
      ['pažy', false],
      ['pažys', false],
      ['ažys', false],
    ]
    data.forEach(([root, isMonosyllabic]) => {
      describe(`checks if ${root} is monosyllabic`, () => {
        expect(isRootMonosyllabic(root)).toStrictEqual(isMonosyllabic)
      })
    })
  })
  describe('metatonise3rdFuture', () => {
    const data: [string, string][] = [
      [`co\u0301s`, `co\u0303s`],
      [`ca\u0301us`, `cau\u0303s`],
      [`co\u0303cs`, `co\u0303cs`],
      [`co\u0300cs`, `co\u0300cs`],
      [`cocs`, `cocs`],
    ]
    data.forEach(([before, after]) => {
      describe(`applies metatony for ${before}`, () => {
        expect(metatonise3rdFuture(before)).toStrictEqual(after)
      })
    })
  })
})
