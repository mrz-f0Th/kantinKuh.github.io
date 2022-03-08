<template>
  <div>
    <p>nama : {{nama}}</p>
    <p>harga : {{harga}}</p>
    <p>gambar : {{gambar}}</p>
    <p>status : {{status}}</p>
    <p>Jumlah pesanan : <input v-model="keranjang.jumlah" /></p>
    <p>Keterangan : <input v-model="keranjang.keterangan" /></p>
  <button @click="masukKeranjang(keranjang)">pesan</button>
  <pre>{{keranjang}}</pre>
    <hr>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue"
import { useProdukStore } from "../stores/produk.js" 
import { useKeranjangStore } from "../stores/keranjang.js"
import { useRoute } from "vue-router"

export default{
  emits: ["masukKeranjang"],
  async setup(props, { emit }){
    
    const produkStore = useProdukStore()
    const keranjangStore = useKeranjangStore()
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
      const keranjang = reactive({
        kode : [value.produk.kode],
        jumlah: [value.jumlah],
        keterangan: [value.keterangan]
      })
      emit("masukKeranjang", keranjang);
      console.log(keranjang)
    })
    
    return{ ...produk.value, keranjang, masukKeranjang}           
  } 
}   
</script>
