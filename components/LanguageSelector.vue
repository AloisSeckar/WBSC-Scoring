<template>
  <div class="text-center">
    <NuxtImg
      src="/flag-en.png" alt="EN" title="English"
      :class="locale === 'en' ? selectedLang : lang"
      @click="setLocale('en')"
    />
    <NuxtImg
      src="/flag-cs.png" alt="CS" title="Čeština"
      :class="locale === 'cs' ? selectedLang : lang"
      @click="setLocale('cs')"
    />
  </div>
</template>

<script setup lang="ts">
import initEditor from '@/utils/wbsc-global'

const lang = 'w-6 h-4 m-1 inline-block'
const selectedLang = 'w-6 h-4 m-1 inline-block border-2 border-amber-300'

const { locale } = useI18n()

async function setLocale(newLocale: string) {
  if (newLocale) {
    const storedLocale = useLocalStorage('wbsc-lang', 'en')
    storedLocale.value = newLocale
    locale.value = newLocale
    // currently editor UI is dynamically rendered via JS functions
    // therefore it cannot keep its state and upon translation it needs to be re-generated
    if (useRoute().path === '/') {
      initEditor()
    }

    return navigateTo(useRoute().fullPath)
  }
}
</script>
