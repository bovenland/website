<template>
  <div class="video-container">
    <Video :id="id" />
    <slot />
  </div>
</template>

<script>
import Video from './Video.vue'

export default {
  name: 'VideoContainer',
  components: {
    Video
  },
  props: {
    id: String
  }
}
</script>

<style scoped>
</style>