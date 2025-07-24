<template>
  <div id="top" class="flex justify-center">
    <div class="mx-2 md:w-4/5">
      <ClientOnly>
        <LanguageSelector />
        <div class="text-center">
          <header class="mt-1 mb-2">
            <h1 class="cursor-pointer" @click="toIndex">
              WBSC-like Scoring <span class="text-red-500">Creator</span>
            </h1>
          </header>
          <div class="text-left sm:text-justify mb-16">
            <NuxtPage />
          </div>
          <footer class="fixed bottom-0 left-0 w-full p-1 bg-wbsc-blue text-black text-xs">
            {{ $t('footer.creator') }}
            <NuxtLink to="http://alois-seckar.cz" class="text-white! hover:text-yellow-300! hover:bg-wbsc-blue!">
              Alois Sečkár
            </NuxtLink>
            (2019-{{ new Date().getFullYear() }})
            |
            Powered by
            <NuxtLink to="https://github.com/AloisSeckar/nuxt-ignis" class="text-white! hover:text-yellow-300! hover:bg-wbsc-blue!">
              nuxt-ignis
            </NuxtLink>
            |
            {{ $t('footer.version') }}
            <strong>{{ useAppConfig().fullVersion }}</strong>
          </footer>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
initConsola()
setLocale()

useHead({
  htmlAttrs: {
    lang: useI18n().locale.value,
  },
})

const title = ref(getPageTitle(useRoute().path))
usePageMeta({
  ...WBSC_PAGE_META,
  title,
})
useRouter().beforeEach((to) => {
  title.value = getPageTitle(to.path)
})

function toIndex() {
  return navigateTo('/')
}
</script>
