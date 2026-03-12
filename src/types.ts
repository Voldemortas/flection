export type PrincipalPartsType = [string, string, string]

export type ConjugationType = {
  sg1: string
  sg2: string
  sg3: string
  pl1: string
  pl2: string
  pl3: string
}

export enum Gender {
  masculine = 'masculine',
  feminine = 'feminine',
  neuter = 'neuter',
  common = 'common',
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
