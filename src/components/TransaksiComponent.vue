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
            <th class="flex justify-center">Status</th>
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
            <th class="flex justify-center">
              <span
                v-if="transaksi.status == 'dimasak'"
                class="bg-warning rounded-lg px-2 py-1 cursor-not-allowed"
              >
                {{ transaksi.status }}
              </span>
              <span
                v-if="transaksi.status == 'menunggu'"
                class="bg-error rounded-lg px-2 py-1 cursor-not-allowed"
              >
                {{ transaksi.status }}
              </span>
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
