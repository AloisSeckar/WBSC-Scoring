<template>
  <ContentRenderer :value="data || {}" />
</template>

<script setup lang="ts">
const props = defineProps({
  source: { type: String, required: true },
})

const { locale } = useI18n()
const storedLocale = useLocalStorage('wbsc-lang', 'en')
locale.value = storedLocale.value

const { data, refresh } = await useAsyncData(`${props.source}-content`, () => queryCollection('content').path(`/${locale.value}/${props.source}`).first())
watch (() => locale.value, () => {
  refresh()
})
</script>
