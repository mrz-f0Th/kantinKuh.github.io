<template>
  <div class="navbar bg-base-100 mb-6 shadow rounded-box">
    <div class="navbar-start">
      <div class="dropdown" :class="{ 'dropdown-open': isDropdown }">
        <label
          class="btn btn-ghost btn-circle"
          @click="isDropdown = !isDropdown"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="
            menu menu-compact
            dropdown-content
            mt-3
            p-2
            shadow
            bg-base-100
            rounded-box
            w-52
          "
        >
          <li>
            <router-link class="active:bg-success" to="/user">Home</router-link>
          </li>
          <li>
            <router-link class="active:bg-success" to="/user/menu"
              >Menu</router-link
            >
          </li>
          <li>
            <router-link class="active:bg-success" to="/user/transaksi"
              >Pesanan</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <h1 class="normal-case text-xl">KantinKuh</h1>
    </div>
    <div class="navbar-end">
      <router-link
        to="/user/keranjang"
        tabindex="0"
        class="btn btn-ghost btn-circle bg-base-100"
      >
        <div class="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span class="badge badge-xs indicator-item">{{
            keranjangLength
          }}</span>
        </div>
      </router-link>
    </div>
  </div>

  <router-view />
</template>

<script>
import { ref, onMounted } from "vue";
import { useKeranjangStore } from "../../stores/keranjang.js";
import { useTransaksiStore } from "../../stores/transaksi.js";

export default {
  setup() {
    const keranjangStore = useKeranjangStore();
    const transaksiStore = useTransaksiStore();

    const keranjangLength = ref("");
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
