<script setup lang="ts">
defineProps<{
  data: JobListData;
  active: boolean | boolean[];
}>();
</script>

<template>
  <button
    :class="[active ? 'border-primary-border bg-primary-surface' : 'hover:border-primary-border hover:bg-primary-surface bg-white border-white']"
    class=" transition-colors rounded-md border cursor-pointer p-6 w-full space-y-2 text-left"
  >
    <div class="flex gap-4">
      <img
        src="/img/logo-sm.png"
        alt="logo"
        class="w-12 h-12 object-cover"
      >

      <div class="text-left">
        <h1 class="font-bold">
          {{ data.title }}
        </h1>

        <h4 class="text-sm">
          {{ data.company }}
        </h4>
      </div>
    </div>

    <div class="border-b border-dotted border-netral-40 h-px w-full" />

    <div class="space-y-2 text-left">
      <div class="flex items-center gap-1">
        <icon name="i-uil-location-point" />

        <h5 class="text-netral-80 text-xs">
          {{ data.location }}
        </h5>
      </div>

      <div class="flex items-center gap-1">
        <icon name="i-uil-money-bill" />

        <h5 class="text-netral-80 text-xs">
          {{ data.salaryRange.displayText }}
        </h5>
      </div>
    </div>
  </button>
</template>
