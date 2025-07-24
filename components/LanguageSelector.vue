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
const lang = 'w-6 h-4 m-1 inline-block'
const selectedLang = 'w-6 h-4 m-1 inline-block border-2 border-amber-300'

const { locale } = useI18n()

async function setNewLocale(newLocale: string) {
  if (newLocale) {
    const storedLocale = useLocalStorage('wbsc-lang', 'en')
    storedLocale.value = newLocale
    locale.value = newLocale
    return navigateTo(useRoute().fullPath)
  }
}
</script>
