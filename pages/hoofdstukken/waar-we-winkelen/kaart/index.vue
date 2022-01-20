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
            <MapStoryItem title="Dit" view="circles" :bounds="bounds">
              Er zijn meer dan 80,000 winkels in Nederland. Elke cirkel een provincie
            </MapStoryItem>
            <MapStoryItem title="Dit" view="circles" :bounds="bounds">
              Midden van cirkel: meeste inwoners in de buurt
            </MapStoryItem>
            <MapStoryItem title="Dit" view="circles" :bounds="bounds">
              Buiten van cirkel: minste inwoners in de buurt
            </MapStoryItem>
            <MapStoryItem title="Dat" view="circles" :bounds="[[5.735213,52.557867],[6.107976,52.783906]]">
              De meeste winkels in Zuid-Holland
            </MapStoryItem>
            <MapStoryItem title="Dat" view="circles" :bounds="[[5.974597,52.503202],[6.075622,52.564655]]">
              En de minste in Flevoland. Alleen maar winkels mét adres
            </MapStoryItem>
            <MapStoryItem title="Vis" view="circles" field="nearbyShops">
              Elke
            </MapStoryItem>
            <MapStoryItem title="Koek" view="circles">
              Chips
            </MapStoryItem>
          </CreateMapStory>
        </template>
        <template v-else>
          <BoxHeading v-if="selectedFeature" @close="resetSelectedFeature">
            <div class="box-heading-contents">
              <h3>{{ address }}</h3>
              <button @click="switchView">{{ switchViewTitle }}&nbsp;→</button>
            </div>
          </BoxHeading>

          <div class="contents">
            <p v-if="selectedFeature">
              <strong>{{ format(selectedFeature.properties[currentField]) }}</strong> binnen 1 km. van deze winkel.
              <!-- Vanaf dit adres met postcode <strong>{{ feature.properties.postcode }}</strong> is een gebied van
              <strong>{{ format(feature.properties.area) }}</strong> te bereiken. -->

            </p>

            <Legend :color="color" :format="format" />
            <div>
              <select v-model="currentField">
                <option v-for="field in Object.keys(fields)" :key="field"
                  :value="field" :selected="field === currentField">{{ fields[field].title }} binnen 1 km.</option>
              </select>
            </div>
            <div>
              <em>
                Winkels in Nederland, gegroepeerd per provincie. Hoe dichter bij het midden, hoe meer inwoners in de buurt.
              </em>
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

import { toggleCircleView, toggleWorldView,
  setCircleMapStyle, setCircleMapSourceAndLayers, setWorldMapSourceAndLayers,
  setCircleLayersColor, setWorldLayersColor
  } from './../../../../lib/waar-we-winkelen/map.js'

import { scaleSqrt, scaleQuantize } from 'd3-scale'

