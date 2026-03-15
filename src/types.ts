/**
 * array made from infinitive, present-3rd and past-3rd
 * @example
 * ```ts
 * const accentedEiti: PrincipalPartsType = [`ei\u0303ti`, `ei\u0303na`, `ė\u0303jo`]
 * const accentlessBėgti: PrincipalPartsType = [`bėgt`, `bėga`, `bėgo`]
 * ```
 */
export type PrincipalPartsType = [string, string, string]

export type ConjugationType = {
  sg1: string
  sg2: string
  sg3: string
  pl1: string
  pl2: string
  pl3: string
}

export type DeclinedType = {
  sgNom: string
  sgGen: string
  sgDat: string
  sgAcc: string
  sgInst: string
  sgLoc: string
  sgVoc: string
  plNom: string
  plGen: string
  plDat: string
  plAcc: string
  plInst: string
  plLoc: string
  plVoc: string
}

export type AccentedValueType = (string | [string] | [string, string])[]

export type AccentuatedDeclinedType = Record<
  keyof DeclinedType,
  AccentedValueType
>

export type RootPatternType<T extends string> = { root: string; pattern: T }

// deno-lint-ignore no-explicit-any
export type AnyKeyType = keyof any

export type InflectionType<K extends AnyKeyType> = Record<K, string>
