<template>
  <div>
    <nuxt-link :to="{ name: to }">
      <label>{{ label }}</label>
      <h3>{{ title }}</h3>
      <component v-bind:is="icon" v-bind:color="iconColor" />
    </nuxt-link>
  </div>
</template>

<script>
import Cartografie from "./../svg/icons/Cartografie";
import Data from "./../svg/icons/Data";
import Reisverslag from "./../svg/icons/Reisverslag";
import Verbeelding from "./../svg/icons/Verbeelding";

export default {
  props: ["to", "title", "label", "icon", "iconColor"],
  components: {
    Cartografie,
    Data,
    Reisverslag,
    Verbeelding,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";

div {
  width: 166px;
  height: 166px;
  position: relative;
  overflow: hidden;
  display: block;
  color: $white;

  label {
    margin-top: 2px;
    padding: 0 12px;
  }
  h3 {
    padding: 10px;
  }

  a,
  a:link,
  a:visited,
  a.nuxt-link-active,
  a.nuxt-link-active:link,
  a.nuxt-link-active:visited {
    color: inherit;
    text-decoration: none;
  }

  &.pink {
    background-color: $pink;
  }
  &.blue {
    background-color: $blue;
  }
  &.aqua {
    background-color: $aqua;
  }
  &.green {
    background-color: $green;
  }
  &.red {
    background-color: $red;
  }
  &.yellow {
    background-color: $yellow;
  }
  &.black {
    background-color: $black;
  }
  &.white {
    fill: $black;
    background-color: $white;
  }

  svg {
    @include opacity(0.2);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 16px;
    @include calc("width", "100% - 32px");
    @include calc("height", "100% - 32px");
  }
}
</style>
