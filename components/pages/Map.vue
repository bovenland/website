<template>
  <div class="page map-page">
    <SegmentsMenu
      minimal="true"
      class="minimal"
      v-bind:chapter="chapter"
      v-bind:segment="segment"
      v-bind:segments="segments"
    />
    <div class="map-container">
      <div class="map">
        <slot name="map"></slot>
      </div>
      <slot />

      <template v-if="hasOverlay">
        <div class="overlay">
          <slot name="overlay"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import structure from "/structure.js";
import SegmentsMenu from "./../menu/SegmentsMenu";

export default {
  data: function () {
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
    SegmentsMenu
  },
  computed: {
    hasOverlay: function () {
      return this.$slots.overlay
    }
  }
}
</script>

<style scoped>
.map-container {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.map {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
}

.map > * {
  background-color: #222429;
  width: 100%;
  height: 100%;
}

.overlay {
  pointer-events: none;

  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 400px 1fr;
  grid-template-rows: 1fr;

  gap: 10px 10px;
  padding: 10px;

  grid-template-areas:
    ". box button";
  align-content: center;
  align-items: end;
  justify-items: start;
}

@media screen and (max-width: 1140px) {
  .overlay {
    padding-bottom: 30px;
  }
}

@media screen and (max-width: 640px) {
  .overlay {
    padding-bottom: 40px;

    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);

    grid-template-areas:
      "button"
      "box";

    align-content: end;
    justify-items: end;
  }
}

.segments-menu {
  position: absolute;
  top: 28px;
  left: 36px;
  z-index: 101;
}

</style>
