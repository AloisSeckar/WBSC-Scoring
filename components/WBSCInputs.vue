<template>
  <div v-show="visible" :id="group" class="wbsc-inputs">
    <h3>{{ label }}</h3>
    <div v-if="tieVisible">
      <input :id="group + inputTie" type="checkbox" class="wbsc-select">
      <label :for="group + inputTie" class="ml-1">{{ tieLabel }}</label>
    </div>
    <div>
      <div v-if="baseVisible" class="inline-block">
        <label :for="group + inputBase" class="mr-1">{{ useT('editor.base.base') + ':' }}</label>
        <select :id="group + inputBase">
          <option v-for="opt in baseOptions" :key="opt.value" :value="opt.value" :selected="opt.selected">
            {{ opt.label }}
          </option>
        </select>
      </div>
      <div v-if="runTypeVisible" :id="group + inputRuntype + '-box'" class="inline-block">
        <label :for="group + inputRuntype" class="mx-1">{{ useT('editor.run') + ':' }}</label>
        <select :id="group + inputRuntype">
          <option v-for="opt in runTypeOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>
    <div>
      <label :for="group + inputBaseAction" class="mr-1">{{ useT('editor.action.action') + ':' }}</label>
      <select
        :id="group + inputBaseAction" class="wbsc-base-action-select form-control"
        @change="e => changeBaseActionNEW(e, group)">
        <option v-for="opt in baseActionOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <select
        :id="group + inputSpecAction" class="wbsc-specific-action-select form-control"
        :disabled="specActionDisabled" @change="e => changeSpecActionNEW(e, group)">
        <option v-for="opt in specActionOptions" :key="opt.value" :value="opt.value" :selected="opt.selected">
          {{ opt.label }}
        </option>
      </select>
    </div>
    <div :id="group + inputPosition">
      <label :for="group + inputBaseAction" class="mr-1">{{ useT('editor.involved') + ':' }}</label>
      <WBSCButton
        :group="group + inputPosition + inputAdd" label="+P"
        :disabled="addPosDisabled" @click="renderPosSelectItem(group)" />
      <WBSCButton
        :group="group + inputPosition + inputRemove" label="-P" class="btn-remove"
        :disabled="removePosDisabled" @click="unRenderPosSelectItem(group)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GUIOption } from '~/utils/wbsc-types'

const props = defineProps({
  group: { type: String, required: true },
  label: { type: String, required: true },
  visible: { type: Boolean, required: true },
})

const tieVisible = props.group === inputR1 || props.group === inputR2
const tieLabel = props.group === inputR1 ? 'Tiebreak (baseball (old))' : 'Tiebreak (baseball/softball)'

const baseVisible = props.group !== inputB
const baseOptions: GUIOption[] = renderBaseOptionsNEW(getBaseOptionsValueNEW(props.group))

const runTypeVisible = true
const runTypeOptions: GUIOption[] = [
  { value: 'e', label: 'ER' },
  { value: 'ue', label: 'UE' },
  { value: 'tu', label: 'TU' },
]

const baseActionOptions: GUIOption[] = renderBaseActionOptionsNEW(props.group)

const specActionOptions: Ref<GUIOption[]> = ref([])
const specActionDisabled = ref(false)

const addPosDisabled = ref(true)
const removePosDisabled = ref(true)

function changeBaseActionNEW(event: Event, group: string) {
  const baseAction = event.target as HTMLInputElement
  specActionOptions.value.length = 0
  if (group === inputB) {
    specActionOptions.value.push(...renderBatterSpecificActionOptionsNEW(baseAction.value))
  } else {
    specActionOptions.value.push(...renderRunnerSpecificActionOptionsNEW(baseAction.value, group))
  }
  specActionDisabled.value = specActionOptions.value.length < 1
  // TODO change impl
  setTimeout(() => changeSpecificAction(group))
}

function changeSpecActionNEW(event: Event, group: string) {
  const _specAction = event.target as HTMLInputElement
  // TODO change impl
  setTimeout(() => changeSpecificAction(group))
}
</script>
