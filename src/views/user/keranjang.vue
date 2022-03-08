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

  keranjangStore.codeGenerator(5)

  const keranjang = reactive({
    kode_transaksi: keranjangStore.code,
    kode_keranjang: data.kode_keranjang,
    nama: transaksiStore.user.nama,
    meja: transaksiStore.user.meja,
    telepon: transaksiStore.user.telepon,
  })

  try {
    await transaksiStore.setTransaksi(keranjang)
    //await keranjang.data.map(async (item) => await keranjangStore.deleteKeranjang(item.id))
    router.push({name: "Transaksi"})
    localStorage.setItem("kode_transaksi", JSON.stringify(keranjangStore.code))
  }catch(e) {
    console.log(e)
  }
}


</script>
