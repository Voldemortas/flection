import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import Noun from '~src/Noun.ts'
import {
  badNounError,
  feminineIsError,
  feminineUoError,
  imasReflexiveError,
  isYsExplicitGenitiveUError,
  lemmaNoStressError,
  masculineIsError,
  masculineUoError,
} from '~src/errors.ts'

describe('Noun', () => {
  describe('constructor', () => {
    it('creates a regular masculine -as noun', () => {
      const noun = new Noun('namas')

      expect(noun).toMatchObject({
        lemma: 'namas',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'both',
      })
    })
    it('creates a regular feminine -a noun', () => {
      const noun = new Noun('ranka')

      expect(noun).toMatchObject({
        lemma: 'ranka',
        isMasculine: false,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'both',
      })
    })
    it('creates a masculine -is noun with default genitive singular -io', () => {
      const noun = new Noun('spyris')

      expect(noun).toMatchObject({
        lemma: 'spyris',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: 'io',
        accent: undefined,
        availableNumbers: 'both',
      })
    })
    it('creates a feminine -is noun with genitive singular -ies', () => {
      const noun = new Noun('pilis', {
        isMasculine: false,
        sgGen: 'ies',
      })

      expect(noun).toMatchObject({
        lemma: 'pilis',
        isMasculine: false,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: 'ies',
        accent: undefined,
        availableNumbers: 'both',
      })
    })
    it('marks -is nouns with plGen -ų as special', () => {
      const noun = new Noun('debesis', {
        sgGen: 'ies',
        plGen: 'ų',
      })

      expect(noun).toMatchObject({
        lemma: 'debesis',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: true,
        sgGen: 'ies',
        accent: undefined,
        availableNumbers: 'both',
      })
    })

    it('creates a masculine -uo noun with default genitive singular -ens', () => {
      const noun = new Noun('akmuo')

      expect(noun).toMatchObject({
        lemma: 'akmuo',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: 'ens',
        accent: undefined,
        availableNumbers: 'both',
      })
    })
    it('creates a masculine -uo noun with genitive singular -uns', () => {
      const noun = new Noun('šuo', {
        sgGen: 'uns',
      })

      expect(noun).toMatchObject({
        lemma: 'šuo',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: 'uns',
        accent: undefined,
        availableNumbers: 'both',
      })
    })
    it('creates a feminine -uo noun with genitive singular -ers', () => {
      const noun = new Noun('sesuo', {
        isMasculine: false,
      })

      expect(noun).toMatchObject({
        lemma: 'sesuo',
        isMasculine: false,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: 'ers',
        accent: undefined,
        availableNumbers: 'both',
      })
    })
    it('infers feminine -uo from sgGen -ers', () => {
      const noun = new Noun('sesuo', {
        sgGen: 'ers',
      })

      expect(noun).toMatchObject({
        lemma: 'sesuo',
        isMasculine: false,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: 'ers',
        accent: undefined,
        availableNumbers: 'both',
      })
    })

    it('creates a non-reflexive -ymas noun by default', () => {
      const noun = new Noun('mokymas')

      expect(noun).toMatchObject({
        lemma: 'mokymas',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'both',
      })
    })
    it('creates a reflexive -ymas noun when requested', () => {
      const noun = new Noun('mokymas', {
        isReflexive: true,
      })

      expect(noun).toMatchObject({
        lemma: 'mokymas',
        isMasculine: true,
        isReflexive: true,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'both',
      })
    })
    it('creates a reflexive -ymasis noun by default and removes final -is from lemma', () => {
      const noun = new Noun('mokymasis')

      expect(noun).toMatchObject({
        lemma: 'mokymas',
        isMasculine: true,
        isReflexive: true,
        isPlGenSpecial: false,
        sgGen: 'io',
        accent: undefined,
        availableNumbers: 'both',
      })
    })
    it('allows disabling reflexiveness for -ymasis nouns', () => {
      const noun = new Noun('mokymasis', {
        isReflexive: false,
      })

      expect(noun).toMatchObject({
        lemma: 'mokymasis',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: 'io',
        accent: undefined,
        availableNumbers: 'both',
      })
    })
    it('creates plural-only -os noun as singular lemma -a', () => {
      const noun = new Noun('atostogos', {
        availableNumbers: 'plural',
      })

      expect(noun).toMatchObject({
        lemma: 'atostoga',
        isMasculine: false,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'plural',
      })
    })
    it('creates plural-only -ės noun as singular lemma -ė', () => {
      const noun = new Noun('žirklės', {
        availableNumbers: 'plural',
      })

      expect(noun).toMatchObject({
        lemma: 'žirklė',
        isMasculine: false,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'plural',
      })
    })
    it('creates plural-only -ai noun as singular lemma -as', () => {
      const noun = new Noun('marškiniai', {
        availableNumbers: 'plural',
      })

      expect(noun).toMatchObject({
        lemma: 'marškinias',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'plural',
      })
    })
    it('creates plural-only -ūs noun as singular lemma -us', () => {
      const noun = new Noun('pietūs', {
        availableNumbers: 'plural',
      })

      expect(noun).toMatchObject({
        lemma: 'pietus',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'plural',
      })
    })
    it('creates plural-only -ys noun as singular lemma -is and defaults plGen to special', () => {
      const noun = new Noun('durys', {
        availableNumbers: 'plural',
      })

      expect(noun).toMatchObject({
        lemma: 'duris',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: true,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'plural',
      })
    })
    it('allows plural-only -ys noun with explicit plGen -ių', () => {
      const noun = new Noun('sultys', {
        availableNumbers: 'plural',
        plGen: 'ių',
      })

      expect(noun).toMatchObject({
        lemma: 'sultis',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'plural',
      })
    })
    it('preserves accent option', () => {
      expect(() => {
        new Noun('namas', {
          accent: '2' as never,
        })
      }).toThrow(lemmaNoStressError)
    })

    it('creates a regular masculine -us noun', () => {
      const noun = new Noun('sūnus')

      expect(noun).toMatchObject({
        lemma: 'sūnus',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'both',
      })
    })

    it('creates a regular masculine -ys noun', () => {
      const noun = new Noun('gaidys')

      expect(noun).toMatchObject({
        lemma: 'gaidys',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: 'io',
        accent: undefined,
        availableNumbers: 'both',
      })
    })

    it('creates am irregular masculine -ys noun', () => {
      const noun = new Noun('petys', { sgGen: 'ies' })

      expect(noun).toMatchObject({
        lemma: 'petys',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: 'ies',
        accent: undefined,
        availableNumbers: 'both',
      })
    })

    it('creates a regular feminine -ė noun', () => {
      const noun = new Noun('gėlė')

      expect(noun).toMatchObject({
        lemma: 'gėlė',
        isMasculine: false,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'both',
      })
    })

    it('creates a regular feminine -i noun', () => {
      const noun = new Noun('marti')

      expect(noun).toMatchObject({
        lemma: 'marti',
        isMasculine: false,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'both',
      })
    })
  })

  describe('availableNumbers singular', () => {
    it('preserves explicit singular-only availableNumbers', () => {
      const noun = new Noun('pienas', {
        availableNumbers: 'singular',
      })

      expect(noun).toMatchObject({
        lemma: 'pienas',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'singular',
      })
    })
  })

  describe('accent stripping', () => {
    it('strips stress accents from the lemma', () => {
      const noun = new Noun('na\u0303mas')

      expect(noun).toMatchObject({
        lemma: 'namas',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'both',
      })
    })
  })

  describe('non-strict mismatching options', () => {
    it('normalizes invalid sgGen for -is noun when not strict', () => {
      const noun = new Noun('spyris', {
        sgGen: 'ens',
      })

      expect(noun).toMatchObject({
        lemma: 'spyris',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: 'io',
        accent: undefined,
        availableNumbers: 'both',
      })
    })

    it('ignores explicit plGen -ų for non-is noun when not strict', () => {
      const noun = new Noun('namas', {
        plGen: 'ų',
      })

      expect(noun).toMatchObject({
        lemma: 'namas',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'both',
      })
    })
  })

  describe('plural-only -ys gender overrides', () => {
    it('creates feminine plural-only -ys noun when isMasculine is false', () => {
      const noun = new Noun('sultys', {
        availableNumbers: 'plural',
        isMasculine: false,
      })

      expect(noun).toMatchObject({
        lemma: 'sultis',
        isMasculine: false,
        isReflexive: false,
        isPlGenSpecial: true,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'plural',
      })
    })
  })

  describe('invalid plural-only inputs', () => {
    it('throws when availableNumbers is plural but lemma is not plural-shaped', () => {
      expect(
        () =>
          new Noun('namas', {
            availableNumbers: 'plural',
          }),
      ).toThrow(badNounError)
    })

    it('throws when plural-only noun has unsupported ending', () => {
      expect(
        () =>
          new Noun('abc', {
            availableNumbers: 'plural',
          }),
      ).toThrow(badNounError)
    })
  })

  describe('ignored isMasculine option for non-is non-uo nouns', () => {
    it('ignores isMasculine true for regular feminine nouns', () => {
      const noun = new Noun('ranka', {
        isMasculine: true,
      })

      expect(noun).toMatchObject({
        lemma: 'ranka',
        isMasculine: false,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'both',
      })
    })

    it('ignores isMasculine false for regular masculine nouns', () => {
      const noun = new Noun('namas', {
        isMasculine: false,
      })

      expect(noun).toMatchObject({
        lemma: 'namas',
        isMasculine: true,
        isReflexive: false,
        isPlGenSpecial: false,
        sgGen: undefined,
        accent: undefined,
        availableNumbers: 'both',
      })
    })

    it('throws for invalid noun ending', () => {
      expect(() => new Noun('abc')).toThrow(badNounError)
    })

    describe('strict mode', () => {
      it('throws in strict mode when -is noun has something else but -io/-ies', () => {
        expect(
          () =>
            new Noun('spyris', {
              sgGen: 'ens',
              isStrict: true,
            }),
        ).toThrow(masculineIsError)
      })

      it('throws in strict mode when -ys noun has something else but -io/-ies', () => {
        expect(
          () =>
            new Noun('dantys', {
              sgGen: 'ens',
              isStrict: true,
            }),
        ).toThrow(masculineIsError)
      })

      it('throws in strict mode when non-is noun has explicit plGen -ų', () => {
        expect(
          () =>
            new Noun('namas', {
              plGen: 'ų',
              isStrict: true,
            }),
        ).toThrow(isYsExplicitGenitiveUError)
      })

      it('throws in strict mode when feminine -is noun has sgGen -io', () => {
        expect(
          () =>
            new Noun('pilis', {
              isMasculine: false,
              sgGen: 'io',
              isStrict: true,
            }),
        ).toThrow(feminineIsError)
      })

      it('throws in strict mode when feminine -uo noun has non-ers sgGen', () => {
        expect(
          () =>
            new Noun('sesuo', {
              isMasculine: false,
              sgGen: 'ens',
              isStrict: true,
            }),
        ).toThrow(feminineUoError)
      })

      it('throws in strict mode when masculine -uo noun has invalid sgGen', () => {
        expect(
          () =>
            new Noun('akmuo', {
              sgGen: 'ies',
              isStrict: true,
            }),
        ).toThrow(masculineUoError)
      })

      it('throws in strict mode when an invalid noun is marked reflexive', () => {
        expect(
          () =>
            new Noun('ranka', {
              isReflexive: true,
              isStrict: true,
            }),
        ).toThrow(imasReflexiveError)
      })

      describe('valid strict reflexive cases', () => {
        it('allows -ymas noun to be reflexive in strict mode', () => {
          const noun = new Noun('mokymas', {
            isReflexive: true,
            isStrict: true,
          })

          expect(noun).toMatchObject({
            lemma: 'mokymas',
            isMasculine: true,
            isReflexive: true,
            isPlGenSpecial: false,
            sgGen: undefined,
            accent: undefined,
            availableNumbers: 'both',
          })
        })

        it('allows -ymasis noun to be reflexive by default in strict mode', () => {
          const noun = new Noun('mokymasis', {
            isStrict: true,
          })

          expect(noun).toMatchObject({
            lemma: 'mokymas',
            isMasculine: true,
            isReflexive: true,
            isPlGenSpecial: false,
            sgGen: 'io',
            accent: undefined,
            availableNumbers: 'both',
          })
        })
      })
    })
  })
})
