<template>
  <div id="wbsc-toolbar" class="wbsc-buttons">
    <div class="flex flex-row justify-center">
      <WBSCButton :group="inputB" label="+B" @click="renderInputs(inputB)" />
      <WBSCButton :group="inputR1" label="+R1" @click="renderInputs(inputR1)" />
      <WBSCButton :group="inputR2" label="+R2" @click="renderInputs(inputR2)" />
      <WBSCButton :group="inputR3" label="+R3" @click="renderInputs(inputR3)" />
    </div>
    <div class="flex flex-row justify-center">
      <WBSCButton
        :group="inputGenerate" :label="useT('editor.button.generate')"
        css="btn-generate" @click="processAction()" />
      <WBSCButton
        :group="inputClear" :label="useT('editor.button.clear')"
        css="btn-clear" @click="clearInputs()" />
    </div>
    <div class="flex flex-row justify-center">
      <WBSCButton
        :group="inputImport" :label="'&#8664; ' + useT('editor.button.import')"
        css="btn-json" @click="importFile()" />
      <WBSCButton
        :group="inputImportLib" :label="'&#8664; ' + useT('editor.button.importLib')"
        css="btn-json" @click="useEvalStore().importShow = true" />
      <WBSCButton
        :group="inputExport" :label="useT('editor.button.export') + ' &#8663;'"
        css="btn-json" @click="exportInputAsJSON()" />
    </div>
  </div>
</template>

<script setup lang="ts">
function init() {
  renderInputs(inputB)
  useCanvasStore().init()
  extendDownloadButton()
}

defineExpose({
  init,
})
</script>
