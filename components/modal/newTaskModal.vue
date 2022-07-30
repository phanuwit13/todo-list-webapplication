<template>
  <div v-if="isModal" class=" z-20 absolute w-screen h-screen flex justify-center">
    <div class="bg-gray-700 opacity-30 w-screen h-screen relative">
    </div>
    <div class="absolute w-full max-w-[400px] m-h-[300px] bg-white top-1/4 rounded-lg p-4">
      <div class="flex items-center justify-between">
        <div class="font-semibold text-lg">NEW TASK</div>
        <div>
          <img @click="openModal" class="cursor-pointer" src="../../assets/icon/close.svg" alt="">
        </div>
      </div>
      <div class="py-3">
        <div>
          <label>
            <span class="text-slate-900 dark:text-slate-200 text-sm font-medium">Priority</span>
            <select v-model="formTask.todo_status"
              class="appearance-none font-sans block text-sm leading-5 w-full py-2 px-3 border-2 border-slate-400 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-slate-200 focus:border-slate-500 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 dark:border-slate-500 dark:focus:ring-slate-900 dark:focus:border-slate-600">
              <option value="normal">Normal</option>
              <option value="hight">Hight</option>
            </select>
          </label>
        </div>
        <div class="mt-2">
          <label>
            <span class="text-slate-900 dark:text-slate-200 text-sm font-medium">Title</span>
            <input type="text" v-model="formTask.todo_title"
              class="font-sans block text-sm leading-5 w-full py-2 px-3 border-2 border-slate-400 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-slate-200 focus:border-slate-500 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 dark:border-slate-500 dark:focus:ring-slate-900 dark:focus:border-slate-600">
          </label>
        </div>
        <div class="mt-2">
          <label>
            <span class="text-slate-900 dark:text-slate-200 text-sm font-medium">Description</span>
            <textarea type="text" v-model="formTask.todo_description"
              class="font-sans block text-sm leading-5 w-full py-2 px-3 border-2 border-slate-400 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-slate-200 focus:border-slate-500 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 dark:border-slate-500 dark:focus:ring-slate-900 dark:focus:border-slate-600" />
          </label>
        </div>
      </div>
      <div class="py-3 flex gap-2 justify-end">
        <button @click="openModal" :disabled="isLoading"
          class="flex justify-center items-center bg-gray-200 w-28 h-[40px] rounded-lg  active:bg-gray-400 hover:bg-gray-300 disabled:bg-gray-200 disabled:text-white">
          <IconLoadingIcon :size="'w-[20px]'" :color="'text-white'" v-if="isLoading" />
          Close
        </button>
        <button :disabled="isLoading || !formTask.todo_description || !formTask.todo_title" @click="onSetNewTask"
          class="flex justify-center items-center bg-fuchsia-400 w-32 h-[40px] rounded-lg text-white active:bg-fuchsia-600 hover:bg-fuchsia-500 disabled:bg-gray-200 disabled:text-white">
          <IconLoadingIcon :size="'w-[20px]'" :color="'text-white'" v-if="isLoading" />
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isModal', 'openModal', 'formTask', 'isLoading', 'onSetNewTask'],
  setup () {
  }

}
</script>

<style>
</style>