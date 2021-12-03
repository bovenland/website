<template>
  <div class="top-menu">
    <transition name="slide">
      <div v-if="isPanelOpen" class="top-menu-panel">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    isPanelOpen() {
      return this.$store.state.menu.isHamburgerActive;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";

.top-menu-panel {
  overflow-y: auto;
  background-color: $aqua;
  position: fixed;
  right: 0;
  top: 0;
  max-height: 100vh;
  height: 100vh;
  z-index: 999;
  width: 400px;
  @media screen and (max-width: $column-width) {
    width: 100vw;
  }

  > section {
    padding: 4rem 2rem 2rem 2rem;
  }

  &.slide-enter-active,
  &.slide-leave-active {
    @media screen and (max-width: $column-width) {
      transition: max-height 0.3s ease-out 0s top 0.5s ease-in 0s;
    }
    @media screen and (min-width: $column-width+1) {
      transition: right 0.3s ease-out 0s width 0.5s ease-in 0s;
    }
  }

  &.slide-enter,
  &.slide-leave-to {
    @media screen and (max-width: $column-width) {
      top: -60px;
      max-height: 0px;
      transition: max-height 0.3s ease-out 0s top 0.5s ease-in 0s;
    }
    @media screen and (min-width: $column-width+1) {
      right: -60px;
      width: 0px;
      transition: right 0.8s ease-out 0s width 1s ease-in 0s;
    }

    overflow: hidden;
  }
}
</style>
