<template>
  <h1>Ini Post-produk</h1>
  <p>nama_makanan: <input type="text" v-model="produk.nama"  /></p>
  <p>harga_makanan: <input type="text" v-model="produk.harga"  /></p>
  <p>kode_makanan: <input type="text" v-model="produk.kode" /></p>
  <p>gambar_makanan<input type="text" v-model="produk.gambar"/></p>
  <p>status_makanan: <input type="text" v-model="produk.status" /></p>
  <p>kategori_makanan: <input type="text" v-model="produk.kategori" /></p>
  <button @click="tambahProduk" >Tambah Produk</button>
  <pre>{{produk}}</pre>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import DataService from "../services/DataService";

const router = useRouter()

const produk = reactive({})

const tambahProduk = async() => {
  try{
    await DataService.createProduk(produk)
    router.push({name : "Produk"})
  }catch(err) {
    console.log(err)
  }
}
</script>
