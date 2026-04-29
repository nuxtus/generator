# @resultcrafter/nuxtus-generator

Fork of [@nuxtus/generator](https://github.com/nuxtus/generator) with upgraded page templates.

Takes a Directus collection object and creates styled Nuxt pages with Tailwind CSS, smart field detection, and UUID routing.

## What's Updated (from @nuxtus/generator)

- **Styled templates**: All three page templates (list, detail, singleton) now produce Tailwind-styled output with `max-w-3xl` centered layout
- **Smart field detection**: Templates automatically detect common fields (`title` > `name` > `id`, `excerpt` > `description`, `date_created`, `content`)
- **UUID routing**: Detail pages use UUID-based routing (`/collection/:id`)
- **Prose styles**: HTML content rendered with scoped prose CSS (headings, lists, blockquotes, code blocks, images)
- **Not-found handling**: Detail page shows "Not found" with back navigation when item doesn't exist
- **Unique async keys**: Each template uses unique `useAsyncData` keys (`{collection}-list`, `{collection}-detail`, `{collection}-singleton`)
- **Singleton fix**: Uses `$readItems()` instead of `$readSingleton()` for SDK v21 compatibility

## Usage

```bash
$ npm install @resultcrafter/nuxtus-generator
```

Then in your application:

```typescript
import { createPage } from "@resultcrafter/nuxtus-generator"

createPage("collection-name", isSingleton)
```

## Templates

- `index.njk.vue` — Collection listing with styled cards, links, dates, and excerpts
- `individual.njk.vue` — Item detail with back nav, title, date, prose content, and not-found fallback
- `singleton.njk.vue` — Singleton page with title, description, and prose content
