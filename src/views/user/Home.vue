<template>
  selamat datang, {{user.value}}
</template>

<script setup>
import { useTransaksiStore } from "../../stores/transaksi.js"
import { onMounted, reactive, computed } from "vue"

const transaksiStore = useTransaksiStore()
const user = reactive({})

onMounted(() => user.value = computed(() => transaksiStore.user))

</script>
