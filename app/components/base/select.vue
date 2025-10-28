<script setup lang="ts">
const { items, label, size = "md", placeholder = "Select item" } = defineProps<{
  items: { value: string | null; label: string }[];
  label?: string;
  size?: "sm" | "md";
  placeholder?: string;
}>();
defineEmits<{
  (e: "change", value: any): void;
}>();
const modelValue = defineModel();
</script>

<template>
  <div class="space-y-2 w-full">
    <label
      v-if="!!label"
      class="text-xs block text-netral-90 font-medium"
    >{{ label }}</label>

    <UISelect
      v-model="modelValue"
      :items="items"
      variant="outline"
      color="primary"
      :placeholder="placeholder"
      :ui="{
        base: size === 'sm' ? '!h-8' : '!h-10',
      }"
      @change="$emit('change', $event)"
    />
  </div>
</template>
