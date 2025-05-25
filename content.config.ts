import { defineCollection, defineContentConfig } from '@nuxt/content'

// TODO manage to export default collection properly from nuxt-ignis layer
export default defineContentConfig({
  collections: {
    content: defineCollection({
      source: '**',
      type: 'page',
    }),
  },
})
