<template>
  <div class="h-screen relative">
    <!-- Navbar -->
    <navbar />
    <!-- view -->
    <div class="pt-20">
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useKeranjangStore } from "../../stores/keranjang.js";
import { useTransaksiStore } from "../../stores/transaksi.js";
import Navbar from "../userComponent/Navbar.vue"

export default {
  components: {Navbar},
  setup() {
    const keranjangStore = useKeranjangStore();
    const transaksiStore = useTransaksiStore();

    const keranjangLength = ref("0");
    const isDropdown = ref(false);

    onMounted(() => {
      transaksiStore.getUser();
    });

    if (localStorage.keranjang !== null) {
      keranjangStore.$subscribe(
        (mutation, state) => {
          keranjangLength.value = state.keranjangLength;
        },
        { detached: true }
      );
    } else if (localStorage.keranjang == nul) {
      keranjangLength.value = 0;
    }

    return { keranjangLength, isDropdown };
  },
};
</script>
