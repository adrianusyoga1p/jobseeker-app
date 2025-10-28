<script setup lang="ts">
defineProps<{
  title?: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 w-full py-20">
    <img
      src="/img/empty.png"
      alt="empty"
      class="w-[300px] h-[300px]"
    >

    <div class="space-y-1">
      <h1 class="text-center text-netral-90 font-bold text-xl">
        {{ title ?? 'No job openings available' }}
      </h1>

      <h3 class="text-center text-netral-90 font-medium">
        {{ subtitle ?? 'Please wait for the next batch of openings.' }}
      </h3>
    </div>
  </div>
</template>
