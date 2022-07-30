
<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue';
import Swal from 'sweetalert2'
import actionService from '../action'

export default defineComponent({
  setup() {
    const username = ref('')
    const password = ref('')
    const isLoading = ref(false)
    return {
      username,
      password,
      isLoading
    }
  },
  methods: {
    onRegister: async function () {
      if (!this.username || !this.password) {
        Swal.fire({
          text: 'Invalid Parameter!',
          icon: 'error',
          confirmButtonColor: '#CBD5E1',
          confirmButtonText: 'Close'
        })
      } else {
        this.isLoading = true
        let response = await actionService.Register(this.username, this.password)
        this.isLoading = false
        if (response.success) {
          Swal.fire({
            text: 'Congratulations, your account has been successfully created.',
            icon: 'success',
            confirmButtonColor: '#E979F8',
            confirmButtonText: 'Continue to Login'
          }).then(() => {
            this.$router.push('/login')
          })
        } else {
          Swal.fire({
            text: response.data,
            icon: 'error',
            confirmButtonColor: '#CBD5E1',
            confirmButtonText: 'Close'
          })
        }
      }
    }
  },
})
</script>

<template>
  <div class="bg-slate-200 h-screen flex align-center">
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
  </div>
</template>
