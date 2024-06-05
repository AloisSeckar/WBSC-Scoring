<template>
  <ContentRendererMarkdown :value="data || {}" />
</template>

<script setup lang="ts">
const props = defineProps({
  source: { type: String, required: true },
})

const { locale } = useI18n()
const { data, refresh } = await useAsyncData(`${props.source}-content`, () => queryContent(`/${locale.value}/${props.source}`).findOne())
watch (() => locale.value, () => {
  refresh()
})
</script>
