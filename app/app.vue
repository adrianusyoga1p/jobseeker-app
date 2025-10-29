<script setup lang="ts">
import type { ToasterProps } from "@nuxt/ui";

useHead({
  titleTemplate: (t?: string) => t ? `${t} - Job Seeker` : "Job Seeker",
});

const toaster: ToasterProps = { position: "bottom-left" };
const route = useRoute();
const { token, user } = storeToRefs(useAuthStore());
watch(
  [token, user],
  ([t, u]) => {
    if (!t) {
      if (!route.path.startsWith("/auth")) {
        return navigateTo("/auth/sign-in");
      }
    }
    else {
      const defaultAppPath = u?.role === "admin" ? "/admin/job-list" : "/app/job-list";

      if (route.path.startsWith("/auth")) {
        return navigateTo(defaultAppPath);
      }

      if (u?.role !== "admin" && route.path.startsWith("/admin")) {
        return navigateTo("/app/job-list");
      }

      if (u?.role === "admin" && route.path.startsWith("/app")) {
        return navigateTo("/admin/job-list");
      }
    }
  },
  { immediate: true },
);

const { initializeAuthListener } = useAuth();
initializeAuthListener();
</script>

<template>
  <UIApp :toaster="toaster">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UIApp>
</template>
