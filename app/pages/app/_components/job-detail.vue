<script setup lang="ts">
import { useJobStore } from "~/stores/job";

const props = defineProps<{
  data: JobListData;
  disabled?: boolean;
}>();

// const router = useRouter();
const { job } = storeToRefs(useJobStore());
function toApplied() {
  navigateTo(`/app/applied-job/${props.data.slug}`);
  job.value = props.data;
}
</script>

<template>
  <div class="bg-white border border-netral-40 p-6 rounded-md space-y-6 h-full">
    <div class="flex justify-between gap-6 pb-6 border-b border-netral-40">
      <img
        src="/img/logo-sm.png"
        alt="logo"
        class="w-12 h-12 object-cover"
      >

      <div class="space-y-2">
        <base-label
          color="success"
          :label="data.type"
        />

        <div>
          <h1 class="font-bold text-lg">
            {{ data.title }}
          </h1>

          <h4 class="text-netral-70 text-sm">
            {{ data.company }}
          </h4>
        </div>
      </div>

      <base-button
        color="secondary"
        class="ml-auto"
        :disabled="disabled"
        @click="toApplied"
      >
        {{ disabled ? 'Applied' : 'Apply' }}
      </base-button>
    </div>

    <div
      class="tiptap"
      v-html="data.description"
    />
  </div>
</template>
