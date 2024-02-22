Changelog

## [1.9.1](https://github.com/nuxtus/generator/compare/v1.9.0...v1.9.1) (2024-02-22)


### Bug Fixes

* **deps:** update dependency @directus/sdk to v15.0.1 ([#79](https://github.com/nuxtus/generator/issues/79)) ([b7634c1](https://github.com/nuxtus/generator/commit/b7634c1ccb146dc580087b45b1de416f6e27dfd1))
* **deps:** update dependency nanoid to v5.0.6 ([315b2e7](https://github.com/nuxtus/generator/commit/315b2e7720236892c48b03f145f9c1124a80a6ad))

# [1.9.0](https://github.com/nuxtus/generator/compare/v1.8.0...v1.9.0) (2024-02-21)


### Bug Fixes

* **deps:** update dependency @directus/sdk to v15 ([e500026](https://github.com/nuxtus/generator/commit/e5000269ebdd9c68c4b36767516ad5cbd164938e))
* **deps:** update dependency chalk to v5.3.0 ([47d3d3f](https://github.com/nuxtus/generator/commit/47d3d3f49ab1c797478d13dfdec7c94717d3f6f4))
* **deps:** update dependency nanoid to v4.0.2 ([497a8e4](https://github.com/nuxtus/generator/commit/497a8e4aefdc53fa23aee513fd1117cb15b77d02))
* **deps:** update dependency nanoid to v5 ([d3a1356](https://github.com/nuxtus/generator/commit/d3a135627778d34fdedbce6fcdf917fefe56e280))
* **deps:** update dependency nunjucks to v3.2.4 ([1dd2c4a](https://github.com/nuxtus/generator/commit/1dd2c4a67cf8dd47f4a6ae0231b998d7630064ca))
* **deps:** update dependency openapi-typescript to v6.7.4 ([817a284](https://github.com/nuxtus/generator/commit/817a2845816a2310e0ca50c9b7cc745df2f81d0d))


### Features

* :sparkles: update templates to use Directus sdk ([d1f314f](https://github.com/nuxtus/generator/commit/d1f314f404c77b653065985a3ae04e6533fa8c22))

# [1.8.0](https://github.com/nuxtus/generator/compare/v1.7.0...v1.8.0) (2022-11-18)


### Bug Fixes

* **deps:** update dependency openapi-typescript to v6 ([6876fef](https://github.com/nuxtus/generator/commit/6876fef057042649097e2d648406ace7c27d5382))


### Code Refactoring

* :recycle: Move configuration into Nuxtus property ([beb3b6a](https://github.com/nuxtus/generator/commit/beb3b6a365ce15f5cfdd00ccebbea652116a5965))


### BREAKING CHANGES

* Configuration variables changed.

# [1.7.0](https://github.com/nuxtus/generator/compare/v1.6.0...v1.7.0) (2022-09-13)

# [1.6.0](https://github.com/nuxtus/generator/compare/v1.5.0...v1.6.0) (2022-09-12)

# [1.5.0](https://github.com/nuxtus/generator/compare/v1.4.1...v1.5.0) (2022-09-06)


### Features

* :sparkles: add ability to delete pages ([75e4325](https://github.com/nuxtus/generator/commit/75e43251d3a6f2df5173f0694074065be2b0b842))

## [1.4.1](https://github.com/nuxtus/generator/compare/v1.4.0...v1.4.1) (2022-08-30)


### Bug Fixes

* :bug: return the newly created static token ([83c4fc1](https://github.com/nuxtus/generator/commit/83c4fc1fcadc76ccc9e8e72fef2c215449c3497e))

# [1.4.0](https://github.com/nuxtus/generator/compare/v1.3.0...v1.4.0) (2022-08-29)


### Bug Fixes

* :bug: Directus static token login now works ([c4a3a18](https://github.com/nuxtus/generator/commit/c4a3a182552ad3f891fdc3bf6cdbec67e32568e6))


### Features

* :sparkles: use static token instead of logging in with email/password if set ([971de0e](https://github.com/nuxtus/generator/commit/971de0e09a9f3f5dcb7d8f3dfb8cdba2c574c118))

# [1.3.0](https://github.com/nuxtus/generator/compare/v1.2.2...v1.3.0) (2022-08-27)


### Features

* :sparkles: generate static token for auth ([059af45](https://github.com/nuxtus/generator/commit/059af454e1a60669293b096ea3c7c96633c6216f))

## [1.2.2](https://github.com/nuxtus/generator/compare/v1.2.1...v1.2.2) (2022-08-24)


### Bug Fixes

* :bug: fix incorrect email address for directus login ([0894254](https://github.com/nuxtus/generator/commit/08942547499f36904a22901058d9a6eee1bb07a2))

## [1.2.1](https://github.com/nuxtus/generator/compare/v1.2.0...v1.2.1) (2022-07-27)


### Bug Fixes

* :bug: change type to module in package.json ([66537ab](https://github.com/nuxtus/generator/commit/66537abb7340f98a97854825953363d1c3190782))

# [1.2.0](https://github.com/nuxtus/generator/compare/v1.1.2...v1.2.0) (2022-07-21)


### Features

* :sparkles: get type interface from directus ([d302ca0](https://github.com/nuxtus/generator/commit/d302ca0778dd5ce17c7ae26bc7c391c0de228008))
* :sparkles: retrieve type definitions from Directus ([b14ef54](https://github.com/nuxtus/generator/commit/b14ef54772c8d5a0e8b100f0414949cdacce36c4))

## [1.1.2](https://github.com/nuxtus/generator/compare/v1.1.1...v1.1.2) (2022-07-11)


### Bug Fixes

* include dist in build step ([3dc3d3f](https://github.com/nuxtus/generator/commit/3dc3d3f2ae514b7b70bd3a15e18d419308683ebb))

## [1.1.1](https://github.com/nuxtus/generator/compare/v1.1.0...v1.1.1) (2022-07-11)


### Bug Fixes

* :bug: singleton template is now properly located ([01177eb](https://github.com/nuxtus/generator/commit/01177eb9304bc4ecaedaaa7a02d69640289daea1))
* :fire: remove console.log of template path ([84249b4](https://github.com/nuxtus/generator/commit/84249b41c6b3f9fb53ae8840061ea4ae6d392a1e))
