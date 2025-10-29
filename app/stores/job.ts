export const useJobStore = defineStore("job", {
  state: () => ({
    job: null as JobListData | null,
    applicantForm: {
      photoProfile: "",
    } as any,
  }),
  persist: true,
});
