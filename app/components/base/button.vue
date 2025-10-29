<script setup lang="ts">
const { size = "md", color = "primary", disabled, loading } = defineProps<{
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "outline" | "danger" | "warning" | "success";
  disabled?: boolean;
  loading?: boolean;
}>();

const buttonClasses = computed(() => {
  const base
    = "inline-flex gap-2.5 border text-nowrap items-center justify-center font-bold rounded-lg transition-all duration-200 focus:outline-none";

  const sizes: Record<string, string> = {
    sm: "px-4 py-1 h-7 text-xs",
    md: "px-4 py-1 h-8 text-sm",
    lg: "px-4 py-1.5 h-10 text-base",
  };

  const colors: Record<string, string> = {
    primary: "bg-primary-main border-primary-main text-netral-10 hover:bg-primary-hover hover:border-primary-hover",
    secondary: "bg-secondary-main text-netral-90 hover:bg-secondary-hover border-secondary-main hover:border-secondary-hover",
    danger: "bg-danger-main text-netral-10 hover:bg-danger-hover border-danger-main hover:border-danger-hover",
    warning: "bg-warning-main text-netral-10 hover:bg-warning-hover border-warning-main hover:border-warning-hover",
    success: "bg-success-main text-netral-10 hover:bg-success-hover border-success-main hover:border-success-hover",
    outline:
      "bg-netral-10 border-netral-40 text-netral-100 hover:bg-netral-40 hover:border-netral-40",
  };

  const disabledStyle
    = "bg-netral-30 border border-netral-40 text-netral-60 cursor-not-allowed";

  if (disabled || loading) {
    return `${base} ${sizes[size]} ${disabledStyle}`;
  }

  return `${base} ${sizes[size]} ${colors[color]} cursor-pointer`;
});
</script>

<template>
  <button
    v-bind="$attrs"
    :disabled="loading || disabled"
    :class="buttonClasses"
  >
    <slot />
  </button>
</template>
