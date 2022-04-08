<template>
  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="my-modal-5" class="modal-toggle" />
  <Suspense>
    <template #default>
      <div class="modal" id="printMe">
        <div class="modal-box w-11/12 max-w-5xl">
          <h3 class="font-bold text-lg">Detail Transaksi</h3>

          <div class="py-4">
            <!-- table detail -->
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Jumlah</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <!-- row 1 -->
                <tr v-for="product in keranjang.value">
                  <td>
                    <div class="flex items-center space-x-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                          <img
                            :src="
                              'http://192.168.18.105:8000/storage/image/' +
                              product.gambar
                            "
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
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
            <label for="my-modal-5" class="btn" @click="print"
              >Print Struk</label
            >
          </div>
          <div class="btn" @click="print">{{ kodeTransaksi }}</div>
        </div>
      </div>
    </template>
    <template #fallback>Loading ...</template>
  </Suspense>
</template>

<script>
import { reactive, onMounted } from "vue";

export default {
  props: {
    keranjang: {
      type: Object,
      default: () => {},
    },
    totalHarga: {
      type: String,
      default: "",
    },
    kodeTransaksi: {
      type: String,
      default: "",
    },
  },
  async setup(props) {
    const transaksiId = reactive({});

    onMounted(() => console.log("hai"));

    return {};
  },
};
</script>
