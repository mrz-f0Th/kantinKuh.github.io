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
            :key="transaksi.kode_transaksi"
          >
            <th>{{ i + 1 }}</th>
            <td>{{ data.nama }}</td>
            <td>{{ data.meja }}</td>
            <td>
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
  <div class="absolute hidden">
    <!-- struk -->
    <div
      id="printMe"
      @click="changeDisplay"
      class="grid grid-cols-1 place-items-center gap-0 font-medium"
    >
      <div class="text-center w-full py-7">
        <img
          src="../../../public/apple-touch-icon.png"
          class="w-20 mb-3 m-auto"
        />
        <h1>KANTINKUH</h1>
        <h6>smkn 11 bandung</h6>
        <span>+62 89-531-910-926</span>
      </div>
      <div class="flex justify-between w-full px-5 flex-wrap">
        <p class="w-1/2">Transaksi</p>
        <p class="w-1/2 text-right">
          {{ transaksiId.kode_transaksi }}
        </p>
        <p class="w-1/2">Tanggal</p>
        <p class="w-1/2 text-right">{{ tanggalTransaksi }}</p>
      </div>
      <div>
        <h1 class="py-5">Tipe Pesanan</h1>
      </div>
      <div class="flex justify-between w-full flex-wrap px-5">
        <h1 class="w-full">Nama Menu</h1>
        <div
          v-for="product in keranjang.value"
          class="w-full flex justify-between"
        >
          <p class="w-1/2">{{ product.pivot.jumlah }} x {{ product.nama }}</p>
          <p class="w-1/2 text-right">
            {{ product.harga * product.pivot.jumlah }}
          </p>
        </div>
        <p class="w-full text-center mt-4">
          - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        </p>
        <p class="w-1/2 mt-5">Subtotal</p>
        <p class="w-1/2 mt-5 text-right">Rp. {{ totalHarga }}</p>
        <p class="w-full text-center py-7">- - - - Terima kasih - - - -</p>
      </div>
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
                  <th>Harga</th>
                  <th>Jumlah</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <!-- row 1 -->
                <tr v-for="(product, i) in keranjang.value">
                  <th class="hidden"></th>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div>
                        <div class="font-bold">{{ product.nama }}</div>
                        <div class="text-sm opacity-50">
                          {{ product.kategori }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>Rp. {{ product.harga }}</td>
                  <td>{{ product.pivot.jumlah }}</td>
                  <td>Rp. {{ product.harga * product.pivot.jumlah }}</td>
                </tr>
                <tr>
                  <td colspan="4">
                    <span class="flex justify-end text-lg font-bold">
                      Total: Rp. {{ totalHarga }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-action">
            <button v-print="struk" class="btn btn-success">Print</button>
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
    const struk = reactive({
      id: "printMe",
      popTitle: "ㅤ",
      extraCss:
        "https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css",
      beforeOpenCallback(vue) {
        isHidden.value = false;
        console.log("打开之前");
        console.log(isHidden);
      },
      openCallback(vue) {
        vue.printLoading = false;
        console.log("执行了打印");
      },
    });

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
      struk,
      isHidden,
      changeDisplay,
    };
  },
};
</script>
