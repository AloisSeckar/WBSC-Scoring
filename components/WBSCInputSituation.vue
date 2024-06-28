<template>
  <div>
    <div v-if="tieVisible">
      <input :id="group + inputTie" v-model="model.tie" type="checkbox" class="wbsc-select">
      <label :for="group + inputTie" class="ml-1">{{ tieLabel }}</label>
    </div>
    <div>
      <div v-show="baseVisible" class="inline-block">
        <label :for="group + inputBase" class="mr-1">{{ useT('editor.base.base') + ':' }}</label>
        <select :id="group + inputBase" ref="baseSelect" v-model="model.base" @change="selectBase">
          <option v-for="opt in baseOptions" :key="opt.value" :value="opt.value" :selected="opt.selected">
            {{ opt.label }}
          </option>
        </select>
      </div>
      <div v-show="runTypeVisible" :id="group + inputRuntype + '-box'" class="inline-block">
        <label :for="group + inputRuntype" class="mx-1">{{ useT('editor.run') + ':' }}</label>
        <select :id="group + inputRuntype" v-model="model.runtype">
          <option v-for="opt in runTypeOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>
    </div>
    <div>
      <label :for="group + inputBaseAction" class="mr-1">{{ useT('editor.action.action') + ':' }}</label>
      <select
        :id="group + inputBaseAction" v-model="model.baseAction" class="wbsc-base-action-select form-control"
        @change="e => changeBaseAction(e, group)">
        <option v-for="opt in baseActionOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <select
        :id="group + inputSpecAction" v-model="model.specAction" class="wbsc-specific-action-select form-control"
        :disabled="specActionDisabled" @change="e => changeSpecAction(e, group)">
        <option v-for="opt in specActionOptions" :key="opt.value" :value="opt.value" :selected="opt.selected">
          {{ opt.label }}
        </option>
      </select>
    </div>
    <div :id="group + inputPosition">
      <label :for="group + inputBaseAction" class="mr-1">{{ useT('editor.involved') + ':' }}</label>
      <WBSCInputSituationPos
        v-show="pos1Show" v-model="model.pos1"
        :group :ord="1" :type="pos1Type" />
      <WBSCInputSituationPos
        v-show="pos2Show" v-model="model.pos2"
        :group :ord="2" :type="pos2Type" />
      <WBSCInputSituationPos
        v-show="pos3Show" v-model="model.pos3"
        :group :ord="3" type="player-locations" />
      <WBSCInputSituationPos
        v-show="pos4Show" v-model="model.pos4"
        :group :ord="4" type="player-locations" />
      <WBSCButton
        :group="group + inputPosition + inputAdd" label="+P"
        :disabled="addPosDisabled" @click="showPosSelectItem()" />
      <WBSCButton
        :group="group + inputPosition + inputRemove" label="-P" class="btn-remove"
        :disabled="removePosDisabled" @click="hidePosSelectItem()" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  group: { type: String, required: true },
})

const emit = defineEmits<{
  play: [out: boolean]
}>()

const model = defineModel<WBSCInput>({ required: true })

const tieVisible = props.group === inputR1 || props.group === inputR2
const tieLabel = props.group === inputR1 ? 'Tiebreak (baseball (old))' : 'Tiebreak (baseball/softball)'

const baseSelect: Ref<HTMLSelectElement | null> = ref(null)
const baseVisible = props.group !== inputB
const baseOptions: GUIOption[] = renderBaseOptions(getBaseOptionsValue(props.group))
model.value.base = props.group === inputB ? 0 : baseOptions.at(0)!.value as WBSCBase
function selectBase(event: Event) {
  const base = event.target as HTMLInputElement
  runTypeVisible.value = base.value.toString() === '4'
}

const runTypeVisible = ref(false)
const runTypeOptions: GUIOption[] = [
  { value: 'e', label: 'ER' },
  { value: 'ue', label: 'UE' },
  { value: 'tu', label: 'TU' },
]
model.value.runtype = runTypeOptions.at(0)!.value as string

const baseActionOptions: GUIOption[] = renderBaseActionOptions(props.group)

const specActionOptions: Ref<GUIOption[]> = ref([])
const specActionDisabled = ref(false)

const pos1Type: Ref<PositionType> = ref('player-locations')
const pos2Type: Ref<PositionType> = ref('player-locations')

function changeBaseAction(event: Event, group: string) {
  const baseAction = event.target as HTMLInputElement
  specActionOptions.value.length = 0
  if (group === inputB) {
    specActionOptions.value.push(...renderBatterSpecificActionOptions(baseAction.value))
  } else {
    specActionOptions.value.push(...renderRunnerSpecificActionOptions(baseAction.value, group))
  }
  specActionDisabled.value = specActionOptions.value.length < 1
  //
  if (baseAction.value === 'Hit') {
    pos1Type.value = 'hit-locations'
  } else {
    pos1Type.value = 'player-locations'
  }
  if (baseAction.value === 'FC' || baseAction.value === 'fdc') {
    pos2Type.value = 'fc-locations'
  } else {
    pos2Type.value = 'player-locations'
  }
  //
  model.value.specAction = specActionOptions.value[0]!.value as string
  handleChange(model.value.specAction as string, group)
}

function changeSpecAction(event: Event, group: string) {
  const specAction = event.target as HTMLInputElement
  handleChange(specAction.value, group)
  //
  if (group === inputB) {
    if (specAction.value === 'HR' || specAction.value === 'IHR') {
      baseSelect.value!.value = '4'
    } else {
      baseSelect.value!.value = '0'
    }
  }
  baseSelect.value!.dispatchEvent(new Event('change'))
}

function handleChange(specAction: string, group: string) {
  const out = changeSpecificAction(specAction, group)
  if (group === inputB) {
    if (specAction === '2B' || specAction === '2BG') {
      model.value.base = 2
    } else if (specAction === '3B') {
      model.value.base = 3
    } else if (specAction === 'HR' || specAction === 'HR') {
      model.value.base = 4
    } else {
      model.value.base = out ? 0 : 1
    }
  }
  emit('play', out)
  //
  hideAllPos()
  const targetPosItems = useEvalStore().getTargetPosItems(group)
  if (targetPosItems > 0) {
    pos1Show.value = true
  } else {
    model.value.pos1 = ''
  }
  if (targetPosItems > 1) {
    pos2Show.value = true
  } else {
    model.value.pos2 = ''
  }
  if (targetPosItems > 2) {
    pos3Show.value = true
  } else {
    model.value.pos3 = ''
  }
  if (targetPosItems > 3) {
    pos4Show.value = true
  } else {
    model.value.pos4 = ''
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

function showPosSelectItem() {
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

function hidePosSelectItem() {
  if (!pos1Show.value) {
    return
  } else {
    if (pos2Show.value) {
      if (pos3Show.value) {
        if (pos4Show.value) {
          pos4Show.value = false
          model.value.pos4 = ''
        } else {
          pos3Show.value = false
          model.value.pos3 = ''
        }
      } else {
        pos2Show.value = false
        model.value.pos2 = ''
      }
    } else {
      pos1Show.value = false
      model.value.pos1 = ''
    }
  }
}
</script>
