<!-- eslint-disable vue/no-v-html (HTML content is used only from internal i18n) -->
<template>
  <div class="text-center">
    <h2>{{ $t('index.editor') }} <span class="text-red-500">{{ version }}</span></h2>

    <div class="container">
      <div id="wbsc-inputs">
        <WBSCInput :group="inputB" :label="useT('editor.batter')" :visible="isVisible(inputB)" />
        <WBSCInput :group="inputR1" :label="useT('editor.r1')" :visible="isVisible(inputR1)" />
        <WBSCInput :group="inputR2" :label="useT('editor.r2')" :visible="isVisible(inputR2)" />
        <WBSCInput :group="inputR3" :label="useT('editor.r3')" :visible="isVisible(inputR3)" />
        <WBSCToolbar ref="toolbar" />
      </div>
      <!-- modal window triggered by validation errors -->
      <ModalValidation />
      <!-- modal window triggered by "import from library" -->
      <ModalImport />
    </div>

    <h2>{{ $t('index.output') }}</h2>

    <canvas id="canvas" class="mx-auto my-4 w-full min-[325px]:w-[325px]" />

    <div class="flex mb-6 justify-center">
      <a id="download-link" class="btn btn-download min-w-40">{{ $t('index.download') }}</a>
    </div>

    <h2>{{ $t('index.about') }}</h2>

    <div class="mt-2 text-left sm:text-justify">
      <p v-html="$t('index.dscr')" />
    </div>
    <div class="my-6">
      <div class="flex flex-col min-[525px]:flex-row items-center justify-center">
        <NuxtLink class="btn btn-link min-w-40" to="/project">
          {{ $t('index.overview') }}
        </NuxtLink>
        <NuxtLink class="btn btn-link min-w-40" to="/help">
          {{ $t('index.manual') }}
        </NuxtLink>
        <NuxtLink class="btn btn-clear min-w-40" to="/report">
          {{ $t('index.report') }}
        </NuxtLink>
      </div>
    </div>
    <div class="mb-12 text-left sm:text-justify">
      <p v-html="$t('index.license')" />
      <p v-html="$t('index.endorse')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WBSCToolbar } from '#components'

const { locale } = useI18n()
const storedLocale = useLocalStorage('wbsc-lang', 'en')
locale.value = storedLocale.value

const version = 'v' + useAppConfig().publicVersion

const toolbar: Ref<InstanceType<typeof WBSCToolbar> | null> = ref(null)
onMounted(() => toolbar.value?.init())

function isVisible(group: string): boolean {
  return useInputStore().isVisible(group)
}
</script>
