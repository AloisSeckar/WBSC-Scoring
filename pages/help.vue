<template>
  <div>
    <ContentWrapper source="help" />
    <NavButtons />
  </div>
</template>

<script setup lang="ts">
usePageMeta({
  ...WBSC_PAGE_META,
  title: WBSC_PAGE_META.title + ' - Help',
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
