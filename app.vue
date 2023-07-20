<template>
  <div>
    <Head>
      <Title>WBSC Scoring Creator</Title>
      <Meta property="description" content="Visualisation for WBSC Scoring System" />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content="https://wbsc-scoring.netlify.app" />
      <Meta property="og:title" content="WBSC Scoring Creator" />
      <Meta property="og:description" content="Visualisation for WBSC Scoring System" />
      <Meta property="og:image" content="https://wbsc-scoring.netlify.app/demo.png" />
    </Head>
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
            <a href="http://alois-seckar.cz" class="text-white hover:text-yellow-300">Alois Sečkár</a>
            (2019-2023)
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
