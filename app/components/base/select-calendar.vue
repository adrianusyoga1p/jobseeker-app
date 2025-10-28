<script setup lang="ts">
import type { CalendarDate, DateValue } from "@internationalized/date";

import { parseDate } from "@internationalized/date";

export type DateRange = {
  start: DateValue | CalendarDate | any;
  end: DateValue | CalendarDate | any;
};

const { model = "range", label } = defineProps<{
  model?: "range" | "multiple" | "single";
  label?: string;
}>();

const emit = defineEmits<{
  (e: "update:clearDate", value?: any): void;
}>();

const date = defineModel<any>();
const dateModel = computed({
  get() {
    const val = date.value;

    if (!val || val === "") {
      return null;
    }

    if (model === "single") {
      if (typeof val === "object" && val.calendar) {
        return val;
      }

      if (typeof val === "string") {
        return parseDate(val);
      }
      return null;
    }

    if (model === "range" || model === "multiple") {
      if (typeof val === "object") {
        const rangeVal = val as DateRange;

        const parsedStart = rangeVal.start && typeof rangeVal.start === "string"
          ? parseDate(rangeVal.start)
          : rangeVal.start;

        const parsedEnd = rangeVal.end && typeof rangeVal.end === "string"
          ? parseDate(rangeVal.end)
          : rangeVal.end;

        return { start: parsedStart, end: parsedEnd };
      }
    }

    return val;
  },

  set(newValue) {
    date.value = newValue;
  },
});
</script>

<template>
  <div class="space-y-2 w-full">
    <label
      v-if="!!label"
      class="text-xs block text-netral-90 font-medium"
    >{{ label }}</label>

    <UIPopover>
      <base-button
        color="outline"
        class="w-full justify-start"
        size="lg"
      >
        <div
          v-if="model === 'single'"
          class="flex gap-2 items-center justify-start w-full flex-1"
        >
          <icon
            name="i-heroicons-calendar"
            class="text-balance"
          />

          <p class="text-netral-90 font-normal">
            {{ dateModel
              ? $formatDate(dateModel.toString(), 'DD MMM YYYY')
              : "Select Date"
            }}
          </p>

          <icon
            v-if="dateModel"
            name="i-heroicons-x-mark"
            class="text-balance cursor-point ml-auto"
            @click.stop="emit('update:clearDate', null)"
          />
        </div>

        <div
          v-else
          class="flex gap-2 items-center justify-start w-full flex-1"
        >
          <icon
            name="i-heroicons-calendar"
            class="text-balance"
          />

          <p class="text-netral-90 font-normal">
            {{ (dateModel as DateRange)?.start
              ? $formatDate((dateModel as DateRange)?.start.toString(), 'DD MMM YYYY')
              : null
            }}
            -
            {{ (dateModel as DateRange)?.end
              ? $formatDate((dateModel as DateRange)?.end.toString(), 'DD MMM YYYY')
              : null
            }}
          </p>

          <icon
            v-if="dateModel && (model === 'range' && (dateModel as DateRange)?.start || (model === 'multiple' && (dateModel as DateValue[]).length > 0))"
            name="i-heroicons-x-mark"
            class="text-balance cursor-point ml-auto"
            @click.stop="emit('update:clearDate', null)"
          />
        </div>
      </base-button>

      <template #content>
        <UICalendar
          v-if="model === 'range'"
          v-model="dateModel"
          range
        />

        <UICalendar
          v-if="model === 'multiple'"
          v-model="dateModel"
          multiple
        />

        <UICalendar
          v-if="model === 'single'"
          v-model="dateModel"
        />
      </template>
    </UIPopover>
  </div>
</template>
