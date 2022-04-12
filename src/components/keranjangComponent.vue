<template>
  <div class="flex justify-center" v-if="keranjang">
    <div class="overflow-x-auto w-11/12">
      <table class="table w-full" v-if="keranjang">
        <!-- head -->
        <thead>
          <tr>
            <slot name="header" />
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr
            v-for="keranjang in keranjang.value.product"
            :key="keranjang.kode"
          >
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img
                      :src="
                        'http://192.168.223.105:8000/storage/image/' +
                        keranjang.gambar
                      "
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div class="font-bold">{{ keranjang.nama }}</div>
                  <div class="text-sm opacity-50">{{ keranjang.kategori }}</div>
                </div>
              </div>
            </td>
            <td>
              {{ keranjang.pivot.jumlah }}
            </td>
            <td>{{ keranjang.harga * keranjang.pivot.jumlah }}</td>
            <th>
              <button class="btn btn-ghost btn-xs">Hapus</button>
            </th>
          </tr>
          <tr>
            <td colspan="4">
              <span class="flex justify-end">
                Total: {{ totalHarga }}
                <button
                  class="btn btn-success btn-xs mx-2"
                  @click="transaksi(keranjang.value)"
                >
                  Pesan
                </button>
              </span>
            </td>
          </tr>
        </tbody>

        <!-- foot -->
        <tfoot>
          <tr>
            <slot name="footer" />
          </tr>
        </tfoot>
      </table>
      <div v-else>Tidak ada Keranjang</div>
    </div>
  </div>
  <div v-else>Tidak ada Keranjang</div>
</template>

<script>
import { reactive, computed } from "vue";
import { useKeranjangStore } from "../stores/keranjang.js";
import { useTransaksiStore } from "../stores/transaksi.js";

export default {
  emits: ["transaksi"],
  async setup(props, { emit }) {
    const keranjang = reactive({});
    const keranjangStore = useKeranjangStore();
    const transaksiStore = useTransaksiStore();

    if (localStorage.getItem("keranjang") !== null) {
      const virtualKeranjang = JSON.parse(localStorage.getItem("keranjang"));
      try {
        await keranjangStore.getKeranjangKode(virtualKeranjang.kode_keranjang);
        keranjang.value = keranjangStore.keranjang;
      } catch (e) {
        console.log("error " + e);
      }
    }

    transaksiStore.setTotalHarga(keranjang.value.product);
    const totalHarga = transaksiStore.total_harga;

    const transaksi = (data) => {
      transaksiStore.setArrTotalHarga(keranjang.value.product);
      data.total_harga = totalHarga;
      emit("transaksi", data);
    };

    return { keranjang, transaksi, totalHarga };
  },
};
</script>
