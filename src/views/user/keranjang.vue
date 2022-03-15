<template>
  <Suspense>
    <template #default>
      <div>
        <keranjang @transaksi="transaksi">
          <template v-slot:default>
            <th>Name</th>
            <th>Jumlah</th>
            <th>Harga</th>
            <th></th>
          </template>
        </keranjang>
      </div>
    </template>
    <template #fallback>
      <div>
        <p v-if="isKeranjang">Loading ...</p>
        <p v-else>Not found</p>
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import keranjang from "../../components/keranjangComponent.vue";
import { useKeranjangStore } from "../../stores/keranjang.js";
import { useTransaksiStore } from "../../stores/transaksi.js";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const keranjangStore = useKeranjangStore();
const transaksiStore = useTransaksiStore();
const router = useRouter();

const isKeranjang = localStorage.getItem("keranjang");

const transaksi = async (data) => {
  keranjangStore.codeGenerator(5);

  const keranjang = reactive({
    kode_transaksi: keranjangStore.code,
    kode_keranjang: data.kode_keranjang,
    nama: transaksiStore.user.nama,
    meja: transaksiStore.user.meja,
    telepon: transaksiStore.user.telepon,
  });

  try {
    await transaksiStore.setTransaksi(keranjang);
    localStorage.removeItem("keranjang");
    localStorage.setItem("kode_transaksi", JSON.stringify(keranjangStore.code));
    keranjangStore.keranjangLength = 0;
    router.push({ name: "Transaksi" });
  } catch (e) {
    console.log(e);
  }
};
</script>
