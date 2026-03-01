import Conjugator from './Conjugator.ts'
import type { ConjugationType, PrincipalPartsType } from '~src/types.ts'
import { decorateConjugatedReflexive } from './utils.ts'
import { appendSuffixWithAssimilation } from '~src/utils.ts'

export default abstract class FiniteConjugator
  extends Conjugator<ConjugationType> {
  override conjugateUnprefixedReflexive(
    principalParts: PrincipalPartsType,
  ) {
    const conjugated = this.conjugateDefault(principalParts)
    return decorateConjugatedReflexive({
      sg1: appendSuffixWithAssimilation(conjugated.sg1, 's', [
        [/([^a])us$/, `$1uos`],
        [/([^a])u\u0300s$/, `$1u\u0301os`],
      ]),
      sg2: appendSuffixWithAssimilation(conjugated.sg2, 's', [
        [/([^a])is$/, `$1ies`],
        [/([^a])i\u0300s$/, `$1i\u0301es`],
      ]),
      sg3: conjugated.sg3 + 's',
      pl1: `${conjugated.pl1.split(' ')[1]}ės`,
      pl2: `${conjugated.pl2.split(' ')[1]}ės`,
      pl3: conjugated.pl3 + 's',
    })
  }
}
