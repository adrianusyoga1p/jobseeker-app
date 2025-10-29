<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

import dayjs from "dayjs";
import slugify from "slugify";
import z from "zod";

import JobForm from "./job-form.vue";

const emit = defineEmits<{
  (e: "loadData", value?: any): void;
}>();

const { formatPrice } = useFormatter();
const errors = reactive<Record<string, string>>({});
const toast = useToast();
const modalShow = ref(false);
const form = reactive<JobPayload>({
  title: "",
  type: "",
  description: "",
  totalCandidateNeeded: 1,
  minSalary: null,
  maxSalary: null,
  applicantForm: {
    title: "Dynamic Form",
    fields: [{
      label: "Full Name",
      key: "fullName",
      type: "text",
      active: true,
      required: true,
      data: [],
    }, {
      label: "Email",
      key: "email",
      type: "text",
      active: true,
      required: true,
      data: [],
    }] as DynamicForm[],
  },
});

const selectDataSchema = z.array(
  z.object({
    label: z.string().min(1, "Select label is required"),
    value: z.string().min(1, "Select value is required"),
  }),
).min(2, "At least one select is required");

const fieldSchema = z.object({
  key: z.string().min(1, "Field key is required"),
  label: z.string().min(1, "Field label is required"),
  type: z.string().min(1, "Field type is required"),
  required: z.boolean(),
  active: z.boolean(),
  data: z.array(z.any()),
});

type FieldSchemaType = z.infer<typeof fieldSchema>;

const refinedFieldSchema = fieldSchema
  .superRefine((data: FieldSchemaType, ctx: z.RefinementCtx) => {
    if (data.type === "select") {
      const validationResult = selectDataSchema.safeParse(data.data);

      if (!validationResult.success) {
        validationResult.error.issues.forEach((issue) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: issue.message,
            path: ["data", ...issue.path],
          });
        });
      }
    }
  });

const schema = z.object({
  title: z.string().min(1, "Field is required"),
  type: z.string().min(1, "Field is required"),
  description: z.string().min(1, "Field is required"),
  totalCandidateNeeded: z.number().min(1, "Field is required"),
  minSalary: z.number(),
  maxSalary: z.number(),
  applicantForm: z.object({
    title: z.string().min(1, "Field is required"),
    fields: z
      .array(refinedFieldSchema)
      .min(1, "At least one field is required"),
  }),
});

function clearErrors() {
  Object.keys(errors).forEach(key => delete errors[key]);
};

function getErrorPath(path: (string | number | symbol)[]): string {
  return path.join(".");
};

async function handleSubmit(status = "active") {
  clearErrors();

  const result = schema.safeParse(form);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const pathKey = getErrorPath(issue.path);

      errors[pathKey] = issue.message;
    });
    return;
  }

  await addData("jobs", {
    title: form.title,
    type: form.type,
    description: form.description,
    slug: slugify(form.title, {
      lower: true,
      strict: true,
    }),
    status,
    totalCandidateNeeded: form.totalCandidateNeeded,
    minSalary: form.minSalary,
    maxSalary: form.maxSalary,
    location: "Jakarta Selatan",
    company: "Rakamin",
    salaryRange: {
      min: form.minSalary,
      max: form.maxSalary,
      displayText: `${formatPrice(form.minSalary)} - ${formatPrice(form.maxSalary)}`,
      currency: "IDR",
    },
    listCard: {
      badge: status === "draft"
        ? "Draft"
        : status === "active"
          ? "Active"
          : "Inactive",
      startedOnText: `started on ${dayjs().format("DD MMM YYYY")}`,
    },
    applicantForm: {
      title: form.applicantForm.title,
      fields: form.applicantForm.fields,
    },
    createdAt: dayjs().toISOString(),
  }).then(() => {
    toast.add({
      title: "Job vacancy successfully created",
    });
    modalShow.value = false;
    emit("loadData");
  });
}

const items = ref<DropdownMenuItem[]>([
  {
    label: "Draft",
    class: "hover:bg-secondary-surface data-highlighted:!text-secondary-main",
    onSelect() {
      handleSubmit("draft");
    },
  },
  {
    label: "Active",
    class: "hover:bg-primary-surface data-highlighted:!text-primary-main",
    onSelect() {
      handleSubmit("active");
    },
  },
  {
    label: "Inactive",
    class: "hover:bg-danger-surface data-highlighted:!text-danger-main",
    onSelect() {
      handleSubmit("inactive");
    },
  },
]);
</script>

<template>
  <UIModal
    v-model:open="modalShow"
    title="Job Opening"
  >
    <slot name="trigger" />

    <template #body>
      <JobForm
        v-model="form"
        :errors="errors"
      />
    </template>

    <template #footer>
      <UIDropdownMenu :items="items">
        <base-button
          class="text-nowrap"
        >
          Publish Job
        </base-button>
      </UIDropdownMenu>
    </template>
  </UIModal>
</template>
