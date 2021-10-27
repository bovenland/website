<template>
  <div class="map-page">
    <div ref="map" class="map">
    </div>
    <!-- Segmenten menu -->
    <SegmentsMenu
      v-bind:chapter="chapter"
      v-bind:segment="segment"
      v-bind:segments="segments"
    />
    <div class="container column chapter">
      <slot />
    </div>
  </div>
</template>

<script>
import structure from "/structure.js";
import SegmentsMenu from "./../menu/SegmentsMenu";

export default {
  data () {
    var chapter = null;
    var segment = null;
    structure.chapters.forEach((c) => {
      if (c.to && chapter == null) {
        if ("hoofdstukken-" + c.to.name == this.$route.name) {
          chapter = c;
        }
      }
      if (chapter == null && c.segments) {
        c.segments.forEach((s) => {
          if (
            "hoofdstukken-" + c.to.name + "-" + s.to.name ==
            this.$route.name
          ) {
            chapter = c;
            segment = s;
          }
        });
      }
    });
    if (chapter == null) {
      return this.$nuxt.error({ statusCode: 404, message: "Page not found" });
    }
    return {
      chapter: chapter,
      segment: segment,
      segments: chapter.segments,
    };
  },
  components: {
    SegmentsMenu,
  },
  mounted: function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVydHNwYWFuIiwiYSI6ImR3dERiQk0ifQ.DLbScmbRohc3Sqv7prfhqw'

    const map = new mapboxgl.Map({
      container: this.$refs.map,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9
    })
  }
};
</script>

<style scoped>
.map {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: pink;
}
</style>
