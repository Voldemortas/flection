import { normaliseAccents } from '~helpers/index.ts'
import { describe, it } from '@std/testing/bdd'
import { expect } from '@std/expect'

describe('helpers', () => {
  describe('normaliseAccents', () => {
    describe('acute accent', () => {
      it('normalises acute accented letters', () => {
        const text = 'áéóíúý ÁÉÓÍÚÝ'
        const expected =
          'a\u0301e\u0301o\u0301i\u0301u\u0301y\u0301 A\u0301E\u0301O\u0301I\u0301U\u0301Y\u0301'

        expect(normaliseAccents(text)).toStrictEqual(expected)
      })
    })

    describe('grave accent', () => {
      it('normalises grave accented letters', () => {
        const text = 'àèòìù ÀÈÒÌÙ'
        const expected =
          'a\u0300e\u0300o\u0300i\u0300u\u0300 A\u0300E\u0300O\u0300I\u0300U\u0300'

        expect(normaliseAccents(text)).toStrictEqual(expected)
      })
    })

    describe('tilde', () => {
      it('normalises tilde letters', () => {
        const text = 'ãẽõĩũỹñ ÃẼÕĨŨỸÑ'
        const expected =
          'a\u0303e\u0303o\u0303i\u0303u\u0303y\u0303n\u0303 A\u0303E\u0303O\u0303I\u0303U\u0303Y\u0303N\u0303'

        expect(normaliseAccents(text)).toStrictEqual(expected)
      })
    })

    describe('ogonek', () => {
      it('normalises ogonek sequences into Lithuanian letters', () => {
        const text = 'a\u0328e\u0328i\u0328u\u0328 A\u0328E\u0328I\u0328U\u0328'
        const expected = 'ąęįų ĄĘĮŲ'

        expect(normaliseAccents(text)).toStrictEqual(expected)
      })
    })

    describe('dot above', () => {
      it('normalises e with dot above into ė', () => {
        const text = 'e\u0307 E\u0307'
        const expected = 'ė Ė'

        expect(normaliseAccents(text)).toStrictEqual(expected)
      })

      it('removes dot above from i', () => {
        const text = 'i\u0307 I\u0307'
        const expected = 'i I'

        expect(normaliseAccents(text)).toStrictEqual(expected)
      })
    })

    describe('caron', () => {
      it('normalises caron sequences into Lithuanian letters', () => {
        const text = 'c\u030Cs\u030Cz\u030C C\u030CS\u030CZ\u030C'
        const expected = 'čšž ČŠŽ'

        expect(normaliseAccents(text)).toStrictEqual(expected)
      })
    })

    describe('macron', () => {
      it('normalises u with macron into ū', () => {
        const text = 'u\u0304 U\u0304'
        const expected = 'ū Ū'

        expect(normaliseAccents(text)).toStrictEqual(expected)
      })
    })

    describe('mixed text', () => {
      it('normalises multiple diacritics in one string', () => {
        const text = 'á à ã ñ e\u0328 e\u0307 c\u030C u\u0304'
        const expected = 'a\u0301 a\u0300 a\u0303 n\u0303 ę ė č ū'

        expect(normaliseAccents(text)).toStrictEqual(expected)
      })

      it('leaves plain text unchanged', () => {
        const text = 'Lietuviškas tekstas be keičiamų ženklų 123'
        const expected = 'Lietuviškas tekstas be keičiamų ženklų 123'

        expect(normaliseAccents(text)).toStrictEqual(expected)
      })
    })
  })
})
