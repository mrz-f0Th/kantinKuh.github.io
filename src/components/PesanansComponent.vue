<template>
  <pre>{{ transaksi }}</pre>
</template>

<script>
import { useTransaksiStore } from "../stores/transaksi.js";
import { reactive } from "vue";

export default {
  async setup() {
    const transaksiStore = useTransaksiStore();

    const transaksi = reactive({});

    if (localStorage.getItem("kode_transaksi") !== null) {
      const kode_transaksi = JSON.parse(localStorage.kode_transaksi);
      try {
        await transaksiStore.getTransaksiKode(kode_transaksi);
        transaksi.value = transaksiStore.transaksiId;
        console.log(transaksi);
      } catch (e) {
        console.log(e);
      }
    }

    return { transaksi };
  },
};
</script>
