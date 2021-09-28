<template>
  <ol>
    <li
      v-for="(child, index) of children"
      :key="index"
      v-bind:class="'folddown-' + child.foldDown"
    >
      <div class="fold-down-menu-button" v-on:click="foldDown(child)">
        <FoldDown v-bind:active="child.foldDown">
          <label>Hoofdstuk {{ child.index }}</label>
          <h2>{{ child.title }}</h2>
        </FoldDown>
      </div>

      <div class="description">
        {{ child.description }}
      </div>

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
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";
ol {
  list-style: none;

  > li {
    h2 {
      color: $pink;
      font-size: 20px;
    }
    label {
      color: $label-color;
    }

    background-color: $white;
    transition: background-color 0.6s linear;
    ul {
      max-height: 100vh;
      transition: max-height 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    div.description {
      max-height: 100vh;
      transition: max-height 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    &:not(.folddown-visible) {
      background-color: $light-gray;
      ul {
        overflow: hidden;
        max-height: 0px;
      }
      div.description {
        overflow: hidden;
        max-height: 0;
      }
    }
  }

  > li:not(.folddown-visible) + li:not(.folddown-visible) {
    border-top: 1px solid $border-color;
  }
}
</style>

<style lang="scss">
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";
div.fold-down-menu-button {
  cursor: pointer;
  position: relative;
  padding-right: 30px;
  svg {
    position: absolute;
    right: 13px;
    @include calc("top", "50% - 12px");
    &.active {
      @include opacity(0.25);
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
