<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

import dayjs from "dayjs";

const props = defineProps<{
  data: JobListData;
}>();

const emit = defineEmits<{
  (e: "loadData", value?: any): void;
}>();
const { job } = storeToRefs(useJobStore());
const toast = useToast();

async function handleChangeStatus(status = "active") {
  if (!props.data)
    return;
  const form = {
    status,
    listCard: {
      badge: status === "draft"
        ? "Draft"
        : status === "active"
          ? "Active"
          : "Inactive",
      startedOnText: `started on ${dayjs(props.data.createdAt).format("DD MMM YYYY")}`,
    },
  };
  await editData("jobs", props.data?.id as string, form).then(() => {
    toast.add({
      title: "Job vacancy successfully edited",
    });
    emit("loadData");
  });
}

const items = ref<DropdownMenuItem[]>([
  {
    label: "Draft",
    class: "hover:bg-secondary-surface data-highlighted:!text-secondary-main",
    onSelect() {
      handleChangeStatus("draft");
    },
  },
  {
    label: "Active",
    class: "hover:bg-primary-surface data-highlighted:!text-primary-main",
    onSelect() {
      handleChangeStatus("active");
    },
  },
  {
    label: "Inactive",
    class: "hover:bg-danger-surface data-highlighted:!text-danger-main",
    onSelect() {
      handleChangeStatus("inactive");
    },
  },
]);

function navigateCard() {
  job.value = props.data;
  navigateTo(`/admin/manage-job/${props.data.id}`);
}
</script>

<template>
  <div
    role="button"
    class="p-6 rounded-2xl shadow-md space-y-3 border border-netral-20 block bg-white"
    @click.stop="navigateCard"
  >
    <div class="flex gap-4 items-center">
      <base-label
        :label="data.listCard.badge"
        variant="outline"
        :color="data.status === 'active' ? 'success' : data.status === 'inactive' ? 'danger' : 'secondary'"
      />

      <base-label
        variant="outline"
        color="netral"
        :label="data.listCard.startedOnText"
      />
    </div>

    <div class="flex items-center justify-between gap-6">
      <div class="space-y-3 w-full">
        <h1 class="font-bold text-lg text-netral-100">
          {{ data.title }}
        </h1>

        <h5 class="text-base text-netral-80">
          {{ data.salaryRange.displayText }}
        </h5>
      </div>

      <UIDropdownMenu :items="items">
        <base-button
          size="sm"
          class="mt-auto text-nowrap"
          @click.stop
        >
          Manage Job
        </base-button>
      </UIDropdownMenu>
    </div>
  </div>
</template>
