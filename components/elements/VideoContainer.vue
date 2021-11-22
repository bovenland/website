<template>
  <div class="video-container">
    <!-- TODO: make responsive! -->
    <!-- TODO: only play when in viewport -->
    <!-- Deze bestaat ook:
      https://files.boven.land/video/${video}-720.mp4 -->
    <video
      :src="`https://files.boven.land/video/${video}-1080.mp4`"
      autoplay muted loop />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VideoContainer',
  props: {
    video: String
  }
}
</script>

<style scoped>
</style>