<script setup lang="ts">
const emit = defineEmits<{
  (e: "close"): void;
}>();
const { videoRef, canvasRef, photo, saveImage, retakeImage, captureTimer } = useGestureCamera();
const { applicantForm } = storeToRefs(useJobStore());
const loading = ref(false);
async function handleSubmit() {
  loading.value = true;
  const response = await saveImage();
  if (response) {
    applicantForm.value.photoProfile = response;
  }
  loading.value = false;
  emit("close");
}
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <!-- Webcam Feed -->
    <template v-if="!photo">
      <video
        ref="videoRef"
        autoplay
        class="hidden aspect-video"
      />

      <canvas
        ref="canvasRef"
        width="840"
        height="480"
        class="rounded-lg shadow aspect-video"
      />

      <p class="text-xs text-netral-100 text-left">
        To take a picture, follow the hand poses in the order shown below. The system will automatically capture the image once the final pose is detected.
      </p>

      <p>{{ captureTimer }}</p>

      <div class="flex gap-2 items-center justify-center">
        <img
          src="/img/hand-one.png"
          alt="hand"
        >

        <icon name="i-heroicons-chevron-right-solid" />

        <img
          src="/img/hand-two.png"
          alt="hand"
        >

        <icon name="i-heroicons-chevron-right-solid" />

        <img
          src="/img/hand-three.png"
          alt="hand"
        >
      </div>
    </template>
    <!-- Preview captured photo -->
    <div
      v-else
      class="flex flex-col items-center gap-4"
    >
      <img
        :src="photo"
        alt="Captured"
        class="rounded-lg w-[840px] h-[480px] aspect-video"
      >

      <div class="flex gap-4 justify-center items-center">
        <base-button
          color="outline"
          :loading="loading"
          @click="retakeImage"
        >
          Retake photo
        </base-button>

        <base-button
          :loading="loading"
          @click="handleSubmit"
        >
          Submit
        </base-button>
      </div>
    </div>
  </div>
</template>
