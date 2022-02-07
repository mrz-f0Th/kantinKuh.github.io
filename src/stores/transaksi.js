import { defineStore } from "pinia"

export const useTransaksiStore = defineStore({
  id: "Transaksi",
  state: () => {
    user: {}
  },
  actions: {
    setUser(value) {
      this.user = value
    }
  }
})
