<template>
  <div v-bind="$attrs" class="mb-2">
    <NuxtImg :src="`/${props.src}`" :alt :width :height />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  width: { type: Number },
  height: { type: Number },
})
</script>
