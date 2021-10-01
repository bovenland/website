<template>
  <div>
    <Header color="blue" />

    <!-- Intro afbeelding -->
    <div class="header-image data-header-image">
      <nuxt-img src="/img/homepage/wadden.jpg" />
    </div>

    <!-- Andere segmenten -->
    <SegmentsMenu v-bind:chapter="chapter" v-bind:segments="segments" />

    <div class="container column data">
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import structure from "/structure.js";

import Header from "./../components/elements/Header";
import Footer from "./../components/elements/Footer";
import SegmentsMenu from "./../components/menu/SegmentsMenu";

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
      segement: segment,
      segments: chapter.segments,
    };
  },
  components: {
    Header,
    Footer,
    SegmentsMenu,
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";

.data-header-image {
  border-top: 4px solid $blue;
  width: 100%;
  margin: 0 -0.75rem;
  @include calc("width", "100% + 1.5rem");
}

div.data {
  h1 {
    color: $blue;
  }
  p {
    margin: 1rem 0;
  }
}
</style>
