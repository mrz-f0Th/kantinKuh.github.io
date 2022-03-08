<template>
  <div v-if="result.value"  v-for="produk in result.value" :key="produk.id">
    <p>nama : {{produk.nama}}</p>
    <p>kode : {{produk.kode}}</p>
    <p>harga : {{produk.harga}}</p>
    <p>gambar : {{produk.gambar}}</p>
    <p>status : {{produk.status}}</p>
    <p>kategori : {{produk.kategori}}</p>
    <button v-if='menu' @click="onPesan(produk.kode)">Pesan</button>
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
