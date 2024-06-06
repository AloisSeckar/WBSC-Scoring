<template>
  <button
    :id="'button-' + group" type="button"
    :class="`btn ${css}`">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  group: { type: String, required: true },
  label: { type: String, required: true },
  css: { type: String, default: 'btn-add' },
})
</script>
