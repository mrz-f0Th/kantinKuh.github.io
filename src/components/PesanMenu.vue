<template>
  masok
</template>

<script>
import { useRouter } from "vue-router"

export default{
  setup(){
    const router = useRouter()

    console.log(router.currentRoute.value.params.id)
  }
}
</script>
