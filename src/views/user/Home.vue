<template>
  <div class="p-4">
    <h1 class="text-xl">selamat datang {{ user.nama }}</h1>
  </div>
</template>

<script setup>
import { useTransaksiStore } from "../../stores/transaksi.js";
import { onMounted, ref, computed } from "vue";

const transaksiStore = useTransaksiStore();
const user = ref({});

onMounted(() => {
  transaksiStore.getUser();
  user.value = transaksiStore.user;
});
</script>
