<template>
  <Suspense>
    <template #default>
      <div>
        <div>
          <produks :menu="menu" @onPesan="pesan" />
        </div>
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
import produks from "../../components/userComponent/Produks.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  components: { produks },
  setup() {
    const menu = ref(true);
    const router = useRouter();

    const pesan = (id) => {
      router.push({ path: `/menu/${id}` });
    };

    return { pesan, menu };
  },
};
</script>
