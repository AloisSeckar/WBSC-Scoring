<template>
  <div v-bind="$attrs">
    <NuxtImg :src="`/${props.src}`" :alt="alt" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
})
</script>
