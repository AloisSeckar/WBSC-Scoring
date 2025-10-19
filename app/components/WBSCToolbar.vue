<template>
  <div id="wbsc-toolbar" class="wbsc-buttons">
    <div class="flex flex-row justify-center">
      <WBSCButton :group="'button-' + inputB" :label="labelB" :css="cssB" @click="toggleInputs(inputB)" />
      <WBSCButton :group="'button-' + inputR1" :label="labelR1" :css="cssR1" @click="toggleInputs(inputR1)" />
      <WBSCButton :group="'button-' + inputR2" :label="labelR2" :css="cssR2" @click="toggleInputs(inputR2)" />
      <WBSCButton :group="'button-' + inputR3" :label="labelR3" :css="cssR3" @click="toggleInputs(inputR3)" />
    </div>
    <div class="flex flex-row justify-center">
      <WBSCButton
        :group="'button-' + inputGenerate" :label="useT('editor.button.generate')"
        css="btn-generate" @click="processAction()" />
      <WBSCButton
        :group="'button-' + inputClear" :label="useT('editor.button.clear')"
        css="btn-clear" @click="clearInputs()" />
    </div>
    <div class="flex flex-row flex-wrap justify-center">
      <WBSCButton
        :group="'button-' + inputImport" :label="'&#8664; ' + useT('editor.button.import')"
        css="btn-json" @click="importFile()" />
      <WBSCButton
        :group="'button-' + inputImportLib" :label="'&#8664; ' + useT('editor.button.importLib')"
        css="btn-json" @click="useEvalStore().importShow = true" />
      <WBSCButton
        :group="'button-' + inputExport" :label="useT('editor.button.export') + ' &#8663;'"
        css="btn-json" @click="exportInputAsJSON()" />
    </div>
    <input
      :id="inputImportFile" type="file" class="hidden"
      accept="application/json" @change="importInputFromJSON()">
  </div>
</template>

<script setup lang="ts">
const input = useInputStore()
function init() {
  useCanvasStore().init()
  useInputStore().clear()
  extendDownloadButton()
}

defineExpose({
  init,
})

const labelB = ref('+B')
const cssB = ref('btn-add')
watch(() => input.inputB.visible, (newValue) => {
  labelB.value = newValue ? '-B' : '+B'
  cssB.value = newValue ? 'btn-remove' : 'btn-add'
}, { immediate: true })

const labelR1 = ref('+R1')
const cssR1 = ref('btn-add')
watch(() => input.inputR1.visible, (newValue) => {
  labelR1.value = newValue ? '-R1' : '+R1'
  cssR1.value = newValue ? 'btn-remove' : 'btn-add'
})

const labelR2 = ref('+R2')
const cssR2 = ref('btn-add')
watch(() => input.inputR2.visible, (newValue) => {
  labelR2.value = newValue ? '-R2' : '+R2'
  cssR2.value = newValue ? 'btn-remove' : 'btn-add'
})

const labelR3 = ref('+R3')
const cssR3 = ref('btn-add')
watch(() => input.inputR3.visible, (newValue) => {
  labelR3.value = newValue ? '-R3' : '+R3'
  cssR3.value = newValue ? 'btn-remove' : 'btn-add'
})

function toggleInputs(group: string) {
  input.setVisible(group, !input.isVisible(group))
}

// button for saving output as PNG
function extendDownloadButton() {
  const downloadButton = document.getElementById('download-link') as HTMLAnchorElement
  downloadButton.addEventListener('click', function () {
    const canvas = useCanvasStore().canvas
    if (canvas) {
      downloadButton.href = canvas.toDataURL()
      downloadButton.download = 'wbsc-scoring.png'
    } else {
      useEvalStore().setError(useT('editor.error.invalidCanvas'))
    }
  }, false)
}
</script>
