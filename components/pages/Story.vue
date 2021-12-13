<template>
  <div class="page story-page">
    <div class="container column story">
      <!-- Segmenten menu -->
      <SegmentsMenu
        v-bind:chapter="chapter"
        v-bind:segment="segment"
        v-bind:segments="segments"
      />

      <div id="path-handle"></div>
      <svg
        id="path"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="1024"
        viewBox="0 0 32 1024"
      >
        <path
          class="background"
          d="M20,0S21.381,115.2381,13.04762,162.85714C-6.58223,275.02772,38.89018,261.686,23.73318,440.508S2.33333,649.7619,4.71429,692.61905c0,0,19.04761,113.09524,21.42857,136.90476C27.997,848.06523,16.61905,993.80952,16,1024"
        />
        <path
          class="progress"
          d="M20,0S21.381,115.2381,13.04762,162.85714C-6.58223,275.02772,38.89018,261.686,23.73318,440.508S2.33333,649.7619,4.71429,692.61905c0,0,19.04761,113.09524,21.42857,136.90476C27.997,848.06523,16.61905,993.80952,16,1024"
        />
      </svg>

      <slot />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss">
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";

div.story-page {
  #path-handle {
    overflow: hidden;
    width: 100%;
    position: relative;
    height: 0px;
  }
  svg#path {
    position: fixed;
    top: 0;

    @include calc("left", "50% - 450px");
    @media screen and (max-width: 980px) {
      left: 24px;
    }
    width: 32px;
    height: 100vh;
    fill: none;
    z-index: 0;

    path.progress {
      stroke: $red;
      stroke-dasharray: 0 0 1200px;
    }
    path.background {
      stroke: $border-color;
    }
    stroke-width: 5px;
  }

  label {
    color: $label-color;
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
        color: $red;
      }
      > h2,
      > h3,
      > h4 {
        color: $red;
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
    }
  }
  .segments-menu {
    margin: 0 0 0 54px;
    max-width: $column-width;
  }

  div.photos-element,
  div.minimap-container,
  div.video-container {
    margin: 4rem -2rem;
    background-color: $darker-light-gray;
    position: relative;
    z-index: 2;
    .element-max-width {
      margin: 0 auto;
      max-width: 1344px;
    }
  }

  div.photos-element,
  div.video-container {
    background-color: $yellow;
    .photos-description,
    .video-description {
      h3,
      p {
        margin: 0 0 12px 0;
        padding: 18px 36px 0 36px;
      }
      p {
        padding-top: 0;
      }
    }
    .video-description {
      padding-bottom: 18px;
    }

    .swiper-button-next,
    .swiper-button-prev {
      color: $yellow;
    }

    @media screen and (min-width: 1362px) {
      .swiper-button-prev,
      .swiper-button-next {
        color: $black;
      }
    }

    @media screen and (min-width: 1500px) {
      .swiper-button-prev {
        @include calc("left", "50% - 736px");
      }
      .swiper-button-next {
        @include calc("right", "50% - 736px");
      }
    }

    .swiper-pagination-bullet-active {
      background-color: $black;
    }
    .swiper-pagination-bullet:not(.swiper-pagination-bullet-active) {
      background-color: $white;
      @include opacity(1);
    }
    .swiper-slide {
      img {
        margin: 0 auto;
      }
      p {
        max-width: $column-width;
        margin: 0;
        padding: 8px 36px 0px 36px;
      }
    }
  }

  div.minimap-container {
    min-height: 240px;
    max-width: $column-width;
    @media screen and (min-width: $column-width+1) {
      margin: 1rem auto;
    }
    overflow: hidden;
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

  methods: {
    handleScroll() {
      // get the offset position of the pathHandle
      var top = 0;
      var bottom =
        document.body.clientHeight -
        window.innerHeight -
        this.footerElement.clientHeight;
      if (this.pathHandleElement) {
        top = this.pathHandleElement.getBoundingClientRect().top;
      }
      if (this.pathElement) {
        if (top >= 0) {
          this.pathElement.style.top =
            this.pathHandleElement.getBoundingClientRect().top -
            this.pathHandleElement.parentNode.getBoundingClientRect().top;
          this.pathElement.style.position = "absolute";
        } else {
          this.pathElement.style.top = 0;
          this.pathElement.style.position = "fixed";
        }
        if (window.scrollY >= bottom) {
          this.pathElement.style.height =
            window.innerHeight + (bottom - window.scrollY) + "px";
        } else {
          this.pathElement.style.height = "100vh";
        }
      }

      if (this.progressElement) {
        var progress = window.scrollY / bottom;
        var dasharray = "0 " + progress * 1024.0 + "px 1200px";
        this.progressElement.style.strokeDasharray = dasharray;
      }
    },
  },

  mounted: function () {
    this.footerElement = document.querySelector("footer");
    this.pathHandleElement = document.querySelector("#path-handle");
    this.pathElement = document.querySelector("#path");
    if (this.pathElement) {
      this.progressElement = this.pathElement.querySelector(".progress");
    }
    this.handleScroll();
  },

  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleScroll);
  },

  components: {
    SegmentsMenu,
    Footer,
  },
};
</script>
