<script setup lang="ts">
import JobCard from "../_components/job-card.vue";
import JobModal from "../_components/job-modal.vue";

definePageMeta({
  title: "Job List",
  layout: "admin",
});

const data = ref<JobListData[]>([]);
const keyword = ref("");
async function loadData() {
  const response = await getDataList("jobs");
  if (response) {
    data.value = response.docs
      .map((doc) => {
        const job = { id: doc.id, ...doc.data() } as JobListData;
        return job;
      })
      .filter(job => job.title.toLowerCase().includes(keyword.value.toLowerCase()) || job.type.toLowerCase().includes(keyword.value.toLowerCase()));
  }
}

loadData();
</script>

<template>
  <section-job-list>
    <div class="col-span-3">
      <div>
        <form
          class="sticky top-14 h-20 bg-white -mx-6 px-6 -mt-6 pt-6"
          @submit.prevent="loadData()"
        >
          <base-input
            v-model="keyword"
            placeholder="Search by job details"
          />
        </form>

        <template v-if="data">
          <base-empty v-if="!data.length" />

          <div
            v-else
            class="space-y-6 mt-2"
          >
            <JobCard
              v-for="(item) in data"
              :key="item.id"
              :data="item"
              @load-data="loadData()"
            />
          </div>
        </template>
      </div>
    </div>

    <div class="col-span-2">
      <div
        class="rounded-2xl h-44 bg-cover overflow-hidden sticky top-20"
        :style="{ backgroundImage: `url('/img/bg1.jpg')`, backgroundSize: '100%' }"
      >
        <div class="absolute inset-0 flex gap-6 flex-col items-center justify-center bg-black/40 p-6">
          <div class="space-y-2">
            <h1 class="text-lg text-white font-bold">
              Rekrut Tech-Kandidat terbaik
            </h1>

            <h3 class="text-sm text-white font-bold">
              Create jobs, invite, and hire with ease
            </h3>
          </div>

          <JobModal @load-data="loadData()">
            <template #trigger>
              <base-button>Create a new job</base-button>
            </template>
          </JobModal>
        </div>
      </div>
    </div>
  </section-job-list>
</template>
