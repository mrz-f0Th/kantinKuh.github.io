<template>
  <Suspense>
    <template #default>
      <div>
        <router-link to="post-produk" class="btn btn-success"
          >tambah Produk</router-link
        >
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
import produks from "../../components/Produks.vue";
</script>
