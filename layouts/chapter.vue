<template>
  <div class="chapter">
    <Header color="pink" />

    <!-- Segmenten menu -->
    <SegmentsMenu
      v-bind:chapter="chapter"
      v-bind:segment="segment"
      v-bind:segments="segments"
    />

    <div class="container columnr chapter">
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
    structure.chapters.forEach((c) => {
      if (c.to) {
        if ("hoofdstukken-" + c.to.name == this.$route.name) {
          chapter = c;
        }
      }
    });
    if (chapter == null) {
      return this.$nuxt.error({ statusCode: 404, message: "Page not found" });
    }
    return {
      chapter: chapter,
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
