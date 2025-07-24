<template>
  <ContentRenderer :value="data || {}" />
</template>

<script setup lang="ts">
const props = defineProps({
  source: { type: String, required: true },
})

setLocale()

const { locale } = useI18n()
const { data, refresh } = await useAsyncData(`${props.source}-content`, () => queryCollection('content').path(`/${locale.value}/${props.source}`).first())
watch (() => locale.value, () => {
  refresh()
})
</script>
