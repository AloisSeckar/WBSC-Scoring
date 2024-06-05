<template>
  <div>
    <ContentWrapper source="report" />
    <NavButtons />
  </div>
</template>

<script setup lang="ts">
usePageMeta({
  ...WBSC_PAGE_META,
  title: WBSC_PAGE_META.title + ' - Report',
})
</script>
