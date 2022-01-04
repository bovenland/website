<template>
  <div class="item story">
    <BoxHeading :title="item.componentOptions.propsData.title"
      @close="$emit('end')" />
    <VNode :node="item" />
    <div class="buttons">
      <button class="previous" @click="previous" :disabled="index === 0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10,7l5,5-5,5Z" />
        </svg>
        <div>Vorige</div></button>
      <label>{{ index + 1 }}/{{ count }}</label>
      <button class="next" @click="next" :disabled="index === count - 1">
        <div>Volgende</div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10,7l5,5-5,5Z" /></svg>
      </button>
    </div>
  </div>
</template>

<script>
import VNode from "./VNode.vue";
import BoxHeading from './BoxHeading.vue'

export default {
  name: "MapStory",
  components: {
    VNode,
    BoxHeading
  },
  props: {
    items: Array,
    startIndex: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      index: this.startIndex,
    };
  },
  computed: {
    item: function () {
      return this.items[this.index || 0]
    },
    count: function () {
      return this.items.length
    },
  },
  methods: {
    start: function () {
      this.index = 0
      this.update(this.index)
    },
    update: function (index) {
      if (index >= 0) {
        const item = this.items[index]

        this.$emit('updated', {
          index,
          ...item.componentOptions.propsData
        })
      }
    },
    previous: function () {
      this.index = Math.max(this.index - 1, 0)
      this.update(this.index);
    },
    next: function () {
      this.index = Math.min(this.index + 1, this.count - 1)
      this.update(this.index);
    }
  },
  mounted: function () {
    this.start()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";
@import "@/assets/sass/partials/button.scss";

.story-location {
  display: none;
}

.item {
  z-index: 1000;
  position: relative;
  pointer-events: all;
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
}

.buttons > *:not(:last-child) {
  margin-right: 0.5rem;
}

.map-page .box {
  p {
    margin: 1rem 0;
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
