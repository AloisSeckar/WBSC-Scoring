<!-- derived from https://github.com/Emodot/Creating-Modal-Components project -->

<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="close()">
      <div :class="divMain" @click.stop>
        <div :class="divHeader">
          Select situation to import
        </div>
        <label :for="libFileId">Situation:</label>
        <select :id="libFileId" :name="libFileId" :class="divSelect">
          <option v-for="row in libItems" :key="row.file" :value="row.file + '.json'">
            {{ row.name }}
          </option>
        </select>
        <div class="mx-auto">
          <div id="lib-select" :class="divButton" @click="importFromLib()">
            Import
          </div>
          <div id="lib-cancel" :class="divButton" @click="close()">
            Cancel
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import libItems from '@/assets/json/library.json'

const libFileId = 'lib-items'

const divMain = 'mt-[10%] px-4 max-[500px]:w-[90%] max-[1200px]:w-[80%] w-1/2 min-[1600px]:w-1/3 h-fit ' +
                'border border-black rounded bg-blue-200'
const divHeader = 'py-4 text-3xl font-bold'
const divSelect = 'max-[650px]:max-w-[90%]'
const divButton = 'mx-2 my-4 p-2 w-24 inline-block border border-black rounded bg-wbsc-blue hover:bg-sky-300 ' +
                  'text-white hover:text-gray-700 font-bold cursor-pointer'

function importFromLib () {
  const libFileSelect = document.getElementById(libFileId) as HTMLInputElement
  const libFileValue = libFileSelect.value
  importInputFromLib(libFileValue)
  close()
}

function close () {
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
