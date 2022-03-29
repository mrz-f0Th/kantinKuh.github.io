<template>
  <!-- component -->
  <div class="h-screen md:flex">
    <div
      class="
        relative
        overflow-hidden
        md:flex
        w-1/2
        bg-gradient-to-tr
        from-emerald-500
        to-green-400
        i
        justify-around
        items-center
        hidden
      "
    >
      <div>
        <h1 class="text-white font-bold text-4xl font-sans">KantinKuh</h1>
        <p class="text-white mt-1">The most popular app for ordering food</p>
      </div>
      <div
        class="
          absolute
          -bottom-32
          -left-40
          w-80
          h-80
          border-4
          rounded-full
          border-opacity-30 border-t-8
        "
      ></div>
      <div
        class="
          absolute
          -bottom-40
          -left-20
          w-80
          h-80
          border-4
          rounded-full
          border-opacity-30 border-t-8
        "
      ></div>
      <div
        class="
          absolute
          -top-40
          -right-0
          w-80
          h-80
          border-4
          rounded-full
          border-opacity-30 border-t-8
        "
      ></div>
      <div
        class="
          absolute
          -top-20
          -right-20
          w-80
          h-80
          border-4
          rounded-full
          border-opacity-30 border-t-8
        "
      ></div>
    </div>
    <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
      <div
        class="
          card
          flex-shrink-0
          w-full
          max-w-sm
          md:shadow-2xl
          sm:shadow-none
          bg-base-100
        "
      >
        <div class="card-body">
          <h1 class="text-gray-800 font-bold text-2xl mb-7">
            Welcome Back Again!
          </h1>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              v-model="user.email"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              v-model="user.password"
              class="input input-bordered"
            />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover"
                >Forgot password?</a
              >
            </label>
          </div>
          <div class="form-control mt-6">
            <button
              class="btn btn-success"
              @click="login"
              :class="{ loading: isLoading }"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useLoginGuard } from "../stores/loginGuard.js";
import { useRouter } from "vue-router";

const router = useRouter();
const loginGuard = useLoginGuard();
const user = reactive({});
const isLoading = ref(false);

const login = async () => {
  isLoading.value = true;
  loginGuard.csrf();
  await loginGuard.login(user);
  router.push({ name: "Dashboard" });
};
</script>
