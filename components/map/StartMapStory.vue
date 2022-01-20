<template>
  <button @click="$emit('click')">
    <div class="icon">▶</div>
    <!-- <svg class="start"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <path d="M10,7l5,5-5,5Z" />
    </svg> -->
    <div>Start</div>
  </button>
</template>

<script>
export default {
  name: 'StartMapStory'
}
</script>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/button.scss";

button {
  grid-area: button;

  background-color: $green;
  color: white;
  pointer-events: all;

  border-radius: 70px;
  width: 70px;
  height: 70px;

  font-weight: bold;
}

.icon {
  font-size: 1.5em;
}
</style>
