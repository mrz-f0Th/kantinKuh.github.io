import { defineStore } from "pinia";
import auth from "../services/auth.service";

export const useLoginGuard = defineStore({
  id: "loginGuard",
  state: () => {
    return {
      user: {},
      oten: {}
    };
  },
  actions: {
    async login(data) {
      const otentikasi = await auth.login(data);
      this.oten = otentikasi
      console.log(this.oten)
    },
    async csrf() {
      await auth.get_csrf();
    },
    async logout() {
      auth.logout();
    },
  },
});
