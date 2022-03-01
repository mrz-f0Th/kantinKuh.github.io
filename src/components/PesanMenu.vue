<template>
  <div>
    <p>nama : {{nama_produk}}</p>
    <p>harga : {{harga_produk}}</p>
    <p>gambar : {{gambar_produk}}</p>
    <p>status : {{status_produk}}</p>
    <p>Jumlah pesanan : <input v-model="keranjang.jumlah" /></p>
    <p>Keterangan : <input v-model="keranjang.keterangan" /></p>
  <button @click="masukKeranjang(keranjang)">pesan</button>
    <hr>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue"
import { useProdukStore } from "../stores/produk.js" 
import { useRoute } from "vue-router"

export default{
  emits: ["masukKeranjang"],
  async setup(props, { emit }){
    
    const produkStore = useProdukStore()
    const route = useRoute()
    
    const produk = reactive({})
    const keranjang = reactive({})
    const error = ref(null);

    try{
      await produkStore.getProdukId(route.params.id);  
      produk.value = produkStore.produk
      keranjang.produk = produkStore.produk
    }catch(e) {
      error.value = e
    }    

    const masukKeranjang = ((value) => {
      emit("masukKeranjang", value);
    })
    
    return{ ...produk.value, keranjang, masukKeranjang}           
  } 
}   
</script>
