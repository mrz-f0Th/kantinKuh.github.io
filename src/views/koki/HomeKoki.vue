<template>
  <Suspense>
    <template #default>
      <pesanans />
    </template>
    <template #fallback>
      Loading ...
    </template>
  </Suspense>
</template>

<script setup>
import pesanans from "../../components/kokiComponent/Pesanans.vue"
</script>
