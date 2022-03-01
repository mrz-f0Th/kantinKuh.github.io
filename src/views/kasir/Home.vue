<template>
  <Suspense>
    <template #default>
      <transaksi/>
    </template>
    <template #fallback>
      loading ...
    </template>
  </Suspense>
</template>

<script setup>
import transaksi from "../../components/kasirComponent/Transaksi.vue"
</script>
