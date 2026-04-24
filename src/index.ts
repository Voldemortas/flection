import Verb from './Verb.ts'
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

export { normaliseAccents, Verb }
export type {
  BudinysType,
  ConjugationType,
  DeclinedType,
  InfinitiveType,
  PadalyvisType,
  ParticipleType,
  PrincipalPartsType,
  PusdalyvisType,
}
