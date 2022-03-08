<template>
  <pre>{{transaksi}}</pre>  
</template>

<script>
import { useTransaksiStore } from "../stores/transaksi.js"
import { reactive } from "vue"

export default{
  setup() {
    const transaksiStore = useTransaksiStore()

    const transaksi = reactive({})

    const virKeranjang = JSON.parse(localStorage.getItem('keranjang'))
    const kode_transaksi = JSON.parse(localStorage.kode_transaksi)

    try{
      transaksiStore.getTransaksiKode(kode_transaksi)
      transaksi.value = transaksiStore.transaksiId
    }catch(e) {
      console.log(e)
    }
    return { transaksi }
  }
}
</script>
