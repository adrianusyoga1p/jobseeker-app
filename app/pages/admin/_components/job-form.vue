<script setup lang="ts">
defineProps<{
  errors: Record<string, string>;
}>();
const modelValue = defineModel<JobPayload>({
  default: {
    title: "",
    type: "",
    description: "",
    totalCandidateNeeded: null,
    minSalary: null,
    maxSalary: null,
    applicantForm: {
      title: "Dynamic Form",
      fields: [] as DynamicForm[],
    },
  },
});

function addField() {
  modelValue.value.applicantForm.fields.push({
    key: "",
    label: "",
    type: "",
    required: true,
    active: true,
    data: [],
  });
}

function removeField(index: number) {
  modelValue.value.applicantForm.fields = modelValue.value.applicantForm.fields.filter((_, n) => n !== index);
}

const editTitle = ref(false);
const inputRef = ref<HTMLInputElement>();

watch(editTitle, async (val) => {
  if (val) {
    await nextTick();
    inputRef.value?.focus();
  }
});

const listType = ref<{ value: string | null; label: string }[]>([
  { value: null, label: "Select type form" },
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "email", label: "Email" },
  { value: "select", label: "Select" },
  { value: "date", label: "Date" },
]);

const optionField = [
  { label: "Mandatory", mode: "mandatory" },
  { label: "Optional", mode: "optional" },
  { label: "Off", mode: "off" },
];

function handleMode(mode: string, fields: DynamicForm) {
  switch (mode) {
    case "mandatory":
      fields.required = true;
      fields.active = true;
      break;
    case "optional":
      fields.required = false;
      fields.active = true;
      break;
    case "off":
      fields.required = false;
      fields.active = false;
      break;
  }
}

function isActiveMode(mode: string, fields: DynamicForm) {
  return (
    (mode === "mandatory" && fields.required && fields.active)
    || (mode === "optional" && !fields.required && fields.active)
    || (mode === "off" && !fields.required && !fields.active)
  );
}

function onSelectType(field: DynamicForm) {
  if (field.type === "select") {
    addDataSelect(field);
  }
  else {
    field.data = [];
  }
}

function addDataSelect(field: DynamicForm) {
  field.data?.push({
    label: "",
    value: null,
  });
}

function removeDateSelect(index: number, field: DynamicForm) {
  field.data = field.data?.filter((_, n) => n !== index);
}
</script>

