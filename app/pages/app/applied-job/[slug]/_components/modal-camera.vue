<script setup lang="ts">
import Camera from "./camera.vue";

const isModalOpen = ref(false);
</script>

<template>
  <UIModal
    v-model:open="isModalOpen"
    title="Raise Your Hand to Capture"
    description="We’ll take the photo once your hand pose is detected."
  >
    <slot name="trigger" />

    <template #body>
      <Camera @close="isModalOpen = false" />
    </template>
  </UIModal>
</template>
