import { defineStore } from "pinia";
import DataService from "../services/DataService";

export const useProdukStore = defineStore({
  id: "produk",
  state: () => ({
    return: {
      produk: {},
      produkId: {},
      produkPopular: {},
      produkPopularBanget: []
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
    async searchProduk(params) {
      const prod = await DataService.searchProduk(params);
      this.produk = prod.data.data
      this.produkPopularBanget = prod.data.data
    },
    async getPopular() {
      const prod = await DataService.getPopular();
      this.produkPopular = prod.data.data
    }
  },
});
