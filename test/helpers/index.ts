import { normaliseAccents } from '~helpers/index.ts'
import { describe, it } from '@std/testing/bdd'
import { expect } from '@std/expect'

describe('helpers', () => {
  describe('normaliseAccents', () => {
    it('normalises a text full of diacritics', () => {
      const textWithDiacritics =
        `močiùtė suválgė dìdelę di\u0307\u0300delę mótinos kañčią`
      const normalisedText = `močiùtė suválgė dìdelę dìdelę mótinos kañčią`
      expect(normaliseAccents(textWithDiacritics)).toStrictEqual(normalisedText)
    })
  })
})
