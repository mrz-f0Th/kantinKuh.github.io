<template>
  <Suspense>
    <template #default>
      <transaksi-detail />
    </template>
    <template #fallback>
      loading ...
    </template>
  </Suspense>
</template>

<script setup>
import transaksiDetail from "../../components/kasirComponent/TransaksiDetail.vue"
</script>
