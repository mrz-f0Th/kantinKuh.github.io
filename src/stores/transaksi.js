import { defineStore } from "pinia";
import DataService from "../services/DataService";

export const useTransaksiStore = defineStore({
  id: "Transaksi",
  state: () => {
    return {
      user: {},
      transaksi: {},
      transaksiId: {},
      statuss: "Menunggu",
      total_harga: "",
      arrTotalHarga: [],
    };
  },
  actions: {
    setUser(value) {
      localStorage.setItem("user", JSON.stringify(value));
    },
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    setStatus(value) {
      this.statuss = value;
    },
    setTotalHarga(data) {
      const totalHarga = data.reduce((i, item) => {
        return i + item.harga * item.pivot.jumlah;
      }, 0);
      this.total_harga = totalHarga;
    },
    setArrTotalHarga(data) {
      const arrTotalHarga = data.reduce((i, item) => {
        return i + item.harga * item.pivot.jumlah;
      }, 0);
      this.arrTotalHarga.push(arrTotalHarga);
    },
    async setTransaksi(data) {
      await DataService.setTransaksi(data);
    },
    async getTransaksi() {
      const transaksi = await DataService.getTransaksi();
      this.transaksi = transaksi.data.data;
    },
    async getTransaksiKode(kode) {
      const transaksiId = await DataService.getTransaksiKode(kode);
      this.transaksiId = transaksiId.data.data;
    },
    async updateTransaksi(kode, params) {
      const updateTransaksi = await DataService.updateTransaksi(kode, params);
      this.transaksi = updateTransaksi.data.data;
    },
  },
});
