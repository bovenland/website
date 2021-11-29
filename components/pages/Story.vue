<template>
  <div class="page story-page">
    <div class="container column story">
      <!-- Segmenten menu -->
      <SegmentsMenu
        v-bind:chapter="chapter"
        v-bind:segment="segment"
        v-bind:segments="segments"
      />

      <slot />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss">
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";

div.story-page {
  label {
    color: $label-color;
  }
  .container {
    h1 {
      color: $red;
    }
    p {
      margin: 1rem 0;
    }
    section {
      > h1,
      > label,
      > p {
        padding: 0 0 0 54px;
      }
    }
  }
  .segments-menu {
    margin: 0 0 0 54px;
  }

  div.photos-element,
  div.minimap-container {
    margin: 1rem -2rem;
    background-color: $light-gray;
    &.minimap-container {
      background-color: $green;
    }
  }
}
</style>

<script>
import Footer from "../elements/Footer";

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
    Footer,
  },
};
</script>
