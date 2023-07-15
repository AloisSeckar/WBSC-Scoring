<template>
  <div class="text-center">
    <img src="/flag-en.png" alt="EN" title="English" :class="locale === 'en' ? selectedLang : lang" @click="setLocale('en')">
    <img src="/flag-cs.png" alt="CS" title="Čeština" :class="locale === 'cs' ? selectedLang : lang" @click="setLocale('cs')">
  </div>
</template>

<script setup lang="ts">
import init from '@/utils/wbsc-global.js'

const lang = 'w-6 m-1 inline-block'
const selectedLang = 'w-6 m-1 inline-block border-2 border-amber-300'

const { locale } = useI18n()

function setLocale (newLocale: string) {
  locale.value = newLocale
  // currently editor UI is dynamically rendered via JS functions
  // therefore it cannot keep its state and upon translation it needs to be re-generated
  init()
}
</script>
