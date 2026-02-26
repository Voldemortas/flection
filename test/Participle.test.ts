import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import Participle from '~src/Participle.ts'
import Verb from '~src/Verb.ts'
import { assertEqualVerbals } from './Verbal.test.ts'

describe('Verbal', () => {
  const principalParts = ['rinkti', 'renka', 'rinko']
  describe('from Verbal', () => {
    it('creates participle from verb', () => {
      const verb = new Verb('ne=rinktis-ne=renkasi-ne=rinkos')
      const participle = Participle.FromVerbal(verb)
      assertEqualVerbals(
        new Participle(principalParts, { prefix: 'ne', reflexive: true }),
        participle,
      )
      expect(participle.isPronominal).toBeFalsy()
    })
    it('creates participle from participle', () => {
      const ptcp0 = new Participle(principalParts, {
        prefix: 'ne',
        reflexive: false,
        isPronominal: true,
      })
      const ptcp1 = Participle.FromVerbal(ptcp0)
      assertEqualVerbals(
        ptcp0,
        ptcp1,
      )
      expect(ptcp1.isPronominal).toBeTruthy()
    })
    it('creates participle from participle with custom pronominality', () => {
      const ptcp0 = new Participle(principalParts, {
        prefix: 'ne',
        reflexive: false,
        isPronominal: true,
      })
      const ptcp1 = Participle.FromVerbal(ptcp0, false)
      assertEqualVerbals(
        ptcp0,
        ptcp1,
      )
      expect(ptcp1.isPronominal).toBeFalsy()
    })
  })
})
