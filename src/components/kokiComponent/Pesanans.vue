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
              <th class="flex justify-center">Aksi</th>
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
              <th class="flex justify-center">
                <button
                  v-if="status.stat[i] == `dimasak${transaksi.kode_transaksi}`"
                  class="btn btn-success btn-xs"
                  @click="hidangkan(transaksi.kode_transaksi, i)"
                >
                  Hidangkan
                </button>
                <button
                  v-else-if="
                    status.stat[i] == `hidangkan${transaksi.kode_transaksi}`
                  "
                  class="btn btn-disabled btn-xs"
                >
                  Selesai
                </button>
                <button
                  v-else
                  class="btn btn-warning btn-xs mr-2"
                  @click="memasak(transaksi.kode_transaksi, i)"
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
              <th class="flex justify-center">Aksi</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useTransaksiStore } from "../../stores/transaksi.js";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  async setup() {
    const transaksiStore = useTransaksiStore();
    const router = useRouter();

    const transaksi = reactive({});
    const status = reactive({
      stat: [],
    });

    try {
      await transaksiStore.getTransaksi();
      transaksi.value = transaksiStore.transaksi;
      console.log(transaksi.value);
      console.log(transaksi);
      status.stat = transaksi.value.map((stat, i) => {
        if (localStorage.status == null) {
          status.stat.splice(i, 0, stat.kode_transaksi);
          localStorage.setItem("status", JSON.stringify(status.stat));
        } else if (
          !status.stat.includes(`dimasak${stat.kode_transaksi}`) &&
          !status.stat.includes(stat.kode_transaksi)
        ) {
          if (!localStorage.status.includes(stat.kode_transaksi)) {
            status.stat = JSON.parse(localStorage.status);
            status.stat.splice(i, 0, stat.kode_transaksi);
            localStorage.setItem("status", JSON.stringify(status.stat));
          }
        }
      });
      status.stat = JSON.parse(localStorage.status);
    } catch (e) {
      console.log();
    }

    const memasak = async (kode, i) => {
      if (!status.stat.includes(`dimasak${kode}`)) {
        await transaksiStore
          .updateTransaksi(kode, "dimasak")
          .then((ress) => {
            const newStatus = reactive({ stat: [] });
            newStatus.stat = status.stat.filter((stat) => stat !== kode);

            newStatus.stat.splice(i, 0, `dimasak${kode}`);
            console.log(i);

            localStorage.setItem("status", JSON.stringify(newStatus.stat));
            status.stat = JSON.parse(localStorage.status);
            console.log(status);
            console.log(newStatus);
          })
          .catch((error) => console.log(error));
      }
    };

    const hidangkan = async (kode, i) => {
      if (!status.stat.includes(`hidangkan${kode}`)) {
        await transaksiStore
          .updateTransaksi(kode, "hidangkan")
          .then((ress) => {
            const newStatus = reactive({ stat: [] });
            newStatus.stat = status.stat.filter((stat) => stat !== kode);

            newStatus.stat.splice(i, 1, `hidangkan${kode}`);
            console.log(i);

            localStorage.setItem("status", JSON.stringify(newStatus.stat));
            status.stat = JSON.parse(localStorage.status);
            console.log(status);
            console.log(newStatus);
          })
          .catch((error) => console.log(error));
      }
    };

    return {
      transaksi,
      memasak,
      hidangkan,
      status,
    };
  },
};
</script>
