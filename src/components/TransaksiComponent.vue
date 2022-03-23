<template>
  <div class="flex justify-center">
    <div class="overflow-x-auto w-11/12">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>Nama</th>
            <th>Meja</th>
            <th>Harga</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr
            v-for="(transaksi, i) in transaksi"
            :key="transaksi.kode_transaksi"
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
                  <div class="font-bold">{{ transaksi.nama }}</div>
                </div>
              </div>
            </td>
            <td>
              {{ transaksi.meja }}
            </td>
            <td>
              {{ transaksi.harga }}
            </td>
            <th>
              <button class="btn btn-ghost btn-xs">
                {{ transaksi.status }}
              </button>
            </th>
          </tr>
        </tbody>

        <!-- foot -->
        <tfoot>
          <tr>
            <th>Nama</th>
            <th>Meja</th>
            <th>Harga</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { useTransaksiStore } from "../stores/transaksi.js";
import { reactive } from "vue";

export default {
  async setup() {
    const transaksiStore = useTransaksiStore();

    const transaksi = reactive([]);
    const status = reactive([]);

    if (localStorage.getItem("kode_transaksi") !== null) {
      const kode_transaksi = JSON.parse(localStorage.kode_transaksi);
      try {
        for (let i = 0; i < kode_transaksi.length; i++) {
          await transaksiStore.getTransaksiKode(kode_transaksi[i]);
          transaksi.push(transaksiStore.transaksiId);
          console.log(transaksi);
        }
      } catch (e) {
        console.log(e);
      }
    }

    return { transaksi };
  },
};
</script>
