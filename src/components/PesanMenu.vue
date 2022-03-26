<template>
  <div>
    <div class="card lg:card-side bg-base-100 shadow-md m-5">
      <figure>
        <img
          :src="'http://localhost:8000/storage/image/' + data.gambar"
          alt="Burger"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-2xl">{{ data.nama }}</h2>
        <p>Rp. {{ data.harga }} | {{ data.status }}</p>
        <div class="form-control">
          <label class="input-group my-4">
            <span>jumlah Pesanan</span>
            <input
              type="text"
              v-model="keranjang.jumlah"
              class="input input-bordered"
            />
          </label>
          <label class="input-group">
            <span>keterangan</span>
            <input
              type="text"
              placeholder="2 pedas 1 manis | tambah bawang | dll"
              class="input input-bordered"
              v-model="keranjang.keterangan"
            />
          </label>
        </div>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" @click="masukKeranjang(keranjang)">
            Pesan
          </button>
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

    const produk = reactive({});
    const keranjang = reactive({});
    const error = ref(null);

    try {
      await produkStore.getProdukId(route.params.id);
      produk.value = produkStore.produk;
      keranjang.produk = produkStore.produk;
    } catch (e) {
      error.value = e;
    }

    const masukKeranjang = (value) => {
      const keranjang = reactive({
        kode: [value.produk.data.kode],
        jumlah: [value.jumlah],
        keterangan: [value.keterangan],
      });
      emit("masukKeranjang", keranjang);
      console.log(keranjang);
    };

    return { ...produk.value, keranjang, masukKeranjang };
  },
};
</script>
