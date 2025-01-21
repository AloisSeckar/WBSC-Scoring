<!-- derived from https://github.com/Emodot/Creating-Modal-Components project -->

<template>
  <transition name="modal-fade">
    <div v-show="useEvalStore().importShow" class="modal-overlay" @click="close()">
      <div :class="divMain" @click.stop>
        <div :class="divHeader">
          {{ $t('editor.import.title') }}
        </div>
        <label :for="libFileId">
          {{ $t('editor.import.situation') }}:</label>
        <select :id="libFileId" v-model="libFile" :class="divSelect">
          <optgroup v-for="[catKey, catValue] in library" :key="catKey" :label="catKey">
            <option v-for="row in catValue" :key="row.file" :value="row.file">
              {{ row.name }}
            </option>
          </optgroup>
        </select>
        <div class="mx-auto">
          <div id="lib-select" :class="divButton" @click="importFromLib()">
            {{ $t('editor.import.confirm') }}
          </div>
          <div id="lib-cancel" :class="divButton" @click="close()">
            {{ $t('editor.import.cancel') }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import jsonItems from '@/assets/json/library.json'

const libFileId = 'lib-items'

const divMain = 'mt-[10%] px-4 max-[500px]:w-[90%] max-[1200px]:w-[80%] w-1/2 min-[1600px]:w-1/3 h-fit '
  + 'border border-black rounded bg-blue-200'
const divHeader = 'py-4 text-3xl font-bold'
const divSelect = 'max-[650px]:max-w-[90%]'
const divButton = 'mx-2 my-4 p-2 w-28 inline-block border border-black rounded bg-wbsc-blue hover:bg-sky-300 '
  + 'text-white hover:text-gray-700 font-bold cursor-pointer'

const library = new Map<string, LibraryItem[]>()
jsonItems.forEach((json) => {
  if (!library.has(json.cat)) {
    library.set(json.cat, [])
  }
  library.get(json.cat)!.push({
    file: json.file,
    name: json.name,
  })
})

const libFile = ref(library.get('Ground Outs')!.at(0)!.file)
function importFromLib() {
  importInputFromLib(libFile.value)
  close()
}

function close() {
  useEvalStore().importShow = false
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
}

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.5s ease;
}
</style>
