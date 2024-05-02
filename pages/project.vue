<template>
  <div>
    <h2>{{ $t('project.title') }}</h2>

    <div class="pt-2 text-justify">
      <p v-html="$t('project.p1')" />
      <p v-html="$t('project.p2')" />
      <p v-html="$t('project.p3')" />
      <p v-html="$t('project.p4')" />
      <p v-html="$t('project.p5')" />
    </div>

    <h2>{{ $t('project.done.title') }}</h2>
    <h3>{{ $t('project.done.subtitle') }}</h3>
    <div>
      <ul class="list-disc" v-html="$t('project.done.list')" />
    </div>

    <a id="todo" />
    <h2>{{ $t('project.todo.title') }}</h2>
    <h3>{{ $t('project.todo.subtitle') }}</h3>
    <div>
      <ul class="list-disc" v-html="$t('project.todo.list')" />
    </div>

    <a id="limitations" />
    <h2>{{ $t('project.limitations.title') }}</h2>
    <h3>{{ $t('project.limitations.subtitle') }}</h3>
    <div>
      <p v-html="$t('project.limitations.dscr')" />
      <ul class="list-disc" v-html="$t('project.limitations.list')" />
    </div>

    <a id="history" />
    <h2>{{ $t('project.history.title') }}</h2>
    <h3>{{ $t('project.history.subtitle') }}</h3>
    <div class="mb-2">
      <p v-html="$t('project.history.1-0-0.title')" />
      <ul class="list-disc" v-html="$t('project.history.1-0-0.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.1-0-0-rc2.title')" />
      <ul class="list-disc" v-html="$t('project.history.1-0-0-rc2.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.1-0-0-rc1.title')" />
      <ul class="list-disc" v-html="$t('project.history.1-0-0-rc1.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-14.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-14.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-13.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-13.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-12.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-12.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-11.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-11.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-10.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-10.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-9-4.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-9-4.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-9-3.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-9-3.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-9-2.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-9-2.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-9-1.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-9-1.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-9.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-9.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-8.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-8.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-7.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-7.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-6.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-6.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-5.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-5.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-4.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-4.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-3.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-3.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-2.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-2.features')" />
    </div>
    <div class="mb-2">
      <p v-html="$t('project.history.0-1.title')" />
      <ul class="list-disc" v-html="$t('project.history.0-1.features')" />
    </div>

    <NavButtons />
  </div>
</template>

<script setup>
usePageMeta({
  ...WBSC_PAGE_META,
  title: WBSC_PAGE_META.title + ' - Project',
})
</script>