<template>
  <div class="space-y-4">
    <base-input
      v-model="modelValue.title"
      label="Job Name"
    >
      <template
        v-if="errors.title"
        #message
      >
        <p
          class="text-danger-main text-xs"
        >
          {{ errors.title }}
        </p>
      </template>
    </base-input>

    <base-input
      v-model="modelValue.type"
      label="Job Type"
    >
      <template
        v-if="errors.type"
        #message
      >
        <p
          class="text-danger-main text-xs"
        >
          {{ errors.type }}
        </p>
      </template>
    </base-input>

    <!-- <base-input
      v-model="modelValue.description"
      label="Job Description"
    >
      <template
        v-if="errors.description"
        #message
      >
        <p
          class="text-danger-main text-xs"
        >
          {{ errors.description }}
        </p>
      </template>
    </base-input> -->

    <base-editor
      v-model="modelValue.description"
      label="Job Description"
    />

    <base-input
      v-model="modelValue.totalCandidateNeeded"
      label="Total Candidate Needed"
      type="number"
    >
      <template
        v-if="errors.totalCandidateNeeded"
        #message
      >
        <p
          class="text-danger-main text-xs"
        >
          {{ errors.totalCandidateNeeded }}
        </p>
      </template>
    </base-input>

    <div class="border-t border-dashed border-netral-40 space-y-4 pt-6">
      <h1 class="text-xs">
        Job Salary
      </h1>

      <div class="flex items-center gap-4">
        <base-input
          v-model="modelValue.minSalary"
          label="Minimum Estimated Salary"
          type="number"
        />

        <div class="mt-auto mb-4 w-8 h-px bg-netral-40" />

        <base-input
          v-model="modelValue.maxSalary"
          label="Maximum Estimated Salary"
          type="number"
        />
      </div>
    </div>

    <div class="border border-netral-30 p-4 rounded-lg space-y-4">
      <div class="flex gap-2 items-center text-sm font-bold">
        <h1 v-if="!editTitle">
          {{ modelValue.applicantForm.title }}
        </h1>

        <input
          v-else
          ref="inputRef"
          v-model="modelValue.applicantForm.title"
          type="text"
          class="focus:outline-none focus:border-none text-sm font-bold h-6 w-fit"
          @blur="editTitle = false"
        >

        <button @click="editTitle = !editTitle">
          <icon name="i-heroicons-pencil-square" />
        </button>
      </div>

      <base-button
        @click="addField"
      >
        Add Field
      </base-button>

      <div
        v-if="modelValue.applicantForm.fields.length"
        class="space-y-6 py-4"
      >
        <template
          v-for="(form, n) in modelValue.applicantForm.fields"
          :key="n"
        >
          <div
            class="flex gap-4 items-center justify-between"
            :class="[
              n !== modelValue.applicantForm.fields.length - 1 ? 'pb-6 border-b border-netral-40' : '',
            ]"
          >
            <base-button
              color="danger"
              class="mt-auto mb-1"
              @click="removeField(n)"
            >
              <icon name="i-heroicons-trash" />
            </base-button>

            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <base-input
                  v-model="form.label"
                  label="Input label form"
                  type="text"
                >
                  <template
                    v-if="errors[`applicantForm.fields.${n}.label`]"
                    #message
                  >
                    <p
                      class="text-danger-main text-xs"
                    >
                      {{ errors[`applicantForm.fields.${n}.label`] }}
                    </p>
                  </template>
                </base-input>

                <base-input
                  v-model="form.key"
                  label="Input key form"
                  type="text"
                >
                  <template
                    v-if="errors[`applicantForm.fields.${n}.key`]"
                    #message
                  >
                    <p
                      class="text-danger-main text-xs"
                    >
                      {{ errors[`applicantForm.fields.${n}.key`] }}
                    </p>
                  </template>
                </base-input>

                <div class="w-full">
                  <base-select
                    v-model="form.type"
                    label="Iput type form"
                    :items="listType"
                    @change="onSelectType(form)"
                  />

                  <p
                    v-if="errors[`applicantForm.fields.${n}.type`]"
                    class="text-danger-main text-xs mt-2"
                  >
                    {{ errors[`applicantForm.fields.${n}.type`] }}
                  </p>
                </div>

                <base-button
                  v-if="form.type === 'select'"
                  class="mb-1 mt-auto"
                  @click="addDataSelect(form)"
                >
                  <icon name="i-heroicons-plus" />
                </base-button>
              </div>

              <template
                v-for="(item, i) in form.data"
                :key="i"
              >
                <div
                  v-if="form.type === 'select' && form.data?.length"
                  class="flex gap-4 items-center"
                >
                  <base-input
                    v-model="item.label"
                    label="Input label select"
                  >
                    <template
                      v-if="errors[`applicantForm.fields.${n}.data.${i}.label`]"
                      #message
                    >
                      <p class="text-danger-main text-xs">
                        {{ errors[`applicantForm.fields.${n}.data.${i}.label`] }}
                      </p>
                    </template>
                  </base-input>

                  <base-input
                    v-model="item.value"
                    label="Input value select"
                  >
                    <template
                      v-if="errors[`applicantForm.fields.${n}.data.${i}.value`]"
                      #message
                    >
                      <p class="text-danger-main text-xs">
                        {{ errors[`applicantForm.fields.${n}.data.${i}.value`] }}
                      </p>
                    </template>
                  </base-input>

                  <base-button
                    class="mb-1 mt-auto"
                    color="danger"
                    @click="removeDateSelect(i, form)"
                  >
                    <icon name="i-heroicons-trash" />
                  </base-button>
                </div>
              </template>
            </div>

            <div class="flex items-center gap-4 mt-auto mb-1">
              <base-button
                v-for="(item, index) in optionField"
                :key="index"
                type="button"
                :color="isActiveMode(item.mode, form) ? 'primary' : 'outline'"
                class="w-fit px-4 !rounded-full"
                @click="handleMode(item.mode, form)"
              >
                {{ item.label }}
              </base-button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
