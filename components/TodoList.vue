<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full relative bg-white rounded-[16px] shadow dark:border md:mt-0 sm:max-w-[395px] dark:bg-gray-800 dark:border-gray-700 h-[700px] overflow-hidden"
      >
        <LayoutHeader :date="date" :list="list" :openModal="openModal" />
        <div
          class="px-[20px] mt-[50px] overflow-y-scroll max-h-[460px]"
          v-if="!taskLoading"
        >
          <div>
            <div class="w-fit my-6 text-xl font-semibold">
              TODO TASKS
            </div>
            <div v-for="(i, index) in list.false" :key="index">
              <div
                class="mb-5 rounded-lg px-4 py-2 flex items-center justify-between relative shadow"
                :class="checkColorStatus(i.todo_status, i.todo_success)"
              >
                <div class="flex flex-col gap-2 max-w-[80%]">
                  <span
                    class="text-xs font-medium capitalize flex items-center gap-1"
                  >
                    <IconDateIcon />
                    <!-- {{ i.todo_success ? "Done" : i.todo_status }} -->
                    <span class="text-[10px] mt-[2px] text-[#d1d2d6]">{{
                      dayjs(i.todo_date).format("DD MMM HH:mm")
                    }}</span></span
                  >
                  <div class="text-md text-[#424242] font-semibold">
                    {{ i.todo_title }}
                  </div>
                  <div class="text-xs text-[#424242]">
                    {{ i.todo_description }}
                  </div>
                </div>
                <div>
                  <input
                    type="checkbox"
                    :checked="i.todo_success"
                    @click="onCheckTask(i)"
                    class="cursor-pointer appearance-none w-[18px] h-[18px] rounded-[4px] absolute top-2 right-2 border-2 checked:bg-[#00AF3A] checked:bg-[url('assets/icon/check.svg')] checked:!bg-[length:18px] checked:bg-center bg-no-repeat bg-contain"
                  />
                </div>
                <div class="absolute right-2 bottom-2 flex gap-2">
                  <img
                    @click="openModalUpdate(i)"
                    class="cursor-pointer w-[16px]"
                    src="../assets/icon/edit.svg"
                    alt=""
                  />
                  <img
                    @click="onDeleteTask(i.id)"
                    class="cursor-pointer w-[16px]"
                    src="../assets/icon/delete.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <LayoutNavbar />
        <div v-if="taskLoading" class="flex justify-center mt-[60px]">
          <IconLoadingIcon :size="'w-[80px]'" :color="'text-fuchsia-400'" />
        </div>
      </div>
    </div>

    <!-- modal -->
    <ModalNewTaskModal
      :isModal="isModal"
      :openModal="openModal"
      :formTask="formTask"
      :isLoading="isLoading"
      :onSetNewTask="onSetNewTask"
    />
    <ModalUpdateTaskModal
      :isModal="isModalUpdate"
      :openModal="openModalUpdate"
      :formTask="formTask"
      :isLoading="isLoading"
      :onSetNewTask="onUpdateTask"
    />
  </section>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import actionService from "../action";
import NewTaskModal from "./modal/newTaskModal.vue";

interface task {
  id: number;
  todo_title: string;
  todo_date: string;
  todo_status: string;
  todo_username: string;
  todo_description: string;
  todo_success: boolean;
}

export default defineComponent({
  setup(this) {
    const date = ref(new Date());
    const list: any = ref({
      false: [],
      true: [],
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
      todo_success: false,
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
      clearForm();
      isModal.value = !isModal.value;
    };
    const openModalUpdate = async (id?: task) => {
      clearForm();
      formTask.value = {
        id: id?.id || 0,
        todo_status: id?.todo_status || "normal",
        todo_title: id?.todo_title || "",
        todo_description: id?.todo_description || "",
        todo_success: id?.todo_success || false,
      };
      isModalUpdate.value = !isModalUpdate.value;
    };
    const clearForm = () => {
      formTask.value = {
        id: 0,
        todo_status: "normal",
        todo_title: "",
        todo_description: "",
        todo_success: false,
      };
    };
    const checkColorStatus = (status: string, success: boolean) => {
      return success
        ? "border-l-[6px] border-green-500"
        : status === "hight"
        ? "border-l-[6px] border-orange-400"
        : "border-l-[6px] border-sky-500";
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
      isModalUpdate,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    dayjs,
    onSetNewTask: async function () {
      let data = {
        ...this.formTask,
        todo_date: dayjs(new Date()).format("DD MMM HH:mm"),
        todo_success: false,
      };
      this.isLoading = true;
      let response = await actionService.AddTodoList(data);
      this.isLoading = false;
      if (response?.success) {
        Swal.fire({
          text: "Task is successfully created.",
          icon: "success",
          confirmButtonColor: "#CBD5E1",
          confirmButtonText: "Close",
        }).then(() => {
          this.getList();
          this.openModal();
        });
      } else {
        Swal.fire({
          text: response.data,
          icon: "error",
          confirmButtonColor: "#CBD5E1",
          confirmButtonText: "Close",
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
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.taskLoading = true;
          let response = await actionService.DeleteTodoList(id);
          if (response?.success) {
            this.getList();
          } else {
            Swal.fire({
              text: response.data,
              icon: "error",
              confirmButtonColor: "#CBD5E1",
              confirmButtonText: "Close",
            });
          }
        }
      });
    },
    onCheckTask: async function (task: task) {
      let data = { ...task, todo_success: !task.todo_success };
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
          confirmButtonText: "Close",
        });
      }
    },
    onUpdateTask: async function () {
      let data = { ...this.formTask };
      this.isLoading = true;
      let response = await actionService.UpdateTodoList(data);
      this.isLoading = false;
      if (response?.success) {
        Swal.fire({
          text: "Task is successfully update.",
          icon: "success",
          confirmButtonColor: "#CBD5E1",
          confirmButtonText: "Close",
        }).then(() => {
          this.getList();
          this.openModalUpdate();
        });
      } else {
        Swal.fire({
          text: response.data,
          icon: "error",
          confirmButtonColor: "#CBD5E1",
          confirmButtonText: "Close",
        });
      }
    },
  },
  components: { NewTaskModal },
});
</script>
