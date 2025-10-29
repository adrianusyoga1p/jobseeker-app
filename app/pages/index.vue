<script setup lang="ts">
navigateTo("/auth/sign-in");
const { job, applicantForm } = storeToRefs(useJobStore());

onMounted(() => {
  job.value = null;
  applicantForm.value = {};
});
</script>

<template>
  <p>Redirecting</p>
</template>
