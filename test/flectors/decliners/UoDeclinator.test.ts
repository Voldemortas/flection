import { describe, it } from '@std/testing/bdd'
import { expect } from '@std/expect'
import { Gender } from '~src/types.ts'
import { makeDeclinedFromArray } from '~test/testHelpers.ts'
import UoDeclinator from '~decliners/UoDeclinator.ts'

const AKMUO = makeDeclinedFromArray(Gender.masculine, [
  [`akmuo\u0303`, `a\u0303kmenys`],
  [`akmen\u0303s`, `akmenų\u0303`],
  [`a\u0303kmeniui`, `akmeni\u0300ms`],
  [`a\u0303kmenį`, `a\u0303kmenis`],
  [`a\u0303kmeniu`, `akmenimi\u0300s`],
  [`akmenyje\u0300`, `akmenyse\u0300`],
  [`akmenie\u0303`, `a\u0303kmenys`],
])

describe('UoDeclinator', () => {
  it('declines a noun', () => {
    expect(UoDeclinator.decline(`akm`, 'b'))
      .toMatchObject(AKMUO)
  })
})
