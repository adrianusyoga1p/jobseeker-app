<script setup lang="ts">
const { color = "primary", variant = "fill", size = "sm", label } = defineProps<{
  color?: "primary" | "secondary" | "danger" | "success" | "warning" | "netral";
  variant?: "fill" | "outline";
  size?: "sm" | "lg";
  label: string;
}>();

const tagClasses = computed(() => {
  const base = "inline-flex gap-4 items-center justify-center rounded-sm py-0.5 px-2 text-sm font-bold";

  const colors: Record<string, string> = {
    secondary: `${variant === "fill" ? "bg-secondary-main text-netral-90" : "bg-secondary-surface border border-secondary-border text-secondary-main"}`,
    primary: `${variant === "fill" ? "bg-primary-main text-netral-10" : "bg-primary-surface border border-primary-border text-primary-main"}`,
    warning: `${variant === "fill" ? "bg-warning-main text-netral-10" : "bg-warning-surface border border-warning-border text-warning-main"}`,
    success: `${variant === "fill" ? "bg-success-main text-netral-10" : "bg-success-surface border border-success-border text-success-main"}`,
    danger: `${variant === "fill" ? "bg-danger-main text-netral-10" : "bg-danger-surface border border-danger-border text-danger-main"}`,
    netral: `${variant === "fill" ? "" : "bg-netral-10 border border-netral-40 text-netral-100"}`,
  };

  const sizes: Record<string, string> = {
    sm: "h-6",
    lg: "h-7",
  };

  return `${base} ${sizes[size]} ${colors[color]}`;
});
</script>

<template>
  <div :class="tagClasses">
    {{ label }}
  </div>
</template>
