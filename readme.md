# flection

My custom tool to make flectionally derived forms (and not only) with respect to
stress mobility (compare nesakiaũ vs nèlakiau)! The tool doesn't use any
external tool or library and derives everything by itself. You as the end user,
however, must provide certain data yourself, such as 3 principal parts for
verbs.

If you've found any mistakes/errors, make sure to
[open an issue](https://github.com/Voldemortas/flection/issues). A working web
endpoint shall be made public in the near future as well.

## Installation

To add it to your dependencies use one of the following

```bash
deno add jsr:@voldemortas/flection
pnpm i jsr:@voldemortas/flection
yarn add jsr:@voldemortas/flection
npx jsr add @voldemortas/flection
bunx jsr add @voldemortas/flection
```

And import with

```ts
import * as flection from '@voldemortas/flection'
```

or if using browser:

```ts
import * as flection from 'https://esm.sh/jsr/@voldemortas/flection'
```

## Usage

### Verb

`Verb` is the thing I am working on right now. The `Verb` object can act as a
wrapper and accepts several configurations:

```ts
const verb = new Verb (
    roots: string | string[],
    options: { reflexive?: boolean; prefix?: string } = {},
  )
```

`roots`: this parameter is mandatory, and it's either a string separated with
dashes `'rinkti-renka-rinko'` or an array `['rinkti', 'renka', 'rinko']`.

In order to tell the object to work with reflexive verbs, you can either set the
2nd options parameter as `{reflexive: true}` or change the first `roots`
parameter to have the reflexive particle such as `'rinktis-renkasi-rinkosi'` or
a corresponding array.

In order to tell the object to work with a certain prefix you can either set the
2nd parameter to `{prefix: 'ne'}` to include the negation prefix or use `=`
delimiter in the first parameter: `'ne=rinkti-ne=renka-ne=rinko'`. You may use
whatever prefix you want like `su`, a stacked batch like `nebesu` or anything
else, however, if you pass something that doesn't exist in Lithuanian, you may
get unexpected results.

And lastly you can combine prefix and reflexive by having the 2nd parameter
include both: `{reflexive: true, prefix: 'ne'}`, the same can be achieved by
doing either `'nesi=rinti-nesi=renka-nesi=rinko'` or even
`'ne=rinktis-ne=renkasi-ne=rinkosi'`.

The flector accepts accented roots as well, for that you must ensure the
principal parts have them: `'riñkt-reñka-riñko'`. The prefix shall not receive
the accent marker, the prefix `per-` is always acute in Lithuanian and this will
be reflected in derived forms.

The `Verb` class also exposes some internal static methods, if you need
something very specific like the reflexive form of a certain root. Make sure to
consult their documentation if you're planning to use it.

```ts
import { Verb } from '@voldemortas/flection'
const soktiConjugated1 = new Verb('ne=sokti-ne=soka-ne=soko')
  .conjugatePastFrequentativeIndicative()
const soktiConjugated2 = Verb.pastFrequentativeIndicative
  .conjugateBasicPrefixed(['sokti', 'soka', 'soko'], 'ne')
//both results are the same :)
```
