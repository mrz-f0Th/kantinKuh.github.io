<template> 
  <div v-for="keranjang in keranjang.value" :key="keranjang.id">
    <p>Jumlah: {{keranjang.jumlah}}</p>
    <p>keterangan: {{keranjang.keterangan}}</p>
    <p>gambar: {{keranjang.produk.gambar_produk}}</p>
    <p>nama_produk: {{keranjang.produk.nama_produk}}</p>
    <p>Harga: {{keranjang.produk.harga_produk * keranjang.jumlah}}</p>
    <hr>
  </div>
  <p>Total Harga : {{totalHarga}}</p>
  <button @click="transaksi(keranjang.value)">Pesan</button>
</template>

<script>
import { reactive, computed } from "vue"
import { useKeranjangStore } from "../stores/keranjang.js"

export default{
  emits: ["transaksi"],
  async setup(props, {emit}){
    const keranjang = reactive({})
    const keranjangStore = useKeranjangStore()

    try{
      await keranjangStore.getKeranjang()
      keranjang.value = keranjangStore.keranjang
    }catch(e) {
      console.log("error " + e)
    }

    const totalHarga = keranjang.value.reduce((item, index) => {
      return item + index.produk.harga_produk * index.jumlah
    }, 0)

    const transaksi = (data => {
      data.total_harga = totalHarga
      emit("transaksi", data)
    })

    return { keranjang, totalHarga, transaksi }
  }
}
</script>
