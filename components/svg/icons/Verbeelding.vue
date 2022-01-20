<template>
  <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
    <path
      :class="color"
      d="M48,1.5,32.731,33.231,1,48.5,32.731,63.769,48,95.5,63.269,63.769,95,48.5,63.269,33.231Z"
    />
  </svg>
</template>

<script>
export default {
  props: ["color"],
};
</script>
