<template>
  <div class="grid-cols-2 gap-3 grid mt-5">
    <div class="col-span-2 flex justify-around">
      <div class="card w-96 bg-green-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Pemasukan Bulanan</h2>
          <h2 class="text-lg font-medium">Rp. {{ pemasukan }}</h2>
          <div class="flex justify-around items-center">
            <div class="form-control w-full max-w-xs mr-3">
              
              <input
                type="date"
                v-model="bulan"
                placeholder="Type here"
                class="input input-bordered input-success w-full max-w-xs"
              />
            </div>
            <span for="my-modal-5" class="btn btn-primary" v-print="printLaporan"
              >print laporan</span
            >
          </div>
        </div>
      </div>
      <div class="card w-96 bg-blue-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Pengeluaran Bulanan</h2>
          <h2 class="text-lg font-medium">Rp. {{ totalPengeluaran.toLocaleString("id") }}</h2>
          <div class="flex justify-end">
            <!-- The button to open modal -->
            <label
              for="my-modal-5"
              class="btn btn-primary"
              @click="getPengeluaran"
              >Detail</label
            >

            <!-- Put this part before </body> tag -->
            <input type="checkbox" id="my-modal-5" class="modal-toggle" />
            <Suspense>
              <template #default>
                <div class="modal flex items-center">
                  <div class="modal-box w-11/12 max-w-5xl">
                    <div class="flex">
                      <h3 class="font-bold text-lg mr-10">
                        Detail Pengeluaran
                      </h3>
                    </div>
                    <div class="py-4">
                      <!-- table detail -->
                      <table class="table table-zebra w-full table-normal">
                        <thead>
                          <tr>
                            <th class="hidden"></th>
                            <th>id pengeluaran</th>
                            <th>value</th>
                            <th>keterangan</th>
                            <th>tanggal</th>
                          </tr>
                        </thead>
                        <tbody>
                          <!-- row 1 -->
                          <tr v-for="(pengeluaran, i) in pengeluaran.value">
                            <th class="hidden"></th>
                            <td>
                              <div class="flex items-center space-x-3">
                                <div>
                                  <div class="font-bold">
                                    {{ pengeluaran.id_pengeluaran }}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>Rp. {{ pengeluaran.jumlah }}</td>
                            <td>{{ pengeluaran.keterangan }}</td>
                            <td>{{ tanggal[i] }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="modal-action">
                      <div class="form-control">
                        <label class="input-group">
                          <span>Jumlah</span>
                          <input
                            type="number"
                            placeholder="Rp. 00000"
                            class="input input-bordered mr-3"
                            v-model="pengeluaranBaru.jumlah"
                          />
                        </label>
                      </div>
                      <div class="form-control">
                        <label class="input-group">
                          <span>Keterangan</span>
                          <input
                            type="text"
                            placeholder="keterangan"
                            class="input input-bordered"
                            v-model="pengeluaranBaru.keterangan"
                          />
                        </label>
                      </div>

                      <button
                        class="btn btn-success"
                        @click="tambahPengeluaran(pengeluaranBaru)"
                      >
                        Tambah
                      </button>
                      <label for="my-modal-5" class="btn btn-error"
                        >Close</label
                      >
                    </div>
                  </div>
                </div>
              </template>
              <template #fallback>Loading ...</template>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
    <!-- -->
    <div class="col-span-2 flex justify-center mt-10">
      <Suspense>
        <template #default>
          <chart class="w-2/3" />
        </template>
        <template #fallback>Loading ...</template>
      </Suspense>
    </div>

    <!-- Laporan -->
    <div class="overflow-x-auto col-span-2 -z-50" id="printLaporan">
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th></th>
            <th>Penghasilan</th>
            <th>Pengeluaran</th>
            <th>Omset</th>
            <th>tanggal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>Rp. {{laporanPemasukan.total.toLocaleString('id')}}</td>
            <td>Rp. {{totalPengeluaran.toLocaleString('id')}}</td>
            <td>Rp. {{(laporanPemasukan.total - totalPengeluaran).toLocaleString('id')}}</td>
            <td>{{laporanPemasukan.tanggal}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Penghasilkan</th>
            <th>Pengeluaran</th>
            <th>Omset</th>
            <th>tanggal</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import DataService from "../../services/DataService.js";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import chart from "../managerComponent/Chart.vue";
import moment from "moment";
import { useKeranjangStore } from "../../stores/keranjang.js";

export default {
  components: { chart },
  async setup() {
    const router = useRouter();
    const keranjangStore = useKeranjangStore();

    const logProduk = reactive({});
    const pemasukan = ref("");
    const pengeluaran = reactive({});
    const totalPengeluaran = ref("");
    const tanggal = ref("");
    const pengeluaranBaru = reactive({});
    const bulan = ref("");

    const laporanPemasukan = reactive({
      total: "",
      pengeluaran: '',
      tanggal: ''

    });

    const printLaporan = reactive({
      id: "printLaporan",
      popTitle: "ㅤ",
      extraCss:
        "https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css",
      beforeOpenCallback(vue) {
        vue.laporan()
      },
      openCallback(vue) {
        vue.printLoading = false;
        console.log("执行了打印");
        vue.laporan()
      },
    });

    try {
      await DataService.getViewLogLaporan().then((ress) => {
        logProduk.value = ress.data;
        pemasukan.value = parseInt(
          logProduk.value[0].semua_pemasukan
        ).toLocaleString("id");
      });
      await DataService.pengeluaranBulanan().then((ress) => {
        totalPengeluaran.value = ress.data.data
          .map((m) => (totalPengeluaran.value = m.jumlah))
          .reduce((i, item) => {
            return i + item;
          }, 0)
          ;
      });
    } catch (e) {
      console.log(e);
    }

    const getPengeluaran = async () => {
      await DataService.pengeluaranBulanan().then((ress) => {
        pengeluaran.value = ress.data.data;
        tanggal.value = pengeluaran.value.map((t) =>
          moment(t.created_at).format("dddd MMMM Do YYYY")
        );
      });
    };

    const tambahPengeluaran = async (payload) => {
      keranjangStore.codeGenerator(7);
      pengeluaranBaru.id_pengeluaran = keranjangStore.code;
      await DataService.postPengeluaran(payload).then(async () => {
        await DataService.pengeluaranBulanan().then((ress) => {
          pengeluaran.value = ress.data.data;
        });
      });
    };

    const laporan = async () => {
      const d = new Date(bulan.value);
      await DataService.getLaporanBulanan(d.getMonth() + 1).then((ress) => {
        const pemasukan = ress.data.data;
        laporanPemasukan.total = parseInt(pemasukan[0].total);
        laporanPemasukan.tanggal = moment(pemasukan[0].waktu).format('MMM Do YY');
        console.log(laporanPemasukan)
      });
    };

    return {
      logProduk,
      pemasukan,
      pengeluaran,
      totalPengeluaran,
      tanggal,
      getPengeluaran,
      pengeluaranBaru,
      tambahPengeluaran,
      laporan,
      bulan,
      laporanPemasukan,
      printLaporan
    };
  },
};
</script>
