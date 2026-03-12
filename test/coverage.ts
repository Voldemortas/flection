import type { MethodSpy } from '@std/testing/mock'
import { spy } from '@std/testing/mock'
import { describe, it } from '@std/testing/bdd'
import { expect } from '@std/expect'

// deno-coverage-ignore-start
export default function checkUsedExports(imported: object) {
  const spies: { name: string; s: MethodSpy }[] = []

  const objects = Object.entries(imported).filter((
    [_key, value],
  ) => (typeof value === 'object' && value.constructor.name !== 'Object')) as [
    string,
    object,
  ][]

  objects.forEach(([key, obj]) => {
    Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter((method) =>
      method !== 'constructor'
    ).forEach((method) => {
      try {
        //@ts-ignore spy is good
        const mySpy = spy(imported[key], method)
        spies.push({ name: `${key}.${method}`, s: mySpy })
      } catch (_e) {
        throw new Error(JSON.stringify({ key, method }))
      }
    })
  })

  const assertSpies = () => {
    describe('spy assertion', () => {
      spies.forEach(({ name, s }) => {
        it(`calls ${name} at least once`, () => {
          try {
            expect(s.calls.length).toBeGreaterThan(0)
          } catch (_e) {
            throw (`${name} not called`)
          } finally {
            s.restore()
          }
        })
      })
    })
  }

  return { assertSpies }
}
// deno-coverage-ignore-stop
