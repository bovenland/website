<template>
  <div
    id="burger"
    :class="{ active: isHamburgerActive }"
    @click.prevent="Toggle()"
  >
    <slot>
      <button type="button" class="burger-button" title="Menu">
        <span :style="{backgroundColor: color}" class="burger-bar burger-bar--1"></span>
        <span :style="{backgroundColor: color}" class="burger-bar burger-bar--2"></span>
        <span :style="{backgroundColor: color}" class="burger-bar burger-bar--3"></span>
      </button>
    </slot>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: [
    'color'
  ],
  computed: {
    isHamburgerActive() {
      return this.$store.state.menu.isHamburgerActive;
    },
  },
  methods: {
    ...mapMutations({
      Toggle: "menu/Toggle",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";

#burger {
  position: fixed;
  top: 37px;
  right: 30px;
  z-index: 1000;
}

.hidden {
  visibility: hidden;
}

button {
  cursor: pointer;
}

/* remove blue outline */
button:focus {
  outline: 0;
}

.burger-button {
  position: relative;
  height: 30px;
  width: 32px;
  display: block;
  z-index: 999;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  pointer-events: all;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.burger-bar {
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 3px;
  width: auto;
  margin-top: -1px;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    background-color 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.burger-bar--1 {
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
}

.burger-bar--2 {
  transform-origin: 100% 50%;
  transform: scaleX(0.8);
}

.burger-button:hover .burger-bar--2 {
  transform: scaleX(1);
}

.no-touchevents .burger-bar--2:hover {
  transform: scaleX(1);
}

.burger-bar--3 {
  transform: translateY(6px);
}

#burger.active .burger-button {
  transform: rotate(-180deg);
}

#burger.active .burger-bar {
  background-color: #fff;
}

#burger.active .burger-bar--1 {
  transform: rotate(45deg);
}

#burger.active .burger-bar--2 {
  opacity: 0;
}

#burger.active .burger-bar--3 {
  transform: rotate(-45deg);
}
</style>
