<template>
<div class="grid grid-cols-12 text-success">
  <div class="col-span-3">
    <h1 class="">Hello</h1>
  </div>
  <div class="col-span-5">
    <button class="btn btn-outline btn-success">Click</button>
  </div>
  <div class="col-span-2">1</div>
  <div class="col-span-2">2</div>
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
