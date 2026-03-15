import Verb from './Verb.ts'
import type {
  ConjugationType,
  DeclinedType,
  PrincipalPartsType,
} from './types.ts'
import type { PadalyvisType } from './flectors/conjugators/PadalyvisInflector.ts'
import type { PusdalyvisType } from './flectors/conjugators/PusdalyvisDecliner.ts'
import type { BudinysType } from './flectors/conjugators/BudinysInflector.ts'
export { Verb }
export type {
  BudinysType,
  ConjugationType,
  DeclinedType,
  PadalyvisType,
  PrincipalPartsType,
  PusdalyvisType,
}
