<template>
  <router-link to="/user">| Home |</router-link>
  <router-link to="/user/menu">| Menu |</router-link>
  <router-link to="/user/keranjang">| Keranjang {{keranjangLength.length}} |</router-link>
  <router-link to="/user/transaksi">| Pesanan </router-link>
  <hr>
  <router-view />
</template>

<script>
import { ref } from "vue"
import { useKeranjangStore } from "../../stores/keranjang.js"

export default {
  setup() {
    const keranjangStore = useKeranjangStore()

    const keranjangLength = ref("")

    keranjangStore.$subscribe((mutation, state) => {
      keranjangLength.value = state.keranjangLength
    }, { detached: true })

    return { keranjangLength }

  }
}

</script>
