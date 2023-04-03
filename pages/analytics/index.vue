<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  pageTransition: {
    name: "slide-fade",
    mode: "out-in",
  },
});
</script>

<template>
  <div class="page-content">
    <h2>Analíticos</h2>
  </div>
</template>
