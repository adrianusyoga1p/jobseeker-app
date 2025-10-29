import type { User } from "../types/user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    email: "",
    token: "" as string | null,
  }),
  actions: {
    setUser(userData: any) {
      this.user = userData;
    },
    setToken(token: string | null) {
      this.token = token;
    },
    logout() {
      this.user = null;
      this.token = null;
      this.email = "";
    },
  },
  getters: {
    isLogin: state => !!state.token,
  },
  persist: {
    serializer: {
      deserialize: val => JSON.parse(atob(val)),
      serialize: val => btoa(JSON.stringify(val)),
    },
  },
});
