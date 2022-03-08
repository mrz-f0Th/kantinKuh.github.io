<template>
  <div>
    <pesanan />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue"
import { useTransaksiStore } from "../../stores/transaksi.js"
import pesanan from '../../components/PesanansComponent.vue'

const transaksiStore = useTransaksiStore()
let status = ref("")
const transaksi = reactive({})
onMounted(() => {
  console.log(transaksiStore.statuss)
})

</script>
