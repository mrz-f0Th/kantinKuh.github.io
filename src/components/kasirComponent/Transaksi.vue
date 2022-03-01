<template>
  <p>List Transaksi</p>
  <div v-for="(transaksi, i) in transaksi.value" :key="transaksi.id">
    <p>No : {{i + 1}}</p>
    <p>Nama : {{transaksi.user.nama}}</p>
    <p>Total : {{transaksi.total_harga}}</p>
    <div>
      <span>Aksi : <button @click="transaksiDetail(transaksi.id)">detail</button></span>
    </div>
  </div>
</template>

<script>
import { useTransaksiStore } from "../../stores/transaksi.js"
import { reactive } from "vue"
import { useRouter } from "vue-router"

export default{
  async setup() {
    const transaksiStore = useTransaksiStore()
    const router = useRouter()

    const transaksi = reactive({})

    try{
      await transaksiStore.getTransaksi()
      transaksi.value = transaksiStore.transaksi
    }catch(e) {
      console.log()
    }

    const transaksiDetail = (id) => router.push({path: `/kasir/${id}`})

    return { transaksi, transaksiDetail }
  }
}
</script>
