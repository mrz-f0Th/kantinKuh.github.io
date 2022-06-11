<template>
  <div class="fixed w-full z-20 -mt-8 pt-5 bg-base-100 pb-2 sm:hidden block">
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
  <div
    class="
      sm:flex
      justify-between
      fixed
      w-full
      z-20
      -mt-7
      pt-10
      pb-3
      hidden
      px-5
      bg-base-100
    "
  >
    <div>
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
    </div>
    <div>
      <div class="form-control">
        <label class="input-group">
          <input
            type="text"
            placeholder="search produk"
            class="input input-bordered input-success"
            v-model="search"
            @keyup="searchCustomer"
          />
          <span>
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </label>
      </div>
    </div>
  </div>
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
      <figure>
        <img :src="'http://192.168.212.105:8000/storage/image/' + produk.data.gambar" alt="Shoes" />
        </figure>
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
    const search = ref("");
    let isLoading = false;

    try {
      await produkStore.getProduk();
      result.value = produkStore.produk;
      console.log(result.value)
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
      console.log(isActive);
      result.value = produkStore.produk.filter(
        (prod) => prod.kategori == kat
      );
      isLoading = false;
      console.log(isLoading);
    };

    const searchCustomer = async () => {
      if (search.value !== '') {
        await produkStore.searchProduk(search.value);
        result.value = produkStore.produk.filter(
          (prod) => prod.nama.search(search.value)
        )
      } else {
        await produkStore.getProduk();
        result.value = produkStore.produk;
      }
    }

    return { result, onPesan, ubahKategori, isLoading, isActive, searchCustomer, search };
  },
};
</script>
