<template>
  <div class="fixed w-full z-20 -mt-8 pt-5 bg-base-100 pb-2">
    <button
      class="rounded-full border p-1 ml-5"
      :class="
        isActive == 'food'
          ? 'outline outline-offset-2 outline-2 outline-green-500'
          : 'outline outline-offset-2 outline-2 outline-gray-500'
      "
      @click="ubahKategori('food')"
    >
      <img src="../../../public/dish.png" class="w-10" />
    </button>
    <button
      class="
        rounded-full
        border
        p-1
        outline outline-offset-2 outline-2
        mx-5
        outline-green-500
      "
      :class="
        isActive == 'drink'
          ? 'outline outline-offset-2 outline-2 outline-green-500'
          : 'outline outline-offset-2 outline-2 outline-gray-500'
      "
      @click="ubahKategori('drink')"
    >
      <img src="../../../public/sparkling-water.png" class="w-10" />
    </button>
    <button
      class="
        rounded-full
        p-1
        outline outline-offset-2 outline-2 outline-green-500
      "
      :class="
        isActive == 'snack'
          ? 'outline outline-offset-2 outline-2 outline-green-500'
          : 'outline outline-offset-2 outline-2 outline-gray-500'
      "
      @click="ubahKategori('snack')"
    >
      <img src="../../../public/nachos.png" class="w-10" />
    </button>
    <h1 class="text-xl font-medium mx-4 mt-5">Most Popular</h1>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    <div
      class="card w-80 bg-base-100 shadow-xl shadow-green-500/10 m-5 mt-28"
      v-if="result.value"
      v-for="produk in result.value"
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
    <div class="loading text-4xl z-30" v-if="isLoading">
      <p>{{ isLoading }}</p>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref, watch } from "vue";
import { useProdukStore } from "../../stores/produk.js";

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
    const isActive = ref("");
    let isLoading = false;

    try {
      await produkStore.getProduk();
      result.value = produkStore.produk;
    } catch (e) {
      error.value = e;
    }

    const onPesan = (id) => {
      emit("onPesan", id);
    };

    const ubahKategori = async (kat) => {
      isLoading = true;
      console.log(isLoading);
      isActive.value = kat;
      console.log(isActive, kat);
      await produkStore.getProduk();
      result.value = produkStore.produk.filter(
        (prod) => prod.data.kategori == kat
      );
      isLoading = false;
      console.log(isLoading);
    };

    return { result, onPesan, ubahKategori, isLoading, isActive };
  },
};
</script>
