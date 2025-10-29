<script setup lang="ts">
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import z from "zod";

definePageMeta({
  title: "Sign In",
  layout: "default",
});

const { setUser, setToken } = useAuthStore();
const loading = ref(false);
const form = reactive({
  email: "",
  password: "",
});

const errors = ref<{ email?: string; password?: string }>({});
const errorMessage = ref();
const schema = z.object({
  email: z.string().check(
    z.email("Invalid email format"),
    z.minLength(1, "Field is required"),
  ),
  password: z.string().min(1, "Field is required"),
});

const { loginWithEmailAndPassword } = useAuth();

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
      const { auth, db } = await useFirebase();

      const signInMethods = await fetchSignInMethodsForEmail(auth, form.email);

      if (!signInMethods) {
        errorMessage.value = "Email ini belum terdaftar sebagai akun di Rakamin Academy.";
        loading.value = false;
        return;
      }

      const response = await loginWithEmailAndPassword(form.email, form.password);

      if (response) {
        const token = await response.getIdToken();

        const userDocRef = doc(db, "users", response.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          setUser({
            id: response.uid,
            email: response.email,
            ...userData,
          });

          setToken(token);
        }
        else {
          errorMessage.value = "Data pengguna tidak ditemukan.";
        }
      }
    }
    catch (error) {
      errorMessage.value = error;
    }

    setTimeout(() => {
      loading.value = false;
      errorMessage.value = "";
    }, 3000);
  }
}
</script>

<template>
  <section-auth logo>
    <div class="space-y-2">
      <h1 class="text-xl text-netral-90 font-bold">
        Masuk ke Rakamin
      </h1>

      <h4 class="text-sm">
        Belum punya akun? <router-link
          to="/auth/sign-up"
          class="text-primary-main"
        >
          Daftar menggunakan email
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
            v-if="errors.email"
            #message
          >
            <p
              v-if="errors.password"
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
          Masuk
        </base-button>
      </form>

      <div class="flex items-center justify-center gap-3 w-full">
        <div class="w-full h-px bg-netral-60" />

        <p class="text-xs text-netral-60">
          or
        </p>

        <div class="w-full h-px bg-netral-60" />
      </div>

      <!-- <base-button
        color="outline"
        size="lg"
        :loading="loading"
        @click="hidePassword = !hidePassword"
      >
        <Icon :name="hidePassword ? 'i-heroicons-key' : 'i-heroicons-envelope'" />
        {{ hidePassword ? 'Masuk dengan kata sandi' : 'Kirim link login melalui email' }}
      </base-button> -->

      <base-button
        color="outline"
        size="lg"
        :loading="loading"
        class="!w-full"
      >
        <img
          src="/icon/google-icon.png"
          alt="google-icon"
          class="w-6 h-6"
        >
        Masuk dengan Google
      </base-button>
    </div>
  </section-auth>
</template>
