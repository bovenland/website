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
  left: 0;
  top: 0;
  max-height: 100vh;
  height: 100vh;
  z-index: 999;
  width: 100vw;

  > section {
    padding: 4rem 2rem 2rem 2rem;
  }

  &.slide-enter-active,
  &.slide-leave-active {
    transition: max-height 0.3s ease-out 0s top 0.5s ease-in 0s;
  }

  &.slide-enter,
  &.slide-leave-to {
    transition: max-height 0.8s ease-out 0s top 1s ease-in 0s;
    top: -60px;
    max-height: 0px;
    overflow: hidden;
  }
}
</style>
