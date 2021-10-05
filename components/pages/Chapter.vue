<template>
  <div class="chapter">
    <!-- Segmenten menu -->
    <SegmentsMenu v-bind:chapter="chapter" v-bind:segments="segments" />

    <div class="container column chapter">
      <slot />
    </div>
  </div>
</template>

<script>
import structure from "/structure.js";
import SegmentsMenu from "./../menu/SegmentsMenu";

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
    SegmentsMenu,
  },
};
</script>
