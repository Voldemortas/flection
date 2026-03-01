import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { PrincipalPartsType } from '~src/types.ts'
import ImasDecliner from '~conjugators/ImasDecliner.ts'
import AsDeclinator from '~decliners/AsDeclinator.ts'

describe('ImasDecliner', () => {
  const decliner = new ImasDecliner()
  describe(`bė\u0301gti`, () => {
    const principalParts: PrincipalPartsType = [
      `bė\u0301gti`,
      `bė\u0301ga`,
      `bė\u0301go`,
    ]
    const expectedRoot = `bėgi\u0300m`
    it('declines default', () => {
      expect(decliner.getDefault(principalParts))
        .toMatchObject(AsDeclinator.declineAsNounII(expectedRoot))
    })
    it('declines reflexive', () => {
      expect(decliner.getReflexive(principalParts))
        .toMatchObject(AsDeclinator.declineAsReflexiveNoun(expectedRoot))
    })
    it('declines negated reflexive', () => {
      expect(decliner.getPrefixedReflexive(principalParts, 'ne'))
        .toMatchObject(AsDeclinator.declineAsNounII(`nesi${expectedRoot}`))
    })
    it('declines prefix per', () => {
      expect(decliner.getPrefixed(principalParts, 'per'))
        .toMatchObject(AsDeclinator.declineAsNounI(`pe\u0301rbėgim`))
    })
    it('declines negated', () => {
      expect(decliner.getPrefixed(principalParts, 'ne'))
        .toMatchObject(AsDeclinator.declineAsNounII(`ne${expectedRoot}`))
    })
  })
  describe(`dėti`, () => {
    const principalParts: PrincipalPartsType = [`dėti`, `deda`, `dėjo`]
    const expectedRoot = `dėjim`
    it('declines default', () => {
      expect(decliner.getDefault(principalParts))
        .toMatchObject(AsDeclinator.declineAsNounI(expectedRoot))
    })
    it('declines reflexive', () => {
      expect(decliner.getReflexive(principalParts))
        .toMatchObject(AsDeclinator.declineAsReflexiveNoun(expectedRoot))
    })
    it('declines negated reflexive', () => {
      expect(decliner.getPrefixedReflexive(principalParts, 'ne'))
        .toMatchObject(AsDeclinator.declineAsNounI(`nesi${expectedRoot}`))
    })
    it('declines prefix per', () => {
      expect(decliner.getPrefixed(principalParts, 'per'))
        .toMatchObject(AsDeclinator.declineAsNounI(`per${expectedRoot}`))
    })
    it('declines negated', () => {
      expect(decliner.getPrefixed(principalParts, 'ne'))
        .toMatchObject(AsDeclinator.declineAsNounI(`ne${expectedRoot}`))
    })
  })
  describe(`saky\u0301ti`, () => {
    const principalParts: PrincipalPartsType = [
      `saky\u0301ti`,
      `sa\u0303ko`,
      `sa\u0303kė`,
    ]
    const expectedRoot = `sa\u0303kym`
    it('declines default', () => {
      expect(decliner.getDefault(principalParts))
        .toMatchObject(AsDeclinator.declineAsNounI(expectedRoot))
    })
    it('declines reflexive', () => {
      expect(decliner.getReflexive(principalParts))
        .toMatchObject(AsDeclinator.declineAsReflexiveNoun(expectedRoot))
    })
    it('declines negated reflexive', () => {
      expect(decliner.getPrefixedReflexive(principalParts, 'ne'))
        .toMatchObject(AsDeclinator.declineAsNounI(`nesi${expectedRoot}`))
    })
    it('declines prefix per', () => {
      expect(decliner.getPrefixed(principalParts, 'per'))
        .toMatchObject(AsDeclinator.declineAsNounI(`pe\u0301rsakym`))
    })
    it('declines negated', () => {
      expect(decliner.getPrefixed(principalParts, 'ne'))
        .toMatchObject(AsDeclinator.declineAsNounI(`ne${expectedRoot}`))
    })
  })
})
