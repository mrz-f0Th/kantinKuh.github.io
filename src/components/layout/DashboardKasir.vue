<template>
  <div class="h-screen overflow-y-hidden">
    <div class="navbar bg-base-700 col-span-5 fixed">
      <div class="navbar-start ml-4 mt-2">
        <h1 class="text-2xl font-bold">KantinKuh <span class="text-xs"> kasir<span></h1>
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-end"></div>
    </div>
    <div class="grid grid-cols-5 gap-2 bg-base-200 h-screen overflow-hidden">
      <aside class="col-span-1 bg-base-200 mt-20">
        <div class="flex justify-center">
        <ul class="menu bg-base-200 w-full p-7 mt-4">
          <li>
            <router-link to="/kasir" class="mb-3">
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
          <hr />
        </ul>
      </aside>
      <div class="container rounded-xl col-span-4 h-screen">
        <div
          class="
            p-10
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

<script></script>
