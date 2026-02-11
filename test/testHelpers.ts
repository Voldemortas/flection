export const SOKTI = [`šo\u0300kti`, `šo\u0301kti`, `šo\u0303kti`, `šokti`]
export const YTI = [`y\u0301ti`, `yti`, `y\u0301ti`, `yti`]
export const ETI = [`ė\u0301ti`, `ėti`, `ė\u0301ti`, `ėti`]
export const OME = [`o\u0300mė`, `o\u0301mė`, `o\u0303mė`, `omė`]
export const OMO = [`o\u0300mo`, `o\u0301mo`, `o\u0303mo`, `omo`]
export function makeInfinitiveRoots(root: string) {
  return [root, '_', '_']
}
export function makePastRoots(root: string) {
  return ['_', '_', root]
}
