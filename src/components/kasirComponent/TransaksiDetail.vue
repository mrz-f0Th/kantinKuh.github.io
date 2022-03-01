<template>
  <h1>Data Transaksi</h1>
  <div v-for="transaksi in transaksiId.value.data">
    <p>Makanan : {{transaksi.produk.nama_produk}}</p>
    <p>Harga : {{transaksi.produk.harga_produk}}</p>
    <p>Jumlah : {{transaksi.jumlah}}</p>
  </div>
  <hr />

  <p>Pesanan : {{transaksiId.value.user.nama}}</p>
  <p>no Meja : {{transaksiId.value.user.meja}}</p>
  <p>no telp : {{transaksiId.value.user.telepon}}</p>
  <p>Total Harga : {{transaksiId.value.total_harga}}</p>
</template>

<script setup>
import { reactive } from "vue"
import { useTransaksiStore } from "../../stores/transaksi.js"
import { useRoute } from "vue-router"

const transaksiStore = useTransaksiStore()
const route = useRoute()
const transaksiId = reactive({})

try{
  await transaksiStore.getTransaksiId(route.params.id)
  transaksiId.value = transaksiStore.transaksiId
}catch(e) {
  console.log(e)
}

</script>
