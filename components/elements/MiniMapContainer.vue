<template>
  <div class="minimap-container">
    <Kaart />
    <label>Cartografie</label>
    <slot />
    <MiniMap :chapter="chapter" :id="id" />
  </div>
</template>

<script>
import Kaart from "../svg/icons/Kaart.vue";
import MiniMap from "./MiniMap.vue";

export default {
  name: "MiniMapContainer",
  components: {
    MiniMap,
    Kaart,
  },
  props: {
    chapter: String,
    id: String,
  },
};
</script>

<style scoped></style>
