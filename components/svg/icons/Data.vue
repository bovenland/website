<template>
  <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
    <path
      :class="color"
      d="M60.7485,5.5,47.8025,32.343h-.778L35.2475,5.5,15.5115,17.03l16.342,24.649v.779L4.2025,38.54v22.4l28.04-2.528.388.779L15.5115,82.89l19.07,11.31,12.055-26.455h.779L60.5265,94.2l19.514-11.31L62.1975,59.576V58.8l29.6,2.139V38.54l-29.21,3.918v-.779l17.453-24.87Z"
    />
  </svg>
</template>

<script>
export default {
  props: ["color"],
};
</script>
