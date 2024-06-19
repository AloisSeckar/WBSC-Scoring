<template>
  <div>
    <div v-if="tieVisible">
      <input :id="group + inputTie" type="checkbox" class="wbsc-select">
      <label :for="group + inputTie" class="ml-1">{{ tieLabel }}</label>
    </div>
    <div>
      <div v-show="baseVisible" class="inline-block">
        <label :for="group + inputBase" class="mr-1">{{ useT('editor.base.base') + ':' }}</label>
        <select :id="group + inputBase" ref="baseSelect" @change="selectBaseNEW">
          <option v-for="opt in baseOptions" :key="opt.value" :value="opt.value" :selected="opt.selected">
            {{ opt.label }}
          </option>
        </select>
      </div>
      <div v-show="runTypeVisible" :id="group + inputRuntype + '-box'" class="inline-block">
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
      <WBSCInputSituationPos v-show="pos1Show" :group :ord="1" :positions />
      <WBSCInputSituationPos v-show="pos2Show" :group :ord="2" :positions />
      <WBSCInputSituationPos v-show="pos3Show" :group :ord="3" :positions />
      <WBSCInputSituationPos v-show="pos4Show" :group :ord="4" :positions />
      <WBSCButton
        :group="group + inputPosition + inputAdd" label="+P"
        :disabled="addPosDisabled" @click="showPosSelectItemNEW()" />
      <WBSCButton
        :group="group + inputPosition + inputRemove" label="-P" class="btn-remove"
        :disabled="removePosDisabled" @click="hidePosSelectItemNEW()" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  group: { type: String, required: true },
})

const tieVisible = props.group === inputR1 || props.group === inputR2
const tieLabel = props.group === inputR1 ? 'Tiebreak (baseball (old))' : 'Tiebreak (baseball/softball)'

const baseSelect: Ref<HTMLSelectElement | null> = ref(null)
const baseVisible = props.group !== inputB
const baseOptions: GUIOption[] = renderBaseOptionsNEW(getBaseOptionsValueNEW(props.group))
function selectBaseNEW(event: Event) {
  const base = event.target as HTMLInputElement
  runTypeVisible.value = base.value.toString() === '4'
}

const runTypeVisible = ref(false)
const runTypeOptions: GUIOption[] = [
  { value: 'e', label: 'ER' },
  { value: 'ue', label: 'UE' },
  { value: 'tu', label: 'TU' },
]

const baseActionOptions: GUIOption[] = renderBaseActionOptionsNEW(props.group)

const specActionOptions: Ref<GUIOption[]> = ref([])
const specActionDisabled = ref(false)

// TODO dynamic hits + FCs
const positions = computed(() => {
  return renderPlayerOptionsNEW()
})

function changeBaseActionNEW(event: Event, group: string) {
  const baseAction = event.target as HTMLInputElement
  specActionOptions.value.length = 0
  if (group === inputB) {
    specActionOptions.value.push(...renderBatterSpecificActionOptionsNEW(baseAction.value))
  } else {
    specActionOptions.value.push(...renderRunnerSpecificActionOptionsNEW(baseAction.value, group))
  }
  specActionDisabled.value = specActionOptions.value.length < 1
  //
  handleChange(specActionOptions.value[0]!.value as string, group)
}

function changeSpecActionNEW(event: Event, group: string) {
  const specAction = event.target as HTMLInputElement
  handleChange(specAction.value, group)
  //
  if (specAction.value === 'HR' || specAction.value === 'IHR') {
    baseSelect.value!.value = '4'
  } else {
    baseSelect.value!.value = '0'
  }
  baseSelect.value!.dispatchEvent(new Event('change'))
}

function handleChange(specAction: string, group: string) {
  changeSpecificAction(specAction, group)
  hideAllPos()
  const targetPosItems = useEvalStore().getTargetPosItems(group)
  if (targetPosItems > 0) {
    pos1Show.value = true
  }
  if (targetPosItems > 1) {
    pos2Show.value = true
  }
  if (targetPosItems > 2) {
    pos3Show.value = true
  }
  if (targetPosItems > 3) {
    pos4Show.value = true
  }
}

const pos1Show = ref(false)
const pos2Show = ref(false)
const pos3Show = ref(false)
const pos4Show = ref(false)

function hideAllPos() {
  pos1Show.value = false
  pos2Show.value = false
  pos3Show.value = false
  pos4Show.value = false
}

const posShown = computed(() => {
  let shown = 0
  if (pos1Show.value) {
    shown++
  }
  if (pos2Show.value) {
    shown++
  }
  if (pos3Show.value) {
    shown++
  }
  if (pos4Show.value) {
    shown++
  }
  return shown
})

const addPosDisabled = computed(() => {
  return posShown.value >= useEvalStore().getMaxPosItems(props.group)
})
const removePosDisabled = computed(() => {
  return posShown.value <= useEvalStore().getMinPosItems(props.group)
})

function showPosSelectItemNEW() {
  if (pos4Show.value) {
    return
  } else {
    if (!pos3Show.value) {
      if (!pos2Show.value) {
        if (!pos1Show.value) {
          pos1Show.value = true
        } else {
          pos2Show.value = true
        }
      } else {
        pos3Show.value = true
      }
    } else {
      pos4Show.value = true
    }
  }
}

function hidePosSelectItemNEW() {
  if (!pos1Show.value) {
    return
  } else {
    if (pos2Show.value) {
      if (pos3Show.value) {
        if (pos4Show.value) {
          pos4Show.value = false
        } else {
          pos3Show.value = false
        }
      } else {
        pos2Show.value = false
      }
    } else {
      pos1Show.value = false
    }
  }
}
</script>
