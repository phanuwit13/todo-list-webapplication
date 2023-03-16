<template>
  <div
    class="relative z-10 bg-gradient-to-b from-indigo-700 to-indigo-600 w-100 flex justify-between h-[140px] pb-6 pt-7 sticky top-0 px-[20px]"
  >
    <div>
      <div class="flex items-start gap-2 !text-white">
        <div class="text-4xl font-semibold leading-[1.95rem] !text-white">
          {{ dayjs(date).format("DD") }}
        </div>
        <div class="text-xs !text-white">
          <div class="!text-white">{{ dayjs(date).format("dddd") }}</div>
          <div class="!text-white">{{ dayjs(date).format("MMM YYYY") }}</div>
        </div>
      </div>
      <div class="text-[12px] mt-[4px] ml-1 !text-white capitalize">
        Hi! {{ getUser() }}
      </div>
    </div>
    <div class="flex items-start">
      <div>
        <button
          @click="openModal"
          class="flex justify-end items-center w-[40px] h-[40px] rounded-full text-white"
        >
          <IconAddIcon />
        </button>
      </div>
    </div>
    <div
      class="bg-white w-[calc(100%-40px)] absolute bottom-[-40px] shadow-lg rounded-[14px] min-h-[80px] left-[calc(20px)] p-[12px] flex justify-around items-center"
    >
      <div class="flex flex-col items-center">
        <div class="text-xl placeholder:font-semibold">
          {{ list?.false?.length || 0 }}
        </div>
        <div class="text-[12px] mt-[2px] text-[#d1d2d6]">Todo</div>
      </div>
      <div class="flex flex-col items-center">
        <div class="text-xl font-semibold">{{ list?.true?.length || 0 }}</div>
        <div class="text-[12px] mt-[2px] text-[#d1d2d6]">Done</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: ["date", "openModal", "list"],
  setup() {
    return {
      dayjs,
    };
  },
  methods: {
    getUser: function () {
      return window.localStorage.getItem("user");
    },
  },
};
</script>

<style></style>
