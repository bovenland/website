<template>
  <MapPage>
    <template v-slot:map>
      <div ref="map" class="map">
      </div>
    </template>

    <CreateMapStory @updated="mapStoryUpdated">
      <div data-layer="aaa" data-bounds="[[5.075088,52.216149],[6.045731,52.448873]]">
        Routes
      </div>
    </CreateMapStory>
  </MapPage>
</template>

<script>
import Map from '../../../../mixins/Map.vue'

import MapPage from '../../../../components/pages/Map.vue'
import CreateMapStory from '../../../../components/map/CreateMapStory.vue'

import { fetchJson } from './../../../../lib/fetch.js'
import { setMapStyle, setMapSourceAndLayers, emptyGeoJSON } from './../../../../lib/vijftien-minuten-verderop/map.js'

import nearestPoint from '@turf/nearest-point'

export default {
  transition: 'map',
  mixins: [Map],
  components: {
    MapPage,
    CreateMapStory
  },
  data () {
    return {
      sourceAndLayersAdded: false
    }
  },
  computed: {

  },
  watch: {
    mapLoaded: function () {
      const map = this.map

      map.on('styledata', (event) => {
        setMapSourceAndLayers(map)
      })

      map.on('click', 'origins', this.mapClick)
      map.on('moveend', this.mapMoveEnd)

      setMapStyle(map)
    }
  },
  methods: {
    startAnimation: async function (osmId) {
      if (this.controller) {
        this.controller.abort()
      }

      this.controller = new AbortController()
      const { signal } = this.controller

      this.animationId = osmId

      const url = `${this.$config.vijftienMinutenVerderop.dataBaseUrl}/${osmId}.json`

      this.map.getSource('area').setData(emptyGeoJSON)

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
          duration: 1500, delay: 1000
        })
        this.map.setPaintProperty('area', 'fill-opacity', 0.2)

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
    mapMoveEnd: function () {
      const map = this.map
      const zoom = map.getZoom()
      const { lat, lng } = map.getCenter()
      const center = {
        type: 'Point',
        coordinates: [lng, lat]
      }

      if (zoom >= 12) {
        const origins = map.queryRenderedFeatures(undefined, {
          layers: ['origins']
        })

        if (origins.length) {
          const nearestOrigin = nearestPoint(center, {
            type: 'FeatureCollection',
            features: origins
          })

          // console.log(nearestOrigin.properties)

          const osmId = nearestOrigin.properties.osmId
          this.startAnimation(osmId)
        }
      }
    },
    mapClick: async function (event) {
      if (event.features && event.features.length) {
        console.log(event.features[0])
        const { osmId } = event.features[0].properties
        this.startAnimation(osmId)
      }
    },
    createLayers: function () {

    },
    mapStoryUpdated: function () {
      console.log('mapStoryUpdated')
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>
</style>