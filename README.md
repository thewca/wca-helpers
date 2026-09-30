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

Releases are managed by [Release Please](https://github.com/googleapis/release-please).

Use Conventional Commit prefixes when merging changes to `master`:

- `fix:` creates a patch release, for example `1.1.7 -> 1.1.8`.
- `feat:` creates a minor release, for example `1.1.7 -> 1.2.0`.
- `feat!:`, `fix!:`, or a `BREAKING CHANGE:` footer creates a major release, for example `1.1.7 -> 2.0.0`.

Release Please keeps a release PR up to date with the next version, `package.json`, `package-lock.json`, and `CHANGELOG.md`. Merge that release PR when the release should be published. The workflow then creates the Git tag and GitHub Release and publishes the package to npm.

Do not manually bump the package version for normal releases.

### Prereleases

For an occasional prerelease, use Release Please's `Release-As:` commit footer to request the exact prerelease version:

```text
feat: add WCIF v2 support

Release-As: 1.2.0-beta.1
```

To publish another beta, request the next version explicitly, for example `Release-As: 1.2.0-beta.2`. When the prerelease is ready to become stable, request the stable version, for example `Release-As: 1.2.0`.

Prerelease GitHub Releases are marked as prereleases. npm uses the prerelease identifier as the dist-tag, so `1.2.0-beta.1` is published under `beta` while stable versions are published under `latest`.

### Repository setup

npm Trusted Publishing should trust the GitHub Actions workflow `.github/workflows/release.yml` in `thewca/wca-helpers`.

The workflow can use GitHub's built-in token, but Release Please PRs created with that token do not trigger other GitHub Actions workflows. To have the normal PR test workflow run on Release Please PRs, configure a `RELEASE_PLEASE_TOKEN` secret with a GitHub token that can write repository contents, pull requests, and issues.

## Contributing

1. Fork it (<https://github.com/thewca/wca-helpers/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Meta

Distributed under the GPL license. See `LICENSE` for more information.

[https://github.com/thewca/wca-helpers](https://github.com/thewca/wca-helpers)
