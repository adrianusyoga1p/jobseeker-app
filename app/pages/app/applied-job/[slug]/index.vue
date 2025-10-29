<script setup lang="ts">
import FormApplied from "./_components/form-applied.vue";

definePageMeta({
  title: "Applied Job",
  layout: "default",
});
</script>

<template>
  <section class="w-full h-dvh flex justify-center p-6">
    <div class="max-w-3xl w-full">
      <div class=" bg-white shadow h-full">
        <FormApplied />
      </div>
    </div>
  </section>
</template>
