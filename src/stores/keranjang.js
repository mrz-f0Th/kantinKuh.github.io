import { defineStore } from "pinia";
import DataService from "../services/DataService";

export const useKeranjangStore = defineStore({
  id: "keranjang",
  state: () => {
    return {
      keranjang: [],
      kode_keranjang: "",
      keranjangLength: "",
      code: "",
    };
  },
  actions: {
    codeGenerator(length) {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      this.code = result;
    },
    async setKeranjang(data) {
      let keranjang = {
        jumlah: [],
        keterangan: [],
        kode: [],
      };

      keranjang = JSON.parse(localStorage.getItem("keranjang"));

      keranjang.jumlah.push(data.jumlah[0]);
      keranjang.keterangan.push(data.keterangan[0]);
      keranjang.kode.push(data.kode[0]);
      localStorage.setItem("keranjang", JSON.stringify(keranjang));

      const virKeranjang = JSON.parse(localStorage.getItem("keranjang"));
      const jumlah = virKeranjang.jumlah.map((x) => parseInt(x));
      virKeranjang.jumlah = jumlah;
      this.kode_keranjang = virKeranjang.kode_keranjang;

      await DataService.getKeranjangKode(virKeranjang.kode_keranjang)
        .then(async () => {
          await DataService.putKeranjang(
            virKeranjang.kode_keranjang,
            virKeranjang
          );
        })
        .catch(async () => {
          await DataService.setKeranjang(virKeranjang);
        });
    },
    async getKeranjangKode(kode) {
      const keranjang = await DataService.getKeranjangKode(kode);
      this.keranjang = keranjang.data.data;
      this.keranjangLength = keranjang.data.data.product.length;
    },
    async deleteKeranjang(id) {
      await DataService.deleteKeranjang(id);
      this.keranjang = [];
    },
  },
});
