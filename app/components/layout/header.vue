<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

import { signOut } from "firebase/auth";

const { user } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();
const { job } = storeToRefs(useJobStore());
const route = useRoute();

async function handleSignOut() {
  const { auth } = useFirebase();
  logout();
  await signOut(auth);
}

const items = [
  {
    label: "Log Out",
    icon: "i-heroicons-arrow-left-end-on-rectangle",
    to: "#",
    class: "!text-danger-main [&>svg]:!text-danger-main hover:bg-danger-surface hover:text-danger-main",
    onSelect: handleSignOut,
  },
] satisfies NavigationMenuItem[];
</script>

<template>
  <header class="fixed top-0 bg-white h-14 w-full left-0 shadow-md z-50">
    <div class="h-full flex items-center justify-between w-full px-6 mx-auto">
      <div
        v-if="route.name === 'admin-manage-job-id'"
        class="flex gap-4 items-center"
      >
        <router-link to="/admin">
          <base-button color="outline">
            Job List
          </base-button>
        </router-link>

        <icon name="i-heroicons-chevron-right-solid" />

        <base-button
          color="outline"
          disabled
        >
          {{ job?.title }}
        </base-button>
      </div>

      <h1
        v-else
        class="text-lg font-bold text-netral-100"
      >
        Job List
      </h1>

      <UIPopover
        v-if="user && user.email"
        :close-delay="300"
        :ui="{
          content: 'shadow-none border-bg-01',
        }"
      >
        <div class="cursor-pointer">
          <UIAvatar
            :alt="user?.email.toUpperCase()"
            size="xl"
          />
        </div>

        <template #content>
          <div class="min-w-60 py-4 px-3">
            <div class="flex justify-center">
              <UIAvatar
                :alt="user.email.toUpperCase()"
                size="3xl"
              />
            </div>

            <p class="font-medium text-center mt-3">
              {{ user.email }}
            </p>

            <p class="text-sm text-center mt-1 capitalize">
              {{ user.role }}
            </p>

            <div class="mt-6 w-full">
              <UINavigationMenu
                :items
                orientation="vertical"
                color="neutral"
                :highlight="false"
                variant="pill"
                :ui="{
                  list: '',
                  link: 'py-2.5 hover:bg-primary-surface hover:text-primary-main',
                  childList: 'border-0 space-y-2 mt-2',
                  childLink: 'py-2.5',
                }"
              >
                <template #item-trailing>
                  <Icon name="i-fluent-ios-chevron-right-20-regular" />
                </template>
              </UINavigationMenu>
            </div>
          </div>
        </template>
      </UIPopover>
    </div>
  </header>
</template>
