<template>
  <Suspense>
    <template #default>
      <div>
        <hr>
        <router-link to="post-produk">| tambah Produk |</router-link>
        <hr>
        <produks />
      </div>
    </template>
    <template #fallback>
      <div>
        <span>Loading ...</span>
      </div>  
    </template>
  </Suspense>
</template>


<script setup>
import produks from "../../components/Produks.vue"
</script>
