import type { GeneratedTypeConfig } from '@intlify/core-base'

// set initial locale
// - prefer last value stored in local storage
// - on first visit use browser locale
export default defineNuxtPlugin(() => {
  const { $i18n } = useNuxtApp()
  const browserLocale = useBrowserLocale() || 'en'
  const storedLocale = useLocalStorage('wbsc-lang', browserLocale)
  $i18n.locale.value = storedLocale.value as GeneratedTypeConfig['locale']
})
