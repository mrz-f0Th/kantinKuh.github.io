<template>
  <Suspense>
    <template #default>
      <div>
        <keranjang @transaksi="transaksi">
          <template v-slot:header>
            <th>Name</th>
            <th>Jumlah</th>
            <th>Harga</th>
            <th></th>
          </template>

          <template v-slot:footer>
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
        <p>Loading ...</p>
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import keranjang from "../../components/keranjangComponent.vue";
import { useKeranjangStore } from "../../stores/keranjang.js";
import { useTransaksiStore } from "../../stores/transaksi.js";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const keranjangStore = useKeranjangStore();
const transaksiStore = useTransaksiStore();
const router = useRouter();
const isLoading = ref();

const isKeranjang = localStorage.getItem("keranjang");

const transaksi = async (data) => {
  keranjangStore.codeGenerator(5);

  const keranjang = reactive({
    kode_transaksi: keranjangStore.code,
    kode_keranjang: data.kode_keranjang,
    harga: data.total_harga,
    status: "menunggu",
    nama: transaksiStore.user.nama,
    meja: transaksiStore.user.meja,
    telepon: transaksiStore.user.telepon,
  });

  if (isKeranjang) {
    try {
      await transaksiStore
        .setTransaksi(keranjang)
        .then(() => (isLoading.value = "Loading ..."))
        .catch(() => (isLoading.value = "Keranjang not Found"));

      localStorage.removeItem("keranjang");
      let kode_transaksi = reactive([]);

      if (localStorage.getItem("kode_transaksi") == null) {
        kode_transaksi.push(keranjangStore.code);
        localStorage.setItem("kode_transaksi", JSON.stringify(kode_transaksi));
      } else if (localStorage.getItem("kode_transaksi") !== null) {
        for (let i = 0; i <= localStorage.kode_transaksi.length; i++) {
          kode_transaksi = JSON.parse(localStorage.getItem("kode_transaksi"));
        }

        kode_transaksi.push(keranjangStore.code);
        localStorage.setItem("kode_transaksi", JSON.stringify(kode_transaksi));
      }

      keranjangStore.keranjangLength = 0;
      router.push({ name: "Transaksi" });
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
