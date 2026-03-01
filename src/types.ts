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

export type NounType = {
  gender: Omit<Gender, Gender.neuter>
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

export type AdjectiveType = {
  gender: Gender.masculine | Gender.feminine
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
  neuter: never
} & {
  gender: Gender.neuter
  neuter: string
  sgNom: never
  sgGen: never
  sgDat: never
  sgAcc: never
  sgInst: never
  sgLoc: never
  sgVoc: never
  plNom: never
  plGen: never
  plDat: never
  plAcc: never
  plInst: never
  plLoc: never
  plVoc: never
}

export type DeclinedType = NounType | AdjectiveType
