<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      :stroke="fill"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path
        d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4 7h4m-4 5h4m-8-5h.01M8 16h.01"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: "TodoIcon",
  props: ["fill"],
};
</script>

<style></style>
