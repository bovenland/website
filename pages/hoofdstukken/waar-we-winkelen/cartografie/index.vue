<template>
  <MapPage>
    <template v-slot:map>
      <div ref="map" class="map">
      </div>
    </template>

    <CreateMapStory @updated="mapStoryUpdated">
      <div data-layer="aaa" data-bounds="[[5.075088,52.216149],[6.045731,52.448873]]">
        <p>Er zijn meer dan 80.000 winkels in Nederland.</p>
      </div>

      <div data-layer="aaa" data-bounds="[[5.515501,52.257574],[6.154007,52.410659]]">
        <p>Distributiecentra en XXL-dozen</p>
      </div>

      <div data-layer="aaa" data-bounds="[[5.474729,52.28082],[5.490862,52.284692]]">
        <p>Pakketophaalpunten</p>
      </div>

      <div data-layer="aaa" data-bounds="[[5.79303,52.30333],[5.821456,52.31015]]">
        <p>Winkel in een historisch stadscentrum</p>
      </div>

      <div data-layer="aaa" data-bounds="[[5.608302,52.303667],[5.64266,52.311909]]">
        <p>Distributiecentrum van Primark in Roosendaal</p>
      </div>
    </CreateMapStory>
  </MapPage>
</template>

<script>
import Map from '../../../../mixins/Map.vue'

import MapPage from '../../../../components/pages/Map.vue'
import CreateMapStory from '../../../../components/map/CreateMapStory.vue'

import { toggleCircleView, toggleWorldView,
  circleMapStyle, setCircleMapStyle,
  setCircleMapSourceAndLayers, setWorldMapSourceAndLayers,
  setCircleLayersColor } from './../../../../lib/waar-we-winkelen/map.js'

// TODO: move config from lib dir to app
import config from '../../../../lib/waar-we-winkelen/config.js'
import { fetchFeatureData } from '../../../../lib/waar-we-winkelen/data.js'
import { getColor } from '../../../../lib/waar-we-winkelen/colors.js'

export default {
  transition: 'map',
  mixins: [Map],
  components: {
    MapPage,
    CreateMapStory
  },
  data () {
    return {
      featureData: undefined,
      currentView: 'circles',
      currentField: 'vacantPercentage',
      sourceAndLayersAdded: false
    }
  },
  computed: {
    readyToCreateLayers: function () {
      return this.mapLoaded
      // return this.featureDataLoaded && this.mapLoaded
    },
    color: function () {
      return getColor('vacantPercentage', [0, 50])
    }
  },
  watch: {
    mapLoaded: function () {
      const map = this.map

      map.fitBounds([[5.471191, 52.281602], [7.454224, 53.232345]], {
        padding: {top: 25, bottom: 25, left: 25, right: 25}
      })

      setCircleMapSourceAndLayers(map, config, 'orange')

      // map.on('moveend', () => {
      //   console.log('moveend', JSON.stringify(map.getBounds().toArray().map((c) => c.map((n) => parseFloat(n.toFixed(6))))), map.getZoom())
      // })

      map.on('click', 'bovenland-circles-circles', this.circleClick)
      map.on('click', 'bovenland-world-buildings', this.circleClick)

      map.on('styledata', (event) => {
        if (this.mapLoaded && !this.sourceAndLayersAdded) {
          if (this.currentView === 'circles') {
            setCircleMapSourceAndLayers(this.map, config, this.color)
          } else {
            setWorldMapSourceAndLayers(this.map, config, this.color)
          }

          this.sourceAndLayersAdded = true
        }
      })
    },
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
      this.sourceAndLayersAdded = false
      if (this.currentView === 'circles') {
        toggleWorldView(this.map, config, this.color, this.selectedFeatureProperties)
        this.currentView = 'world'
      } else {
        // toggleCircleView(this.map, config, this.color, this.selectedFeatureProperties)
        // this.currentView = 'circles'
      }
    },
    loadFeatureData: async function () {
      const featureData = await fetchFeatureData(config)
      Object.freeze(featureData)

      this.featureData = featureData
      //   const firstField = Object.keys(this.featureData.summary)[0]
      //   this.selectedField = firstField
    },
    createLayers: function () {
      // createCircleLayers(this.map, color, true)
      // createMapLayers(this.map, color, false)
      setCircleMapStyle(this.map, config, this.color)
    },
    mapStoryUpdated: function (data) {
      // console.log('mapStoryUpdated', data)

      if (this.map) {
        const padding = 10;
        const storyBox = document.querySelector(".story");
        const leftPadding = storyBox.getBoundingClientRect().right + padding;

        // https://docs.mapbox.com/mapbox-gl-js/api/properties/#paddingoptions
        this.map.fitBounds(data.bounds, {
          linear: false,
          essential: true,
          padding: {
            top: padding,
            bottom: padding,
            left: leftPadding,
            right: padding,
          },
        });
      }
    }
  },
  mounted: function () {
    this.loadFeatureData()
  }
}
</script>

<style scoped>
</style>