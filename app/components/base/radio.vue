<script setup lang="ts">
const { modelValue, value, id, variant = "default" } = defineProps<{
  modelValue: unknown;
  value?: unknown;
  id?: string;
  variant?: "default" | "button" | "custom";
}>();

const emit = defineEmits<{
  (e: "update:modelValue" | "change", value: unknown): void;
}>();

const model = computed({
  get: () => modelValue,
  set: val => emit("update:modelValue", val),
});

const checked = computed(() => {
  if (Array.isArray(modelValue)) {
    return value !== undefined && modelValue.includes(value);
  }
  return modelValue === value;
});

const internalValue = ref(modelValue);

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const newValue = value !== undefined ? value : target.checked;

  internalValue.value = newValue;

  emit("update:modelValue", newValue);
  emit("change", newValue);
};

watch(() => modelValue, (newVal) => {
  internalValue.value = newVal;
});
</script>

<template>
  <label
    v-if="variant === 'default'"
    :for="id"
    class="flex gap-2 cursor-pointer"
  >
    <div
      class="flex items-center justify-center rounded-sm border w-4 h-4 text-white mt-0.5"
      :class="checked ? 'bg-netral-100 border-netral-100' : 'border-netral-30'"
    >
      <icon
        name="fluent:checkmark-16-filled"
      />
    </div>

    <input
      :id="id"
      v-model="model"
      type="radio"
      :value="value"
      hidden
      @change="handleChange"
    >

    <slot />

  </label>

  <label
    v-if="variant === 'custom'"
    :for="id"
    class="flex gap-2 cursor-pointer"
  >

    <input
      :id="id"
      v-model="model"
      type="radio"
      :value="value"
      hidden
      @change="handleChange"
    >

    <slot />

  </label>

  <label
    v-if="variant === 'button'"
    :for="id"
  >
    <input
      :id="id"
      v-model="model"
      type="radio"
      :value="value"
      hidden
      @change="handleChange"
    >

    <base-button
      size="sm"
      type="button"
      color="outline"
      class="w-fit px-4 !rounded-full"
      :class="checked ? 'border-primary-main hover:bg-primary-surface! text-primary-main' : ''"
      @click="handleChange"
    >

      <slot />
    </base-button>
  </label>
</template>
