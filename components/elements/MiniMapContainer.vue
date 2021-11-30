<template>
  <div class="minimap-container">
    <Cartografie />
    <label>Cartografie</label>
    <slot />
    <MiniMap :chapter="chapter" :id="id" />
  </div>
</template>

<script>
import Cartografie from "../svg/icons/Cartografie.vue";
import MiniMap from "./MiniMap.vue";

export default {
  name: "MiniMapContainer",
  components: {
    MiniMap,
    Cartografie,
  },
  props: {
    chapter: String,
    id: String,
  },
};
</script>

<style scoped></style>
