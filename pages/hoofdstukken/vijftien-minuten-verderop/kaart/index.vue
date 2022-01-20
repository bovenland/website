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
      <Box ref="box" class="grid-area">
        <template v-if="mapStoryStarted">
          <CreateMapStory @updated="onMapStoryUpdate" @end="onMapStoryEnd">
            <MapStoryItem title="Vijftien minuten fietsen" :zoom="7" :center="[ 5.25672, 52.481321 ]">
              <p>
                Deze kaart laat zien, voor bijna elke postcode in Nederland, waar je kunt komen binnen 15 minuten fietsen.
                Hoe geler, hoe kleiner dit gebied. En hoe paarser, hoe groter.
              </p>
            </MapStoryItem>
            <MapStoryItem title="Zonder omwegen" :zoom="9" :center="[ 5.647766, 51.498732 ]">
              Hoe minder je hoeft om te fietsen, hoe groter het gebied is dat je kunt bereiken.
              In het westen en het noorden van Nederland belemmert water vaak de kortste route,
              terwijl je in <strong>Zuid-Nederland</strong> je vaker een directe fietsroute kunt vinden.
            </MapStoryItem>
            <MapStoryItem title="Horst, Limburg" :zoom="12.5" :center="[6.054982, 51.457144]">
              Vanuit bijvoorbeeld het centrum van <strong>Horst in Limburg</strong> kun je in elke richting
              fietsen en is een gebied van bijna 30 km² bereikbaar.
            </MapStoryItem>
            <MapStoryItem title="Historische steden" :zoom="12.5" :center="[5.388525, 52.159117]">
              Ook vanuit het centrum van oude middeleeuwse steden zoals <strong>Amersfoort</strong> is een groot gebied bereikbaar.
              Er zijn veel wegen en fietsroutes in alle richtingen.
            </MapStoryItem>
            <MapStoryItem title="Rivieren, kanelen en sloten" :zoom="12" :center="[ 4.885274, 52.045489 ]">
              In veengebieden, in polders en langs rivieren bepalen waterlopen hoe je kunt fietsen.
              De weg tussen <strong>Linschoten en Oudewater</strong> volgt de waterloop van de <strong>Lange Linschoten</strong>.
            </MapStoryItem>
            <MapStoryItem title="De polder" :zoom="12" :center="[5.717484, 52.6459]">
              Ook vanuit <strong>Nagele in de Noordoostpolder</strong> zijn de mogelijkheden beperkt:
              kaarsrechte polderwegen en de percelen van de grote boerderijen bepalen het landschap.
            </MapStoryItem>
            <MapStoryItem title="Nieuwe barrières" :zoom="12.5" :center="[ 6.498637, 52.714022 ]">
              Soms worden oude doorgaande routes doorbroken voor de aanleg van nieuwe wegen of kanalen.
              De <strong>Langedijk van Hoogeveen naar Hollandscheveld</strong> was tot in de jaren 70
              een doorgaande route. Nu moeten fietsers omfietsen om verderop de verbreedde Hoogeveense Vaart en de provinciale weg (nu de A37) over te steken.
            </MapStoryItem>
          </CreateMapStory>
        </template>
        <template v-else>
          <BoxHeading v-if="selectedFeature" @close="resetSelectedFeature">
            <h3>{{ selectedFeature.properties.postcode }}</h3>
          </BoxHeading>
          <BoxHeading v-else-if="nearestFeature">
            <h3>{{ nearestFeature.properties.postcode }}</h3>
          </BoxHeading>

          <div class="contents">
            <p v-if="feature">
              Vanaf dit adres met postcode <strong>{{ feature.properties.postcode }}</strong> is een gebied van
              <strong>{{ format(feature.properties.area) }}</strong> te bereiken.
            </p>

            <Legend :color="color" :format="format" />
            <div>
              Gebied bereikbaar binnen vijftien minuten fietsen.
            </div>
          </div>
        </template>
      </Box>
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

import { scaleSqrt, scaleQuantize } from 'd3-scale'
import nearestPoint from '@turf/nearest-point'
import { debounce } from 'lodash'

