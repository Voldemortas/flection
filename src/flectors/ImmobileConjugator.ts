import Conjugator from './Conjugator.ts'
import { hasAcuteAccent, hasAnyAccent, stripAllAccents } from '~src/utils.ts'
import type { ConjugationType } from '~src/types.ts'

export default abstract class ImmobileConjugator extends Conjugator {
  protected override conjugateBasicPrefixed(
    prefix: string,
    principalParts: string[],
  ): ConjugationType {
    const basicInflected = this.conjugateDefault(principalParts)
    const isPrefixAcute =
      Conjugator.ACUTE_PREFIXES.map(stripAllAccents).includes(prefix) ||
      hasAcuteAccent(prefix)
    if (
      Object.values(basicInflected).some(hasAnyAccent) &&
      isPrefixAcute
    ) {
      const prefixToUse = Conjugator.ACUTE_PREFIXES.filter((pr) =>
        stripAllAccents(pr) === prefix
      )[0] ?? prefix
      return Object.fromEntries(
        Object.entries(basicInflected).map((
          [key, value],
        ) => [
          key,
          ImmobileConjugator.applyPrefixToForm(
            prefixToUse,
            stripAllAccents(value),
          ),
        ]),
      ) as ConjugationType
    }
    return Object.fromEntries(
      Object.entries(basicInflected).map((
        [key, value],
      ) => [
        key,
        ImmobileConjugator.applyPrefixToForm(stripAllAccents(prefix), value),
      ]),
    ) as ConjugationType
  }
}
