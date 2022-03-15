<template>
  <Suspense>
    <template #default>
      <pesanan />
    </template>
    <template #fallback>
      <h1>Loading ...</h1>
    </template>
  </Suspense>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useTransaksiStore } from "../../stores/transaksi.js";
import pesanan from "../../components/PesanansComponent.vue";

export default {
  components: {
    pesanan,
  },
  setup() {
    const transaksiStore = useTransaksiStore();
    let status = ref("");
    const transaksi = reactive({});
    onMounted(() => {
      console.log(transaksiStore.statuss);
    });
  },
};
</script>
