<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

definePageMeta({
  title: "Manage Job",
  layout: "admin",
});

type ApplicantData = {
  id: string;
  [key: string]: any;
};

const { job } = storeToRefs(useJobStore());
const dataApplicant = ref<ApplicantData[]>([]);
const loading = ref(false);
const route = useRoute();
function formatHeader(key: string): string {
  const formatted = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
  return formatted.replace(/([a-z])([A-Z])/g, "$1 $2").trim();
}

const columns = computed<TableColumn<ApplicantData>[]>(() => {
  if (!dataApplicant.value)
    return [];

  const firstApplicant = dataApplicant.value[0];
  if (!firstApplicant)
    return [];

  const ignoredKeys = ["id", "createdAt", "jobId"];
  const dynamicColumns: TableColumn<ApplicantData>[] = Object.keys(firstApplicant)
    .filter(key => !ignoredKeys.includes(key))
    .map(key => ({
      accessorKey: key,
      header: formatHeader(key),
    }) as TableColumn<ApplicantData>);

  return [{ accessorKey: "createdAt", header: "Created At" }, ...dynamicColumns];
});

async function loadData() {
  loading.value = true;
  const response = await getDataList("applicants", "jobId", route.params.id as string);
  if (response) {
    dataApplicant.value = response.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ApplicantData[];
  }
  loading.value = false;
}
loadData();
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-lg font-bold text-netral-100">
      {{ job?.title }}
    </h1>

    <UITable
      v-if="dataApplicant.length"
      :loading
      loading-animation="elastic"
      sticky
      :data="dataApplicant"
      :columns
      class="w-full"
    >
      <template #createdAt-cell="{ row }">
        {{ $formatDate(row.original.createdAt, 'DD MMM YYYY HH:mm') }}
      </template>

      <template #photoProfile-cell="{ row }">
        <a
          target="_blank"
          :href="row.original.photoProfile"
          class="text-primary-main"
        >{{ row.original.photoProfile }}</a>
      </template>
    </UITable>

    <div
      v-else
      class="p-6 rounded-lg border border-netral-40"
    >
      <base-empty
        img-src="/img/empty-candidate.png"
        title="No candidates found"
        subtitle="Share your job vacancies so that more candidates will apply."
      />
    </div>
  </div>
</template>
