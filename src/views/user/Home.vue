<template>selamat datang</template>

<script setup>
import { useTransaksiStore } from "../../stores/transaksi.js";
import { onMounted, reactive, computed } from "vue";

const transaksiStore = useTransaksiStore();
const user = reactive({});

onMounted(() => {
  transaksiStore.getUser();
  user.value = computed(() => transaksiStore.user);
});
</script>
