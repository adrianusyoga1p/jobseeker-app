<script setup lang="ts">
// const router = useRouter();
const { email } = storeToRefs(useAuthStore());
definePageMeta({
  layout: "default",
  title: "Email Confirmation",
});
navigateTo("/auth");

// onMounted(async () => {
//   const { app } = await useFirebase();
//   const auth = getAuth(app);

//   if (isSignInWithEmailLink(auth, window.location.href)) {
//     try {
//       const result = await signInWithEmailLink(auth, email.value, window.location.href);
//       console.log("User:", result);

//       if (result) {
//         const token = await result.user.getIdToken();
//         console.log("Token:", token);
//         // email.value = "";
//         // router.push("/app/job-listing");
//       }
//     }
//   catch (error) {
//     console.error("Sign in error:", error);
//   }
//   }
// });
</script>

<template>
  <section-auth>
    <div class="space-y-2">
      <h1 class="text-xl text-center text-netral-90 font-bold">
        Bergabung dengan Rakamin
      </h1>

      <h4 class="text-sm text-center">
        Kami sudah mengirimkan link register ke <b>{{ email }}</b>

        yang berlaku dalam <b>30 menit</b>
      </h4>
    </div>

    <div class="flex items-center justify-center">
      <img
        src="/img/confirm-email.png"
        alt="lottie"
      >
    </div>
  </section-auth>
</template>
