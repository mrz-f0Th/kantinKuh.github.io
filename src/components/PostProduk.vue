<template>
  <h1>Ini Post-produk</h1>
  <p>nama_makanan: <input type="text" v-model="produk.nama" /></p>
  <p>harga_makanan: <input type="text" v-model="produk.harga" /></p>
  <p>kode_makanan: <input type="text" v-model="produk.kode" /></p>
  <p>gambar_makanan<input type="file" @change="getImage" /></p>
  <p>status_makanan: <input type="text" v-model="produk.status" /></p>
  <p>kategori_makanan: <input type="text" v-model="produk.kategori" /></p>
  <button @click="tambahProduk">Tambah Produk</button>
  <pre>{{ produk }}</pre>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import DataService from "../services/DataService";

const router = useRouter();

const produk = reactive({});
let isGambar = ref();

const getImage = (event) => {
  isGambar = event.target.files[0];
  console.log(isGambar);
};

const tambahProduk = async () => {
  const formData = new FormData();
  formData.append("nama", produk.nama);
  formData.append("harga", produk.harga);
  formData.append("kategori", produk.kategori);
  formData.append("kode", produk.kode);
  formData.append("status", produk.status);
  formData.append("gambar", isGambar);

  try {
    await DataService.createProduk(formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    router.push({ name: "Produk" });
    console.log(formData);
  } catch (err) {
    console.log(err);
  }
};
</script>
