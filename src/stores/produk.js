import { defineStore } from "pinia";
import DataService from "../services/DataService"

export const useProdukStore = defineStore({
  id: "produk",
  state: () => ({
    produk: {}
  }),
  actions: {
    async getProduk(){
      const prod = await DataService.getProduk()
      this.produk = prod.data
    }
  }
})
