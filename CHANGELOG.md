# Changelog

## [0.1.2](https://github.com/ppat/github-workflows/compare/v0.1.1...v0.1.2) (2025-07-13)


### Miscellaneous

* **dev-tools:** update jdx/mise (v2025.6.8 -&gt; v2025.7.0) ([#116](https://github.com/ppat/github-workflows/issues/116)) ([adfea80](https://github.com/ppat/github-workflows/commit/adfea80c9a58cad7e705e4d070a2e182fa4660e9))
* **dev-tools:** update jdx/mise (v2025.7.0 -&gt; v2025.7.1) ([#119](https://github.com/ppat/github-workflows/issues/119)) ([d238a5a](https://github.com/ppat/github-workflows/commit/d238a5aa008da13502f4f57f64bf097c7c613e12))
* **dev-tools:** update jdx/mise (v2025.7.1 -&gt; v2025.7.3) ([#121](https://github.com/ppat/github-workflows/issues/121)) ([a752671](https://github.com/ppat/github-workflows/commit/a752671518e9d4bd185c6aa1e233f36378c4eb42))
* **dev-tools:** update jdx/mise (v2025.7.3 -&gt; v2025.7.4) ([#125](https://github.com/ppat/github-workflows/issues/125)) ([5eebf8a](https://github.com/ppat/github-workflows/commit/5eebf8a9d254bdcd8dfd79459785f95ddd664df9))
* **dev-tools:** update renovatebot/renovate (41.7.2 -&gt; 41.17.2) ([#117](https://github.com/ppat/github-workflows/issues/117)) ([33aa1e8](https://github.com/ppat/github-workflows/commit/33aa1e8fe7048dabd1fe162f44d0bd2a1e60334f))
* **github-actions:** update jdx/mise-action (v2.2.3 -&gt; v2.3.1) ([#118](https://github.com/ppat/github-workflows/issues/118)) ([5948b49](https://github.com/ppat/github-workflows/commit/5948b49aa9f4795d42e0cf6644b59591d7883d7c))
* **github-actions:** update renovatebot/github-action (v43.0.1 -&gt; v43.0.2) ([#122](https://github.com/ppat/github-workflows/issues/122)) ([ef12ebe](https://github.com/ppat/github-workflows/commit/ef12ebed8f1782cb8c0c6dc90c49151b1ec4ff47))
* **lang-sdk:** update node (non-major) ([#124](https://github.com/ppat/github-workflows/issues/124)) ([c2fb74b](https://github.com/ppat/github-workflows/commit/c2fb74b9da0ea1934a4af9da707009c90940ecbd))
* **lang-sdk:** update uv (non-major) ([#123](https://github.com/ppat/github-workflows/issues/123)) ([0b5cfaf](https://github.com/ppat/github-workflows/commit/0b5cfafb4dd4ea76cd43cde5a2684de9c83c9f5a))


### 🚀 Enhancements + Bug Fixes

* do not persist git credentials in workflows unless needed ([#126](https://github.com/ppat/github-workflows/issues/126)) ([911175a](https://github.com/ppat/github-workflows/commit/911175ababcdeac39133f54d93a9fa6c7ec6d628))

## [0.1.1](https://github.com/ppat/github-workflows/compare/v0.1.0...v0.1.1) (2025-07-05)


### Miscellaneous

* do not hide chore commits in release notes ([659c246](https://github.com/ppat/github-workflows/commit/659c2467f8b63b761e3e5752b969a40c938fa353))


### 🚀 Enhancements + Bug Fixes

* build-docker-image workflow was breaking due to missing tailscale binaries ([#114](https://github.com/ppat/github-workflows/issues/114)) ([2373e2d](https://github.com/ppat/github-workflows/commit/2373e2df4a3cd32dfda4e30fb6cd1738e7aa9879))

## [0.1.0](https://github.com/ppat/github-workflows/compare/v0.0.1...v0.1.0) (2025-07-05)


### ⚠ BREAKING CHANGES

* remove validate-kubernetes-manifests workflow, use ppat/validate-kubernetes-manifests action instead ([#110](https://github.com/ppat/github-workflows/issues/110))

### 🚀 Enhancements + Bug Fixes

* remove validate-kubernetes-manifests workflow, use ppat/validate-kubernetes-manifests action instead ([#110](https://github.com/ppat/github-workflows/issues/110)) ([ebd5f4c](https://github.com/ppat/github-workflows/commit/ebd5f4c2c4442149e74879ed51e104ec451f88ad))

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
