<template>
  <MapPage>
    <!-- <div>
      <label>Hoofdstuk 1</label>
      <h1>Waar we winkelen</h1>
      <p>Cartografie</p>
    </div> -->

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

import { toggleCircleView, toggleWorldView,
  circleMapStyle, setCircleMapStyle,
  setCircleMapSourceAndLayers, setWorldMapSourceAndLayers,
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
      currentView: 'circles',
      sourceAndLayersAdded: false
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
    circleClick: function (event) {
      if (event.features && event.features.length) {
        this.selectedFeatureProperties = event.features[0].properties
        console.log(this.selectedFeatureProperties)
        if (event.originalEvent.metaKey) {
          this.toggleView()
        }
      }
    },
    toggleView: function () {
      const color = 'green'
      this.sourceAndLayersAdded = false

      if (this.currentView === 'circles') {
        toggleWorldView(this.map, config, color, this.selectedFeatureProperties)
        this.currentView = 'world'
      } else {
        toggleCircleView(this.map, config, color, this.selectedFeatureProperties)
        this.currentView = 'circles'
      }
    },
    // loadFeatureData: async function () {
    //   this.featureData = await fetchFeatureData()
    //   const firstField = Object.keys(this.featureData.summary)[0]
    //   this.selectedField = firstField
    //   this.featureDataLoaded = true
    // },
    createLayers: function () {
      const color = 'red' // getColor(this.selectedField, this.fieldExtent)
      // createCircleLayers(this.map, color, true)
      // createMapLayers(this.map, color, false)
      setCircleMapStyle(this.map, config, color)
    },
    mapStoryUpdated: function () {
      console.log('mapStoryUpdated')
    }
  },
  mounted: function () {
    // TODO: move all code in this function to lib
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVydHNwYWFuIiwiYSI6ImR3dERiQk0ifQ.DLbScmbRohc3Sqv7prfhqw'

    const defaultCenter = [5.608302, 52.303667]
    let zoom = 8
    let lon = defaultCenter[0]
    let lat = defaultCenter[1]

    if (this.$route.query.view) {
      [zoom, lat, lon] = this.$route.query.view
        .split('/')
        .map((n) => parseFloat(n))

      // TODO: check numbers!
      console.log('from view', [zoom, lat, lon])
    }

    const map = new mapboxgl.Map({
      container: this.$refs.map,
      style: circleMapStyle,
      minZoom: 7,
      maxZoom: 19,
      center: [lon, lat],
      zoom,
      dragRotate: false
    })

    this.map = map

    map.on('load', () => {
      this.mapLoaded = true
      setCircleMapSourceAndLayers(this.map, config, 'orange')

      // map.on('moveend', () => {
      //   console.log('moveend', JSON.stringify(map.getBounds().toArray().map((c) => c.map((n) => parseFloat(n.toFixed(6))))), map.getZoom())
      // })

      map.on('click', 'bovenland-circles-circles', this.circleClick)
      map.on('click', 'bovenland-world-circles', this.circleClick)
    })

    map.on('styledata', (event) => {
      if (this.mapLoaded && !this.sourceAndLayersAdded) {
        const color = 'green'
        if (this.currentView === 'circles') {
          setCircleMapSourceAndLayers(this.map, config, color)
        } else {
          setWorldMapSourceAndLayers(this.map, config, color)
        }

        this.sourceAndLayersAdded = true
      }
    })
    // this.loadFeatureData()
  }
}
</script>

<style scoped>
</style>