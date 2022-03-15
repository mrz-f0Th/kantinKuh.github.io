<template>
  <div class="flex justify-center">
    <div class="overflow-x-auto w-11/12">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <slot />
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
                      src="https://api.lorem.space/image/burger?w=400&h=225"
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
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useKeranjangStore } from "../stores/keranjang.js";

export default {
  emits: ["transaksi"],
  async setup(props, { emit }) {
    const keranjang = reactive({});
    const keranjangStore = useKeranjangStore();

    if (localStorage.getItem("keranjang") !== null) {
      const virtualKeranjang = JSON.parse(localStorage.getItem("keranjang"));
      try {
        await keranjangStore.getKeranjangKode(virtualKeranjang.kode_keranjang);
        keranjang.value = keranjangStore.keranjang;
      } catch (e) {
        console.log("error " + e);
      }
    }

    const totalHarga = keranjang.value.product.reduce((i, item) => {
      return i + item.harga * item.pivot.jumlah;
    }, 0);

    const transaksi = (data) => {
      data.total_harga = "totalHarga";
      emit("transaksi", data);
      console.log(data);
    };

    return { keranjang, transaksi, totalHarga };
  },
};
</script>
