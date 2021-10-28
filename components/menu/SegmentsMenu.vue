<template>
  <div v-bind:class="'segments-menu segments-menu-' + visible">
    <div
      v-if="segment"
      v-bind:class="'current ' + segment.color"
      v-on:click="toggleMenu()"
    >
      <component v-bind:is="segment.title" v-bind:color="segment.color" />
      <h3>{{ segment.title }}</h3>
      <svg
        class="triangle"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M10,7l5,5-5,5Z" />
      </svg>
    </div>

    <ul class="segments-menu-options">
      <li v-for="(segment, index) of segments" :key="index">
        <nuxt-link
          :to="{ name: `hoofdstukken-${chapter.to.name}-${segment.to.name}` }"
        >
          <component v-bind:is="segment.title" v-bind:color="segment.color" />
          {{ segment.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Cartografie from "./../svg/icons/Cartografie";
import Data from "./../svg/icons/Data";
import Reisverslag from "./../svg/icons/Reisverslag";
import Verbeelding from "./../svg/icons/Verbeelding";

export default {
  data: function () {
    return { visible: false };
  },
  props: ["chapter", "segment", "segments"],
  components: {
    Cartografie,
    Data,
    Reisverslag,
    Verbeelding,
  },
  beforeMount: function () {
    this.visible = "hidden";
  },
  methods: {
    toggleMenu: function () {
      if (!this.visible || this.visible == "hidden") {
        this.visible = "visible";
      } else {
        this.visible = "hidden";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";

.segments-menu {
  background-color: $white;
  position: relative;
  .current {
    cursor: pointer;
    position: relative;
    border-bottom: 2px solid $white;
    &.red {
      color: $red;
      border-color: $red;
    }
    &.green {
      color: $green;
      border-color: $green;
    }
    &.aqua {
      color: $aqua;
      border-color: $aqua;
    }
    &.blue {
      color: $blue;
      border-color: $blue;
    }

    svg.triangle {
      position: absolute;
      right: 0;
      @include calc("top", "50% - 12px");
      width: 24px;
      height: 24px;
      transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
      transform: rotate(0deg);
    }
  }
  .segments-menu-options {
    background-color: $white;
    position: absolute;
    width: 100%;
    z-index: 2;
    max-height: 0px;
    transition: max-height 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    overflow: hidden;
  }
  &.segments-menu-visible {
    .segments-menu-options {
      max-height: 180px;
    }
    .current {
      svg.triangle {
        transform: rotate(90deg);
      }
    }
  }
}
</style>

<style lang="scss">
.segments-menu {
  .current svg,
  ul.segments-menu-options li svg {
    width: 20px;
    height: 20px;
  }
}
</style>
