<template>
  <div>
    <svg
      :class="activeClass"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M10,7l5,5-5,5Z" />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["active"],
  computed: {
    activeClass() {
      if (this.$props.active == "visible") {
        return "active";
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
svg {
  width: 24px;
  height: 24px;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: rotate(0deg);
  &.active {
    transform: rotate(90deg);
  }
}
</style>
