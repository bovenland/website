<template>
  <MapPage>
    <template v-slot:map>
      <div ref="map">
      </div>
    </template>

    <template v-slot:overlay>
      <template v-if="!mapStoryStarted">
        <StartMapStory @click="startMapStory" />
      </template>
      <Box class="grid-area">
        <template v-if="mapStoryStarted">
          <CreateMapStory @updated="onMapStoryUpdate" @end="onMapStoryEnd">
            <MapStoryItem title="Dit" :zoom="15" :center="[5.025088,52.236149]">
              Routes
            </MapStoryItem>
            <MapStoryItem title="Dat" :zoom="16" :center="[6.045731,52.448873]">
              Chips
            </MapStoryItem>
            <MapStoryItem title="Vis" :zoom="14" :center="[5.175088,52.246149]">
              koek
            </MapStoryItem>
            <MapStoryItem title="Koek" :zoom="15" :center="[5.275088,52.216149]">
              Chips
            </MapStoryItem>
          </CreateMapStory>
        </template>
        <template v-else>
          <BoxHeading v-if="selectedFeature"
            :title="selectedFeature.properties.postcode" @close="resetSelectedFeature" />
          <BoxHeading v-else-if="nearestFeature"
            :title="nearestFeature.properties.postcode" />

          <p v-if="feature">
            Vanaf dit adres met postcode {{ feature.properties.postcode }} is een gebied van
            {{ format(feature.properties.area) }} te bereiken.
          </p>

          <div>
            <Legend :color="color" :format="format" />
            <div>
              Gebied bereikbaar binnen vijftien minuten fietsen
            </div>
          </div>
        </template>
      </Box>
<!--
      <template v-if="selectedFeature">
        <div>
          <div>Selected: {{ selectedFeature.properties.postcode }}</div>
          <button @click="resetSelectedFeature">Sluit</button>
        </div>
      </template>

      <template v-else-if="nearestFeature">
        <div>
          <div>Nearest: {{ nearestFeature.properties.postcode }}</div>
          <button @click="selectNearestFeature">Details</button>
        </div>
      </template>
       -->

    </template>
  </MapPage>
</template>

<script>
import Map from '../../../../mixins/Map.vue'

import MapPage from '../../../../components/pages/Map.vue'
import CreateMapStory from '../../../../components/map/CreateMapStory.vue'
import MapStoryItem from '../../../../components/map/MapStoryItem.vue'
import Legend from '../../../../components/map/Legend.vue'
import Box from '../../../../components/map/Box.vue'
import BoxHeading from '../../../../components/map/BoxHeading.vue'
import StartMapStory from '../../../../components/map/StartMapStory.vue'

import { fetchJson } from './../../../../lib/fetch.js'
import { setMapStyle, setMapSourceAndLayers, emptyGeoJSON } from './../../../../lib/vijftien-minuten-verderop/map.js'

import { scaleSqrt } from 'd3-scale'
import { format } from 'd3-format'
import nearestPoint from '@turf/nearest-point'
import { debounce } from 'lodash'

