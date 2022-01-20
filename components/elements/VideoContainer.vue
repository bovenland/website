<template>
  <div class="video-container">
    <div class="element-max-width">
      <Video :id="id" />
      <div class="video-description">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Video from "./Video.vue";

export default {
  name: "VideoContainer",
  components: {
    Video,
  },
  props: {
    id: String,
  },
};
</script>

<style scoped></style>
