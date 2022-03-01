<template>
  <div v-if="result.value"  v-for="produk in result.value" :key="produk.id">
    <p>nama : {{produk.nama_produk}}</p>
    <p>kode : {{produk.kode_produk}}</p>
    <p>harga : {{produk.harga_produk}}</p>
    <p>gambar : {{produk.gambar_produk}}</p>
    <p>status : {{produk.status_produk}}</p>
    <p>kategori : {{produk.kategori_produk}}</p>
    <button v-if='menu' @click="onPesan(produk.id)">Pesan</button>
    <hr>
  </div> 
  <div v-else>
    <p>Tidak ada data produk</p>
  </div>
</template>

<script>
import { reactive ,computed, ref } from "vue"
import { useProdukStore } from "../stores/produk.js" 
  
export default{
  props: {
    menu: {
      type: Boolean,
      default: false
    }
  },
  emits: ["onPesan"],
  async setup(props, {emit}){
    const produkStore = useProdukStore(); 
    const result = reactive({})
    const error = ref(null);

    try{
      await produkStore.getProduk();  
      result.value = computed(() => produkStore.produk)
      console.log(result.value);
    }catch(e) {
      error.value = e
    }    

    const onPesan = (id) => {
      emit('onPesan', id)
    }
    
    return{ result, onPesan }           
  } 
}   
</script>