export default {
  transition: 'map',
  mixins: [Map],
  components: {
    MapPage,
    CreateMapStory,
    MapStoryItem,
    Legend,
    Box,
    BoxHeading,
    StartMapStory
  },
  data () {
    return {
      mapStoryStarted: false,

      color: scaleSqrt([2000000, 20000000], ["#F0F462", "#F749A8"]),
      format: (d) => format(".2s")(d) + 'm²',

      // maken dat alleen maar nieuwe pakt als er geen geselecteerd is
      // en dat geselecteerde of gepakte een andere kleurheeft en groter is.
      selectedFeature: undefined,
      nearestFeature: undefined,

      sourceAndLayersAdded: false
    }
  },
  computed: {
    feature: function () {
      return this.selectedFeature || this.nearestFeature
    }
  },
  watch: {
    mapLoaded: function () {
      const map = this.map

      map.on('styledata', (event) => {
        setMapSourceAndLayers(map)
      })

      map.on('click', 'origins', this.mapClick)

      // TODO: debounced.cancel
      map.on('moveend', debounce(this.mapMoveEnd, 500))

      map.on('mouseenter', 'origins', () => {
        if (this.canClick()) {
          map.getCanvas().style.cursor = 'pointer'
        }
      })

      map.on('mouseleave', 'origins', () => {
        map.getCanvas().style.cursor = ''
      })

      setMapStyle(map)
    },
    nearestFeature: function () {
      if (this.nearestFeature) {
        const osmId = this.nearestFeature.properties.osmId
        this.startAnimation(osmId)
      }
    },
    selectedFeature: function () {
      if (this.selectedFeature) {
        const osmId = this.selectedFeature.properties.osmId
        this.startAnimation(osmId)
      }
    }
  },
  methods: {
    canClick: function () {
      if (this.mapStoryStarted) {
        return false
      }

      const map = this.map
      const zoom = map.getZoom()

      if (zoom < 11) {
        return false
      }

      return true
    },
    startMapStory: function () {
      this.mapStoryStarted = true
    },
    resetSelectedFeature: function () {
      this.nearestFeature = undefined
      this.selectedFeature = undefined

      this.map.getSource('area').setData(emptyGeoJSON)
      this.map.getSource('routes').setData(emptyGeoJSON)
    },
    selectNearestFeature: function () {
      this.selectedFeature = this.nearestFeature
    },
    startAnimation: async function (osmId) {
      if (this.controller) {
        // TODO: make sure this works!
        this.controller.abort()
      }

      this.controller = new AbortController()
      const { signal } = this.controller

      this.animationId = osmId

      const url = `${this.$config.vijftienMinutenVerderop.dataBaseUrl}/${osmId}.json`

      this.map.getSource('area').setData(emptyGeoJSON)
      this.map.getSource('routes').setData(emptyGeoJSON)

      this.map.setPaintProperty('area', 'fill-opacity-transition', {
        duration: 0, delay: 0
      })

      this.map.setPaintProperty('area', 'fill-opacity', 0)
      try {
        const data = await fetchJson(url, { signal })

        const area = data.area
        const routes = data.routes

        const maxIndex = Math.max(...routes.features.map((feature) => feature.properties.index))
        this.animateRoutes(osmId, 0, maxIndex, routes)

        this.map.getSource('area').setData(area)
        this.map.setPaintProperty('area', 'fill-opacity-transition', {
          duration: 1500
        })
        this.map.setPaintProperty('area', 'fill-opacity', 0.08)

      } catch (err) {
        console.error(err)
      }
    },
    animateRoutes: function (animationId, index, maxIndex, geojson, startTimestamp) {
      if (index === 0) {
        this.map.setFilter('routes', [
          '<',
          ['get', 'index'],
          0
        ])
        this.map.getSource('routes').setData(geojson)
      }

      if (this.animationId === animationId) {
        if (index <= maxIndex) {
          requestAnimationFrame((timestamp) => {
            if (startTimestamp === undefined) {
              startTimestamp = timestamp
            }

            const speed = 4

            const progress = timestamp - startTimestamp
            const length = progress * speed
            const index = length / 250

            this.map.setFilter('routes', [
              '<=',
              ['get', 'index'],
              Math.round(index)
            ])

            this.animateRoutes(animationId, index, maxIndex, geojson, startTimestamp)
          })
        }
      }
    },
    mapMoveEnd: function (event) {
      if (event.isMapStory || (this.canClick() && !this.selectedFeature)) {
        const map = this.map

        const { lat, lng } = map.getCenter()
        const center = {
          type: 'Point',
          coordinates: [lng, lat]
        }

        const origins = map.queryRenderedFeatures(undefined, {
          layers: ['origins']
        })

        if (origins.length) {
          const nearestFeature = nearestPoint(center, {
            type: 'FeatureCollection',
            features: origins
          })

          this.nearestFeature = nearestFeature
        }
      }
    },
    mapClick: async function (event) {
      if (event.features && event.features.length) {
        this.selectedFeature = event.features[0]
      }
    },
    createLayers: function () {

    },
    onMapStoryUpdate: function (data) {
      this.map.flyTo(data, {
        isMapStory: true
      })
    },
    onMapStoryEnd: function () {
      this.mapStoryStarted = false
      this.resetSelectedFeature()
    }
  }
}
</script>

<style scoped>
.grid-area {
  grid-area: box;
}
</style>