<script setup lang="ts">
definePageMeta({
  title: "Applied Job",
  layout: "default",
});

setTimeout(() => {
  navigateTo("/app/job-list");
}, 5000);
</script>

<template>
  <section class="w-full h-dvh flex justify-center items-center p-6">
    <div class="flex flex-col items-center justify-center max-w-2xl">
      <img
        src="/img/success-applied.png"
        alt="success"
      >

      <div>
        <h1 class="font-bold text-2xl text-netral-100 text-center">
          🎉 Your application was sent!
        </h1>

        <h4 class="text-netral-90 text-center">
          Congratulations! You've taken the first step towards a rewarding career at Rakamin. We look forward to learning more about you during the application process.
        </h4>
      </div>
    </div>
  </section>
</template>
