# Changelog

## [2.0.0](https://github.com/ppat/github-workflows/compare/v1.1.2...v2.0.0) (2025-08-03)


### ⚠ BREAKING CHANGES

* rename renovate workflows input params ([#174](https://github.com/ppat/github-workflows/issues/174))
* add two different types of release workflows - release-please + semantic-release ([#172](https://github.com/ppat/github-workflows/issues/172))
* combine mise configs into one and use mise to install npm packages ([#168](https://github.com/ppat/github-workflows/issues/168))
* prepare release workflow to accommodate both release-please and semantic-release ([#167](https://github.com/ppat/github-workflows/issues/167))

### 🧹 Miscellaneous

* **dev-tools:** update jdx/mise (v2025.7.29 -&gt; v2025.7.32) ([#162](https://github.com/ppat/github-workflows/issues/162)) ([ce75b55](https://github.com/ppat/github-workflows/commit/ce75b5599baccc696b5f0e0f2f0aadde6b0b4a64))
* **dev-tools:** update renovate (41.43.5 -&gt; 41.45.0) ([#163](https://github.com/ppat/github-workflows/issues/163)) ([346407f](https://github.com/ppat/github-workflows/commit/346407f41a2a74a127635a40860b5b79320d3e08))
* **dev-tools:** update tailscale/tailscale (v1.84.0 -&gt; v1.86.0) ([#165](https://github.com/ppat/github-workflows/issues/165)) ([e189b2d](https://github.com/ppat/github-workflows/commit/e189b2d08bbf90e8cb378efae2daa2ce8ea869a2))
* **github-actions:** pin ppat/homelab-ops-actions ([#180](https://github.com/ppat/github-workflows/issues/180)) ([31b72c8](https://github.com/ppat/github-workflows/commit/31b72c85ba97b38644b7beb5c02129b1ba0fe242))
* version homelab-ops-actions ([#179](https://github.com/ppat/github-workflows/issues/179)) ([bc1530a](https://github.com/ppat/github-workflows/commit/bc1530ac0c2a65abafbd29830f4a4789fa6c13ed))


### 🛠 Improvements

* add tests for reusable workflows ([#166](https://github.com/ppat/github-workflows/issues/166)) ([36c0a23](https://github.com/ppat/github-workflows/commit/36c0a23f109d5027f802f2f341d8e3ac3b809762))


### ✨ Features

* add two different types of release workflows - release-please + semantic-release ([#172](https://github.com/ppat/github-workflows/issues/172)) ([1a576b5](https://github.com/ppat/github-workflows/commit/1a576b55621a50e10d4b6a857bd936700161c484))
* add update-aqua-checksums reusable workflow ([#170](https://github.com/ppat/github-workflows/issues/170)) ([72bce7a](https://github.com/ppat/github-workflows/commit/72bce7a345bd71d14ae563b073d86c7d17131f65))
* minimize use of third party github-actions and use mise to install needed tools ([#169](https://github.com/ppat/github-workflows/issues/169)) ([8f2b066](https://github.com/ppat/github-workflows/commit/8f2b0668558b198437ebf8b1ea7ef6e44e770e3a))


### 🚀 Enhancements + Bug Fixes

* combine mise configs into one and use mise to install npm packages ([#168](https://github.com/ppat/github-workflows/issues/168)) ([7654f58](https://github.com/ppat/github-workflows/commit/7654f58f6c9c749cae529298ca9322811bdc58ab))
* extract common reusable workflow code for setting up repository and tools into shared action ([#171](https://github.com/ppat/github-workflows/issues/171)) ([e0f8fd9](https://github.com/ppat/github-workflows/commit/e0f8fd9abf0ff1f56955501144680c75f6ec31b9))
* fix github action versions ([5fad870](https://github.com/ppat/github-workflows/commit/5fad8707befea43d3f392fd2d0a242a724d885bf))
* move create-signed-commit github action to homelab-ops-actions repo ([#178](https://github.com/ppat/github-workflows/issues/178)) ([3a1a6c1](https://github.com/ppat/github-workflows/commit/3a1a6c1c5c6360fafaa4411279666150853198fe))
* move setup-repository-tools github action to homelab-ops-actions repo ([#176](https://github.com/ppat/github-workflows/issues/176)) ([95872a6](https://github.com/ppat/github-workflows/commit/95872a68a060b629a16da487699dad016b569f8a))
* prepare release workflow to accommodate both release-please and semantic-release ([#167](https://github.com/ppat/github-workflows/issues/167)) ([c578359](https://github.com/ppat/github-workflows/commit/c57835939fc365c902f58f39e8c5ab1885131f4f))
* rename renovate workflows input params ([#174](https://github.com/ppat/github-workflows/issues/174)) ([b6104b7](https://github.com/ppat/github-workflows/commit/b6104b7ed438339f9fbbda94f85f45ac9d6f3c83))

## [1.1.2](https://github.com/ppat/github-workflows/compare/v1.1.1...v1.1.2) (2025-07-30)


### Miscellaneous

* **dev-tools:** update jdx/mise (v2025.7.27 -&gt; v2025.7.29) ([#158](https://github.com/ppat/github-workflows/issues/158)) ([53fee2e](https://github.com/ppat/github-workflows/commit/53fee2e5adb1bf0c9f3b00fe7a45c160918a3a70))
* **dev-tools:** update renovate (41.43.2 -&gt; 41.43.5) ([#159](https://github.com/ppat/github-workflows/issues/159)) ([d6193c2](https://github.com/ppat/github-workflows/commit/d6193c2c1e695a1332fd38bee4b95a5894351044))
* **github-actions:** update actions/create-github-app-token (v1 -&gt; v2) ([#88](https://github.com/ppat/github-workflows/issues/88)) ([e69e408](https://github.com/ppat/github-workflows/commit/e69e408507ba76b68c7c844af5f88918f62b07d4))
* **github-actions:** update digest peter-evans/dockerhub-description (e98e4d1 -&gt; 432a30c) ([#69](https://github.com/ppat/github-workflows/issues/69)) ([a46ed34](https://github.com/ppat/github-workflows/commit/a46ed34fe981f23fb7286838916e07091c1999dd))
* **github-actions:** update digest tj-actions/changed-files (2f7c5bf -&gt; ed68ef8) ([#70](https://github.com/ppat/github-workflows/issues/70)) ([b4ec431](https://github.com/ppat/github-workflows/commit/b4ec431a247e7185f47b53c4c6e35b7c78140ce6))


### 🚀 Enhancements + Bug Fixes

* fix docker image build workflow for builds triggered from branches w/ non-alphanumeric characters in their name ([#161](https://github.com/ppat/github-workflows/issues/161)) ([c4a0277](https://github.com/ppat/github-workflows/commit/c4a0277a9de4574e4a185561eb6d52b961c6b0be))

## [1.1.1](https://github.com/ppat/github-workflows/compare/v1.1.0...v1.1.1) (2025-07-28)


### 🚀 Enhancements + Bug Fixes

* **github-actions:** update detect-changed-files workflow to enable specifying fetch depth ([#156](https://github.com/ppat/github-workflows/issues/156)) ([568badc](https://github.com/ppat/github-workflows/commit/568badcdad01fe6de50250d653c94a16e86e03f3))

## [1.1.0](https://github.com/ppat/github-workflows/compare/v1.0.0...v1.1.0) (2025-07-28)


### Miscellaneous

* **release:** update release please config ([#152](https://github.com/ppat/github-workflows/issues/152)) ([b0ad774](https://github.com/ppat/github-workflows/commit/b0ad77487d5fa75abd68ba7fad1035746176fdb7))


### ✨ Features

* add reusable workflow for chainsaw-test ([#154](https://github.com/ppat/github-workflows/issues/154)) ([eb85bfa](https://github.com/ppat/github-workflows/commit/eb85bfa5c9e2f762f2959de82309a9c45b0bc1d9))


### 🚀 Enhancements + Bug Fixes

* update ppat/renovate-presets (v0.0.2 -&gt; v0.0.3) ([#155](https://github.com/ppat/github-workflows/issues/155)) ([182d1e1](https://github.com/ppat/github-workflows/commit/182d1e121d1b5ac6f70432c7e071e905843aa63e))

## [1.0.0](https://github.com/ppat/github-workflows/compare/v0.1.2...v1.0.0) (2025-07-28)


### Miscellaneous

* **dev-tools:** update jdx/mise (v2025.7.10 -&gt; v2025.7.11) ([#130](https://github.com/ppat/github-workflows/issues/130)) ([1f3c112](https://github.com/ppat/github-workflows/commit/1f3c112f9d0ac7e2b673445cb2a76af9f01675d4))
* **dev-tools:** update jdx/mise (v2025.7.11 -&gt; v2025.7.17) ([#131](https://github.com/ppat/github-workflows/issues/131)) ([43bc804](https://github.com/ppat/github-workflows/commit/43bc804aa9113708022491628af6b7bfa4745e10))
* **dev-tools:** update jdx/mise (v2025.7.17 -&gt; v2025.7.27) ([#132](https://github.com/ppat/github-workflows/issues/132)) ([6e6b858](https://github.com/ppat/github-workflows/commit/6e6b858a06de1a03ae7e0d8cd216461f66bcd72c))
* **dev-tools:** update jdx/mise (v2025.7.4 -&gt; v2025.7.10) ([#127](https://github.com/ppat/github-workflows/issues/127)) ([bc016b3](https://github.com/ppat/github-workflows/commit/bc016b3783a94e2eeb077ea5d1e39e863412f2f9))
* **dev-tools:** update npm:renovate (40.57.1 -&gt; 41.43.2) ([#150](https://github.com/ppat/github-workflows/issues/150)) ([6e5ed60](https://github.com/ppat/github-workflows/commit/6e5ed606beccb53b016ace107665871ca0354541))
* **dev-tools:** update renovatebot/renovate (41.17.2 -&gt; 41.30.4) ([#128](https://github.com/ppat/github-workflows/issues/128)) ([f16c5b3](https://github.com/ppat/github-workflows/commit/f16c5b30a082c331ebe9bb336e89d3c8ad3105cf))
* **dev-tools:** update renovatebot/renovate (41.35.1 -&gt; 41.43.2) ([#146](https://github.com/ppat/github-workflows/issues/146)) ([3866332](https://github.com/ppat/github-workflows/commit/38663329882d1c2e567384208adaf23fa38f5228))
* **dev-tools:** update sirosen/texthooks (non-major) ([#144](https://github.com/ppat/github-workflows/issues/144)) ([6f5f11c](https://github.com/ppat/github-workflows/commit/6f5f11c2b5b9f89bd77ba680c35d5b662abc332b))
* **github-actions:** update jdx/mise-action (v2.3.1 -&gt; v2.4.4) ([#145](https://github.com/ppat/github-workflows/issues/145)) ([226c3d1](https://github.com/ppat/github-workflows/commit/226c3d1d1ce1d1d2a3483f95c7126461f75b7e9e))
* **github-actions:** update renovatebot/github-action (v43.0.2 -&gt; v43.0.5) ([#142](https://github.com/ppat/github-workflows/issues/142)) ([de9a001](https://github.com/ppat/github-workflows/commit/de9a0015c23fae3ea466c6bf44de46d49005f59a))
* **release:** prep for v1.0.0 release ([#136](https://github.com/ppat/github-workflows/issues/136)) ([f2c0ba3](https://github.com/ppat/github-workflows/commit/f2c0ba3ab9222096a09970d22fd4a3b95fdc4c89))


### ✨ Features

* create a reusable workflow for release-please ([#135](https://github.com/ppat/github-workflows/issues/135)) ([8d349ea](https://github.com/ppat/github-workflows/commit/8d349eaa3d1faf7ac6e2a23ef59454c32c1a58f5))
* create a reusable workflow for renovate ([#134](https://github.com/ppat/github-workflows/issues/134)) ([b086832](https://github.com/ppat/github-workflows/commit/b0868329138d151a87b829f16c71cd2d43a5687c))
* create workflow that wraps tj-actions/changed-files action ([#139](https://github.com/ppat/github-workflows/issues/139)) ([401f15e](https://github.com/ppat/github-workflows/commit/401f15ed5e2414d1c14cd27f7ffd6c68644dfa16))
* **dev-tools:** update mise packages ([#151](https://github.com/ppat/github-workflows/issues/151)) ([fbc8e44](https://github.com/ppat/github-workflows/commit/fbc8e44cdceaccad8d7676e430a7314521d2e60c))


### 🚀 Enhancements + Bug Fixes

* **dev-tools:** update mise packages ([#141](https://github.com/ppat/github-workflows/issues/141)) ([4533876](https://github.com/ppat/github-workflows/commit/453387621ff7cca784888829984c771c460bc7bf))
* make mise log level configurable + default to info instead of debug ([#137](https://github.com/ppat/github-workflows/issues/137)) ([e6e7e7a](https://github.com/ppat/github-workflows/commit/e6e7e7a5a4d4bd46288fd10b7bf37d4fe6a0274a))
* rename internal lint workflow - lint.yaml -&gt; self-lint.yaml ([#138](https://github.com/ppat/github-workflows/issues/138)) ([40537f0](https://github.com/ppat/github-workflows/commit/40537f0843e4a75248734a745a7c047963780a51))

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
