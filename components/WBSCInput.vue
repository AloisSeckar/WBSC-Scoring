<template>
  <div v-show="visible" :id="group" class="wbsc-inputs">
    <h3>{{ label }}</h3>
    <WBSCInputSituation v-model="model" :group />
    <div v-if="extra1Visible" :id="group + '-extra-1'">
      <WBSCButton
        :group="'button-' + extra1Group" :label="extra1Label" :css="extra1Css"
        :disabled="extra2Rendered" @click="toggleExtra1" />
      <WBSCInputSituation v-show="extra1Rendered" v-model="extra1Model" :group="extra1Group" />
    </div>
    <div v-if="extra2Visible" v-show="extra1Rendered" :id="group + '-extra-2'">
      <WBSCButton
        :group="'button-' + extra2Group" :label="extra2Label" :css="extra2Css"
        :disabled="extra3Rendered" @click="toggleExtra2" />
      <WBSCInputSituation v-show="extra2Rendered" v-model="extra2Model" :group="extra2Group" />
    </div>
    <div v-if="extra3Visible" v-show="extra1Rendered && extra2Rendered" :id="group + '-extra-3'">
      <WBSCButton
        :group="'button-' + extra3Group" :label="extra3Label"
        :css="extra3Css" @click="toggleExtra3" />
      <WBSCInputSituation v-show="extra3Rendered" v-model="extra3Model" :group="extra3Group" />
    </div>
  </div>
</template>

<script setup lang="ts">
import WBSCInputSituation from './WBSCInputSituation.vue'

const props = defineProps({
  group: { type: String, required: true },
  label: { type: String, required: true },
  visible: { type: Boolean, required: true },
})

const GUI = useGUIStore()
const input = useInputStore()

const model = input.getModel(props.group)

const extra1Visible = [inputB, inputR1, inputR2].includes(props.group)
const extra1Model = input.getExtra1Model(props.group)
const extra1Group = getExtra1Group(props.group)
const extra1Rendered = computed(() => {
  if (extra1Group === inputR2a) {
    return GUI.inputR2a
  } else if (extra1Group === inputR1a) {
    return GUI.inputR1a
  } else if (extra1Group === inputB1) {
    return GUI.inputB1
  }
  return false
})
const extra1Label = ref('+')
const extra1Css = ref('btn-add')
function toggleExtra1() {
  if (extra1Group === inputR2a) {
    GUI.inputR2a = !GUI.inputR2a
  } else if (extra1Group === inputR1a) {
    GUI.inputR1a = !GUI.inputR1a
  } else {
    GUI.inputB1 = !GUI.inputB1
  }
}
watch(extra1Rendered, (newValue) => {
  extra1Label.value = newValue ? '-' : '+'
  extra1Css.value = newValue ? 'btn-remove' : 'btn-add'
})

const extra2Visible = [inputB, inputR1].includes(props.group)
const extra2Model = input.getExtra2Model(props.group)
const extra2Group = getExtra2Group(props.group)
const extra2Rendered = computed(() => {
  if (extra2Group === inputR1b) {
    return GUI.inputR1b
  } else if (extra2Group === inputB2) {
    return GUI.inputB2
  }
  return false
})
const extra2Label = ref('+')
const extra2Css = ref('btn-add')
function toggleExtra2() {
  if (extra2Group === inputR1b) {
    GUI.inputR1b = !GUI.inputR1b
  } else {
    GUI.inputB2 = !GUI.inputB2
  }
}
watch(extra2Rendered, (newValue) => {
  extra2Label.value = newValue ? '-' : '+'
  extra2Css.value = newValue ? 'btn-remove' : 'btn-add'
})

const extra3Visible = [inputB].includes(props.group)
const extra3Model = input.getExtra3Model(props.group)
const extra3Group = getExtra3Group(props.group)
const extra3Rendered = computed(() => {
  if (extra3Group === inputB3) {
    return GUI.inputB3
  }
  return false
})
const extra3Label = ref('+')
const extra3Css = ref('btn-add')
function toggleExtra3() {
  GUI.inputB3 = !GUI.inputB3
}
watch(extra3Rendered, (newValue) => {
  extra3Label.value = newValue ? '-' : '+'
  extra3Css.value = newValue ? 'btn-remove' : 'btn-add'
})
</script>
