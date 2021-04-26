<template>
  <div class="container">
    <div class="map" id="gl-circles"></div>
    <MapControls>
      <div class="left">
        <template v-if="!selectedFeatureProperties">
          <CreateMapStory :map="map"
            :startIndex="lastMapStoryIndex"
            @updated="mapStoryUpdated">
            <Content slot-key="all-shops" />
            <Content slot-key="all-xxl-boxes" />
            <Content slot-key="all-service-points" />
            <Content slot-key="single-shop" />
            <Content slot-key="story4" />
          </CreateMapStory>
        </template>
        <template v-else-if="selectedFeatureProperties">
          <FeatureInfo :featureProperties="selectedFeatureProperties"
            @close="closeInfo" @toggleView="toggleView" />
        </template>
      </div>
      <div class="bottom">
        <MapFilters :fields="summary"
          :selectedField.sync="selectedField"
          :textQuery.sync="textQuery" />
      </div>
    </MapControls>
  </div>
</template>

<script>
import { Map } from 'maplibre-gl'
import { throttle } from 'lodash'
import Fuse from 'fuse.js'

import FeatureInfo from './FeatureInfo.vue'
import MapFilters from './MapFilters.vue'

import { createMapSources, createCircleLayers, createMapLayers,
  toggleCircleView, toggleMapView,
  setCircleLayersColor } from './lib/map'
import { fetchFeatureData } from './lib/data'
import { getColor } from './lib/colors'

export default {
  name: 'Circles',
  components: {
    FeatureInfo,
    MapFilters
  },
  data () {
    return {
      map: undefined,
      featureData: undefined,

      mapLoaded: false,
      featureDataLoaded: false,

      selectedField: undefined,
      currentView: 'circles',
      textQuery: '',
      selectedFeatureProperties: undefined,
      lastMapStoryIndex: 0
    }
  },
  methods: {
    loadFeatureData: async function () {
      this.featureData = await fetchFeatureData()

      const firstField = Object.keys(this.featureData.summary)[0]
      this.selectedField = firstField

      this.featureDataLoaded = true
    },
    createLayers: function () {
      const color = getColor(this.selectedField, this.fieldExtent)

      createCircleLayers(this.map, color, true)
      createMapLayers(this.map, color, false)
    },
    closeInfo: function () {
      this.selectedFeatureProperties = undefined
    },
    toggleView: function () {
      if (this.currentView === 'circles') {
        toggleMapView(this.map, this.selectedFeatureProperties)
        this.currentView = 'map'
      } else {
        toggleCircleView(this.map, this.selectedFeatureProperties)
        this.currentView = 'circles'
      }
    },
    mapStoryUpdated: function (index) {
      this.lastMapStoryIndex = index
    },
    throttledTextSearch: throttle(function (query) {
      // this.textSearch(query)
    }, 500),
  },
  watch: {
    textQuery: function () {
      // this.throttledTextSearch(this.textQuery)
    },
    readyToCreateLayers: function () {
      if (this.readyToCreateLayers) {
        this.createLayers()
      }
    },
    selectedField: function () {
      console.log(this.selectedField, this.fieldExtent)
      const color = getColor(this.selectedField, this.fieldExtent)
      setCircleLayersColor(this.map, color)
    }
  },
  computed: {
    readyToCreateLayers: function () {
      return this.featureDataLoaded && this.mapLoaded
    },
    summary: function () {
      return this.featureData && this.featureData.summary
    },
    fieldStats: function () {
      return this.summary[this.selectedField]
    },
    fieldExtent: function () {
      return this.fieldStats.extent
    }
  },
  mounted: function () {
    // console.log(this.$route)
    const defaultCenter = [5.38721, 52.15519]

    let zoom = 10
    let lon = defaultCenter[0]
    let lat = defaultCenter[1]

    if (this.$route.query.view) {
      [zoom, lat, lon] = this.$route.query.view.split('/')
    }

    const map = new Map({
      container: 'gl-circles',
      style: {
        version: 8,
        sources: {},
        layers: []
      },
      minZoom: 7,
      maxZoom: 19,
      center: [lon, lat],
      zoom,
      dragRotate: false
    })

    this.map = map

    map.on('load', () => {
      this.mapLoaded = true
      createMapSources(map, this.$themeConfig)

      map.on('moveend', () => {
        console.log('moveend', JSON.stringify(map.getBounds().toArray()), map.getZoom())
      })

      map.on('click', 'circles', (event) => {
        if (event.features && event.features.length) {
          this.selectedFeatureProperties = event.features[0].properties
          console.log(this.selectedFeatureProperties)

          if (event.originalEvent.metaKey) {
            this.toggleView()
          }
        }
      })
    })

    this.loadFeatureData()
  },
  beforeUnmount: function () {
    if (this.map) {
      this.map.remove()
    }
  }
}
</script>

<style scoped>
.container {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  position: fixed;
}

.map {
  height: 100%;
  width: 100%;
}
</style>
