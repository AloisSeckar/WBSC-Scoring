import { useT as useIgnisT } from '../../node_modules/nuxt-ignis/app/composables/useTranslation'

export function useT(key: string): string {
  return useIgnisT(key)
}
