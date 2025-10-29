<script setup lang="ts">
import type { ZodTypeAny } from "zod";

import dayjs from "dayjs";
import { arrayUnion, doc, getDoc, writeBatch } from "firebase/firestore";
import { z } from "zod";

import ModalCamera from "./modal-camera.vue";

const { job, applicantForm } = storeToRefs(useJobStore());
const { user } = storeToRefs(useAuthStore());
const toast = useToast();
type FieldErrors = z.inferFormattedError<ReturnType<typeof createApplicantFormSchema>>;
const formErrors = ref<FieldErrors | undefined>(undefined);
function createApplicantFormSchema(fields: DynamicForm[]) {
  const schemaFields: Record<string, ZodTypeAny> = {};

  fields
    .filter(field => field.active)
    .forEach((field) => {
      let fieldSchema = z.string();
      const isRequired = field.required;
      const defaultError = `${field.label} is required.`;

      switch (field.type) {
        case "email":
          fieldSchema = fieldSchema.email("Email format invalid.");
          break;
        case "number":
          fieldSchema = fieldSchema.regex(/^\d*$/, `${field.label} must be number.`);
          break;
        case "password":
          if (field.minLength === undefined) {
            fieldSchema = fieldSchema.min(8, "Password must be at least 8 characters.");
          }
          break;
      }

      if (isRequired) {
        fieldSchema = fieldSchema.min(1, defaultError);
      }

      schemaFields[field.key] = fieldSchema;
    });

  schemaFields.photoProfile = z.string().min(1, "Profile image is required.");

  return z.object(schemaFields);
}

async function handleSubmit() {
  if (!user.value?.id || !job.value?.id) {
    toast.add({
      title: "Error",
      description: "Data pengguna atau pekerjaan tidak valid.",
      color: "error",
    });
    return;
  }

  const activeFields: DynamicForm[] = toRaw(job.value.applicantForm.fields);
  const formSchema = createApplicantFormSchema(activeFields);

  const formData = toRaw(applicantForm.value);
  const result = formSchema.safeParse(formData);

  if (result.error) {
    formErrors.value = result.error.format();
    return;
  }

  const { db } = await useFirebase();

  const userId = user.value.id;
  const jobId = job.value.id;
  const joinId = `${userId}_${jobId}`;

  const applicantRef = doc(db, "applicants", joinId);
  const response = await getDoc(applicantRef);

  if (response.exists()) {
    toast.add({
      title: "Failed to applied",
      description: "You have to applied this job.",
      color: "warning",
    });
    return;
  }

  const batch = writeBatch(db);

  const applicationData = {
    jobId,
    userId,
    createdAt: dayjs().toISOString(),
    ...applicantForm.value,
  };

  batch.set(applicantRef, applicationData);

  const userRef = doc(db, "users", userId);
  batch.update(userRef, {
    appliedJobIds: arrayUnion(jobId),
  });

  await batch.commit().then(() => {
    navigateTo("/app/success-applied");
  }).catch(() => {
    toast.add({
      title: "Error submitting application and updating user history",
      color: "error",
    });
  });
}

function getFieldError(key: string): string | undefined {
  if (!formErrors.value)
    return undefined;

  const fieldErrorObject = (formErrors.value as any)[key];

  if (fieldErrorObject && fieldErrorObject._errors && fieldErrorObject._errors.length > 0) {
    return fieldErrorObject._errors[0];
  }

  return undefined;
}

watch(
  applicantForm,
  (newForm) => {
    if (!job.value?.applicantForm?.fields)
      return;

    job.value.applicantForm.fields
      .filter(field => field.active && field.type === "date")
      .forEach((field) => {
        const key = field.key;
        const value = newForm[key];

        if (value && typeof value === "object" && value.calendar && typeof value.toDate === "function") {
          const dateObject = value.toDate();

          applicantForm.value[key] = dayjs(dateObject).format("DD-MM-YYYY");
        }
        else if (value === null || value === undefined || value === "") {
          applicantForm.value[key] = null;
        }
      });
  },
  { deep: true },
);
</script>

<template>
  <div class="h-full">
    <div class="flex flex-col gap-6">
      <div class="flex gap-4 items-center justify-between px-10 pt-10">
        <router-link to="/app/job-list">
          <base-button
            color="outline"
            size="sm"
            class="!px-1 w-7"
          >
            <icon name="i-heroicons-arrow-left-20-solid" />
          </base-button>
        </router-link>

        <h1 class="text-netral-100 font-bold text-lg">
          {{ `Apply ${job?.title} at ${job?.company}` }}
        </h1>

        <p class="text-netral-90 text-sm ml-auto">
          This field required to fill
        </p>
      </div>

      <div class="h-[calc(100vh_-_220px)] px-4">
        <div class="h-full space-y-6 overflow-y-auto px-6 pb-10">
          <!-- <base-input-file
            v-model="applicantForm.photoProfile"
            label="Photo Profile"
            type="image"
          /> -->

          <div>
            <base-input-file
              v-model="applicantForm.photoProfile"
              label="Photo Profile"
              type="image"
              modal
            >
              <template #triggerModal>
                <ModalCamera>
                  <template #trigger>
                    <base-button color="outline">
                      Take a Picture
                    </base-button>
                  </template>
                </ModalCamera>
              </template>
            </base-input-file>

            <template
              v-if="getFieldError('photoProfile')"
            >
              <p
                class="text-danger-main text-xs mt-2"
              >
                {{ getFieldError('photoProfile') }}
              </p>
            </template>
          </div>

          <template
            v-for="(form, n) in job?.applicantForm.fields?.filter((form) => form.active)"
            :key="n"
          >
            <base-input
              v-if="form.type === 'text'"
              v-model="applicantForm[form.key]"
              type="text"
              :label="form.label"
            >
              <template
                v-if="getFieldError(form.key)"
                #message
              >
                <p
                  class="text-danger-main text-xs"
                >
                  {{ getFieldError(form.key) }}
                </p>
              </template>
            </base-input>

            <base-input
              v-if="form.type === 'number'"
              v-model="applicantForm[form.key]"
              type="number"
              :label="form.label"
            >
              <template
                v-if="getFieldError(form.key)"
                #message
              >
                <p
                  class="text-danger-main text-xs"
                >
                  {{ getFieldError(form.key) }}
                </p>
              </template>
            </base-input>

            <base-input
              v-if="form.type === 'email'"
              v-model="applicantForm[form.key]"
              type="email"
              :label="form.label"
            >
              <template
                v-if="getFieldError(form.key)"
                #message
              >
                <p
                  class="text-danger-main text-xs"
                >
                  {{ getFieldError(form.key) }}
                </p>
              </template>
            </base-input>

            <div v-if="form.type === 'select'">
              <base-select
                v-model="applicantForm[form.key]"
                :items="form.data"
                :label="form.label"
                :placeholder="`Select ${form.key}`"
              />

              <p
                v-if="getFieldError(form.key)"
                class="text-danger-main text-xs mt-2"
              >
                {{ getFieldError(form.key) }}
              </p>
            </div>

            <div v-if="form.type === 'date'">
              <base-select-calendar
                v-model="applicantForm[form.key]"
                :label="form.label"
                model="single"
                @update:clear-date="() => {
                  applicantForm[form.key] = ''
                }"
              />

              <p
                v-if="getFieldError(form.key)"
                class="text-danger-main text-xs mt-2"
              >
                {{ getFieldError(form.key) }}
              </p>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="px-10 py-6 border-t border-netral-40">
      <base-button
        class="w-full"
        size="lg"
        @click="handleSubmit"
      >
        Submit
      </base-button>
    </div>
  </div>
</template>
