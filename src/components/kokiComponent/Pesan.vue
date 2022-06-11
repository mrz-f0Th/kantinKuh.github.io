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
                  v-if="status.kode_transaksi[i] == `dimasak${transaksi.kode_transaksi}`"
                  class="btn btn-success btn-xs"
                  @click="hidangkan(transaksi.kode_transaksi, i)"
                >
                  Hidangkan
                </button>
                <button
                  v-else-if="
                    status.kode_transaksi[i] == `hidangkan${transaksi.kode_transaksi}`
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

  <!-- Modal -->

  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="my-modal-5" class="modal-toggle" />
  <Suspense>
    <template #default>
      <div class="modal flex items-center">
        <div class="modal-box w-11/12 max-w-5xl">
          <h3 class="font-bold text-lg">Detail Transaksi</h3>

          <div class="py-4">
            <!-- table detail -->
            <table class="table table-zebra w-full table-normal">
              <thead>
                <tr>
                  <th class="hidden"></th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Jumlah</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <!-- row 1 -->
                <tr v-for="(transaksi, i) in transaksi.value">
                  <th class="hidden"></th>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div>
                        <!-- <div class="font-bold">{{ transaksi.keranjang }}</div> -->
                        <div v-for="keranjang in transaksi.value">
                          {{ keranjang }}
                        </div>
                        <div class="text-sm opacity-50">
                          {{ transaksi }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>Rp. {{}}</td>
                  <td>{{}}</td>
                  <td>Rp. {{}}</td>
                </tr>
                <tr>
                  <td colspan="4">
                    <span class="flex justify-end text-lg font-bold">
                      Total: Rp. {{}}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-action">
            <button class="btn btn-success">Print</button>
            <label for="my-modal-5" class="btn btn-error">Close</label>
          </div>
        </div>
      </div>
    </template>
    <template #fallback>Loading ...</template>
  </Suspense>
</template>

<script>
import { useTransaksiStore } from "../../stores/transaksi.js";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  async setup() {
    const transaksiStore = useTransaksiStore();
    const router = useRouter();

    const statusKu = reactive({});

    const transaksi = reactive({});
    const status = reactive({
      kode_transaksi: [],
      stat: [],
    });

    try {
      await transaksiStore.getTransaksi();
      transaksi.value = transaksiStore.transaksi;
      console.log(transaksi.value)

      transaksi.value.forEach((stat, i) => {
        console.log(stat, i)
        console.log(status.stat)

        status.kode_transaksi.splice(i, 0, stat.kode_transaksi);
        status.stat.splice(i, 0, stat.status);

        

        status.stat.forEach((status, i) => {
          if (status == "dimasak") {
            status.kode_transaksi = `dimasak${stat.kode_transaksi}`;
          } else if (status == "hidangkan") {
            status.kode_transaksi == `hidangkan${stat.kode_transaksi}`;
          } else {
            status.kode_transaksi == `${stat.kode_transaksi}`;
          }
          localStorage.setItem("status", JSON.stringify(status.kode_transaksi));
        });

        //else if (
        //   !status.kode_transaksi.includes(`dimasak${stat.kode_transaksi}`) &&
        //   !status.kode_transaksi.include s(stat.kode_transaksi)
        // ) {
        //   if (!localStorage.status.includes(stat.kode_transaksi)) {
        //     status.stat = JSON.parse(localStorage.status);
        //     status.stat.splice(i, 0, stat.kode_transaksi);
        //     localStorage.setItem("status", JSON.stringify(status.stat));
        //   }
        // }
      });
      status.kode_transaksi = JSON.parse(localStorage.status);
    } catch (e) {
      console.log();
    }

    const memasak = async (kode, i) => {
      if (!status.kode_transaksi.includes(`dimasak${kode}`)) {
        await transaksiStore
          .updateTransaksi(kode, "dimasak")
          .then((ress) => {
            const newStatus = reactive({ stat: [] });
            newStatus.stat = status.kode_transaksi.filter((stat) => stat !== kode);

            newStatus.stat.splice(i, 0, `dimasak${kode}`);

            localStorage.setItem("status", JSON.stringify(newStatus.stat));
            status.kode_transaksi = JSON.parse(localStorage.status);
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
