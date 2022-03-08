import { defineStore } from "pinia"
import DataService from "../services/DataService"

export const useTransaksiStore = defineStore({
  id: "Transaksi",
  state: () => {
    return {
      user: {},
      transaksi: {},
      transaksiId: {},
      statuss: "Menunggu"
    }
  },
  actions: {
    setUser(value) {
      this.user = value
    },
    setStatus(value) {
      this.statuss = value
      console.log(this.statuss)
    },
    async setTransaksi(data) {
      await DataService.setTransaksi(data);
    },
    async getTransaksi() {
      const transaksi = await DataService.getTransaksi();
      this.transaksi = transaksi.data.data
    },
    async getTransaksiKode(kode) {
      const transaksiId = await DataService.getTransaksiKode(kode)
      this.transaksiId = transaksiId.data.data
    }
  }
})
