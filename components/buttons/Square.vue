<template>
  <div>
    <small>{{ small }}</small>
    <label>{{ label }}</label>
    <component v-bind:is="icon" v-bind:color="iconColor" />
  </div>
</template>

<script>
import Cartografie from "./../svg/icons/Cartografie";
import Data from "./../svg/icons/Data";
import Reisverslag from "./../svg/icons/Reisverslag";
import Verbeelding from "./../svg/icons/Verbeelding";

export default {
  props: ["small", "label", "icon", "iconColor"],
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
  width: 128px;
  height: 128px;
  position: relative;

  color: $white;
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
  }
}
</style>
