import type { ConjugationType } from '~src/types.ts'
export const SOKTI = [`šo\u0300kti`, `šo\u0301kti`, `šo\u0303kti`, `šokti`]
export const YTI = [`y\u0301ti`, `yti`, `y\u0301ti`, `yti`]
export const OME = [`o\u0300mė`, `o\u0301mė`, `o\u0303mė`, `omė`]
export const OMO = [`o\u0300mo`, `o\u0301mo`, `o\u0303mo`, `omo`]
export const OMI = [`o\u0300mi`, `o\u0301mi`, `o\u0303mi`, `omi`]
export const OMA = [`o\u0300ma`, `o\u0301ma`, `o\u0303ma`, `oma`]
export const EMPTY_PRINCIPAL_PARTS = ['_', '_', '_']
export function makeInfinitiveRoots(root: string) {
  return [root, '_', '_']
}
export function makePastRoots(root: string) {
  return ['_', '_', root]
}
export function makePresentRoots(root: string) {
  return ['_', root, '_']
}

export function makePrincipalPartsArray(
  inf: string[],
  pres: string[],
  past: string[],
): string[][] {
  return inf.map((val, i) => [val, pres[i], past[i]])
}

export function makeConjugatedFromArray(
  arr: string[] | string[][],
): ConjugationType {
  const err = new Error('cannot make conjugation')
  if (arr.length === 6) {
    if (arr.every((v) => typeof v === 'string')) {
      return {
        sg1: arr[0],
        sg2: arr[1],
        sg3: arr[2],
        pl1: arr[3],
        pl2: arr[4],
        pl3: arr[5],
      }
    }
  }
  const flatten = arr.flat()
  if (flatten.length === 6 && arr.length === 2) {
    return makeConjugatedFromArray(flatten) as unknown as ConjugationType
  }
  if (flatten.length === 6 && arr.length === 3) {
    return makeConjugatedFromArray([
      arr[0][0],
      arr[1][0],
      arr[2][0],
      arr[0][1],
      arr[1][1],
      arr[2][1],
    ]) as unknown as ConjugationType
  }
  if (flatten.length === 5) {
    return makeConjugatedFromArray([...flatten, flatten[2]])
  }
  throw err
}
