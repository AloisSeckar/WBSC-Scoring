<template>
  <select
    :id="`${group}-pos${ord}`" v-model="model" class="wbsc-pos-select">
    <option v-for="opt in options" :key="opt.value" :value="opt.value" :selected="opt.selected">
      {{ opt.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps({
  group: { type: String, required: true },
  ord: { type: Number as PropType<1 | 2 | 3 | 4>, required: true },
  type: { type: String as PropType<PositionType>, required: true },
})

const model = defineModel<string>({ required: true })

const options = computed(() => {
  switch (props.type) {
    case 'fc-locations':
      return getFCLocations()
    case 'hit-locations':
      return getHitLocations()
    default:
      return getPlayerLocations()
  }
})
</script>
