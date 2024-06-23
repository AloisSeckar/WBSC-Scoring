<template>
  <div v-bind="$attrs" class="my-4">
    <img
      :src="`/img/${props.src}`" :alt
      :width :height :class="css">
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  width: { type: Number },
  height: { type: Number },
  css: { type: String },
})
</script>
