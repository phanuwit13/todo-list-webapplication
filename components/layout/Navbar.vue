<template>
  <div
    class="flex absolute bottom-0 w-full justify-around h-[50px] items-center shadow-[0_0px_6px_-5px_#000000]"
  >
    <NuxtLink class="flex flex-col items-center gap-[2px]" to="/">
      <div>
        <IconTodoIcon :fill="checkCurrentPath('/').color" />
      </div>
      <div
        class="text-[10px] text-[#d1d2d6]"
        :class="checkCurrentPath('/').class"
      >
        Todo
      </div>
    </NuxtLink>
    <NuxtLink class="flex flex-col items-center gap-[2px]" to="/done">
      <div><IconDoneIcon :fill="checkCurrentPath('/done').color" /></div>
      <div
        class="text-[10px] text-[#d1d2d6]"
        :class="checkCurrentPath('/done').class"
      >
        Done
      </div>
    </NuxtLink>
    <div class="flex flex-col items-center gap-[2px] cursor-pointer" @click="actionService">
      <div><IconLogoutIcon /></div>
      <div class="text-[10px] text-[#d1d2d6]">Logout</div>
    </div>
  </div>
</template>

<script lang="ts">
import actionService from "../../action";

export default {
  setup() {
    return {};
  },
  methods: {
    checkCurrentPath: function (path: string) {
      return this.$router.currentRoute.path === path
        ? { color: "#4f46e5", class: "text-[#4f46e5]" }
        : { color: "#d1d2d6", class: "text-[#d1d2d6]" };
    },
    actionService() {
      actionService.Logout();
    },
  },
};
</script>

<style></style>
