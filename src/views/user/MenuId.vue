<template>
  <Suspense>
    <template #default>
      <menuku @masukKeranjang="masukKeranjang" />
    </template>
    <template #fallback>
      <p>loading ...</p>
    </template>
  </Suspense>
</template>

<script>
import menuku from "../../components/PesanMenu.vue";
import { useKeranjangStore } from "../../stores/keranjang.js";
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  components: { menuku },
  setup() {
    const keranjangStore = useKeranjangStore();
    const keranjang = reactive({});
    const router = useRouter();

    const masukKeranjang = async (value) => {
      if (localStorage.getItem("keranjang") == null) {
        keranjangStore.codeGenerator(5);

        const virtualKeranjang = reactive({
          kode_keranjang: keranjangStore.code,
          kode: [],
          keterangan: [],
          jumlah: [],
        });

        localStorage.setItem("keranjang", JSON.stringify(virtualKeranjang));
        console.log("test");
      }
      if (localStorage.getItem("keranjang") !== null) {
        await keranjangStore.setKeranjang(value);
        router.push({ name: "Keranjang" });
      }
    };

    return { masukKeranjang, keranjang };
  },
};
</script>
