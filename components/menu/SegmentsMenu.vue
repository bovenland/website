<template>
  <div v-bind:class="'segments-menu segments-menu-' + visible">
    <div
      v-if="segment"
      v-bind:class="'current ' + segment.color"
      v-on:click="toggleMenu()"
    >
      <component v-bind:is="segment.icon" v-bind:color="segment.color" />
      <h3 v-html="segment.title"></h3>
      <svg
        class="triangle"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M10,7l5,5-5,5Z" />
      </svg>
    </div>

    <ul class="segments-menu-options">
      <li
        v-for="(segment, index) of segments"
        :key="index"
        v-bind:class="segment.color"
      >
        <nuxt-link
          :to="{ name: `hoofdstukken-${chapter.to.name}-${segment.to.name}` }"
        >
          <component v-bind:is="segment.icon" v-bind:color="segment.color" />
          <span v-html="segment.title"></span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Kaart from "./../svg/icons/Kaart";
import Data from "./../svg/icons/Data";
import Reisverslag from "./../svg/icons/Reisverslag";
import Verbeelding from "./../svg/icons/Verbeelding";

export default {
  data: function () {
    return { visible: false };
  },
  props: ["chapter", "segment", "segments"],
  components: {
    Kaart,
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
  // position: relative;
  padding: 0.5rem 0 1.6rem 0;
  .current {
    cursor: pointer;
    position: relative;
    border-bottom: 2px solid $white;
    h3 {
      padding-bottom: 8px;
      padding-left: 36px;
    }
    svg.icon {
      top: 2px;
      left: 0;
      position: absolute;
    }
    &.red {
      color: $red;
      border-color: $red;
      svg.triangle {
        fill: $red;
      }
    }
    &.green {
      color: $green;
      border-color: $green;
      svg.triangle {
        fill: $green;
      }
    }
    &.aqua {
      color: $aqua;
      border-color: $aqua;
      svg.triangle {
        fill: $aqua;
      }
    }
    &.blue {
      color: $blue;
      border-color: $blue;
      svg.triangle {
        fill: $blue;
      }
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
    background-color: $light-gray;
    position: absolute;
    width: 100%;
    z-index: 3;
    max-height: 0px;
    transition: max-height 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    overflow: hidden;
    li {
      margin: 0 0.75rem;
      &:first-child {
        margin-top: 0.75rem;
      }
      &:last-child {
        margin-bottom: 0.75rem;
      }
      a,
      a.nuxt-link {
        white-space: nowrap;
        display: inline-block;
        width: 100%;
        margin-left: -0.75rem;
        padding: 0.25rem 0 0.25rem 0.75rem;
        @include calc("width", "100% + 1.5rem");
        text-decoration: none;
      }
    }
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

  &.minimal {
    background-color: transparent;
    width: 200px;
    transition: width 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    &.segments-menu-hidden {
      width: 26px;
    }
    .current {
      height: 36px;
      .triangle,
      h3 {
        display: none;
      }
    }
  }
}
</style>

<style lang="scss">
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";
.segments-menu {
  .current svg {
    width: 26px;
    height: 26px;
  }
  ul.segments-menu-options li svg {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }
  .segments-menu-options {
    a:hover,
    a.nuxt-link-active {
      color: $white;
      svg path,
      svg path.red,
      svg path.green,
      svg path.blue,
      svg path.aqua {
        fill: $white;
      }
    }
    li.red {
      color: $red;
      a:hover,
      a.nuxt-link-active {
        background-color: $red;
      }
    }
    li.green {
      color: $green;
      a:hover,
      a.nuxt-link-active {
        background-color: $green;
      }
    }
    li.blue {
      color: $blue;
      a:hover,
      a.nuxt-link-active {
        background-color: $blue;
      }
    }
    li.aqua {
      color: $aqua;
      a:hover,
      a.nuxt-link-active {
        background-color: $aqua;
      }
    }
  }
}
</style>
