<template>
  <div class="container">
    <h1 class="text-3xl ml-12 mt-10">Pesanan :</h1>
    <div class="flex flex-wrap justify-center align-center mt-10">
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
              v-for="(transaksi, i) in transaksi.value"
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
              <th>
                <button
                  class="btn btn-ghost btn-xs"
                  @click="memasak(transaksi.kode_transaksi)"
                >
                  Memasak
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
  </div>
</template>

<script>
import { useTransaksiStore } from "../../stores/transaksi.js";
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  async setup() {
    const transaksiStore = useTransaksiStore();
    const router = useRouter();

    const transaksi = reactive({});

    try {
      await transaksiStore.getTransaksi();
      transaksi.value = transaksiStore.transaksi;
    } catch (e) {
      console.log();
    }

    const transaksiDetail = (id) => transaksiStore.setStatus("dimasak");
    const memasak = (kode) => transaksiStore.updateTransaksi(kode, "dimasak");

    return { transaksi, transaksiDetail, memasak };
  },
};
</script>
