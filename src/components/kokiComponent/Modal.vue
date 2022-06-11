<template>
  <div class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <h3 class="font-bold text-lg">Hai</h3>
      <p class="py-4">
        {{kode}}
      </p>
      <div class="modal-action">
        <label for="my-modal-5" class="btn">close</label>
      </div>
    </div>
  </div>
</template>

<script>
import {toRef} from 'vue'
export default {
  props: {
    kode: {
      type: Object,
      default: {},
    }
  },
  async setup(props){
      const { kode} = toRef(props)
      console.log(props)


      return {kode}
  }
};
</script>
