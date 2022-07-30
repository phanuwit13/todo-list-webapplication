<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue';
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import actionService from '../action'
import NewTaskModal from './modal/newTaskModal.vue';

interface task {
  id: number
  todo_title: string
  todo_date: string
  todo_status: string
  todo_username: string
  todo_description: string,
  todo_success: boolean
}

export default defineComponent({
  setup() {
    const date = ref(new Date());
    const list: any = ref({
      false: [],
      true: []
    });
    const isModal = ref(false);
    const isModalUpdate = ref(false);
    const isLoading = ref(false);
    const taskLoading = ref(false);
    const formTask = ref({
      id: 0,
      todo_status: "normal",
      todo_title: "",
      todo_description: "",
      todo_success: false
    });
    const getList = async () => {
      taskLoading.value = true;
      let response = await actionService.GetTodoList();
      taskLoading.value = false;
      if (response.success) {
        list.value = response.data;
      }
    };
    const openModal = async () => {
      clearForm()
      isModal.value = !isModal.value;
    };
    const openModalUpdate = async (id?: task) => {
      clearForm()
      formTask.value = {
        id: id?.id || 0,
        todo_status: id?.todo_status || "normal",
        todo_title: id?.todo_title || "",
        todo_description: id?.todo_description || "",
        todo_success: id?.todo_success || false
      }
      isModalUpdate.value = !isModalUpdate.value;
    };
    const clearForm = () => {
      formTask.value = {
        id: 0,
        todo_status: "normal",
        todo_title: "",
        todo_description: "",
        todo_success: false
      }
    }
    const checkColorStatus = (status: string, success: boolean) => {
      return success ? "bg-green-500" : status === "hight" ? "bg-orange-400" : "bg-sky-500";
    };
    return {
      date,
      list,
      getList,
      openModal,
      isModal,
      isLoading,
      checkColorStatus,
      formTask,
      taskLoading,
      clearForm,
      openModalUpdate,
      isModalUpdate
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    dayjs,
    onSetNewTask: async function () {
      let data = { ...this.formTask, todo_date: dayjs(new Date()).format("YYYY-MM-DD HH:mm"), todo_success: false };
      this.isLoading = true;
      let response = await actionService.AddTodoList(data);
      this.isLoading = false;
      if (response?.success) {
        Swal.fire({
          text: "Task is successfully created.",
          icon: "success",
          confirmButtonColor: "#CBD5E1",
          confirmButtonText: "Close"
        }).then(() => {
          this.getList();
          this.openModal();
        });
      }
      else {
        Swal.fire({
          text: response.data,
          icon: "error",
          confirmButtonColor: "#CBD5E1",
          confirmButtonText: "Close"
        });
      }
    },
    onDeleteTask: async function (id: number) {
      Swal.fire({
        text: "Are you sure to delete this task ?",
        icon: "info",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Delete",
        denyButtonColor: "#CBD5E1",
        showDenyButton: true,
        denyButtonText: `Colse`,
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.taskLoading = true;
          let response = await actionService.DeleteTodoList(id);
          if (response?.success) {
            this.getList();
          }
          else {
            Swal.fire({
              text: response.data,
              icon: "error",
              confirmButtonColor: "#CBD5E1",
              confirmButtonText: "Close"
            });
          }
        }
      });
    },
    onCheckTask: async function (task: task) {
      let data = { ...task, todo_success: !task.todo_success }
      this.taskLoading = true;
      let response = await actionService.UpdateTodoList(data);
      // this.isLoading = false;
      if (response?.success) {
        this.getList();
      } else {
        this.taskLoading = false;
        Swal.fire({
          text: response.data,
          icon: "error",
          confirmButtonColor: "#CBD5E1",
          confirmButtonText: "Close"
        });
      }
    },
    onUpdateTask: async function () {
      let data = { ...this.formTask }
      this.isLoading = true;
      let response = await actionService.UpdateTodoList(data);
      this.isLoading = false;
      if (response?.success) {
        Swal.fire({
          text: "Task is successfully update.",
          icon: "success",
          confirmButtonColor: "#CBD5E1",
          confirmButtonText: "Close"
        }).then(() => {
          this.getList();
          this.openModalUpdate();
        });
      }
      else {
        Swal.fire({
          text: response.data,
          icon: "error",
          confirmButtonColor: "#CBD5E1",
          confirmButtonText: "Close"
        });
      }
    }
  },
  components: { NewTaskModal }
})
</script>
<!-- Please remove this file from your project -->
<template>
  <div class="bg-slate-200 h-screen flex align-center">
    <div
      class="bg-white w-full md:w-4/5 max-w-md m-auto h-[700px] p-7 pt-0 border-solid border-2 border-gray-300 overflow-scroll">
      <LayoutHeader :date="date" :openModal="openModal" />
      <div v-if="!taskLoading">
        <div v-for="(item, name) in list" :key="name">
          <div v-if="item" class="w-fit m-auto my-6 text-xl font-semibold">
            {{ name === 'true' ? "DONE TASKS" : "TODO TASKS" }}
          </div>
          <div v-for="(i) in item" :key="i.id">
            <div class="mb-5 rounded-lg px-4 py-3 flex items-center justify-between relative"
              :class="checkColorStatus(i.todo_status, i.todo_success)">
              <div class="text-white flex flex-col gap-1 max-w-[80%] ">
                <span class="text-xs font-medium capitalize">{{ i.todo_success ? 'Done' : i.todo_status }} <span
                    v-if="!i.todo_success">Priority</span></span>
                <div class="text-xl font-semibold">{{ i.todo_title }}</div>
                <div class="text-xs">{{ i.todo_description }}</div>
              </div>
              <div>
                <input type="checkbox" :checked="i.todo_success" @click="onCheckTask(i)"
                  class="cursor-pointer appearance-none w-6 h-6 rounded-full border-2 bg-white checked:bg-[url('assets/icon/check.svg')] bg-no-repeat bg-contain" />
              </div>
              <div class="absolute right-2 bottom-2 flex gap-2">
                <img @click="openModalUpdate(i)" class=" cursor-pointer " src="../assets/icon/edit.svg" alt="">
                <img @click="onDeleteTask(i.id)" class="cursor-pointer " src="../assets/icon/delete.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="taskLoading" class="flex justify-center mt-10">
        <IconLoadingIcon :size="'w-[80px]'" :color="'text-fuchsia-400'" />
      </div>
    </div>
    <!-- modal -->
    <ModalNewTaskModal :isModal="isModal" :openModal="openModal" :formTask="formTask" :isLoading="isLoading"
      :onSetNewTask="onSetNewTask" />
    <ModalUpdateTaskModal :isModal="isModalUpdate" :openModal="openModalUpdate" :formTask="formTask"
      :isLoading="isLoading" :onSetNewTask="onUpdateTask" />
  </div>
</template>


