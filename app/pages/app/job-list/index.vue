<script setup lang="ts">
import JobCard from "../_components/job-card.vue";
import JobDetail from "../_components/job-detail.vue";

definePageMeta({
  title: "Job List",
  layout: "app",
});

const { user } = storeToRefs(useAuthStore());
const data = ref<JobListData[]>([]);
const activeCard = ref<boolean[]>([]);
const dataDetail = ref<JobListData | null>(null);
const { job, applicantForm } = storeToRefs(useJobStore());
async function loadData() {
  job.value = null;
  applicantForm.value = {};
  const response = await getDataList("jobs", "status", "active");
  if (response) {
    data.value = response.docs
      .map(doc => ({ id: doc.id, ...doc.data() })) as JobListData[];
  }
}

async function loadDetail(id: string) {
  const response = await getDataDetail("jobs", id);
  if (response.exists()) {
    dataDetail.value = {
      id: response.id,
      ...response.data(),
    } as JobListData;
  }
}

function clickCard(n: number, id: string) {
  activeCard.value = activeCard.value.map((_, i) => i === n);
  loadDetail(id);
  checkApplied(id);
}

const disabled = ref(false);
async function checkApplied(id: string) {
  const userId = user.value?.id;
  disabled.value = false;
  if (!id || !userId)
    return;
  const joinId = `${userId}_${id}`;
  const response = await getDataDetail("applicants", joinId);
  if (response.exists()) {
    const jobData = response.data();
    if (jobData) {
      if (id === jobData?.jobId) {
        disabled.value = true;
      }
      else {
        disabled.value = false;
      }
    }
  }
}

watch(
  data,
  (val) => {
    if (val && val.length > 0) {
      activeCard.value = val.map((_, i) => i === 0);
      loadDetail(val[0]?.id as string);
    }
    else {
      activeCard.value = [];
      dataDetail.value = null;
    }
  },
  { immediate: true },
);

loadData();
</script>

<template>
  <section-job-list
    class="h-full"
    :class="{ '!grid-cols-1': !data.length }"
  >
    <base-empty v-if="!data.length" />

    <template v-if="data">
      <div class="col-span-2 h-full max-h-[100vh_-_6.5rem] overflow-y-scroll">
        <div class="space-y-6">
          <JobCard
            v-for="(item, n) in data"
            :key="n"
            :active="!!activeCard[n]"
            :data="item"
            @click="clickCard(n, item.id)"
          />
        </div>
      </div>

      <div class="col-span-3">
        <JobDetail
          v-if="dataDetail && activeCard"
          :data="dataDetail"
          :disabled="disabled"
        />
      </div>
    </template>
  </section-job-list>
</template>
