<template>
  <div class="container">
    <div class="item">
      <VNode :node="item" @updated="updated" />
      <div class="buttons">
        <span>{{ index + 1 }} / {{ count }}</span>
        <Button @click="previous" :disabled="index === 0">Vorige</Button>
        <Button @click="next" :disabled="index === count - 1">Volgende</Button>
      </div>
    </div>
  </div>
</template>

<script>
import VNode from './VNode.vue'

export default {
  name: 'MapStory',
  components: {
    VNode
  },
  props: {
    map: Object,
    items: Array
  },
  data: function () {
    return {
      index: 0
    }
  },
  computed: {
    item: function () {
      return this.items[this.index]
    },
    count: function () {
      return this.items.length
    }
  },
  methods: {
    updated: function () {
      this.flyTo(this.index)
    },
    flyTo: function (index) {
      if (this.map) {
        const location = this.getLocation(index)

        // https://docs.mapbox.com/mapbox-gl-js/api/properties/#paddingoptions
        this.map.flyTo({
          zoom: location.zoom,
          center: location.center,
          essential: true
        })
      }
    },
    getLocation: function (index) {
      const item = this.items[index]

      if (item && item.elm) {
        const locationElement = item.elm.querySelector('.story-location')
        if (locationElement) {
          return {
            layer: locationElement.dataset.layer,
            zoom: parseFloat(locationElement.dataset.zoom),
            center: locationElement.dataset.center.split(',').map((parseFloat))
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
.container {
  pointer-events: none;
  display: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 100px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.story-location {
  display: none;
}

.item {
  padding: 1em;
  border-color: black;
  border-width: 1px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  background-color: white;
  pointer-events: all;
  border-radius: 5px;
  width: 400px;
  height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.buttons > *:not(:last-child) {
  margin-right: 0.5rem;
}
</style>



