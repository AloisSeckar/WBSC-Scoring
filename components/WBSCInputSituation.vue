<template>
  <div :id="group">
    <div v-if="tieVisible || nodpVisible">
      <div v-if="tieVisible" class="inline-block mx-2">
        <input :id="group + inputTie" v-model="model.tie" type="checkbox" class="wbsc-select">
        <label :for="group + inputTie" class="ml-1">{{ tieLabel }}</label>
      </div>
      <div v-if="nodpVisible" class="inline-block mx-2">
        <input :id="group + inputNodp" v-model="model.nodp" type="checkbox" class="wbsc-select">
        <label :for="group + inputNodp" class="ml-1">No DP</label>
      </div>
    </div>
    <div>
      <div v-show="baseVisible" class="inline-block">
        <label :for="group + inputBase" class="mr-1">{{ useT('editor.base.base') + ':' }}</label>
        <select :id="group + inputBase" ref="baseSelect" v-model="model.base" @change="changeBase()">
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
        :id="group + inputBaseAction" v-model="model.baseAction" class="wbsc-base-action-select form-control">
        <option v-for="opt in baseActionOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <select
        :id="group + inputSpecAction" v-model="model.specAction"
        class="wbsc-specific-action-select form-control" :disabled="specActionDisabled">
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
  play: [last: boolean]
}>()

const model = defineModel<WBSCInput>({ required: true })

const tieVisible = props.group === inputR1 || props.group === inputR2
const tieLabel = props.group === inputR1 ? 'Tiebreak (baseball (old))' : 'Tiebreak (baseball/softball)'

const nodpVisible = props.group === inputR1 || props.group === inputR2 || props.group === inputR3

const baseSelect: Ref<HTMLSelectElement | null> = ref(null)
const baseVisible = props.group !== inputB
const baseOptions: Ref<GUIOption[]> = ref([])
reloadBaseOptions()

watch(() => model.value.base, (newValue) => {
  if (newValue === 0 && props.group !== inputB) {
    model.value.base = baseOptions.value.at(0)!.value as WBSCBase
  }
}, { immediate: true })

const lastPlaySelected = ref(false)
const runTypeVisible = ref(false)
const runTypeOptions: GUIOption[] = [
  { value: 'e', label: 'ER' },
  { value: 'ue', label: 'UE' },
  { value: 'tu', label: 'TU' },
]
model.value.runtype = runTypeOptions.at(0)!.value as string

watch(() => model.value.base, () => {
  checkRunTypeVisible()
}, { immediate: true })

const baseActionOptions: Ref<GUIOption[]> = ref([])
reloadBaseActions()

const specActionOptions: Ref<GUIOption[]> = ref([])
const specActionDisabled = ref(true)

const pos1Type: Ref<PositionType> = ref('player-locations')
const pos2Type: Ref<PositionType> = ref('player-locations')

watch(() => model.value.baseAction, () => {
  reloadSpecActions()
  specActionDisabled.value = specActionOptions.value.length < 1
  //
  const baseAction = model.value.baseAction
  if (baseAction === 'Hit') {
    pos1Type.value = 'hit-locations'
  } else {
    pos1Type.value = 'player-locations'
  }
  if (baseAction === 'FC' || baseAction === 'fdc') {
    pos2Type.value = 'fc-locations'
  } else {
    pos2Type.value = 'player-locations'
  }
  //
  model.value.specAction = specActionOptions.value[0]?.value as string || ''
})

watch(() => model.value.specAction, () => {
  const specAction = model.value.specAction
  const last = changeSpecificAction(specAction, props.group)
  lastPlaySelected.value = last
  if (props.group === inputB) {
    runTypeVisible.value = false
    if (specAction === '2B' || specAction === '2BG') {
      model.value.base = 2
    } else if (specAction === '3B') {
      model.value.base = 3
    } else if (specAction === 'HR' || specAction === 'IHR') {
      model.value.base = 4
      runTypeVisible.value = true
    } else {
      model.value.base = last ? 0 : 1
    }
  } else {
    checkRunTypeVisible()
  }
  emit('play', last || model.value.base === 4)
})

function checkRunTypeVisible() {
  runTypeVisible.value = model.value.base?.toString() === '4' && !lastPlaySelected.value
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

watch(() => useEvalStore().getTargetPosItems(props.group), (targetPosItems) => {
  hideAllPos()
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
})

const { locale } = useI18n()
watch(() => locale.value, () => {
  reloadBaseOptions()
  reloadBaseActions()
  reloadSpecActions()
})

function reloadBaseOptions() {
  baseOptions.value.length = 0
  baseOptions.value.push(...renderBaseOptions(getBaseOptionsValue(props.group)))
}

function reloadBaseActions() {
  baseActionOptions.value.length = 0
  baseActionOptions.value.push(...renderBaseActionOptions(props.group))
}

function reloadSpecActions() {
  const baseAction = model.value.baseAction
  specActionOptions.value.length = 0
  if (props.group === inputB) {
    specActionOptions.value.push(...renderBatterSpecificActionOptions(baseAction))
  } else {
    specActionOptions.value.push(...renderRunnerSpecificActionOptions(baseAction, props.group))
  }
}

function changeBase() {
  if (model.value.base === 4) {
    emit('play', true)
  }
}
</script>
