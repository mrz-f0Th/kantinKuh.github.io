<template>
  <Suspense>
    <template #default>
      <transaksi />
    </template>
    <template #fallback>
      <h1>Loading ...</h1>
    </template>
  </Suspense>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useTransaksiStore } from "../../stores/transaksi.js";
import transaksi from "../../components/TransaksiComponent.vue";

export default {
  components: {
    transaksi,
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
