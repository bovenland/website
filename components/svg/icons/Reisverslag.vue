<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
    <path
      :class="color"
      d="M47.999,1.5,17.18,12.717.78,41.12l5.7,32.3L31.6,94.5H64.4L89.52,73.418l5.7-32.3-16.4-28.4Z"
    />
  </svg>
</template>

<script>
export default {
  props: ["color"],
};
</script>