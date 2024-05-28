<template>
  <div>
    <ContentWrapper source="project" />
    <NavButtons />
  </div>
</template>

<script setup lang="ts">
usePageMeta({
  ...WBSC_PAGE_META,
  title: WBSC_PAGE_META.title + ' - Project',
})
</script>
