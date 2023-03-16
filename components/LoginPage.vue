<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img class="w-8 h-8 mr-2" src="@/assets/image/logo.png" alt="logo" />
        Todo Task
      </a>
      <div
        class="w-full bg-white rounded-[16px] shadow dark:border md:mt-0 sm:max-w-[395px] xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit="onLogin">
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username</label
              >
              <input
                v-model="username"
                type="text"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="todo123"
                required="true"
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="true"
              />
            </div>
            <button
              :disabled="isLoading"
              type="submit"
              class="w-full flex justify-center text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              <IconLoadingIcon
                :size="'w-[20px]'"
                :color="'text-white'"
                v-if="isLoading"
              />
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <NuxtLink
                class="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                to="/register"
              >
                Sign up</NuxtLink
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import Swal from "sweetalert2";
import actionService from "../action";

export default defineComponent({
  setup() {
    const username = ref("");
    const password = ref("");
    const isLoading = ref(false);
    return {
      username,
      password,
      isLoading,
    };
  },
  methods: {
    onLogin: async function (e: Event) {
      e.preventDefault();

      if (!this.username || !this.password) {
        Swal.fire({
          text: "Invalid Parameter!",
          icon: "error",
          confirmButtonColor: "#CBD5E1",
          confirmButtonText: "Close",
        });
      } else {
        this.isLoading = true;
        let response = await actionService.Login(this.username, this.password);
        this.isLoading = false;
        if (response?.success) {
          this.$router.push("/");
        } else {
          Swal.fire({
            text: "Username or password is incorrect!",
            icon: "error",
            confirmButtonColor: "#CBD5E1",
            confirmButtonText: "Close",
          });
        }
      }
    },
  },
});
</script>