<!-- derived from https://github.com/Emodot/Creating-Modal-Components project -->

<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="invalidate()">
      <div :class="divMain" @click.stop>
        <div :class="divHeader">
          Invalid input
        </div>
        <ul>
          <li v-for="row in validationRows" :key="row">
            {{ row }}
          </li>
        </ul>
        <div :class="divButton" @click="invalidate()">
          OK
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const divMain = 'mt-[10%] px-4 w-1/3 h-fit border border-black rounded bg-white'
const divHeader = 'py-4 text-3xl font-bold'
const divButton = 'mx-auto my-4 p-2 w-16 border border-black rounded bg-wbsc-blue hover:bg-sky-300 ' +
                  'text-white hover:text-gray-700 font-bold cursor-pointer'

const validationRows = computed((): string[] => {
  return useEvalStore().errorText?.split('\n')
})

function invalidate () {
  useEvalStore().errorShow = false
  useEvalStore().errorText = ''
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
