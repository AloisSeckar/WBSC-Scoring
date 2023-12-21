<template>
  <div>
    <div id="top" class="flex justify-center">
      <div class="mx-2 md:w-4/5">
        <LanguageSelector />
        <div class="text-center">
          <header class="mt-1 mb-2">
            <h1>WBSC Scoring Creator <span class="demo">DEMO</span></h1>
          </header>
          <div class="text-justify mb-16">
            <NuxtPage />
          </div>
          <footer class="fixed bottom-0 left-0 w-full p-1 bg-wbsc-blue text-black">
            {{ $t('footer.creator') }}
            <NuxtLink to="http://alois-seckar.cz" class="text-white hover:text-yellow-300">
              Alois Sečkár
            </NuxtLink>
            (2019-{{ new Date().getFullYear() }})
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const storedLocale = useLocalStorage('wbsc-lang', 'en')

if (storedLocale.value && typeof storedLocale.value === 'string') {
  locale.value = storedLocale.value
}

useHead({
  htmlAttrs: {
    lang: locale.value
  }
})
</script>
