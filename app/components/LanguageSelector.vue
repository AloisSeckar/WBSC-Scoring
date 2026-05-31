<template>
  <div class="text-center">
    <img
      src="/img/flag-en.png" alt="EN" title="English"
      :class="locale === 'en' ? selectedLang : lang"
      @click="setNewLocale('en')">
    <img
      src="/img/flag-cs.png" alt="CS" title="Čeština"
      :class="locale === 'cs' ? selectedLang : lang"
      @click="setNewLocale('cs')">
    <img
      src="/img/flag-it.png" alt="IT" title="Italiano"
      :class="locale === 'it' ? selectedLang : lang"
      @click="setNewLocale('it')">
  </div>
</template>

<script setup lang="ts">
import type { GeneratedTypeConfig } from '@intlify/core-base'

const lang = 'w-6 h-4 m-1 inline-block'
const selectedLang = 'w-6 h-4 m-1 inline-block border-2 border-amber-300'

type AppLocale = GeneratedTypeConfig['locale']

const { locale, locales, setLocale } = useI18n()

const browserLocale = useBrowserLocale()
const userLocale = useLocalStorage('wbsc-lang', browserLocale)
const initialLocale = (userLocale.value || browserLocale || 'en') as string
if (initialLocale !== locale.value && locales.value.some(l => l.code === initialLocale)) {
  await setLocale(initialLocale as AppLocale)
}

async function setNewLocale(newLocale: AppLocale) {
  const storedLocale = useLocalStorage('wbsc-lang', browserLocale)
  storedLocale.value = newLocale
  await setLocale(newLocale)
}
</script>
