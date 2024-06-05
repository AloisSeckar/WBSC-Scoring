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
