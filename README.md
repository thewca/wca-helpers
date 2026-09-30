# WCA Helpers

> Helpers and class definitions for WCA and WCIF

[![Actions Status](https://github.com/thewca/wca-helpers/workflows/Test/badge.svg)](https://github.com/thewca/wca-helpers/actions)
[![Coverage Status](https://coveralls.io/repos/github/thewca/wca-helpers/badge.svg?branch=master)](https://coveralls.io/github/thewca/wca-helpers?branch=master)
[![npm version](https://badge.fury.io/js/%40wca%2Fhelpers.svg)](https://badge.fury.io/js/%40wca%2Fhelpers)

This package contains typescript interfaces for the different classes used in WCIF, as well as a library of helper functions to help you deal with WCA data, such as calculating averages and en/de-coding multi blind results.

## Installation

```sh
npm install @wca/helpers --save
```

## WCIF version compatibility

`@wca/helpers` 2.x targets WCIF 2.x. Use `@wca/helpers` 1.x for WCIF 1.x.

## Usage example

## Development setup

Run `npm run test:wcif-v2` to check ten live WCIF v2 responses against the
TypeScript models. You can pass competition IDs to check a different set.

## Meta

Distributed under the GPL license. See `LICENSE` for more information.

[https://github.com/thewca/wca-helpers](https://github.com/thewca/wca-helpers)

## Contributing

1. Fork it (<https://github.com/thewca/wca-helpers/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
