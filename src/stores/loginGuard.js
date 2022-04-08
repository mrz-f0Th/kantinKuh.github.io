import { defineStore } from "pinia";
import auth from "../services/auth.service";

export const useLoginGuard = defineStore({
  id: "loginGuard",
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    async login(data) {
      await auth.login(data);
    },
    async csrf() {
      await auth.get_csrf();
    },
    async logout() {
      auth.logout();
    },
  },
});
