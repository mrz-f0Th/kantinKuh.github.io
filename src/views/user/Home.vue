<template>
  <div class="p-4">
    <h1 class="text-xl">selamat datang {{ user.nama }}</h1>
  </div>
  <Suspense>
    <template #default>
  <popular @onPesan="pesan"/>
    </template>
    <template #fallback>
      Loading ..
    </template>
    </Suspense>
</template>

<script setup>
import { useTransaksiStore } from "../../stores/transaksi.js";
import { onMounted, ref, computed } from "vue";
import popular from '../../components/userComponent/MostPopular.vue';
import { useRouter } from 'vue-router'
 
const transaksiStore = useTransaksiStore();
const user = ref({});
const router = useRouter()

const pesan = (id) => {
  router.push({ path: `/menu/${id}` });
};


onMounted(() => {
  transaksiStore.getUser();
  user.value = transaksiStore.user;
});
</script>
