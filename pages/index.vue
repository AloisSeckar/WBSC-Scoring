<template>
  <div class="text-center">
    <h2>{{ $t('index.editor') }} <span class="text-red-500">v1.1</span></h2>

    <div class="container">
      <div id="wbsc-inputs" class="mb-2">
        <!-- inputs are dynamically rendered here -->
      </div>
      <!-- modal window triggered by validation errors -->
      <ValidationModal v-show="useEvalStore().errorShow" />
      <!-- modal window triggered by "import from library" -->
      <ImportModal v-show="useEvalStore().importShow" />
    </div>

    <h2>{{ $t('index.output') }}</h2>

    <canvas id="canvas" class="mx-auto my-4" width="325" height="250" />

    <div class="mx-auto mb-8 w-48">
      <a id="download-link" class="btn btn-download">{{ $t('index.download') }}</a>
    </div>

    <h2>{{ $t('index.about') }}</h2>

    <div class="mt-2 text-justify">
      <p v-html="$t('index.dscr')" />
    </div>
    <div class="my-6">
      <div class="text-center">
        <NuxtLink class="btn btn-link" to="/project">
          {{ $t('index.overview') }}
        </NuxtLink>
        <NuxtLink class="btn btn-link" to="/help">
          {{ $t('index.manual') }}
        </NuxtLink>
        <NuxtLink class="btn btn-clear" to="/report">
          {{ $t('index.report') }}
        </NuxtLink>
      </div>
    </div>
    <div class="mb-12 text-justify">
      <p v-html="$t('index.license')" />
      <p v-html="$t('index.endorse')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import initEditor from '@/utils/wbsc-global'

usePageMeta(WBSC_PAGE_META)

onMounted(() => initEditor())
</script>
