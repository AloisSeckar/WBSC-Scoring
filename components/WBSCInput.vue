<template>
  <div v-show="visible" :id="group" class="wbsc-inputs">
    <h3>{{ label }}</h3>
    <WBSCInputSituation v-model="model" :group @play="$e => disableExtra(1, $e)" />
    <div v-if="extra1Visible" :id="group + '-extra-1'">
      <WBSCButton
        :group="'button-' + extra1Group" :label="extra1Label" :css="extra1Css"
        :disabled="extra1Disabled || extra2Rendered" @click="toggleExtra1" />
      <WBSCInputSituation v-show="extra1Rendered" v-model="extra1Model" :group="extra1Group" @play="$e => disableExtra(2, $e)" />
    </div>
    <div v-if="extra2Visible" v-show="extra1Rendered" :id="group + '-extra-2'">
      <WBSCButton
        :group="'button-' + extra2Group" :label="extra2Label" :css="extra2Css"
        :disabled="extra2Disabled || extra3Rendered" @click="toggleExtra2" />
      <WBSCInputSituation v-show="extra2Rendered" v-model="extra2Model" :group="extra2Group" @play="$e => disableExtra(3, $e)" />
    </div>
    <div v-if="extra3Visible" v-show="extra1Rendered && extra2Rendered" :id="group + '-extra-3'">
      <WBSCButton
        :group="'button-' + extra3Group" :label="extra3Label" :css="extra3Css"
        :disabled="extra3Disabled" @click="toggleExtra3" />
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

const input = useInputStore()

const model = input.getModel(props.group)

// TODO there are already waaay too many watchers/computed/etc. stuff firing one over another
// try to refactor this to use only the minimum amount necessary...

const extra1Visible = [inputB, inputR1, inputR2].includes(props.group)
const extra1Disabled = ref(true)
const extra1Model = input.getExtra1Model(props.group)
const extra1Group = getExtra1Group(props.group)
const extra1Rendered = computed(() => input.isVisible(extra1Group))
const extra1Label = ref('+')
const extra1Css = ref('btn-add')
const toggleExtra1 = () => input.setVisible(extra1Group, !input.isVisible(extra1Group))
watch(extra1Rendered, (newValue) => {
  extra1Label.value = newValue ? '-' : '+'
  extra1Css.value = newValue ? 'btn-remove' : 'btn-add'
})
watch(extra1Disabled, (newValue) => {
  if (newValue) {
    if (props.group === inputB) {
      input.setVisible(inputB1, false)
      input.setVisible(inputB2, false)
      input.setVisible(inputB3, false)
    } else if (props.group === inputR1) {
      input.setVisible(inputR1a, false)
      input.setVisible(inputR1b, false)
    } else if (props.group === inputR2) {
      input.setVisible(inputR2, false)
    }
  }
})

const extra2Visible = [inputB, inputR1].includes(props.group)
const extra2Disabled = ref(true)
const extra2Model = input.getExtra2Model(props.group)
const extra2Group = getExtra2Group(props.group)
const extra2Rendered = computed(() => input.isVisible(extra2Group))
const extra2Label = ref('+')
const extra2Css = ref('btn-add')
const toggleExtra2 = () => input.setVisible(extra2Group, !input.isVisible(extra2Group))
watch(extra2Rendered, (newValue) => {
  extra2Label.value = newValue ? '-' : '+'
  extra2Css.value = newValue ? 'btn-remove' : 'btn-add'
})
watch(extra2Disabled, (newValue) => {
  if (newValue) {
    if (props.group === inputB) {
      input.setVisible(inputB2, false)
      input.setVisible(inputB3, false)
    } else if (props.group === inputR1) {
      input.setVisible(inputR2, false)
    }
  }
})

const extra3Visible = [inputB].includes(props.group)
const extra3Disabled = ref(true)
const extra3Model = input.getExtra3Model(props.group)
const extra3Group = getExtra3Group(props.group)
const extra3Rendered = computed(() => input.isVisible(extra3Group))
const extra3Label = ref('+')
const extra3Css = ref('btn-add')
const toggleExtra3 = () => input.setVisible(inputB3, !input.isVisible(inputB3))
watch(extra3Rendered, (newValue) => {
  extra3Label.value = newValue ? '-' : '+'
  extra3Css.value = newValue ? 'btn-remove' : 'btn-add'
})
watch(extra3Disabled, (newValue) => {
  if (newValue) {
    if (props.group === inputB) {
      input.setVisible(inputB3, false)
    }
  }
})

function disableExtra(level: 1 | 2 | 3, disable: boolean) {
  if (level === 1) {
    extra1Disabled.value = disable
  } else if (level === 2) {
    extra2Disabled.value = disable
  } else if (level === 3) {
    extra3Disabled.value = disable
  }
}
</script>
