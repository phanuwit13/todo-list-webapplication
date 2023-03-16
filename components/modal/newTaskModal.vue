<template>
  <div
    v-if="isModal"
    class="z-20 absolute w-screen h-screen flex justify-center top-0"
  >
    <div class="bg-gray-900 bg-opacity-50 w-screen h-screen relative"></div>
    <div
      class="absolute w-full max-w-[400px] m-h-[300px] bg-white top-1/4 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="font-semibold text-lg">NEW TASK</div>
        <div>
          <img
            @click="openModal"
            class="cursor-pointer"
            src="../../assets/icon/close.svg"
            alt=""
          />
        </div>
      </div>
      <div class="py-3">
        <div>
          <label
            for="todo"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Priority</label
          >
          <select
            v-model="formTask.todo_status"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
          >
            <option value="normal">Normal</option>
            <option value="hight">Hight</option>
          </select>
        </div>
        <div class="mt-2">
          <label>
            <label
              for="todo"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Title</label
            >
            <input
              v-model="formTask.todo_title"
              type="text"
              name="todo"
              id="todo"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="Title"
              required="true"
            />
          </label>
        </div>
        <div class="mt-2">
          <label
            for="todoDescription"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Description</label
          >
          <textarea
            v-model="formTask.todo_description"
            type="text"
            name="todoDescription"
            id="todoDescription"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            placeholder="Description"
          />
        </div>
      </div>
      <div class="py-3 flex gap-2 justify-end">
        <button
          @click="openModal"
          :disabled="isLoading"
          class="flex justify-center items-center bg-white w-28 h-[40px] text-gray-500 rounded-lg active:bg-gray-100 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-white border border-gray-200"
        >
          <IconLoadingIcon
            :size="'w-[20px]'"
            :color="'text-white'"
            v-if="isLoading"
          />
          Close
        </button>
        <button
          :disabled="
            isLoading || !formTask.todo_description || !formTask.todo_title
          "
          @click="onSetNewTask"
          class="flex justify-center items-center bg-indigo-600 w-32 h-[40px] rounded-lg text-white active:bg-indigo-700 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-white"
        >
          <IconLoadingIcon
            :size="'w-[20px]'"
            :color="'text-white'"
            v-if="isLoading"
          />
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isModal", "openModal", "formTask", "isLoading", "onSetNewTask"],
  setup() {},
};
</script>

<style></style>
