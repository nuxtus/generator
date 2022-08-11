# @nuxtus/generator

Takes a Directus collection object and creates a Nuxt page or pages.

For more details visit [nuxtus.com](https://nuxtus.com) or [read the documentation](https://docs.nuxtus.com)

## Usage

```bash
$ npm install @nuxtus/generator
```

Then in your application:

```typescript
import { createPage } from "@nuxtus/generator"

createPage("collection-name", isSingleton)
```