<template>
  <Suspense>
    <template #default>
      <div>
        <menuku @masukKeranjang="masukKeranjang" />
        <pre>{{keranjang.value}}</pre>
      </div>
    </template>
    <template #fallback>
      <p>loading ...</p>
    </template>
  </Suspense>
</template>

<script>
import menuku from "../../components/PesanMenu.vue"
import { useKeranjangStore } from "../../stores/keranjang.js"
import { reactive,  computed } from "vue"
import { useRouter } from "vue-router"

export default{
  components: {menuku},
  setup() {

    const keranjangStore = useKeranjangStore()
    const keranjang = reactive({})
    const router = useRouter()

    const masukKeranjang = async (value) => {
      await keranjangStore.setKeranjang(value)
      router.push({name: "Keranjang"})
    } 

   return { masukKeranjang, keranjang } 
  }
}

</script>
