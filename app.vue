<template>
  <div class="flex justify-center">
    <div class="mx-2 md:w-4/5">
      <div class="text-center">
        <header class="mt-1 mb-2">
          <h1>WBSC Scoring Creator <span class="demo">DEMO</span></h1>
        </header>
        <div class="text-justify mb-16">
          <NuxtPage />
        </div>
        <footer class="fixed bottom-0 left-0 w-full p-1 bg-wbsc-blue text-black">
          Created and maintained by
          <a href="http://alois-seckar.cz" class="text-white hover:text-yellow-300">Alois Sečkár</a>
          (2019-2023)
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'WBSC Scoring Creator',
  meta: [
    { property: 'og:title', content: 'WBSC Scoring Creator' },
    { property: 'og:description', content: 'Visualisation for WBSC Scoring System' },
    { property: 'og:image', content: 'https://wbsc-scoring.netlify.app/demo.png' }
  ]
})
/*
useSeoMeta({
  title: 'WBSC Scoring Creator',
  ogTitle: 'WBSC Scoring Creator',
  description: 'Visualisation for WBSC Scoring System',
  ogDescription: 'Visualisation for WBSC Scoring System',
  ogImage: 'https://wbsc-scoring.netlify.app/demo.png',
  twitterCard: 'summary_large_image'
})
*/
</script>
