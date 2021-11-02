<template>
  <Box class="item story">
    <VNode :node="item" @updated="updated" />
    <div class="buttons">
      <template v-if="index === undefined">
        <Button @click="start">Start</Button>
      </template>
      <template v-else>
        <Button @click="previous" :disabled="index === 0">◄ Vorige</Button>
        <span>{{ index + 1 }} / {{ count }}</span>
        <Button @click="next" :disabled="index === count - 1">Volgende ►</Button>
      </template>
    </div>
  </Box>
</template>

<script>
import VNode from './VNode.vue'
import Box from './Box.vue'

export default {
  name: 'MapStory',
  components: {
    VNode,
    Box
  },
  props: {
    map: Object,
    items: Array,
    startIndex: {
      type: Number,
      default: undefined
    }
  },
  data: function () {
    return {
      index: this.startIndex
    }
  },
  computed: {
    item: function () {
      return this.items[this.index || 0]
    },
    count: function () {
      return this.items.length
    }
  },
  methods: {
    start: function () {
      this.index = 0
      this.flyTo(this.index)
    },
    updated: function () {
      this.flyTo(this.index)
    },
    flyTo: function (index) {
      if (this.map && index >= 0) {
        const location = this.getLocation(index)

        const padding = 10
        const storyBox = document.querySelector('.story')
        const leftPadding = storyBox.getBoundingClientRect().right + padding

        // https://docs.mapbox.com/mapbox-gl-js/api/properties/#paddingoptions
        this.map.fitBounds(location.bounds, {
          linear: false,
          essential: true,
          padding: {
            top: padding,
            bottom: padding,
            left: leftPadding,
            right: padding
          }
        })
      }
    },
    getLocation: function (index) {
      const item = this.items[index]
      if (item && item.elm) {
        const dataset = item.elm.dataset
        if (dataset.layer && dataset.bounds) {
          return {
            layer: dataset.layer,
            bounds: JSON.parse(dataset.bounds)
          }
        }
      }
    },
    previous: function () {
      this.index = Math.max(this.index - 1, 0)
    },
    next: function () {
      this.index = Math.min(this.index + 1, this.count - 1)
    }
  }
}
</script>

<style scoped>
.story-location {
  display: none;
}
.item {
  z-index: 1000;
  position: relative;

  grid-area: left;
  padding: 1em;
  border-color: black;
  border-width: 1px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  background-color: white;
  pointer-events: all;
  border-radius: 5px;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.buttons > *:not(:last-child) {
  margin-right: 0.5rem;
}
</style>
