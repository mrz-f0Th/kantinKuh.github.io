<template>
  <Suspense>
    <template #default>
      <div>
        <router-link to="post-produk" class="flex justify-end"
          ><div class="btn btn-success mb-5 mr-10 flex">
            <p>Tambah</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg></div
        ></router-link>
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
import produks from "../../components/managerComponent/ProduksList.vue";
</script>
