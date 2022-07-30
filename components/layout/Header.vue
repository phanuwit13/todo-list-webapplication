<template>
  <div
    class=" z-10 bg-white w-100 flex justify-between h-fit pb-6 pt-7 border-dashed border-b-2 border-gray-300 sticky top-0">
    <div class="flex items-center gap-2">
      <div class="text-4xl font-semibold">{{ dayjs(date).format('DD') }}</div>
      <div class="text-xs">
        <div>{{ dayjs(date).format('dddd') }}</div>
        <div>{{ dayjs(date).format('MMM YYYY') }}</div>
      </div>
    </div>
    <div class="flex items-center gap-3 ">
      <div>
        <button @click="openModal"
          class="flex justify-center items-center bg-fuchsia-400 w-[32px] h-[32px] rounded-full text-white active:bg-fuchsia-600 hover:bg-fuchsia-500">
          <IconAddIcon />
        </button>
      </div>
      <div class="text-base font-semibold">NEW TASK</div>
    </div>
    <img @click="actionService" class="cursor-pointer w-[18px] h-fit absolute bottom-1 right-0" src="../../assets/icon/logout.svg" alt="">
  </div>
</template>

<script>
import dayjs from 'dayjs'
import actionService from '../../action'

export default {
  props: ['date', 'openModal'],
  setup () {
    return {
      dayjs
    }
  },
  methods: {
    actionService () {
      actionService.Logout()
    }
  }

}
</script>

<style>
</style>