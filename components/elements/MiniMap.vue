<template>
  <NuxtLink :to="{
    name: 'hoofdstukken-waar-we-winkelen-cartografie',
    query: linkQuery
  }">
    <svg class="minimap" xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${width} ${height}`">
      <!-- TODO: add loading image -->
      <template v-if="geojson">
        <path :d="path(circle)"
          fill="rgba(230, 180, 200, 0.3)" stroke="none" />
        <g class="buildings">
          <path v-for="building in buildings" :d="path(building)" :key="building.id"
            fill="yellow" />
        </g>
        <g class="roads">
          <path v-for="road in roads" :d="path(road)" :key="road.id"
            stroke="green" fill="none" />
        </g>
      </template>
    </svg>
  </NuxtLink>
</template>

<script>
import { geoPath, geoMercator } from 'd3-geo'

// TODO: use app config
import config from '../../lib/waar-we-winkelen/config.js'
import { fetchJson } from '../../lib/fetch.js'

export default {
  name: 'MiniMap',
  props: {
    chapter: String,
    id: String
  },
  data: function () {
    return {
      width: 100,
      height: 100,
      geojson: undefined
    }
  },
  computed: {
    linkQuery: function () {
      if (!this.geojson) {
        return
      }

      return {
        view: [16, this.center[1], this.center[0]].join('/')
      }
    },
    center: function () {
      return this.circle.properties.centerPacked
    },
    circle: function () {
      return this.filterByType(this.geojson, 'circle')[0]
    },
    buildings: function () {
      return this.filterByType(this.geojson, 'building')
    },
    roads: function () {
      return this.filterByType(this.geojson, 'road')
    },
    projection: function () {
      return geoMercator()
        .fitSize([this.width, this.height], this.circle)
    },
    path: function () {
      return geoPath().projection(this.projection)
    }
  },
  methods: {
    filterByType: function (geojson, type) {
      return geojson.features
        .filter((feature) => feature.properties.type === type)
    }
  },
  mounted: async function () {
    const url = `${config.minimaps.baseUrl}/${this.chapter}/minimap/${this.id}.geojson`
    try {
      this.geojson = await fetchJson(url)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style scoped>
svg {
  width: 250px;
}

svg circle {
  fill: none;
  stroke: black;
}
</style>
