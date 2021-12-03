<template>
  <Box class="item story">
    <VNode :node="item" @updated="updated" />
    <div class="buttons">
      <template v-if="index === undefined">
        <Button class="next" @click="start"
          ><div>Start</div>
          <svg
            class="next"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M10,7l5,5-5,5Z" />
          </svg>
        </Button>
      </template>
      <template v-else>
        <Button class="previous" @click="previous" :disabled="index === 0"
          ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10,7l5,5-5,5Z" />
          </svg>
          <div>Vorige</div></Button
        >
        <label>{{ index + 1 }}/{{ count }}</label>
        <Button class="next" @click="next" :disabled="index === count - 1"
          ><div>Volgende</div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10,7l5,5-5,5Z" /></svg
        ></Button>
      </template>
    </div>
  </Box>
</template>

<script>
import VNode from "./VNode.vue";
import Box from "./Box.vue";

export default {
  name: "MapStory",
  components: {
    VNode,
    Box,
  },
  props: {
    map: Object,
    items: Array,
    startIndex: {
      type: Number,
      default: undefined,
    },
  },
  data: function () {
    return {
      index: this.startIndex,
    };
  },
  computed: {
    item: function () {
      return this.items[this.index || 0];
    },
    count: function () {
      return this.items.length;
    },
  },
  methods: {
    start: function () {
      this.index = 0;
      this.flyTo(this.index);
    },
    updated: function () {
      this.flyTo(this.index);
    },
    flyTo: function (index) {
      if (this.map && index >= 0) {
        const location = this.getLocation(index);

        const padding = 10;
        const storyBox = document.querySelector(".story");
        const leftPadding = storyBox.getBoundingClientRect().right + padding;

        // https://docs.mapbox.com/mapbox-gl-js/api/properties/#paddingoptions
        this.map.fitBounds(location.bounds, {
          linear: false,
          essential: true,
          padding: {
            top: padding,
            bottom: padding,
            left: leftPadding,
            right: padding,
          },
        });
      }
    },
    getLocation: function (index) {
      const item = this.items[index];
      if (item && item.elm) {
        const dataset = item.elm.dataset;
        if (dataset.layer && dataset.bounds) {
          return {
            layer: dataset.layer,
            bounds: JSON.parse(dataset.bounds),
          };
        }
      }
    },
    previous: function () {
      this.index = Math.max(this.index - 1, 0);
    },
    next: function () {
      this.index = Math.min(this.index + 1, this.count - 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";

.story-location {
  display: none;
}
.item {
  z-index: 1000;
  position: relative;

  margin-top: 6rem;
  grid-area: left;
  padding: 1em;
  border-color: black;
  border-width: 1px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  background-color: $green;
  pointer-events: all;
  border-radius: 5px;
  width: 300px;
  min-height: 132px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &:last-child {
    margin-bottom: 0;
  }
  button {
    position: relative;
    padding: 0.35rem 0.6rem;
    background-color: $white;
    border-radius: 4px;
    border: 2px solid $border-color;
    color: $green;

    svg {
      fill: $green;
      width: 24px;
      height: 24px;
      position: absolute;
      @include calc("top", "50% - 12px");
    }
    &.next {
      padding-right: 1.25rem;
      svg {
        right: 0;
      }
    }
    &.previous {
      padding-left: 1.25rem;
      svg {
        transform: rotate(180deg);
        left: 0;
      }
    }
    &:disabled {
      @include opacity(0.4);
    }
  }
}
.buttons > *:not(:last-child) {
  margin-right: 0.5rem;
}
</style>

<style lang="scss">
.map-page .box {
  p {
    margin: 1rem 0;
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
