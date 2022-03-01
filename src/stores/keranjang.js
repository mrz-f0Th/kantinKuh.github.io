import { defineStore } from "pinia"
import DataService from "../services/DataService"

export const useKeranjangStore = defineStore({
  id: "keranjang",
  state: () => {
    return {
      keranjang: [],
      code: '',
    }
   
  },
  actions: {
    codeGenerator(length) {
      const chars ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  
      let result = ''
      for ( let i = 0; i < length; i++ ) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      this.code = result
    },
    async setKeranjang(data){
      await DataService.setKeranjang(data)
    },
    async getKeranjang() {
      const keranjang = await DataService.getKeranjang()
      this.keranjang = keranjang.data
    },
    async deleteKeranjang(id) {
      await DataService.deleteKeranjang(id)
      this.keranjang = []
    }
  }
})
