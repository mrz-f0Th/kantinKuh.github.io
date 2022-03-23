<template>
  <pre>{{ transaksi }}</pre>
</template>

<script>
import { useTransaksiStore } from "../stores/transaksi.js";
import { reactive } from "vue";

export default {
  async setup() {
    const transaksiStore = useTransaksiStore();

    let transaksi = reactive([]);

    if (localStorage.getItem("kode_transaksi") !== null) {
      let kode_transaksi = reactive([]);
      kode_transaksi = JSON.parse(localStorage.getItem("kode_transaksi"));
      try {
        for (let i = 0; i < kode_transaksi.length; i++) {
          await transaksiStore.getTransaksiKode(kode_transaksi[i]);
          transaksi.push(transaksiStore.transaksiId);
        }
        console.log(transaksi);
      } catch (e) {
        console.log(e);
      }
    }

    return { transaksi };
  },
};
</script>
