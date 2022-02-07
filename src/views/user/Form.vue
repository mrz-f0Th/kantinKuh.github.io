<template>
  <p>No meja : <input v-model="dataUser.meja" /></p>
  <p>Nama : <input v-model="dataUser.nama" /></p>
  <p>No telepon : <input v-model="dataUser.telepon"/></p>
  <button @click="login">masuk</button>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive } from "vue"
import { useTransaksiStore } from "../../stores/transaksi.js"

const router = useRouter();
const useTransaksi = useTransaksiStore();
const dataUser = reactive({})

const login = () => {
  useTransaksi.setUser(dataUser)
  router.push({name : "UserHome"}) 
}

</script>
