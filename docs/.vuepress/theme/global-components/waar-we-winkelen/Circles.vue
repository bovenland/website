<template>
  <div class="container">
    <div class="map" id="gl-circles"></div>
    <CreateMapStory :map="map">
      <Content slot-key="story1" />
      <Content slot-key="story2" />
      <Content slot-key="story3" />
    </CreateMapStory>
  </div>
</template>

<script>
import { Map } from 'maplibre-gl'

export default {
  name: 'Circles',
  data () {
    return {
      map: undefined
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

    const domain = [0, 174]

    const colors = [
      '#3F7A50',
      '#61B479',
      '#85ECA3',
      '#B3F7C6',
      '#E5FDEB',
    ]

    const colorSteps = colors.map((color, index) => {
      if (index < colors.length - 1) {
        const domainDiff = domain[1] - domain[0]
        return [color, domainDiff / colors.length * (index + 1) + domain[0]]
      } else {
        return color
      }
    }).flat()

    // console.log(colorSteps)÷


    const fillColor = [
      'step',
      ['get', 'nearbyShops'],
      ...colorSteps
    ]

    const map = new Map({
      container: 'gl-circles',
      style: {
        version: 8,
        sources: {},
        layers: []
      },
      minZoom: 9,
      maxZoom: 19,
      center: [lon, lat],
      zoom
    })

    this.map = map

    map.on('load', () => {
      map.addSource('bovenland', {
        type: 'vector',
        tiles: [`${this.$themeConfig.tiles.baseUrl}/{z}/{x}/{y}.pbf`],
        maxzoom: 16
      })

      map.addLayer({
        id: 'circles',
        type: 'fill',
        source: 'bovenland',
         'source-layer': 'circles',
        paint: {
          'fill-opacity': {
            'stops': [
              [12, 1],
              [13, 0.1]
            ]
          },
          'fill-opacity-transition': {duration: 300},
          'fill-color': fillColor
        }
      })

      // window.setTimeout(() => {
      //   const domain = [0, 2986]

      //   const color = d3.scaleLinear().domain(domain)
      //     .interpolate(d3.interpolateHcl)
      //     .range([d3.rgb(colorFrom), d3.rgb(colorTo)])

      //   // map.setPaintProperty('circles', 'fill-opacity', 0)

      //   // map.setPaintProperty('circles', 'fill-color', {
      //   //   property: 'nearbyPeople',
      //   //   stops: [
      //   //     [domain[0], color(domain[0])],
      //   //     [domain[1] / 4, color(domain[1] / 4)],
      //   //     [domain[1] / 2, color(domain[1] / 2)],
      //   //     [domain[1] / (4 / 3), color(domain[1] / (4 / 3))],
      //   //     [domain[1], color(domain[1])]
      //   //   ]
      //   // })
      // }, 4000)

      map.addLayer({
        id: 'water',
        type: 'fill',
        source: 'bovenland',
        'source-layer': 'water',
        paint: {
          'fill-opacity': {
            'stops': [
              [13, 0],
              [13.5, 0.6]
            ]
          },
          'fill-color': '#fff'
        }
      })

      map.addLayer({
        id: 'roads-case',
        type: 'line',
        source: 'bovenland',
        'source-layer': 'roads',
        'layout': {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': fillColor,
          'line-opacity': 1,
          'line-width': {
            'stops': [
              [14, 0],
              [19, 16]
            ]
          },
        }
      })

      map.addLayer({
        id: 'roads',
        type: 'line',
        source: 'bovenland',
        'source-layer': 'roads',
        'layout': {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#aaa',
          'line-opacity': 1,
          'line-width': {
            'stops': [
              [14, 0],
              [19, 40]
            ]
          },
        }
      })

      map.addLayer({
        id: 'buildings',
        type: 'fill',
        source: 'bovenland',
        'source-layer': 'buildings',
        paint: {
          'fill-opacity': {
            'stops': [
              [12, 0],
              [12.5, 1]
            ]
          },
          'fill-color': fillColor,
          'fill-outline-color': 'white'
        }
      })

      // map.on('moveend', () => {
      //   console.log('moveend', map.getZoom(), map.getCenter())
      // })

      map.on('click', 'circles', (event) => {
        const {lng: centerLon, lat: centerLat} = map.getCenter()

        if (event.features.length) {
          const zoom = map.getZoom()
          const feature = event.features[0]

          const [packedLon, packedLat] = JSON.parse(feature.properties.centerPacked)

          const diffLon = centerLon - packedLon
          const diffLat = centerLat - packedLat

          const [lon, lat] = JSON.parse(feature.properties.center)
          const view = `${zoom}/${lat + diffLat}/${lon + diffLon}`

          console.log('to map', view)

          // this.$router.push({ path: 'map', query: { view }})
        }
      })
    })
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
