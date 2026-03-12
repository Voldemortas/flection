import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import type { PrincipalPartsType } from '~src/types.ts'
import ImasDecliner from '~conjugators/ImasDecliner.ts'
import { EITI } from '~test/testHelpers.ts'
import { AsNounDecliner, AsReflexiveDecliner } from '~decliners/commons.ts'

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
        .toMatchObject(AsNounDecliner.inflectStatic(expectedRoot))
    })
    it('declines reflexive', () => {
      expect(decliner.getReflexive(principalParts))
        .toMatchObject(AsReflexiveDecliner.inflectStatic(expectedRoot))
    })
    it('declines negated reflexive', () => {
      expect(decliner.getPrefixedReflexive(principalParts, 'ne'))
        .toMatchObject(AsNounDecliner.inflectStatic(`nesi${expectedRoot}`))
    })
    it('declines prefix per', () => {
      expect(decliner.getPrefixed(principalParts, 'per'))
        .toMatchObject(AsNounDecliner.inflectStatic(`pe\u0301rbėgim`))
    })
    it('declines negated', () => {
      expect(decliner.getPrefixed(principalParts, 'ne'))
        .toMatchObject(AsNounDecliner.inflectStatic(`ne${expectedRoot}`))
    })
  })
  describe(`dėti`, () => {
    const principalParts: PrincipalPartsType = [`dėti`, `deda`, `dėjo`]
    const expectedRoot = `dėjim`
    it('declines default', () => {
      expect(decliner.getDefault(principalParts))
        .toMatchObject(AsNounDecliner.inflectStatic(expectedRoot))
    })
    it('declines reflexive', () => {
      expect(decliner.getReflexive(principalParts))
        .toMatchObject(AsReflexiveDecliner.inflectStatic(expectedRoot))
    })
    it('declines negated reflexive', () => {
      expect(decliner.getPrefixedReflexive(principalParts, 'ne'))
        .toMatchObject(AsNounDecliner.inflectStatic(`nesi${expectedRoot}`))
    })
    it('declines prefix per', () => {
      expect(decliner.getPrefixed(principalParts, 'per'))
        .toMatchObject(AsNounDecliner.inflectStatic(`per${expectedRoot}`))
    })
    it('declines negated', () => {
      expect(decliner.getPrefixed(principalParts, 'ne'))
        .toMatchObject(AsNounDecliner.inflectStatic(`ne${expectedRoot}`))
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
        .toMatchObject(AsNounDecliner.inflectStatic(expectedRoot))
    })
    it('declines reflexive', () => {
      expect(decliner.getReflexive(principalParts))
        .toMatchObject(AsReflexiveDecliner.inflectStatic(expectedRoot))
    })
    it('declines negated reflexive', () => {
      expect(decliner.getPrefixedReflexive(principalParts, 'ne'))
        .toMatchObject(AsNounDecliner.inflectStatic(`nesi${expectedRoot}`))
    })
    it('declines prefix per', () => {
      expect(decliner.getPrefixed(principalParts, 'per'))
        .toMatchObject(AsNounDecliner.inflectStatic(`pe\u0301rsakym`))
    })
    it('declines negated', () => {
      expect(decliner.getPrefixed(principalParts, 'ne'))
        .toMatchObject(AsNounDecliner.inflectStatic(`ne${expectedRoot}`))
    })
    it('declines negated eiti', () => {
      expect(decliner.getPrefixed(EITI, 'ne').sgNom)
        .toStrictEqual('nėjimas')
    })
  })
})
