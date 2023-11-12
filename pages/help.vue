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
      <img src="~/assets/img/01-basic-input.png" class="w600">
      <p v-html="$t('help.controls.basics.p2')" />
      <img src="~/assets/img/02-basic-output.png" class="w200">
    </div>

    <h3>{{ $t('help.controls.first.title') }}</h3>
    <div class="mb-2">
      <p v-html="$t('help.controls.first.p1')" />
      <p v-html="$t('help.controls.first.p2')" />
      <img src="~/assets/img/03-base-action.png" class="w200">
      <p v-html="$t('help.controls.first.p3')" />
      <img src="~/assets/img/04-specific-action.png" class="w400">
      <p v-html="$t('help.controls.first.p4')" />
      <img src="~/assets/img/05-involved.png" class="h40">
      <p v-html="$t('help.controls.first.p5')" />
      <img src="~/assets/img/06-generate.png" class="h40">
      <p v-html="$t('help.controls.first.p6')" />
      <img src="~/assets/img/07-result.png" class="w200">
      <p v-html="$t('help.controls.first.p7')" />
      <img src="~/assets/img/08-download.png" class="h40">
    </div>

    <h3>{{ $t('help.controls.runners.title') }}</h3>
    <div class="mb-2">
      <p v-html="$t('help.controls.runners.p1')" />
      <img src="~/assets/img/09-pick-players.png" class="h40">
      <p v-html="$t('help.controls.runners.p2')" />
      <img src="~/assets/img/10-runner-input.png" class="w600">
      <p v-html="$t('help.controls.runners.p3')" />
      <p v-html="$t('help.controls.runners.p4')" />
      <p v-html="$t('help.controls.runners.p5')" />
      <p v-html="$t('help.controls.runners.p6')" />
      <p v-html="$t('help.controls.runners.p7')" />
      <img src="~/assets/img/11-type-of-run.png" class="h150">
    </div>

    <h3>{{ $t('help.controls.extra.title') }}</h3>
    <div class="mb-2">
      <p v-html="$t('help.controls.extra.p1')" />
      <img src="~/assets/img/12-plus-action.png" class="h40">
      <p v-html="$t('help.controls.extra.p2')" />
      <img src="~/assets/img/13-extra-input.png" class="w600">
      <p v-html="$t('help.controls.extra.p3')" />
      <img src="~/assets/img/14-minus-action.png" class="h40">
      <p v-html="$t('help.controls.extra.p4')" />
    </div>

    <h3>{{ $t('help.controls.reset.title') }}</h3>
    <div class="mb-2">
      <p v-html="$t('help.controls.reset.p1')" />
      <img src="~/assets/img/15-clear.png" class="h40">
    </div>

    <h3>{{ $t('help.controls.import.title') }}</h3>
    <div class="mb-2">
      <p v-html="$t('help.controls.import.p1')" />
      <img src="~/assets/img/16-export.png" class="h40">
      <p v-html="$t('help.controls.import.p2')" />
      <img src="~/assets/img/17-import.png" class="h40">
      <p v-html="$t('help.controls.import.p3')" />
      <img src="~/assets/img/18-import-lib.png" class="h40">
    </div>

    <NavButtons />
  </div>
</template>

<script setup>
usePageMeta({
  ...WBSC_PAGE_META,
  title: WBSC_PAGE_META.title + ' - Help'
})
</script>

<style>
.h40 {
  width: auto;
  height: 40px;
}
.h150 {
  width: auto;
  height: 150px;
}
.w200 {
  width: 200px;
  height: auto;
}
.w400 {
  width: 400px;
  height: auto;
}
.w600 {
  width: 600px;
  height: auto;
}
</style>
