<template>
  <svg class="icon" xmlns="http://www.w3.org/2000/svg" w viewBox="0 0 96 96">
    <path :class="color" d="M48,8.5,1.235,89.5,48,76.726,94.765,89.5Z" />
  </svg>
</template>

<script>
export default {
  props: ["color"],
};
</script>
