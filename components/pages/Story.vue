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
    background-color: $darker-light-gray;
  }

  div.minimap-container {
    position: relative;
    svg.minimap {
      display: block;
      margin: 0 auto;
    }
    color: $green;
    label {
      color: $green;
    }
    svg.icon {
      position: absolute;
      fill: $green;
    }
    &.dark {
      label {
        display: none;
      }
      svg.icon {
        fill: $white;
      }
      color: $white;
      background-color: $green;
    }
    &.map-bottom {
      h3 {
        padding: 24px 74px 0 74px;
      }
      p {
        margin: 0.5rem 0;
        padding: 0 24px 0 100px;
      }
      svg.icon {
        width: 22px;
        height: 22px;
        left: 36px;
        top: 26px;
      }
      svg.minimap {
        width: 210px;
        height: 210px;
        padding-bottom: 1rem;
      }
    }
    &.map-right {
      padding: 3rem 0 2rem 0;
      label,
      h3,
      p {
        margin: 0;
        padding: 18px 130px 0 36px;
      }
      svg.icon {
        width: 142px;
        height: 142px;
        left: -40px;
        @include opacity(0.2);
      }
      svg.minimap {
        width: 200px;
        height: 200px;
        position: absolute;
        @include calc("top", "50% - 100px");
        right: -90px;
      }
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
