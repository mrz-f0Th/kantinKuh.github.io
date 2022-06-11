<template>
  <div class="m-10">
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Meja</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr
            v-for="(data, i) in transaksi.value"
            :key="data.kode_transaksi"
          >
         
            <th>{{ i + 1 }}</th>
            <td>{{ data.nama }}</td>
            <td>{{ data.meja }}</td>
            <td class="text-center">
              <button v-if="data.status == 'menunggu'" class="btn btn-warning mr-2" @click="ubahStatus(data.kode_transaksi, 'dimasak'); isLoading = true" :class="{ loading: isLoading }">Masak</button>
              <button v-if="data.status == 'dimasak'" class="btn btn-success mr-2" @click="ubahStatus(data.kode_transaksi, 'hidangkan'); isLoading = true" :class="{ loading: isLoading }">Hidangkan</button>
              <button v-if="data.status == 'hidangkan'" class="btn btn-disabled mr-2">Selesai</button>
              <!-- The button to open modal -->
              <label
                for="my-modal-5"
                class="btn modal-button"
                @click="getTransaksiKode(data.kode_transaksi)"
                >Detail</label
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

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
                  <th class="text-center">Jumlah</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <!-- row 1 -->
                <tr v-for="(product, i) in keranjang.value" :key="product.kode_keranjang">
                  <th class="hidden"></th>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div>
                        <div class="font-bold">{{ product.nama }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="text-center">{{ product.pivot.jumlah }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-action">
            <label for="my-modal-5" class="btn btn-error">Close</label>
          </div>
        </div>
      </div>
    </template>
    <template #fallback>Loading ...</template>
  </Suspense>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { useTransaksiStore } from "../../stores/transaksi.js";
import { useRouter } from "vue-router";
import moment from "moment";

export default {
  async setup() {
    const transaksiStore = useTransaksiStore();
    const router = useRouter();

    const transaksi = reactive({});
    const transaksiId = reactive({
      kode_transaksi: "",
      value: "",
    });
    const keranjang = reactive({});
    const totalHarga = ref("");
    const tanggalTransaksi = ref("");
    const isHidden = ref(true);
    const isLoading = ref(false);

    try {
      await transaksiStore.getTransaksi();
      transaksi.value = transaksiStore.transaksi;
    } catch (e) {
      console.log(e);
    }

    const getTransaksiKode = async (kode) => {
      await transaksiStore.getTransaksiKode(kode).then(() => {
        transaksiId.value = transaksiStore.transaksiId;
        transaksiId.kode_transaksi = transaksiId.value.kode_transaksi;
        keranjang.value = transaksiId.value.keranjang[0].product;
        transaksiStore.setTotalHarga(keranjang.value);
        totalHarga.value = transaksiStore.total_harga.toLocaleString("id");
        tanggalTransaksi.value = moment(transaksiId.value.created_at).format(
          "LL"
        );
      });
    };

    const ubahStatus = async (kode, status) => {
      console.log(transaksiId.value.kode_transaksi)
      console.log(kode)
      await transaksiStore.updateTransaksi(kode, status)
        .then(async () => {
          await transaksiStore.getTransaksi();
          transaksi.value = transaksiStore.transaksi;
          isLoading.value = false
        })
    }

    const changeDisplay = () => {
      console.log("hai");
    };

    return {
      transaksi,
      transaksiId,
      keranjang,
      totalHarga,
      getTransaksiKode,
      tanggalTransaksi,
      isHidden,
      isLoading,
      changeDisplay,
      ubahStatus,
    };
  },
};
</script>
