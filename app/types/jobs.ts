export type JobPayload = {
  title: string;
  type: string;
  description: string;
  totalCandidateNeeded: number | null;
  minSalary: number | null;
  maxSalary: number | null;
  applicantForm: {
    title: string;
    fields: DynamicForm[];
  };
};

export type DynamicForm = {
  key: string;
  label: string;
  required: boolean;
  type: string;
  active: boolean;
  data?: {
    value: string | number | null;
    label: string;
  }[];
  minLength?: number;
  maxLength?: number;
};

export type JobListData = {
  id: string;
  slug: string;
  title: string;
  type: string;
  description: string;
  status: "active" | "inactive" | "draft";
  salaryRange: SalaryRangeData;
  company: string;
  location: string;
  listCard: {
    badge: "Active" | "Inactive" | "Draft";
    startedOnText: string;
    cta: string;
  };
  applicantForm: {
    title: string;
    fields: DynamicForm[];
  };
  createdAt: string;
};

export type SalaryRangeData = {
  min: number;
  max: number;
  currency: string;
  displayText: string;
};
