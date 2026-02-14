import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import Conjugator from '~src/flectors/Conjugator.ts'
import type { ConjugationType } from '~src/types.ts'
import { assertSpyCall, returnsNext, stub } from '@std/testing/mock'

class NonAbstractConjugator extends Conjugator {
  protected override conjugateBasicPrefixed(
    _prefix: string,
    _principalParts: string[],
  ): ConjugationType {
    return 'dasdfd' as unknown as ConjugationType
  }
  public override conjugateDefault(_principalParts: string[]): ConjugationType {
    return 'wasds' as unknown as ConjugationType
  }
}

describe('Conjugator', () => {
  const conjugator = new NonAbstractConjugator()
  describe('neiti', () => {
    it('calls default method for negated eiti', () => {
      const mockedValue = Math.random() as unknown as ConjugationType
      const myStub = stub(
        conjugator,
        'conjugateDefault',
        returnsNext([mockedValue]),
      )
      const result = conjugator.conjugatePrefixed(['eiti', 'eina', 'ėjo'], 'ne')
      expect(result).toStrictEqual(mockedValue)
      assertSpyCall(myStub, 0, {
        args: [['neiti', 'neina', 'nėjo']],
        returned: mockedValue,
      })
      myStub.restore()
    })
  })
})
