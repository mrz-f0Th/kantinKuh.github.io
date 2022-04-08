<template>
  <div class="h-screen overflow-y-hidden">
    <div class="navbar bg-base-200 col-span-5 fixed">
      <div class="navbar-start ml-4 mt-2">
        <h1 class="text-2xl font-bold">KantinKuh</h1>
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-end"></div>
    </div>
    <div class="grid grid-cols-5 gap-2 bg-base-200 h-screen overflow-hidden">
      <aside class="col-span-1 bg-base-200 mt-20">
        <div class="flex justify-center">
          <div class="avatatar rounded-full">
            <div class="w-14 rounded-full">
              <img
                class="rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQnVF6kPOwLxFmwHuLQIn-_f6lLFACKWYdCw&usqp=CAU"
              />
            </div>
          </div>
        </div>
        <h1 class="text-center font-bold mt-2">{{ me.value.username }}</h1>
        <p class="text-center">{{ me.value.role }}</p>
        <ul class="menu bg-base-200 w-full p-7 mt-4">
          <li>
            <router-link to="/" class="mb-3">
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/produk">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Produk
            </router-link>
          </li>
          <hr />
          <li>
            <button class="mt-2" @click="logout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </li>
        </ul>
      </aside>
      <div class="container rounded-xl col-span-4 h-screen">
        <div
          class="
            p-5
            mt-20
            mb-5
            h-5/6
            mr-5
            bg-base-100
            rounded-3xl
            scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-600
            overflow-y-scroll
            scrollbar-thumb-rounded-full scrollbar-track-rounded-full
          "
        >
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoginGuard } from "../../stores/loginGuard.js";
import { useRouter } from "vue-router";
import { onBeforeMount, reactive } from "vue";

export default {
  setup() {
    const loginGuard = useLoginGuard();
    const router = useRouter();
    const me = reactive({});

    onBeforeMount(() => (me.value = JSON.parse(localStorage.getItem("me"))));

    const logout = () => {
      loginGuard.logout();
      router.push({ name: "Login" });
    };

    return { logout, me };
  },
};
</script>
