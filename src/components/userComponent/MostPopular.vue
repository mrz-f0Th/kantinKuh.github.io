<template>
<div
    class="
      grid grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      gap-3
      sm:gap-0
      justify-items-center
    "
  >
    <div
      class="
        card
        w-80
        bg-base-100
        shadow-3xl
        border
        shadow-green-500/10
        m-5
        mt-28
      "
      v-for="(produk, i) in result.value"
      :key="produk.id"
    >
      <!-- <div class="card w-80 shadow-xl image-full bg-base-100 z-0">
        <figure>
          <img :src="produk.data.image_url" alt="Shoes" />
        </figure>
        <div class="z-0 bottom-0 flex">
          <h2>Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>-->
      <figure>
        <img :src="'http://192.168.212.105:8000/storage/image/' + produk[0].gambar" alt="Shoes" />
        </figure>
      <div class="card-body">
        <h2 class="card-title">{{ produk[0].nama }}</h2>
        <p>Rp. {{ produk[0].harga }}</p>
        <p>{{ produk[0].kategori }}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-success" @click="onPesan(produk[0].kode)">
            Buy Now
          </button>
        </div>
      </div>
    </div>
    <div class="loading text-4xl z-30" v-if="isLoading">
      <p>{{ isLoading }}</p>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref, watch } from "vue";
import { useProdukStore } from "../../stores/produk.js";

export default {
    emits: ["onPesan"],
  async setup(props, {emit}) {
    const result = reactive({
        value: []
    });
    const error = ref(null);
    const isActive = ref("");
    const produkStore = useProdukStore();
    let isLoading = false;
    const popular = reactive({});

    const search = reactive([]);

    try {
      await produkStore.getPopular();
      popular.value = produkStore.produkPopular;
      popular.value.forEach(async (res, i) => {
          await produkStore.searchProduk(res.nama);
          const popularLocal = produkStore.produkPopularBanget
          result.value.push(popularLocal)
          console.log(result.value)
        });
    } catch (e) {
      error.value = e;
    }

    const onPesan = (id) => {
      emit("onPesan", id);
    };

    // const searchCustomer = async () => {
    //   if (result.value !== "") {
    //     result.value.forEach( async (res) => {
    //       await produkStore.searchProduk(res.value.nama);
    //       result.value = produkStore.produk.filter((prod) =>
    //         prod.nama.search(search.value)
    //       );
    //     });
    //   } else {
    //     await produkStore.getProduk();
    //     result.value = produkStore.produk;
    //   }
    // };

    return { result, isLoading, isActive , popular, onPesan};
  },
};
</script>
