<template>
  <Suspense>
    <template #default>
      <div>
        <keranjang @transaksi="transaksi"/>
      </div>
    </template>
    <template #fallback>
      <p>Loading ...</p>
    </template>
  </Suspense>
</template>

<script setup>
import keranjang from "../../components/keranjangComponent.vue"
import { useKeranjangStore } from "../../stores/keranjang.js"
import { useTransaksiStore } from "../../stores/transaksi.js"
import { reactive } from "vue"
import { useRouter } from "vue-router"

const keranjangStore = useKeranjangStore()
const transaksiStore = useTransaksiStore()
const router = useRouter()


const transaksi = async(data) => {
  const keranjang = reactive({
    data: data,
    total_harga: data.total_harga
  })
  keranjangStore.codeGenerator(5)
  keranjang.kode_keranjang = keranjangStore.code
  keranjang.user = transaksiStore.user
  try {
    await transaksiStore.setTransaksi(keranjang)
    await keranjang.data.map(async (item) => await keranjangStore.deleteKeranjang(item.id))
    router.push({name: "Transaksi"})
  }catch(e) {
    console.log(e)
  }
}


</script>
