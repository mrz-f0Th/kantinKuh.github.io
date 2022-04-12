<template>
  <div class="container">
    <div class="grid grid-cols-2 gap-3 p-5 bg-base-100 rounded-lg shadow">
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Nama Makanan : </span>
        </label>
        <input
          type="text"
          v-model="produk.nama"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Harga :</span>
        </label>
        <input
          type="text"
          v-model="produk.harga"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Status : </span>
        </label>
        <input
          type="text"
          v-model="produk.status"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Kategori :</span>
        </label>
        <input
          type="text"
          v-model="produk.kategori"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-700">
          Cover photo
        </label>
        <div
          class="
            mt-1
            flex
            justify-center
            px-6
            pt-5
            pb-6
            border-2 border-gray-300 border-dashed
            rounded-md
          "
        >
          <div class="space-y-1 text-center">
            <img
              :src="'http://192.168.223.105:8000/storage/image/' + preview"
              alt="imagePreview"
              width="400"
            />

            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div class="flex text-sm text-gray-600">
              <label
                for="file-upload"
                class="
                  relative
                  cursor-pointer
                  bg-white
                  rounded-md
                  font-medium
                  text-indigo-600
                  hover:text-indigo-500
                  focus-within:outline-none
                  focus-within:ring-2
                  focus-within:ring-offset-2
                  focus-within:ring-indigo-500
                "
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only"
                  @change="getImage"
                />
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      <div class="col-start-2 flex justify-end mt-3">
        <button @click="editProduk" class="btn btn-outline-primary">
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import DataService from "../../services/DataService";
import { useKeranjangStore } from "../../stores/keranjang";
import { useProdukStore } from "../../stores/produk";

const keranjangStore = new useKeranjangStore();
const produkStore = new useProdukStore();
const router = useRouter();
const route = useRoute();

const produk = reactive({});
const isGambar = ref("");
const preview = ref("");
const produk_id = produkStore.produkId;

produk.nama = produk_id.nama;
produk.harga = produk_id.harga;
produk.kategori = produk_id.nama;
produk.kode = produk_id.kode;
produk.status = produk_id.status;
produk.gambar = produk_id.gambar
preview.value = produk_id.gambar;

//

const getImage = (event) => {
  isGambar.value = event.target.files[0];
  console.log(isGambar);
  console.log(event.target.files[0]);
  preview.value = URL.createObjectURL(event.target.files[0]);
  keranjangStore.codeGenerator(5);
};

const editProduk = async () => {
  const formData = new FormData();
  formData.append("nama", produk.nama);
  formData.append("harga", produk.harga);
  formData.append("kategori", produk.kategori);
  formData.append("kode", produk.kode);
  formData.append("status", produk.status);
  if (isGambar.value != "") {
    console.log(isGambar);
    formData.append("gambar", isGambar);
  }
  try {
    if (isGambar.value != "") {
      await DataService.editProduk(produk.kode, produk, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await DataService.editProduk(produk.kode, produk);
    }
    router.push({ name: "Produk" });
    console.log(isGambar);
  } catch (err) {
    console.log(err);
  }
};
</script>
