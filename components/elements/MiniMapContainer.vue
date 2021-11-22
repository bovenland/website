<template>
  <div class="minimap-container">
    <MiniMap :chapter="chapter" :id="id" />
    <slot />
  </div>
</template>

<script>
import MiniMap from "./MiniMap.vue"

export default {
  name: 'MiniMapContainer',
  components: {
    MiniMap
  },
  props: {
    chapter: String,
    id: String
  }
}
</script>

<style scoped>

</style>
