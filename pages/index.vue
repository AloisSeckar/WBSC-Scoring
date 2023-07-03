<template>
  <div class="text-center">
    <h2>Situation editor v0.13</h2>

    <div class="container">
      <div class="mb-2">
        We're closing in, but this site is still being developed, not all scoring features are possible
      </div>
      <div id="wbsc-inputs" class="mb-2">
        <!-- inputs are dynamically rendered here -->
      </div>
      <!-- modal window triggered by validation errors -->
      <ValidationModal v-show="useEvalStore().errorShow" />
      <!-- modal window triggered by "import from library" -->
      <ImportModal v-show="useEvalStore().importShow" />
    </div>

    <h2>Output</h2>

    <canvas id="canvas" class="mx-auto my-4" width="325" height="250" />

    <div class="mx-auto mb-8 w-48">
      <a id="download-link" class="btn btn-download">Download image</a>
    </div>

    <h2>About</h2>

    <div class="mt-2 text-justify">
      <p>
        This JavaScript-based tool provides visualization for <b><a href="https://www.wbsc.org/">WBSC</a>
          Scoring System</b> to help new scorers adopting it. Use GUI elements to create a baseball/softball
        game situation, then click the <strong>'Generate action'</strong> button to see how it shall be scored.
        If you want to store the result, use the <strong>'Download'</strong> button. If something is wrong,
        feel free to <a href="/report">report it</a>.
      </p>
    </div>
    <div class="my-6">
      <div class="text-center">
        <NuxtLink class="btn btn-link" to="/project">
          Project overview
        </NuxtLink>
        <NuxtLink class="btn btn-link" to="/help">
          User manual
        </NuxtLink>
        <NuxtLink class="btn btn-clear" to="/report">
          Report bug
        </NuxtLink>
      </div>
    </div>
    <div class="mb-12 text-justify">
      <p>
        This software is distributed under <a href="http://unlicense.org/">UNLICENSE</a>. This means the
        tool and its output is absolutely free to use for everyone for any purpose. You don't have to
        ask for any permission, nor you have to credit the author. However, if you want to, it would be
        appreciated :)
      </p>
      <p>
        Also, if you happen to like this thing, please spread your word about it to help it reach other
        potential users.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import init from '@/utils/wbsc-global.js'

onMounted(() => init())
</script>
