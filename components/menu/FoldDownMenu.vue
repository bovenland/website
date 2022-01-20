<template>
  <ol>
    <li
      v-for="(child, index) of children"
      :key="index"
      v-bind:class="
        'folddown-' + child.foldDown + ' collapsible-' + collapsible
      "
    >
      <div
        class="fold-down-menu-button"
        v-on:click="foldDown(child, collapsible)"
      >
        <FoldDown :active="child.foldDown">

          <label>Hoofdstuk {{ child.index }}</label>
          <h3 v-html="child.title"></h3>
        </FoldDown>
      </div>

      <div class="description">
        <slot :name="child.to.name"></slot>
      </div>

      <!-- Slider main container -->
      <div
        v-if="child.segments"
        :id="'folddown-swiper-' + child.index"
        class="swiper folddown-swiper"
      >
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
          <!-- Slides -->
          <!-- <div class="swiper-slide"> -->
          <div
            v-for="(segment, segmentIndex) of child.segments"
            :key="segmentIndex"
          >
            <SquareButton
              :to="'hoofdstukken-' + child.to.name + '-' + segment.to.name"
              :label="child.index + '.' + (segmentIndex + 1)"
              :title="segment.title"
              :icon="segment.icon"
              :class="segment.color"
              iconColor="white"
            />
          </div>
        </div>
        <!-- </div> -->
      </div>
    </li>
  </ol>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";
ol {
  list-style: none;
  margin: 0 -1.25rem 2rem -1.25rem;

  > li {
    padding: 0.4rem 1.25rem;

     h3 {
      margin: 1rem 1rem 1rem 0;
      color: $pink;
    }
    label {
      color: $label-color;
    }

    background-color: $white;
    transition: background-color 0.6s linear;
    .swiper-slide {
      max-height: 166px;
      transition: max-height 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    div.description {
      transition: max-height 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
      p {
        margin-top: 30px;
        margin-bottom: 24px;
      }
    }
    &:not(.folddown-visible) {
      background-color: $light-gray;
      .folddown-swiper {
        margin-bottom: 0;
      }
      .swiper-slide {
        overflow: hidden;
        max-height: 0px;
      }
      div.description {
        overflow: hidden;
        max-height: 0;
      }
    }
    &.folddown-visible {
      h3,
      label {
        // padding-left: 124px;
      }
    }
    &:not(.collapsible-false) {
      div.description {
        max-height: 100vh;
      }
    }
  }

  > li:not(.folddown-visible) + li:not(.folddown-visible) {
    border-top: 1px solid $border-color;
  }

  .folddown-swiper {
    position: relative;
    padding-left: 2rem;
    margin: 0 -2rem;
    @include calc("width", "100% + 4rem");
    margin-bottom: 48px;
    .swiper-slide {
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

  @media screen and (max-width: 400px) {
    .folddown-swiper {
      padding-left: 0;
    }
  }
}

.swiper-wrapper > div {
  @include aspect-ratio(1, 1);
  @include calc("width", "33.333334% - 19px");
  margin-right: 12px;

  @media screen and (max-width: 400px) {
    @include calc("width", "33.333334% + 0px");
    margin-right: 6px;
    &:last-child {
      margin-right: 0;
    }
  }

  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
    right: -2px;
    width: 32px;
    height: 32px;
    @include calc("top", "50% - 10px");
    &.active {
      @include opacity(0.25);
    }
  }
}
.collapsible-false div.fold-down-menu-button {
  cursor: initial;
  padding-right: 0;
  svg {
    display: none;
  }
}
</style>

<script>
import FoldDown from "./../buttons/FoldDown";
import SquareButton from "./../buttons/Square";

export default {
  props: ["children", "collapsible"],
  components: {
    FoldDown,
    SquareButton
  },
  methods: {
    foldDown: function (child, collapsible = true) {
      console.log(collapsible);
      if (
        child.foldDown == "visible" &&
        collapsible != "0" &&
        collapsible != "false"
      ) {
        child.foldDown = "hidden";
      } else {
        child.foldDown = "visible";
      }
    },
  },
  mounted: function () {
    if (this.$el.querySelectorAll(".swiper").length < 1) return;
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
