<template>
<!-- <div v-for="(menu,a) in  transaksi.value.data" :key=" transaksi.kode_transaksi">
        <hr/>
          <pre>{{menu.keranjang[0].product}}</pre>
          <pre>{{menu.keranjang[0].product[0].nama}}</pre>
          <pre>ini {{a}}</pre>
          {{menu.value}}
        </div> -->
  <div class="grid grid-rows-12 bg-white ">
    <!-- Navbar -->
    <div class="navbar bg-green-100">
      <div class="flex-1 px-2 lg:flex-none">
        <a class="normal-case text-xl text-green-500">KantinKuh</a>
      </div>
      <div class="flex justify-end flex-1 px-2">
        <div class="flex items-stretch">
          <!-- <a class="btn btn-ghost rounded-btn">Button</a> -->
          <div>
            <label for="my-modal-4" class="btn modal-button btn-ghost text-green-400">
              <svg
                class="inline-block w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </label>

            <!-- Put this part before </body> tag -->
            <input type="checkbox" id="my-modal-4" class="modal-toggle" />
            <label for="my-modal-4" class="modal cursor-pointer">
              <label class="modal-box relative" for>
                <h3 class="text-lg font-bold">Cari Data</h3>
                <p class="py-4">
                  <div class="form-control">
                    <!-- <label class="label">
                      <span class="label-text">Cari Data</span>
                    </label> -->
                    <label class="input-group">
                      <input type="text" placeholder="0.01" class="input input-bordered">
                      <span>BTC</span>
                    </label>
                  </div>
                </p>
              </label>
            </label>
          </div>
          <div class="dropdown dropdown-end text-green-400">
            <label tabindex="0" class="btn btn-ghost rounded-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-5 h-5 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li>
                <a class="btn btn-ghost normal-case text-left">Item 1</a>
              </li>
              <li>
                <a class="btn btn-ghost normal-case text-left">Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-t-2 border-black">
    <!-- Navbar -->
    <div class="grid grid-cols-12">
      <!-- Costumers Table -->
      <div class="col-span-3 flex justify-center">
        <div class="w-96 h-screen bg-green-100">
          <div class="card-body">
            <h2 class="card-title mb-3">Costumers</h2>
            <div>
              <div class="overflow-x-auto w-full h-full">
                <table class="table w-full bg-green-200">
                  <thead >
                    <tr>
                      <th class="bg-green-200">#</th>
                      <th class="bg-green-200">Nama</th>
                      <th class="bg-green-200">Meja</th>
                      <th class="bg-green-200"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="transaksi.value" v-for="(transaksi,i) in transaksi.value.data" :key="transaksi.kode">
                      <td>{{}}</td>
                      <td>{{transaksi.nama}}</td>
                      <td>{{transaksi.meja}}</td>
                      <td><button class="btn btn-ghost btn-xs" @click="isActive(true,i)">details</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Costumers Table -->

      <div class="col-span-5">
        <div class="h-screen p-3" >
          <div class="text-center text-xl" v-if="!active">
            Pilih Data
          </div>

          <table class="table w-full bg-green-200" v-else>
                  <thead >
                    <tr>
                      <th class="bg-green-200">#</th>
                      <th class="bg-green-200">Menu</th>
                      <th class="bg-green-200">jumlah</th>
                      <th class="bg-green-200">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(menu,a) in  transaksi.value.data" :key=" transaksi.kode_transaksi">
                      <td>{{}}</td>
                      <td>{{menu.keranjang[0].product[0].nama}}</td>
                      <td>{{menu.keranjang[0].product[0].pivot.jumlah}}</td>
                      <td>{{menu.keranjang[0].product[0].harga }}</td>
                    </tr>
                    <tr>
                      <td><button class="btn btn-ghost btn-xs" >Bayar</button></td>
                    </tr>
                  </tbody>
                </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTransaksiStore } from "../../stores/transaksi.js"
import { onMounted, reactive, ref } from "vue"
import Echo from "laravel-echo"
import { useRouter } from "vue-router"

export default {
  async setup() {
    const transaksiStore = useTransaksiStore()
    const router = useRouter()
    const active = ref(false)
    const  menu = reactive({})
    const transaksi = reactive({})

    const isActive = (setActive,id) => {
      active.value = setActive
       menu.value = transaksi.value.data[id]
      console.log( menu.value);
    }
    try {
      await transaksiStore.getTransaksi()
      transaksi.value = transaksiStore.transaksi
       menu.value = transaksi.value.data.keranjang
      // console.log(transaksi.value.data);
    } catch (e) {
      console.log(e)
    }

    // const transaksiDetail = (id) => router.push({ path: `/kasir/${id}` })

    return { transaksi,active,isActive, menu}
  }
  
}
</script>
