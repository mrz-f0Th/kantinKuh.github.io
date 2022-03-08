<template> 
  <div v-for="keranjang in keranjang.value">
    <p>Jumlah: {{keranjang}}</p>
       <hr>
  </div>
  <pre>{{keranjang}}</pre>
  <p>Total Harga : total</p>
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

    const virtualKeranjang = JSON.parse(localStorage.getItem("keranjang"))
    try{
      await keranjangStore.getKeranjangKode(virtualKeranjang.kode_keranjang)
      keranjang.value = keranjangStore.keranjang
    }catch(e) {
      console.log("error " + e)
    }

    //const totalHarga = keranjang.value.reduce((item, index) => {
    //  return item + index.produk.harga_produk * index.jumlah
    //}, 0) 

    const transaksi = (data => {
      data.total_harga = "totalHarga"
      emit("transaksi", data)
      console.log(data)
    })

    return { keranjang, transaksi }
  }
}
</script>
