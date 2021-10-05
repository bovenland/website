<template>
  <ol>
    <li
      v-for="(child, index) of children"
      :key="index"
      v-bind:class="'folddown-' + child.foldDown"
    >
      <div class="fold-down-menu-button" v-on:click="foldDown(child)">
        <FoldDown v-bind:active="child.foldDown">
          <label>Hoofdstuk {{ child.index }}</label>
          <h2>{{ child.title }}</h2>
        </FoldDown>
      </div>

      <div class="description">
        {{ child.description }}
      </div>

      <!-- Slider main container -->
      <div
        v-if="child.segments"
        :id="'folddown-swiper-' + child.index"
        class="swiper folddown-swiper"
      >
        <!-- Additional required wrapper -->
        <div
          class="swiper-wrapper"
          :style="
            'min-width: ' +
            (child.segments.length * 128 + (child.segments.length - 1) * 12) +
            'px;'
          "
        >
          <!-- Slides -->
          <div class="swiper-slide">
            <div
              v-for="(segment, segmentIndex) of child.segments"
              :key="segmentIndex"
            >
              <SquareButton
                v-bind:to="
                  'hoofdstukken-' + child.to.name + '-' + segment.to.name
                "
                v-bind:small="child.index + '.' + (segmentIndex + 1)"
                v-bind:label="segment.title"
                v-bind:icon="segment.title"
                v-bind:class="segment.color"
                iconColor="white"
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  </ol>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";
ol {
  list-style: none;

  > li {
    h2 {
      color: $pink;
      font-size: 20px;
    }
    label {
      color: $label-color;
    }

    background-color: $white;
    transition: background-color 0.6s linear;
    .swiper-slide {
      max-height: 128px;
      transition: max-height 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    div.description {
      max-height: 100vh;
      transition: max-height 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    &:not(.folddown-visible) {
      background-color: $light-gray;
      .swiper-slide {
        overflow: hidden;
        max-height: 0px;
      }
      div.description {
        overflow: hidden;
        max-height: 0;
      }
    }
  }

  > li:not(.folddown-visible) + li:not(.folddown-visible) {
    border-top: 1px solid $border-color;
  }

  .folddown-swiper .swiper-slide {
    > div {
      float: left;
      margin-right: 12px;
      &:last-child {
        margin-right: 0;
      }
    }
    &:after {
      content: "";
      display: table;
      clear: both;
    }
  }
}
</style>

<style lang="scss">
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";
div.fold-down-menu-button {
  cursor: pointer;
  position: relative;
  padding-right: 30px;
  svg {
    position: absolute;
    right: 13px;
    @include calc("top", "50% - 12px");
    &.active {
      @include opacity(0.25);
    }
  }
}
</style>

<script>
import FoldDown from "./../buttons/FoldDown";
import SquareButton from "./../buttons/Square";
export default {
  props: ["children"],
  components: {
    FoldDown,
    SquareButton,
  },
  methods: {
    foldDown: function (child) {
      if (child.foldDown == "visible") {
        child.foldDown = "hidden";
      } else {
        child.foldDown = "visible";
      }
    },
  },
  mounted: function () {
    this.swiper = new Swiper(".swiper", {
      // Optional parameters
      direction: "horizontal",
      slidesPerView: "auto",
      freeMode: true,
    });
  },

  beforeDestroy() {
    // Destory the swipers
    if (!this.children) return;
    this.children.forEach((child) => {
      var elem = document.querySelector("#folddown-swiper-" + child.index);
      if (elem && elem.swiper) {
        elem.swiper.destroy();
      }
    });
  },
};
</script>
