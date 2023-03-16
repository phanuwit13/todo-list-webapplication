<template>
  <!-- <div class="bg-slate-200 h-screen flex align-center">
    <div class="bg-white w-4/5 max-w-md m-auto h-[700px] p-7 border-solid border-2 border-gray-300">
      <div class="w-fit m-auto my-6 text-xl font-semibold">
        TODO TASKS REGISTER
      </div>
      <div class="w-80 m-auto">
        <div>
          <label>
            <span class="text-slate-900 dark:text-slate-200 text-sm font-medium">Username</span>
            <input type="text" v-model="username"
              class="font-sans block text-sm leading-5 w-full py-2 px-3 border-2 border-slate-400 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-slate-200 focus:border-slate-500 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 dark:border-slate-500 dark:focus:ring-slate-900 dark:focus:border-slate-600">
          </label>
        </div>
        <div class="mt-4">
          <label>
            <span class="text-slate-900 dark:text-slate-200 text-sm font-medium">Password</span>
            <input type="password" v-model="password"
              class="font-sans block text-sm leading-5 w-full py-2 px-3 border-2 border-slate-400 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-slate-200 focus:border-slate-500 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 dark:border-slate-500 dark:focus:ring-slate-900 dark:focus:border-slate-600">
          </label>
        </div>
        <div class="mt-4">
          <button @click="onRegister" :disabled="isLoading"
            class="flex justify-center items-center bg-fuchsia-400 w-full h-[40px] rounded-lg text-white active:bg-fuchsia-600 hover:bg-fuchsia-500 disabled:bg-gray-200 disabled:text-white">
            <IconLoadingIcon :size="'w-[20px]'" :color="'text-white'" v-if="isLoading" />
            Register
          </button>
          <div class="mt-2 text-sm text-center">
            <span>Your have account? </span>
            <NuxtLink class="text-blue-500" to="/login">
              Login now
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div> -->
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
            Create your Account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit="onRegister">
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
              Create an account
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <NuxtLink
                class="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                to="/login"
              >
                Sign in</NuxtLink
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
    onRegister: async function (e: Event) {
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
        let response = await actionService.Register(
          this.username,
          this.password
        );
        this.isLoading = false;
        if (response.success) {
          Swal.fire({
            text: "Congratulations, your account has been successfully created.",
            icon: "success",
            confirmButtonColor: "#E979F8",
            confirmButtonText: "Continue to Login",
          }).then(() => {
            this.$router.push("/login");
          });
        } else {
          Swal.fire({
            text: response.data,
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
