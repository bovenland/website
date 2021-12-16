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

import length from '@turf/length'
import lineSliceAlong from '@turf/line-slice-along'
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

      const url = `http://localhost:7913/${osmId}`

      this.map.getSource('area').setData(emptyGeoJSON)

      this.map.setPaintProperty('area', 'fill-opacity-transition', {
        duration: 0, delay: 0
      })
      this.map.setPaintProperty('area', 'fill-opacity', 0)
      try {
        const data = await fetchJson(url, { signal })

        const area = data.area
        const routes = data.routes

        const maxLength = Math.max(...routes.features.map((feature) => length(feature, {units: 'meters'})))
        this.animateRoutes(osmId, 0, maxLength, routes)

        this.map.getSource('area').setData(area)
        this.map.setPaintProperty('area', 'fill-opacity-transition', {
          duration: 1500, delay: 1000
        })
        this.map.setPaintProperty('area', 'fill-opacity', 0.2)

      } catch (err) {
        console.error(err)
      }
    },
    animateRoutes: function (animationId, length, maxLength, geojson, startTimestamp) {
      if (this.animationId === animationId) {
        const cappedGeojson = {
          type: 'FeatureCollection',
          features: geojson.features
            .map((feature) => {
              if (length === 0) {
                return
              }

              try {
                return lineSliceAlong(feature, 0, length, {units: 'meters'})
              } catch (err) {
                console.error(startTimestamp, feature, length, err)
              }
            })
            .filter((feature) => feature)
        }

        this.map.getSource('routes').setData(cappedGeojson)

        if (length <= maxLength) {
          requestAnimationFrame((timestamp) => {
            if (startTimestamp === undefined) {
              startTimestamp = timestamp
            }

            const speed = 2.5

            const progress = timestamp - startTimestamp
            const length = progress * speed

            this.animateRoutes(animationId, length, maxLength, geojson, startTimestamp)
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