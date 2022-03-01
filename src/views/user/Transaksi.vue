<template>
  <p>ini Transaksi</p>
  <p>status : {{ status }}</p>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useTransaksiStore } from "../../stores/transaksi.js"

const transaksiStore = useTransaksiStore()
let status = ref("")

onMounted(() => {
  console.log(transaksiStore.statuss)
})

</script>
