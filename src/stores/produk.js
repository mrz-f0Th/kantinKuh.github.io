import { defineStore } from "pinia";
import DataService from "../services/DataService";

export const useProdukStore = defineStore({
  id: "produk",
  state: () => ({
    return: {
      produk: {},
      produkId: {},
    },
  }),
  actions: {
    async getProduk() {
      const prod = await DataService.getProduk();
      this.produk = prod.data;
    },
    async getProdukId(id) {
      const produkId = await DataService.getProdukId(id);
      this.produkId = produkId.data.data;
    },
    async deleteProduk(kode) {
      await DataService.deleteProduk(kode);
    },
  },
});
