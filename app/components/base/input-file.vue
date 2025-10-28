<script setup lang="ts">
const { type = "file", label, title = "Upload File", modal = false } = defineProps<{
  type?: "file" | "image";
  label?: string;
  title?: string;
  modal?: boolean;
}>();

const modelValue = defineModel<string>();
const previewImg = ref("");
const loading = ref(false);
async function onInput(evt: Event) {
  const target = evt.target as HTMLInputElement;
  if (!target || !target.files || !target.files.length) {
    previewImg.value = "";
    modelValue.value = "";
    return;
  }
  const file = target.files[0];
  if (!file)
    return;
  loading.value = true;
  const response = await uploadMedia(file);
  if (response?.ok) {
    const data = await response.json();
    modelValue.value = data.secure_url;
    previewImg.value = data.secure_url;
  }
  else {
    previewImg.value = "";
    modelValue.value = "";
  }
  loading.value = false;
};
</script>

<template>
  <div class="space-y-2 w-full">
    <label
      v-if="!!label"
      class="text-xs block text-netral-90 font-medium"
    >{{ label }}</label>

    <img
      v-if="type === 'image'"
      :src="!!previewImg || !!modelValue ? previewImg || modelValue : '/img/avatar.png'"
      :alt="!!previewImg ? 'image-face' : 'avatar'"
      class="w-32 h-32 rounded-full object-cover"
    >

    <base-button
      v-if="!modal"
      color="outline"
      :loading="loading"
    >
      <label for="upload">
        <input
          id="upload"
          :accept="type === 'file' ? 'file/*' : 'image/*'"
          type="file"
          class="outline-none border-none"
          hidden
          @change="onInput"
        >
        {{ title }}
      </label>
    </base-button>

    <slot
      v-else
      name="triggerModal"
    />
  </div>
</template>
