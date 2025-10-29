<script setup lang="ts">
import { onAuthStateChanged } from "firebase/auth";
import z from "zod";

definePageMeta({
  title: "Sign Up",
  layout: "default",
});

const { setUser, setToken } = useAuthStore();
const loading = ref(false);
const form = reactive({
  email: "",
  password: "",
});
const errors = ref<{ email?: string; password?: string }>({});
const { registerWithEmailAndPassword } = useAuth();
const errorMessage = ref();
const schema = z.object({
  email: z.string().check(
    z.email("Invalid email format"),
    z.minLength(1, "Field is required"),
  ),
  password: z.string().min(1, "Field is required"),
});

async function handleSubmit() {
  errorMessage.value = "";

  const result = schema.safeParse({
    email: form.email,
    password: form.password,
  });

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as "email" | "password";
      errors.value[field] = issue.message;
    });
    return;
  }

  if (form.email && form.password) {
    try {
      loading.value = true;
      await registerWithEmailAndPassword(form.email, form.password).finally(() => {
        loading.value = false;
        onStateAuth();
      });
    }
    catch (error) {
      errorMessage.value = error;
    }
  }
}

async function onStateAuth() {
  const { auth } = await useFirebase();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      setUser({
        id: user.uid,
        email: user.email,
        role: "applicant",
      });
      setToken(token);
    }
  });
}
</script>

<template>
  <section-auth logo>
    <div class="space-y-2">
      <h1 class="text-xl text-netral-90 font-bold">
        Bergabung dengan Rakamin
      </h1>

      <h4 class="text-sm">
        Sudah punya akun? <router-link
          to="/auth/sign-in"
          class="text-primary-main"
        >
          Masuk
        </router-link>
      </h4>
    </div>

    <base-label
      v-if="!!errorMessage"
      :label="errorMessage"
      variant="outline"
      color="danger"
    />

    <div class="space-y-4">
      <form
        class="space-y-4"
        @submit.prevent="handleSubmit"
      >
        <base-input
          v-model="form.email"
          label="Alamat Email"
          type="email"
        >
          <template
            v-if="errors.email"
            #message
          >
            <p
              class="text-danger-main text-xs"
            >
              {{ errors.email }}
            </p>
          </template>
        </base-input>

        <base-input
          v-model="form.password"
          label="Kata Sandi"
          type="password"
        >
          <template
            v-if="errors.password"
            #message
          >
            <p
              class="text-danger-main text-xs"
            >
              {{ errors.password }}
            </p>
          </template>
        </base-input>

        <base-button
          color="secondary"
          type="submit"
          size="lg"
          :loading="loading"
          class="!w-full"
        >
          Daftar dengan email
        </base-button>
      </form>

      <div class="flex items-center justify-center gap-3 w-full">
        <div class="w-full h-px bg-netral-60" />

        <p class="text-xs text-netral-60">
          or
        </p>

        <div class="w-full h-px bg-netral-60" />
      </div>

      <base-button
        color="outline"
        size="lg"
        class="!w-full"
      >
        <img
          src="/icon/google-icon.png"
          alt="google-icon"
          class="w-6 h-6"
        >
        Daftar dengan Google
      </base-button>
    </div>
  </section-auth>
</template>
