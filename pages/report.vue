<template>
  <div>
    <h2>{{ $t('report.title') }}</h2>

    <div class="pt-2 text-justify">
      <p>
        <em>"{{ $t('report.motto') }}"</em>
      </p>
      <p v-html="$t('report.p1')" />
      <p v-html="$t('report.p2')" />
    </div>

    <h2>{{ $t('report.issues.title') }}</h2>
    <div class="mb-2">
      <p v-html="$t('report.issues.p1')" />
      <p v-html="$t('report.issues.p2')" />
      <p v-html="$t('report.issues.p3')" />
    </div>

    <h2>{{ $t('report.manual.title') }}</h2>
    <div class="mb-2">
      <p v-html="$t('report.manual.p1')" />
      <p v-html="$t('report.manual.p2')" />
      <p v-html="$t('report.manual.p3')" />
    </div>

    <h2>{{ $t('report.howto.title') }}</h2>
    <div class="mb-2">
      <p v-html="$t('report.howto.dscr')" />
    </div>

    <h3>{{ $t('report.howto.subject') }}</h3>
    <div class="mb-2">
      <p v-html="$t('report.howto.subjectDscr')" />
    </div>
    <h3>{{ $t('report.howto.reproduction') }}</h3>
    <div class="mb-2">
      <p v-html="$t('report.howto.repoductionDscr')" />
    </div>
    <h3>{{ $t('report.howto.screenshots') }}</h3>
    <div class="mb-2">
      <p v-html="$t('report.howto.screenshotsDscr1')" />
      <p v-html="$t('report.howto.screenshotsDscr2')" />
    </div>
    <h3>{{ $t('report.howto.console') }}</h3>
    <div class="mb-2">
      <p v-html="$t('report.howto.consoleDscr')" />
      <p v-html="$t('report.howto.consoleExample')" />
      <NuxtImg src="/report-console.png" class="w-full h-auto max-w-4xl" />
    </div>

    <NavButtons />
  </div>
</template>

<script setup>
usePageMeta({
  ...WBSC_PAGE_META,
  title: WBSC_PAGE_META.title + ' - Report',
})
</script>
