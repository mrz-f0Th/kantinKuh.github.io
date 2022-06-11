<template>
  <div class="sm:hidden block">
    <!-- row 1 -->
    <div>
      <figure>
        <img
          :src="
            'http://192.168.212.105:8000/storage/image/' + produk.value.gambar
          "
          class="rounded-b-[30px] relative"
        />
      </figure>
      <div>
        <router-link
          to="/user/menu"
          class="absolute top-5 left-5 rounded-lg bg-base-100/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </router-link>
      </div>
    </div>

    <!-- row 2 -->
    <div class="px-5">
      <div class="mt-3">
        <h1 class="text-4xl font-medium">
          {{ produk.value.nama }}
        </h1>
        <p class="text-gray-900/50">{{ produk.value.kategori }}</p>

        <!-- Top -->
        <div class="flex justify-between mt-3">
          <h1 class="text-2xl font-medium">{{ harga }}</h1>
          <div class="flex rounded-xl bg-success items-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mx-1.5 cursor-pointer"
              @click="kurang"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 12H6"
              />
            </svg>
            <span v-if="keranjang.jumlah" class="select-none">{{
              keranjang.jumlah
            }}</span>
            <span v-else class="select-none">0</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mx-1.5 cursor-pointer"
              @click="tambah"
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
            </svg>
          </div>
        </div>
        <!-- end top -->
      </div>
    </div>

    <!-- row 3 -->
    <div>
      <div class="p-5 mt-5 mb-10">
        <h1 class="text-xl font-medium">Keterangan</h1>
        <textarea
          v-model="keranjang.keterangan"
          class="textarea textarea-success w-full my-2"
          placeholder="Pedas, 2 manis, dll"
        ></textarea>
      </div>

      <!-- button -->
      <div
        class="
          hidden
          keyboard:flex
          justify-center
          items-end
          fixed
          w-full
          bg-base-100
        "
      >
        <div
          class="btn btn-success flex justify-center bottom-0 w-4/5 mb-3 fixed"
          @click="masukKeranjang(keranjang)"
        >
          <p>Add to Cart</p>
        </div>
      </div>
      <!-- end button -->
    </div>
  </div>
  <div class="h-screen flex">
    <div class="card lg:card-side bg-base-100 shadow-xl w-10/12 m-auto ">
      <figure class="w-2/3">
        <img :src="
              'http://192.168.212.105:8000/storage/image/' + produk.value.gambar" alt="Album" />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-4xl">{{ produk.value.nama }}</h2>
        <p class="text-gray-900/50">{{ produk.value.kategori }}</p>
        <p>Jumlah :</p>
        <input type="number" v-model="keranjang.jumlah" placeholder="Type here" class="input input-bordered input-success w-full max-w-xs">
        <p>keterangan :</p>
        <input type="text" v-model="keranjang.keterangan" placeholder="Type here" class="input input-bordered input-success w-full max-w-xs">
        <div class="card-actions justify-end">
          <button class="btn btn-success" :class="{loading : isLoading}" @click="masukKeranjang(keranjang)">Add to Card</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useProdukStore } from "../stores/produk.js";
import { useKeranjangStore } from "../stores/keranjang.js";
import { useRoute } from "vue-router";

export default {
  emits: ["masukKeranjang"],
  async setup(props, { emit }) {
    const produkStore = useProdukStore();
    const keranjangStore = useKeranjangStore();
    const route = useRoute();
    const isLoading = ref(false);

    const produk = reactive({});
    const keranjang = reactive({
      jumlah: 1,
    });
    const harga = ref("");
    const error = ref(null);

    try {
      await produkStore.getProdukId(route.params.id);
      produk.value = produkStore.produkId;
      keranjang.produk = produkStore.produkId;
      harga.value = produk.value.harga.toLocaleString("id", {
        style: "currency",
        currency: "IDR",
      });
    } catch (e) {
      error.value = e;
    }

    const masukKeranjang = (value) => {
      isLoading.value = true;
      const keranjang = reactive({
        kode: [value.produk.kode],
        jumlah: [value.jumlah],
        keterangan: [value.keterangan],
      });
      emit("masukKeranjang", keranjang);
      console.log(value);
      console.log(keranjang)
    };

    const tambah = () => {
      keranjang.jumlah++;
    };

    const kurang = () => {
      if (keranjang.jumlah != 0) {
        keranjang.jumlah--;
      }
    };

    return {
      produk,
      keranjang,
      isLoading,
      masukKeranjang,
      harga,
      tambah,
      kurang,
    };
  },
};
</script>
