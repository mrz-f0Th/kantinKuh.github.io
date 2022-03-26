<template>
  <div class="flex">
    <div
      class="card w-80 bg-base-100 shadow-xl m-5"
      v-if="result.value"
      v-for="produk in result.value"
      :key="produk.id"
    >
      <figure><img :src="produk.data.image_url" alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="card-title">{{ produk.data.nama }}</h2>
        <p>Rp. {{ produk.data.harga }}</p>
        <p>{{ produk.data.kategori }}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-success" @click="onPesan(produk.data.kode)">
            Buy Now
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>tidak ada produk</p>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref } from "vue";
import { useProdukStore } from "../stores/produk.js";

export default {
  props: {
    menu: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["onPesan"],
  async setup(props, { emit }) {
    const produkStore = useProdukStore();
    const result = reactive({});
    const error = ref(null);

    try {
      await produkStore.getProduk();
      result.value = computed(() => produkStore.produk);
      console.log(produkStore.produk);
    } catch (e) {
      error.value = e;
    }

    const onPesan = (id) => {
      emit("onPesan", id);
    };

    return { result, onPesan };
  },
};
</script>
