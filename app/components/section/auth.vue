<script setup lang="ts">
const { logo = false } = defineProps<{
  logo?: boolean;
}>();
</script>

<template>
  <section class="w-full h-dvh flex items-center justify-center p-6">
    <div class="space-y-6 max-w-md w-full">
      <img
        v-if="logo"
        src="/img/logo.png"
        class="h-12"
        alt="logo"
      >

      <div class=" bg-white shadow p-10 space-y-4">
        <slot />
      </div>
    </div>
  </section>
</template>
