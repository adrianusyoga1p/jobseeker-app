<script setup lang="ts">
const {
  size = "md",
  disabled,
  type = "text",
  error = false,
  label,
} = defineProps<{
  size?: "sm" | "md";
  variant?: "netral" | "primary" | "error";
  disabled?: boolean;
  type?: "number" | "text" | "email" | "password" | "tel";
  error?: boolean;
  label?: string;
}>();
const value = defineModel<string | number | null>();
const focus = ref(false);
const show = ref(false);

const inputClasses = computed(() => {
  const base = "rounded-md w-full placeholder:text-netral-60 text-netral-90";
  const sizes: Record<string, string> = {
    sm: "px-4 py-1 h-8 text-sm placeholder:text-sm",
    md: "px-4 py-2 h-10 text-sm placeholder:text-sm",
  };
  const variants: Record<string, string> = {
    primary: "outline-2 outline-primary-main",
    error: "outline-2 outline-danger-main",
    neutral: "outline-2 outline-netral-40",
  };

  if (disabled) {
    return `${base} ${sizes[size]} bg-netral-30 outline-2 outline-netral-40 text-netral-60 cursor-not-allowed`;
  }

  if (error) {
    return `${base} ${sizes[size]} ${variants.error}`;
  }

  if (focus.value) {
    return `${base} ${sizes[size]} ${variants.primary}`;
  }

  return `${base} ${sizes[size]} ${variants.neutral}`;
});

function handleKey(evt: KeyboardEvent) {
  let val = (evt.target as HTMLInputElement).value;

  if (type === "number") {
    val = val.replace(/\D/g, "");
    if (evt.key === "-") {
      evt.preventDefault();
    }
    if (val.startsWith("0")) {
      val = val.substring(1);
    }
  }
}
</script>

<template>
  <div class="space-y-2 w-full">
    <label
      v-if="!!label"
      class="text-xs block text-netral-90 font-medium"
    >{{ label }}</label>

    <div class="relative">
      <input
        v-model="value"
        v-bind="$attrs"
        :type="show ? 'text' : type"
        :class="inputClasses"
        min="0"
        @focus="focus = true"
        @blur="focus = false"
        @keydown="handleKey"
      >

      <button
        v-if="type === 'password'"
        class="absolute top-1/2 -translate-y-1/2 right-3 text-netral-100"
        type="button"
        @click="show = !show"
      >
        <Icon :name="!show ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" />
      </button>
    </div>

    <div
      v-if="$slots.message"
      class="flex gap-1 items-center text-xs"
    >
      <slot name="message" />
    </div>
  </div>
</template>
