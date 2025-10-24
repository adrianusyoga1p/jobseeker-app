<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, "required"),
  email: z.string().check(
    z.minLength(1, "required"),
    z.email("invalid format"),
  ),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: "",
  email: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // eslint-disable-next-line no-console
  console.log(event.data);
}
</script>

<template>
  <UIForm
    v-slot="form"
    :state
    :schema
    class="flex flex-col gap-2 w-1/3"
    @submit.prevent="onSubmit"
  >
    <UIFormField
      label="Full Name"
      name="name"
      required
    >
      <UIInput
        v-model="state.name"
        size="xl"
        placeholder="e.g. Jane Doe"
      />
    </UIFormField>

    <UIFormField
      label="Email Address"
      name="email"
      required
    >
      <UIInput
        v-model="state.email"
        type="email"
        size="xl"
        :ui="{ root: 'w-full' }"
        placeholder="e.g. janedoe@email.com"
      />
    </UIFormField>

    <UIButton
      type="submit"
      size="xl"
      :loading="form?.loading"
    >
      Submit
    </UIButton>
  </UIForm>
</template>
