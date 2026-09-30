# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.0.0](https://github.com/thewca/wca-helpers/tree/v2.0.0)

### Added

* WCIF 2 result conditions and participation rulesets
* The Head-to-Head round format

### Changed

* Updated all model fields and helpers for WCIF 2
* Changed `Competition.series` to `Series | null`

### Removed

* WCIF 1 advancement conditions
* The `AttemptResult` type, which WCIF 2 renamed to `ResultValue`

## [v1.1.1](https://github.com/thewca/wca-helpers/tree/v1.1.1) (2022-05-12)

### Added

* Functions for encoding and decoding activity codes

### Changed

* Updated model definitions to match the latest WCIF

## [v1.0.0](https://github.com/thewca/wca-helpers/tree/v1.0.0) (2018-10-13)

Initial release.
