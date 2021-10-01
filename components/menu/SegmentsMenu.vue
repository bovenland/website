<template>
  <ul class="segments-menu">
    <li v-for="(segment, index) of segments" :key="index">
      <nuxt-link
        :to="{ name: `hoofdstukken-${chapter.to.name}-${segment.to.name}` }"
      >
        <component v-bind:is="segment.title" v-bind:color="segment.color" />
        {{ segment.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import Cartografie from "./../svg/icons/Cartografie";
import Data from "./../svg/icons/Data";
import Reisverslag from "./../svg/icons/Reisverslag";
import Verbeelding from "./../svg/icons/Verbeelding";

export default {
  props: ["chapter", "segments"],
  components: {
    Cartografie,
    Data,
    Reisverslag,
    Verbeelding,
  },
};
</script>

<style lang="scss">
ul.segments-menu {
  li {
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
