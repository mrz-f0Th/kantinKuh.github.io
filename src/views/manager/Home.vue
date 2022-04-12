<template>
  <div class="p-5">
    <p class="font-medium text-xl">Dashboard</p>
    <Suspense>
      <template #default>
        <home />
      </template>
      <template #fallback> Loading ... </template>
    </Suspense>
  </div>
</template>

<script>
import home from "../../components/managerComponent/HomeComponent.vue";

export default {
  components: { home },
};
</script>