export default {
  transition: 'map',
  mixins: [
    Map
  ],
  components: {
    MapPage,
    CreateMapStory,
    MapStoryItem,
    Legend,
    Box,
    BoxHeading,
    StartMapStory
  },
  data: function () {
    return {
      mapStoryStarted: false,

      minAnimationZoom: 11,
      storyPadding: 10,
      currentField: 'area',
      color: scaleQuantize()
        .domain([2000000, 30000000])
        .range([
          '#f0f462', '#cae872', '#a1dc80', '#70d08c', '#9d99e5', '#d56ed4', '#ff00c3'

          // '#f0f462', '#d4eb6e', '#b6e279', '#96d983', '#8b58e2', '#b84cd8', '#dd38cd', '#ff00c3'
          // '#f0f462', '#d4eb6e', '#b6e279', '#96d983', '#90a5c5', '#bd89c5', '#e163c4', '#ff00c3'
          // '#f0f462', '#cae872', '#a1dc80', '#fd8efd', '#e800af', '#8a005f'
          // '#f0f462', '#d4eb6e', '#b6e279', '#96d983', '#fbabfb', '#f952e8', '#d0009a', '#8a005f'
          // '#003943', '#006973', '#1c9da6', '#5ad1da', '#fbcb82', '#ffa09a', '#ff6faf', '#ff00c3'
          // '#000046', '#223d6f', '#377a9a', '#febd8a', '#ff81a8', '#ff00c3'
        ]),//.clamp(true),
      format: (d) => Math.round(d / (1000 * 1000)) + ' km²',

      selectedFeature: undefined,
      nearestFeature: undefined,
      osmId: undefined,
      sourceAndLayersAdded: false,

      eventData: {
        isMapStory: true
      }
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
        setMapSourceAndLayers(map, this.currentField, this.color)
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
        this.osmId = this.nearestFeature.properties.osmId
      }
    },
    selectedFeature: function () {
      if (this.selectedFeature) {
        this.osmId = this.selectedFeature.properties.osmId
      }
    },
    osmId: function () {
      if (this.osmId) {
        this.startAnimation(this.osmId)
      }
    }
  },
  methods: {
    mapWidth: function () {
      return this.$refs.map.offsetWidth
    },
    mapHeight: function () {
      return this.$refs.map.offsetHeight
    },
    zoomedIn: function () {
      const map = this.map
      const zoom = map.getZoom()

      if (zoom < this.minAnimationZoom) {
        return false
      }

      return true
    },
    canClick: function () {
      if (this.mapStoryStarted) {
        return false
      }

      return this.zoomedIn()
    },
    startMapStory: function () {
      this.mapStoryStarted = true
    },
    resetSelectedFeature: function () {
      this.nearestFeature = undefined
      this.selectedFeature = undefined
      this.osmId = undefined

      if (this.map.getSource('area')) {
        this.map.getSource('area').setData(emptyGeoJSON)
      }

      if (this.map.getSource('routes')) {
        this.map.getSource('routes').setData(emptyGeoJSON)
      }
    },
    selectNearestFeature: function () {
      this.selectedFeature = this.nearestFeature
    },
    startAnimation: async function (osmId) {
      if (this.controller) {
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
      const map = this.map

      // map.on('moveend', () => {
      //   console.log('moveend', map.getCenter().toArray().map((n) => parseFloat(n.toFixed(6))),
      //   JSON.stringify(map.getBounds().toArray().map((c) => c.map((n) => parseFloat(n.toFixed(6))))), map.getZoom())
      // })

      if ((this.zoomedIn() && event.isMapStory) || (this.canClick() && !this.selectedFeature)) {

        const x = this.mapWidth() / 2
        const { top, bottom } = this.padding()
        const y = (this.mapHeight() - bottom - top) / 2 + top

        const { lat, lng } = map.unproject([x, y])

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
    padding: function () {
      const boxHeight = this.mapHeight() - this.$refs.box.$el.getBoundingClientRect().top

      return {
        top: this.storyPadding,
        bottom: this.storyPadding + boxHeight,
        left: this.storyPadding,
        right: this.storyPadding
      }
    },
    flyTo: function (zoom, center) {
      this.map.flyTo({
        zoom,
        center,
        padding: this.padding()
      }, this.eventData)
    },
    fitBounds: function (bounds) {
      this.map.fitBounds(bounds, {
        linear: false,
        // essential: true,
        padding: this.padding()
      }, this.eventData)
    },
    onMapStoryUpdate: function (data) {
      this.resetSelectedFeature()

      if (data.bounds) {
        this.fitBounds(data.bounds)
      } else {
        this.flyTo(data.zoom, data.center)
      }
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

.contents > *:not(:first-child) {
  padding-top: 10px;
}
</style>