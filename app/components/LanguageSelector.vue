<template>
  <div class="text-center">
    <button
      id="lang-en" type="button" class="cursor-pointer"
      aria-label="English" @click="setNewLocale('en')">
      <img
        src="/img/flag-en.png" alt=""
        title="English" :class="locale === 'en' ? selectedLang : lang">
    </button>
    <button
      id="lang-cs" type="button" class="cursor-pointer"
      aria-label="Čeština" @click="setNewLocale('cs')">
      <img
        src="/img/flag-cs.png" alt=""
        title="Čeština" :class="locale === 'cs' ? selectedLang : lang">
    </button>
    <button
      id="lang-it" type="button" class="cursor-pointer"
      aria-label="Italiano" @click="setNewLocale('it')">
      <img
        src="/img/flag-it.png" alt=""
        title="Italiano" :class="locale === 'it' ? selectedLang : lang">
    </button>
  </div>
</template>

<script setup lang="ts">
import type { GeneratedTypeConfig } from '@intlify/core-base'

const lang = 'w-6 h-4 m-1 inline-block'
const selectedLang = 'w-6 h-4 m-1 inline-block border-2 border-amber-300'

type AppLocale = GeneratedTypeConfig['locale']

const { locale, setLocale } = useI18n()

async function setNewLocale(newLocale: AppLocale) {
  const storedLocale = useLocalStorage('wbsc-lang', newLocale)
  storedLocale.value = newLocale
  await setLocale(newLocale)
}
</script>
