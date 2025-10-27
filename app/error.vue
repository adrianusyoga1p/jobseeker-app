<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();

const { user, logout } = useAuthStore();
</script>

<template>
  <div class="w-screen h-screen max-w-md mx-auto flex items-center">
    <UICard>
      <h1 class="font-bold font-mono text-5xl text-center italic mb-2">
        {{ error.statusCode }}
      </h1>

      <h1 class="font-mono text-2xl text-center mb-8">
        {{ error.statusMessage }}
      </h1>

      <div class="flex items-center justify-center flex-col gap-2">
        <NuxtLink to="/">
          <base-button
            size="lg"
          >
            Back to home
          </base-button>
        </NuxtLink>

        <template v-if="user">
          <p class="text-center my-4">
            or
          </p>

          <base-button
            size="lg"
            color="outline"
            @click="
              logout();
              navigateTo('/auth/sign-in');
            "
          >
            Logout instead
          </base-button>
        </template>
      </div>
    </UICard>
  </div>
</template>
