<script setup lang="ts">
useHead({
  titleTemplate: (t?: string) => t ? `${t} - TixFly` : "TixFly",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
