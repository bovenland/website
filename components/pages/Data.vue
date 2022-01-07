<template>
  <div class="page data-page">
    <div class="container column data">
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

<style scoped lang="scss">
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";

div.data-page {
  label {
    color: $label-color;
  }

  ul, ol {
    list-style: initial;
    padding-left: 2em;
  }

  .container {
    max-width: 100vw !important;

    section {
      position: relative;
      z-index: 2;
      > h1,
      > h2,
      > h3,
      > h4,
      > label,
      > p,
      > ul,
      > ol,
      > figure,
      > img {
        display: block;
        padding: 0 0 0 54px;
        margin-left: auto;
        margin-right: auto;
        max-width: $column-width;
      }
      p {
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
      > h1 {
        color: $blue;
      }
      > h2,
      > h3,
      > h4 {
        color: $blue;
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
    }
  }
  .segments-menu {
    margin: 0 0 0 54px;
    max-width: $column-width;
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
