<template>
  <select
    :id="`${group}-pos${ord}`" class="wbsc-pos-select">
    <option v-for="opt in positions" :key="opt.value" :value="opt.value" :selected="opt.selected">
      {{ opt.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
defineProps({
  group: { type: String, required: true },
  ord: { type: Number as PropType<1 | 2 | 3 | 4>, required: true },
  positions: { type: Object as PropType<GUIOption[]>, required: true },
})
</script>
