<template>
  <div>
    <h2>{{ $t('help.title') }}</h2>

    <div class="mb-2">
      <p v-html="$t('help.dscr')" />
      <p v-html="$t('help.premises')" />
      <ul class="list-disc">
        <li v-html="$t('help.premise1')" />
        <li v-html="$t('help.premise2')" />
        <li v-html="$t('help.premise3')" />
      </ul>
    </div>

    <h2>{{ $t('help.controls.title') }}</h2>

    <h3>{{ $t('help.controls.basics.title') }}</h3>
    <div class="mb-2">
      <p v-html="$t('help.controls.basics.p1')" />
      <img src="/01-basic-input.png" width="800" height="auto">
      <p v-html="$t('help.controls.basics.p2')" />
      <img src="/02-basic-output.png" width="300" height="auto">
    </div>

    <h3>{{ $t('help.controls.first.title') }}</h3>
    <div class="mb-2">
      <p v-html="$t('help.controls.first.p1')" />
      <p v-html="$t('help.controls.first.p2')" />
      <img src="/03-base-action.png" width="200" height="auto">
      <p v-html="$t('help.controls.first.p3')" />
      <img src="/04-specific-action.png" width="400" height="auto">
      <p v-html="$t('help.controls.first.p4')" />
      <img src="/05-involved.png" width="auto" height="50">
      <p v-html="$t('help.controls.first.p5')" />
      <img src="/06-generate.png" width="auto" height="50">
      <p v-html="$t('help.controls.first.p6')" />
      <img src="/07-result.png" width="300" height="auto">
      <p v-html="$t('help.controls.first.p7')" />
      <img src="/08-download.png" width="auto" height="50">
    </div>

    <h3>{{ $t('help.controls.runners.title') }}</h3>
    <div class="mb-2">
      <p v-html="$t('help.controls.runners.p1')" />
      <img src="/09-pick-players.png" width="auto" height="50">
      <p v-html="$t('help.controls.runners.p2')" />
      <img src="/10-runner-input.png" width="800" height="auto">
      <p v-html="$t('help.controls.runners.p3')" />
      <p v-html="$t('help.controls.runners.p4')" />
      <p v-html="$t('help.controls.runners.p5')" />
      <p v-html="$t('help.controls.runners.p6')" />
      <p v-html="$t('help.controls.runners.p7')" />
      <img src="/11-type-of-run.png" width="auto" height="100">
    </div>

    <h3>{{ $t('help.controls.extra.title') }}</h3>
    <div class="mb-2">
      <p v-html="$t('help.controls.extra.p1')" />
      <img src="/12-plus-action.png" width="auto" height="50">
      <p v-html="$t('help.controls.extra.p2')" />
      <img src="/13-extra-input.png" width="800" height="auto">
      <p v-html="$t('help.controls.extra.p3')" />
      <img src="/14-minus-action.png" width="auto" height="50">
      <p v-html="$t('help.controls.extra.p4')" />
    </div>

    <h3>{{ $t('help.controls.reset.title') }}</h3>
    <div class="mb-2">
      <p v-html="$t('help.controls.reset.p1')" />
      <img src="/15-clear.png" width="auto" height="50">
    </div>

    <h3>{{ $t('help.controls.import.title') }}</h3>
    <div class="mb-2">
      <p v-html="$t('help.controls.import.p1')" />
      <img src="/16-export.png" width="auto" height="50">
      <p v-html="$t('help.controls.import.p2')" />
      <img src="/17-import.png" width="auto" height="50">
      <p v-html="$t('help.controls.import.p3')" />
      <img src="/18-import-lib.png" width="auto" height="50">
    </div>

    <NavButtons />
  </div>
</template>
