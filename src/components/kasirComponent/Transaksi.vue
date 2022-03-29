<template>
  <div class="navbar bg-green-300">
    <a class="btn btn-ghost normal-case text-xl">KantinKuh</a>
  </div>
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
              <label for="my-modal-5" class="btn modal-button"
                >open modal</label
              >

              <!-- Put this part before </body> tag -->

              <input type="checkbox" id="my-modal-5" class="modal-toggle" />
              <div class="modal" id="printMe">
                <div class="modal-box w-11/12 max-w-5xl">
                  <h3 class="font-bold text-lg">Detail Transaksi</h3>
                  <div
                    class="py-4"
                    v-for="product in product"
                    :key="product.kode"
                  >
                    <p>Nama : {{ product.product[i].nama }}</p>
                    <p>Jumlah : {{ product.product[i].pivot.jumlah }}</p>
                    <p>Harga : {{ product.product[i].harga }}</p>
                    <p>
                      Total Harga :
                      {{
                        product.product[i].pivot.jumlah *
                        product.product[i].harga
                      }}
                    </p>
                  </div>
                  <div class="modal-action">
                    <label for="my-modal-5" class="btn" @click="print"
                      >Print Struk</label
                    >
                  </div>
                  <div class="btn" @click="print">Print</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useTransaksiStore } from "../../stores/transaksi.js";
import { useRouter } from "vue-router";

export default {
  async setup() {
    const transaksiStore = useTransaksiStore();
    const router = useRouter();

    const transaksi = reactive({});
    const product = reactive({});

    try {
      await transaksiStore.getTransaksi();
      transaksi.value = transaksiStore.transaksi;
      product.value = transaksiStore.transaksi[0].keranjang[0];
      console.log(product.value);
      console.log(transaksi.value);
    } catch (e) {
      console.log(e);
    }

    const print = () => {
      this.$htmlToPaper("printMe");
    };

    return { transaksi, product };
  },
};
</script>
