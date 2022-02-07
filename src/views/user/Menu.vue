<template>
  <Suspense>                   
    <template #default>        
      <div>                   
        <produks :menu='menu' @onPesan="pesan" />        
        <router-view />
      </div>                   
    </template>                
    <template #fallback>       
      <div>
        <span>Loading ...</span>        
      </div>  
    </template>                
  </Suspense>
</template>
  
      
<script>
import produks from "../../components/Produks.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"

export default{
  components: {produks},
  setup(){

    const menu = ref(true)
    const router = useRouter()

    const pesan = (val) => {
      console.log(val)
      router.push({name : `user/menu/${val}`})
    }

    return {pesan, menu}
    }
}
</script>