// TODO: move config from lib dir to app
import config from '../../../../lib/waar-we-winkelen/config.js'
import { fetchFeatureData } from '../../../../lib/waar-we-winkelen/data.js'

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
      storyPadding: 5,
      bounds: [
        [5.41626, 52.163113],
        [6.514893, 52.779509]
      ],
      mapStoryStarted: false,
      selectedFeature: undefined,

      colors: [
        '#f0f462', '#cae872', '#a1dc80', '#70d08c', '#9d99e5', '#d56ed4', '#ff00c3'
        // '#223d6f', '#377a9a', '#febd8a', '#ff81a8', '#ff00c3'
        // '#000046', '#223d6f', '#377a9a', '#febd8a', '#ff81a8', '#ff00c3'
        // '#f0f462', '#cae872', '#a1dc80', '#70d08c', '#9d99e5', '#d56ed4', '#ff00c3'
      ],

      fields: {
         nearbyPeople: {
          title: 'Aantal inwoners',
          extent: [
            250, 25000
          ],
          format: (d) => Math.round(d)
        },
         nearbyShops: {
          title: 'Aantal winkels',
          extent: [
            0, 750
          ],
          format: (d) => Math.round(d)
        },
        nearbyFoodAndDrink: {
          title: 'Aantal cafés en restaurants',
          extent: [
            0, 500
          ],
          format: (d) => Math.round(d)
        },
        'nearbyBuildings.count': {
          title: 'Aantal gebouwen',
          extent: [
            0, 7500
          ],
          format: (d) => d
        },
        'nearbyBuildings.meanYear': {
          title: 'Gemiddeld bouwjaar van gebouwen',
          extent: [
            1850, 2020
          ],
          format: (d) => d
        },
        'nearbyBuildings.meanArea': {
          title: 'Gemiddelde oppervlakte van gebouwen',
          extent: [
            0, 350
          ],
          format: (d) => Math.round(d) + ' m²'
        },
        vacantPercentage: {
          title: 'Leegstand van winkelpanden',
          extent: [
            0, 20
          ],
          format: (d) => Math.round(d) + '%'
        },
        chainPercentage: {
          title: 'Aantal winkels onderdeel van winkelketen',
          extent: [
            0, 25
          ],
          format: (d) => Math.round(d) + '%'
        }
      },

      featureData: undefined,
      currentView: 'circles',
      currentField: 'vacantPercentage',

      sourceAndLayersAdded: false
    }
  },
  computed: {
    switchViewTitle: function () {
      return this.currentView === 'circles' ? 'Kaart' : 'Cirkels'
    },
    address: function () {
      const { street, houseNumber, city } = this.selectedFeature.properties
      return `${street} ${houseNumber}, ${city}`
    },
    mapHeight: function () {
      return this.$refs.map.offsetHeight
    },
    extent: function () {
      return this.fields[this.currentField].extent
    },
    format: function () {
      return this.fields[this.currentField].format
    },
    color: function () {
      return scaleQuantize()
        .domain(this.extent)
        .range(this.colors)
    },
    readyToCreateLayers: function () {
      return this.mapLoaded
    }
  },
  watch: {
    currentField: function () {
      if (this.currentView === 'circles') {
        setCircleLayersColor(this.map, this.currentField, this.color)
      } else {
        setWorldLayersColor(this.map, this.currentField, this.color)
      }
    },
    mapLoaded: function () {
      const map = this.map

      this.fitBounds(this.bounds)

      map.on('moveend', () => {
        console.log('moveend', map.getZoom(), JSON.stringify(map.getBounds().toArray().map((c) => c.map((n) => parseFloat(n.toFixed(6))))), map.getZoom())
      })

      map.on('click', 'bovenland-circles-circles', this.mapClick)
      map.on('click', 'bovenland-world-buildings', this.mapClick)

      map.on('styledata', (event) => {
        if (this.mapLoaded && !this.sourceAndLayersAdded) {
          if (this.currentView === 'circles') {
            setCircleMapSourceAndLayers(this.map, config, this.currentField, this.color)
          } else {
            setWorldMapSourceAndLayers(this.map, config, this.currentField, this.color)
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
    resetSelectedFeature: function () {
      this.selectedFeature = undefined
    },
    fitBounds: function (bounds, options) {
      if (!bounds) {
        return
      }

      const boxHeight = this.mapHeight - this.$refs.box.$el.getBoundingClientRect().top

      const padding = {
        top: this.storyPadding,
        bottom: this.storyPadding + boxHeight,
        left: this.storyPadding,
        right: this.storyPadding
      }

      // https://docs.mapbox.com/mapbox-gl-js/api/properties/#paddingoptions
      this.map.fitBounds(bounds, {
        ...options,
        padding
      })
    },
    mapClick: function (event) {
      if (event.features && event.features.length) {
        this.selectedFeature = event.features[0]
      }
    },
    switchView: function () {
      if (this.currentView === 'circles') {
        this.setView('world')
      } else if (this.currentView === 'world') {
        this.setView('circles')
      }
    },
    setView: function (view) {
      this.sourceAndLayersAdded = false

      if (view === 'world') {
        toggleWorldView(this.map, this.selectedFeature)
        this.currentView = 'world'
      } else if (view === 'circles') {
        toggleCircleView(this.map, this.selectedFeature)
        this.currentView = 'circles'
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
    startMapStory: function () {
      this.mapStoryStarted = true
    },
    onMapStoryEnd: function () {
      this.mapStoryStarted = false
    },

    onMapStoryUpdate: function (data) {
      if (data.view && this.currentView !== data.view) {
        this.setView(data.view)
        this.fitBounds(data.bounds)
      } else {
        this.fitBounds(data.bounds, {
          linear: false,
          essential: true
        })
      }
    }
  },
  mounted: function () {
    this.loadFeatureData()
  }
}
</script>

<style lang="scss" scoped>
// @import "@/assets/sass/partials/base.scss";
// @import "@/assets/sass/partials/mixins.scss";
// @import "@/assets/sass/partials/button.scss";

.grid-area {
  grid-area: box;
}

.box-heading-contents {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 5px;
}

.contents > *:not(:first-child) {
  padding-top: 10px;
}

select {
  font-size: 90%;
  width: 100%;
  background: #F2F2F2;
  border: none;
  border: 1px solid #aaa;
  border-radius: 5px;
  /* cursor: pointer; */
}
</style>