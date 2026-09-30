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

## Usage example

## Development setup

```sh
git clone
cd wca-helpers
npm install
npm run build
npm test
```

## Release process

Releases are driven by the version in `package.json`. Create a PR that changes the version, including the matching `package-lock.json` update, then merge it to `master`. The release workflow tests and builds the package, publishes that exact version to npm, creates a `v<version>` tag, and creates a GitHub release.

Use npm's version command without creating a local Git tag:

```sh
# Stable releases
npm version patch --no-git-tag-version
npm version minor --no-git-tag-version
npm version major --no-git-tag-version

# Start a beta prerelease series
npm version prepatch --preid=beta --no-git-tag-version
npm version preminor --preid=beta --no-git-tag-version
npm version premajor --preid=beta --no-git-tag-version

# Advance an existing beta
npm version prerelease --preid=beta --no-git-tag-version
```

Prerelease identifiers become npm dist-tags automatically. For example, `1.2.0-beta.1` is published with the `beta` tag and is marked as a prerelease on GitHub. The same works for identifiers such as `alpha` and `rc`. Stable versions are published with the `latest` npm tag.

Examples:

- `1.1.7 -> 1.1.8`: patch release
- `1.1.7 -> 1.2.0`: minor release
- `1.1.7 -> 2.0.0`: major release
- `1.1.7 -> 1.2.0-beta.0`: first beta for 1.2.0
- `1.2.0-beta.0 -> 1.2.0-beta.1`: next beta
- `1.2.0-beta.1 -> 1.2.0`: stable release

The npm package must have GitHub Actions trusted publishing configured for `thewca/wca-helpers` and `.github/workflows/release.yml`.

## Contributing

1. Fork it (<https://github.com/thewca/wca-helpers/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Meta

Distributed under the GPL license. See `LICENSE` for more information.

[https://github.com/thewca/wca-helpers](https://github.com/thewca/wca-helpers)
