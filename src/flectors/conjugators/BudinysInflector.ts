import type { PrincipalPartsType } from '~src/types.ts'
import {
  getInfinitiveRoot,
  hasAnyAccent,
  isRootMonosyllabic,
} from '~src/utils.ts'
import AccentedInflector from '~decliners/AccentedInflector.ts'

/**
 * type for Padalyvis, it only has 1 type named `budinys`
 * ```ts
 * const eitiBudinys: BudinysType = {budinys: `eite`}
 *  ```
 */
export type BudinysType = {
  budinys: string
}

export const budinysStatic = {
  budinys: [`te`],
}
export const budinysDynamic = {
  budinys: [`te\u0300`],
}

const budinysAccentedFlector = new AccentedInflector<keyof BudinysType>(
  budinysStatic,
  budinysDynamic,
)

export default class BudinysInflector {
  getDefault(
    principalParts: PrincipalPartsType,
  ): BudinysType {
    const { root } = getInfinitiveRoot(principalParts)
    if (!isRootMonosyllabic(root) || !hasAnyAccent(root)) {
      return budinysAccentedFlector.inflectStatic(root)
    }
    return budinysAccentedFlector.inflectDynamic(root)
  }
}
