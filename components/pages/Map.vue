<template>
  <div class="page map-page">
    <!-- Segmenten menu -->
    <SegmentsMenu
      minimal="true"
      class="minimal"
      v-bind:chapter="chapter"
      v-bind:segment="segment"
      v-bind:segments="segments"
    />
    <div class="container column map">
      <slot />
      <div class="map">
        <slot name="map"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
import structure from "/structure.js";
import SegmentsMenu from "./../menu/SegmentsMenu";

export default {
  data() {
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
};
</script>

<style lang="scss" scoped>
.map-page {
  .map {
    position: absolute;
    background-color: #222429;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .segments-menu {
    position: absolute;
    top: 28px;
    left: 36px;
    z-index: 101;
  }
}
</style>
