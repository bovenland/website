<template>
  <div>
    <Header color="red" />

    <!-- Intro afbeelding -->
    <div class="header-image story-header-image">
      <nuxt-img src="/img/homepage/wadden.jpg" />
    </div>

    <!-- Segmenten menu -->
    <SegmentsMenu
      v-bind:chapter="chapter"
      v-bind:segment="segment"
      v-bind:segments="segments"
    />

    <div class="container column story">
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
      segment: segment,
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

.story-header-image {
  border-top: 4px solid $red;
  width: 100%;
  margin: 0 -0.75rem;
  @include calc("width", "100% + 1.5rem");
}

div.story {
  h1 {
    color: $red;
  }
  p {
    margin: 1rem 0;
  }
}
</style>
