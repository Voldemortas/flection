import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import { decorateConjugatedReflexive } from '~src/flectors/utils.ts'
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
})
