<template>
  <MapPage>
    <div>
      <label>Hoofdstuk 1</label>
      <h1>Waar we winkelen</h1>
      <p>Cartografie</p>
    </div>

    <template v-slot:map>
      <div ref="map" class="map">
      </div>
    </template>

    <CreateMapStory :map="map"
      @updated="mapStoryUpdated">
      <div data-layer="aaa" data-bounds="[[5.075088,52.216149],[6.045731,52.448873]]">
        Er zijn meer dan 80.000 winkels in Nederland.
      </div>

      <div data-layer="aaa" data-bounds="[[5.515501,52.257574],[6.154007,52.410659]]">
        Distributiecentra en XXL-dozen
      </div>

      <div data-layer="aaa" data-bounds="[[5.474729,52.28082],[5.490862,52.284692]]">
        Pakketophaalpunten
      </div>

      <div data-layer="aaa" data-bounds="[[5.79303,52.30333],[5.821456,52.31015]]">
        Winkel in een historisch stadscentrum
      </div>

      <div data-layer="aaa" data-bounds="[[5.608302,52.303667],[5.64266,52.311909]]">
        Distributiecentrum van Primark in Roosendaal
      </div>
    </CreateMapStory>
  </MapPage>
</template>

<script>
import MapPage from '../../../../components/pages/Map.vue'
import CreateMapStory from '../../../../components/map/CreateMapStory.vue'

import { createMapSources, createCircleLayers, createMapLayers,
  toggleCircleView, toggleMapView,
  setCircleLayersColor } from './../../../../lib/map.js'

// TODO: use app config
import config from '../../../../lib/config.js'
// import { fetchFeatureData } from './lib/data'
// import { getColor } from '../../../../lib/colors.js'

export default {
  transition: "map",
  components: {
    MapPage,
    CreateMapStory
  },
  data () {
    return {
      map: undefined,
      featureData: undefined,
      mapLoaded: false,
      featureDataLoaded: false,
    }
  },
  computed: {
    readyToCreateLayers: function () {
      return this.mapLoaded
      // return this.featureDataLoaded && this.mapLoaded
    }
  },
  watch: {
    readyToCreateLayers: function () {
      if (this.readyToCreateLayers) {
        this.createLayers()
      }
    }
  },
  methods: {
    // loadFeatureData: async function () {
    //   this.featureData = await fetchFeatureData()
    //   const firstField = Object.keys(this.featureData.summary)[0]
    //   this.selectedField = firstField
    //   this.featureDataLoaded = true
    // },
    createLayers: function () {
      const color = 'red' // getColor(this.selectedField, this.fieldExtent)
      createCircleLayers(this.map, color, true)
      // createMapLayers(this.map, color, false)
    },
    mapStoryUpdated: function () {
      console.log('mapStoryUpdated')
    }
  },
  mounted: function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVydHNwYWFuIiwiYSI6ImR3dERiQk0ifQ.DLbScmbRohc3Sqv7prfhqw'

    const defaultCenter = [5.38721, 52.15519]
    let zoom = 10
    let lon = defaultCenter[0]
    let lat = defaultCenter[1]

    if (this.$route.query.view) {
      [zoom, lat, lon] = this.$route.query.view.split('/')
    }

    const map = new mapboxgl.Map({
      container: this.$refs.map,
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
      createMapSources(map, config)

      // map.on('moveend', () => {
      //   console.log('moveend', JSON.stringify(map.getBounds().toArray().map((c) => c.map((n) => parseFloat(n.toFixed(6))))), map.getZoom())
      // })

      // map.on('click', 'circles', (event) => {
      //   if (event.features && event.features.length) {
      //     this.selectedFeatureProperties = event.features[0].properties
      //     console.log(this.selectedFeatureProperties)
      //     if (event.originalEvent.metaKey) {
      //       this.toggleView()
      //     }
      //   }
      // })
    })
    // this.loadFeatureData()
  }
}
</script>

<style scoped>

</style>