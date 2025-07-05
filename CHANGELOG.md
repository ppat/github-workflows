# Changelog

## 0.0.1 (2025-07-05)


### ✨ Features

* add markdown linter workflow ([#32](https://github.com/ppat/github-workflows/issues/32)) ([06dad3c](https://github.com/ppat/github-workflows/commit/06dad3cf08a5e2c6a18a5e444730f0c9d9a6e887))
* add reusable github workflows for various types of linters ([#1](https://github.com/ppat/github-workflows/issues/1)) ([d43971d](https://github.com/ppat/github-workflows/commit/d43971deb7603563656d7ae67540c956f2507c46))
* add reusable workflow for validating kubernetes manifests ([#89](https://github.com/ppat/github-workflows/issues/89)) ([5307d2a](https://github.com/ppat/github-workflows/commit/5307d2a337d4db254281112a56899888746e454f))
* add terraform linter workflow ([#10](https://github.com/ppat/github-workflows/issues/10)) ([016d715](https://github.com/ppat/github-workflows/commit/016d715c901e547a756c2f57d8deb967809212c6))
* allow placing global ci mise.toml in this repo and localized mise.toml in each calling repo ([#9](https://github.com/ppat/github-workflows/issues/9)) ([9b53d83](https://github.com/ppat/github-workflows/commit/9b53d83841b355cf1e832f366cffeb02fe90780e))
* enable specifying mise cfg's to ignore at point of use via parameter ([#11](https://github.com/ppat/github-workflows/issues/11)) ([1349996](https://github.com/ppat/github-workflows/commit/134999656116bdee4ed1dd9a916dc87be632faef))
* **github-actions:** add github workflow to build + publish docker images ([#20](https://github.com/ppat/github-workflows/issues/20)) ([61ef909](https://github.com/ppat/github-workflows/commit/61ef9098ba9f903cd9e4b478b81a094bb2e06eb4))
* update commitlint monorepo (19.6.1 -&gt; 19.7.1) ([#26](https://github.com/ppat/github-workflows/issues/26)) ([4cf1f48](https://github.com/ppat/github-workflows/commit/4cf1f482104937a647273fde1ea892ccf199ee80))
* update commitlint monorepo (19.7.1 -&gt; 19.8.0) ([#45](https://github.com/ppat/github-workflows/issues/45)) ([31b81b2](https://github.com/ppat/github-workflows/commit/31b81b24db71dc2aa7c8125b995bfa755c8aa42e))
* update terraform validation to make use of a .ci.env file if it exists ([#39](https://github.com/ppat/github-workflows/issues/39)) ([4c81964](https://github.com/ppat/github-workflows/commit/4c8196477fcc56514e6aa0b1406542807af77e47))
* use mise.toml from workflows as global config ([#5](https://github.com/ppat/github-workflows/issues/5)) ([4933924](https://github.com/ppat/github-workflows/commit/4933924758ed3245a2aab42c8e71c47a0c147981))


### 🚀 Enhancements + Bug Fixes

* exclude changelogs files from being linted by lint-markdown.yaml ([38120c6](https://github.com/ppat/github-workflows/commit/38120c67e7bb077f21ecacd4c579593409855a18))
* fix mise cache keys ([#90](https://github.com/ppat/github-workflows/issues/90)) ([62ee291](https://github.com/ppat/github-workflows/commit/62ee291d9c42a81a81a88e08324f0116d56cbe7e))
* fix mise install issues ([#38](https://github.com/ppat/github-workflows/issues/38)) ([5525950](https://github.com/ppat/github-workflows/commit/55259501c5e72df7ba62618ae2a600318f046e08))
* git fetch depth should default to 1 unless necessary ([#12](https://github.com/ppat/github-workflows/issues/12)) ([7e0ccbf](https://github.com/ppat/github-workflows/commit/7e0ccbfb39499283c48dd73a5258b17c660ac952))
* **github-actions:** fix CVE-2025-30066 and pre-emptive security measures ([#46](https://github.com/ppat/github-workflows/issues/46)) ([15f6489](https://github.com/ppat/github-workflows/commit/15f6489056819b5ac347974af834440bd88a36f4))
* reintroduce the lost markdown lint config selection to lint-markdown ([4074dbf](https://github.com/ppat/github-workflows/commit/4074dbf6e3e66d97fef163006fdaa0557415934c))
* speed up renovate install in github workflow runs ([#91](https://github.com/ppat/github-workflows/issues/91)) ([58eab03](https://github.com/ppat/github-workflows/commit/58eab037afdd7a6609cc469f6370fc70bb41ff4e))
* test lint-markdown.yaml ([3e23c9e](https://github.com/ppat/github-workflows/commit/3e23c9e55cc89d1e2e055e4899a6eae7eec886f6))
* update commitlint monorepo (19.8.0 -&gt; 19.8.1) ([#60](https://github.com/ppat/github-workflows/issues/60)) ([c7787d2](https://github.com/ppat/github-workflows/commit/c7787d24127bb67ad979764ed3d8f703afd36973))
* update commitlint-plugin-function-rules (4.0.1 -&gt; 4.0.2) ([#80](https://github.com/ppat/github-workflows/issues/80)) ([ee1115c](https://github.com/ppat/github-workflows/commit/ee1115c779c02a1d0145ba6d1f6080a3a29ce064))
* update markdown lint to make config within repo being linted ([#33](https://github.com/ppat/github-workflows/issues/33)) ([91b250b](https://github.com/ppat/github-workflows/commit/91b250b9195953f545de9ac90089fd291f17afaa))
