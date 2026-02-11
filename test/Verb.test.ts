import { expect } from 'jsr:@std/expect@^1.0.17'
import { describe, it } from 'jsr:/@std/testing@^1.0.16/bdd'
import Verb from '~src/Verb.ts'
import { threeRootsError } from '~src/errors.ts'

describe('Verb', () => {
  describe('constructor', () => {
    const principalParts = ['rinkti', 'renka', 'rinko']
    it('should get correct basic input', () => {
      const verb = new Verb('rinkti-renka-rinko')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.areReflexive).toStrictEqual([false, false, false])
      expect(verb.prefixes).toStrictEqual([undefined, undefined, undefined])
      assertEqualVerbs(new Verb(principalParts), verb)
    })
    it('should get correct reflexive input', () => {
      const verb = new Verb('rinktis-renkas-rinkosi')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.areReflexive).toStrictEqual([true, true, true])
      expect(verb.prefixes).toStrictEqual([undefined, undefined, undefined])
      assertEqualVerbs(new Verb(principalParts, { reflexive: true }), verb)
    })
    it('should get correct prefixed input', () => {
      const verb = new Verb('ne=rinkti-ne=renka-ne=rinko')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.areReflexive).toStrictEqual([false, false, false])
      expect(verb.prefixes).toStrictEqual(['ne', 'ne', 'ne'])
      assertEqualVerbs(new Verb(principalParts, { prefix: 'ne' }), verb)
    })
    it('should get correct prefixed and reflexed input', () => {
      const verb = new Verb('ne=rinktis-ne=renkasi-ne=rinkos')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.areReflexive).toStrictEqual([true, true, true])
      expect(verb.prefixes).toStrictEqual(['ne', 'ne', 'ne'])
      assertEqualVerbs(
        new Verb(principalParts, { prefix: 'ne', reflexive: true }),
        verb,
      )
    })
    it('should get correct prefix with reflexive input', () => {
      const verb = new Verb('nesi=rinkti-nesi=renka-nesi=rinko')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.areReflexive).toStrictEqual([true, true, true])
      expect(verb.prefixes).toStrictEqual(['ne', 'ne', 'ne'])
      assertEqualVerbs(
        new Verb(principalParts, { prefix: 'ne', reflexive: true }),
        verb,
      )
    })
    it('should correctly parse forms even when prefix and reflexiveness mismatch', () => {
      const verb = new Verb('rinktis-ne=renka-nesi=rinko')
      expect(verb.principalParts).toStrictEqual(principalParts)
      expect(verb.areReflexive).toStrictEqual([true, false, true])
      expect(verb.prefixes).toStrictEqual([undefined, 'ne', 'ne'])
    })
    it('it should throw when principal part count is not 3', () => {
      expect(() => new Verb('')).toThrow(threeRootsError)
      expect(() => new Verb('dėti-dedu')).toThrow(threeRootsError)
      expect(() => new Verb('dėti-dedu-dėjo-dėdavo')).toThrow(threeRootsError)
    })
  })

  function assertEqualVerbs(a: Verb, b: Verb) {
    expect(a.principalParts).toStrictEqual(b.principalParts)
    expect(a.prefixes).toStrictEqual(b.prefixes)
    expect(a.areReflexive).toStrictEqual(b.areReflexive)
  }
})
