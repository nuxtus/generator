# @nuxtus/generator

Takes a Directus collection object and creates a Nuxt page or pages.

Used by the [Nuxtus boilerplate](https://github.com/nuxtus/nuxtus) and [@nuxtus/cli](https://github.com/nuxtus/cli). This package is not designed to be used directly.

## Usage

```bash
$ npm install @nuxtus/generator
```

Then in your application:

```typescript
import { createPage } from "@nuxtus/generator"

createPage("collection-name", isSingleton)
```