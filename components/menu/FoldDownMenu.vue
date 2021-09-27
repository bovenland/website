<template>
  <ol>
    <li
      v-for="(child, index) of children"
      :key="index"
      v-bind:class="'folddown-' + child.foldDown"
    >
      <FoldDown v-bind:active="child.foldDown">
        <div style="cursor: pointer" v-on:click="foldDown(child)">
          <h4>{{ child.index }}</h4>
          <h2>{{ child.title }}</h2>
        </div>
      </FoldDown>
      <ul>
        <li
          v-for="(segment, segmentIndex) of child.segments"
          :key="segmentIndex"
        >
          <SquareButton
            v-bind:to="'hoofdstukken-' + child.to.name + '-' + segment.to.name"
            v-bind:small="child.index + '.' + (segmentIndex + 1)"
            v-bind:label="segment.title"
            v-bind:icon="segment.title"
            v-bind:class="segment.color"
            iconColor="white"
          />
        </li>
      </ul>
    </li>
  </ol>
</template>

<style lang="scss" scoped>
ol {
  list-style: none;

  li {
    ul {
      max-height: 100vh;
      transition: max-height 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    &:not(.folddown-visible) {
      ul {
        overflow: hidden;
        max-height: 0px;
      }
    }
  }
}
</style>

<script>
import FoldDown from "./../buttons/FoldDown";
import SquareButton from "./../buttons/Square";
export default {
  props: ["children"],
  components: {
    FoldDown,
    SquareButton,
  },
  methods: {
    foldDown: function (child) {
      console.log(child.foldDown);
      if (child.foldDown == "visible") {
        child.foldDown = "hidden";
      } else {
        child.foldDown = "visible";
      }
    },
  },
};
</script>
