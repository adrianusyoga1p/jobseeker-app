<script setup lang="ts">
const route = useRoute();

const { count } = storeToRefs(useCounterStore());
const { setLocale } = useI18n();

const apiLoading = ref(false);
const apiData = ref<User[]>([]);

async function loadData() {
  apiLoading.value = true;
  const response = await apiUserGetList();
  apiLoading.value = false;
  apiData.value = response;
}
loadData();
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>

    <p>{{ $t('hello') }}</p>

    <button @click="setLocale('id')">
      ID
    </button>

    / <button @click="setLocale('en')">
      EN
    </button>

    <p>Current route: {{ route.path }}</p>

    <a
      href="https://nuxt.com/docs/getting-started/routing"
      target="_blank"
    >
      Learn more about Nuxt Routing
    </a>

    <div class="flex gap-2 items-center mb-8">
      <button @click="count--">
        -
      </button>

      <p>{{ count }}</p>

      <button @click="count++">
        +
      </button>
    </div>

    <p>Users:</p>

    <ul class="ml-8 list-disc">
      <li
        v-for="user in apiData"
        :key="user.id"
      >
        {{ user.name }}
      </li>
    </ul>

    <FormSample />
  </div>
</template>
