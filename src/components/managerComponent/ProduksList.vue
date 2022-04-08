<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"></div>
  <div class="flex justify-center">
    <div class="overflow-x-auto w-11/12">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Status</th>
            <th class="flex justify-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="(produk, i) in result.value" :key="produk.kode">
            <td>{{ i + 1 }}</td>
            <td>
              <div class="flex items-center space-x-3">
                <div>
                  <div>{{ produk.data.nama }}</div>
                </div>
              </div>
            </td>
            <td>
              {{ produk.data.harga }}
            </td>
            <td>
              <span v-if="produk.data.status == 'ada'" class="text-success">
                {{ produk.data.status }}
              </span>
              <span v-if="produk.data.status == 'habis'" class="text-error">
                {{ produk.data.status }}
              </span>
            </td>
            <th class="flex justify-center">
              <div>
                <span
                  class="btn btn-outline btn-info btn-sm mr-2"
                  @click="editProduk(produk.data.kode)"
                  >Edit</span
                >
              </div>
              <button
                class="btn btn-outline btn-error btn-sm"
                @click="hapusProduk(produk.data.kode)"
              >
                Hapus
              </button>
            </th>
          </tr>
        </tbody>

        <!-- foot -->
        <tfoot>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Meja</th>
            <th>Harga</th>
            <th class="flex justify-center">status</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref, watch } from "vue";
import { useProdukStore } from "../../stores/produk.js";
import { useRouter } from "vue-router";

export default {
  async setup() {
    const produkStore = useProdukStore();
    const router = useRouter();

    const result = reactive({});
    const error = ref(null);

    try {
      await produkStore.getProduk();
      result.value = produkStore.produk;
    } catch (e) {
      error.value = e;
    }

    const hapusProduk = async (kode) => {
      console.log("hai");
      await produkStore.deleteProduk(kode);
      await produkStore.getProduk();
      result.value = produkStore.produk;
    };

    const editProduk = async (kode) => {
      await produkStore.getProdukId(kode);
      router.push({ path: `/edit-produk/${kode}` });
    };

    return { result, hapusProduk, editProduk };
  },
};
</script>
