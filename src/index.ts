import Verb from './Verb.ts'
import Noun from './Noun.ts'
import type { NounOptionsType } from './Noun.ts'
import { normaliseAccents } from '~helpers/index.ts'
import type {
  ConjugationType,
  DeclinedType,
  PrincipalPartsType,
} from './types.ts'
import type { InfinitiveType } from '~conjugators/InfinitiveConjugator.ts'
import type { ParticipleType } from '~conjugators/ParticipleDecliner.ts'
import type { PadalyvisType } from '~conjugators/PadalyvisInflector.ts'
import type { PusdalyvisType } from '~conjugators/PusdalyvisDecliner.ts'
import type { BudinysType } from '~conjugators/BudinysInflector.ts'
import type { AccentuationType } from '~decliners/utils.ts'

export { normaliseAccents, Noun, Verb }
export type {
  AccentuationType,
  BudinysType,
  ConjugationType,
  DeclinedType,
  InfinitiveType,
  NounOptionsType,
  PadalyvisType,
  ParticipleType,
  PrincipalPartsType,
  PusdalyvisType,
}
