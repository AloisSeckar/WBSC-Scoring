import { useT as useIgnisT } from '../node_modules/nuxt-ignis/composables/useTranslation'

export function useT(key: string): string {
  return useIgnisT(key)
}
