import chroma from 'chroma-js'
import { getColorSteps } from '../colors.js'

export const circleMapStyle = {
  version: 8,
  sources: {},
  layers: [],
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf'
}

export function setCircleMapStyle (map) {
  map.setStyle(circleMapStyle)
}

export function setCircleMapSourceAndLayers (map, config, field, color) {
  if (!map.getSource('bovenland-circles')) {
    map.addSource('bovenland-circles', {
      type: 'vector',
      tiles: [config.circles.tileUrl],
      maxzoom: 16
    })
  }

  addCircleLayers(map, field, color)
}

export function setWorldMapStyle (map) {
  map.setStyle('mapbox://styles/bertspaan/ckwqjhli61bul14mkm7jnus8z')
}

export function setWorldMapSourceAndLayers (map, config, field, color) {
  if (!map.getSource('bovenland-world')) {
    map.addSource('bovenland-world', {
      type: 'vector',
      tiles: [config.world.tileUrl],
      maxzoom: 16
    })
  }

  addWorldLayers(map, field, color)
}

export function setCircleLayersColor (map, field, color) {
  map.setPaintProperty('bovenland-circles-circles', 'fill-color', getColorSteps(field, color))
  map.setPaintProperty('bovenland-circles-roads', 'line-color', getColorSteps(field, color, (color) => chroma(color).darken(2).hex()))
  map.setPaintProperty('bovenland-circles-buildings', 'fill-color', [
    'case',
    ['boolean', ['get', 'centerBuilding'], false],
    getColorSteps(field, color, (color) => chroma(color).brighten(1).hex()),
    getColorSteps(field, color, (color) => chroma(color).darken(1).hex())
  ])
}

export function setWorldLayersColor (map, field, color) {
  map.setPaintProperty('bovenland-world-buildings-outline', 'line-color', getColorSteps(field, color))
  map.setPaintProperty('bovenland-world-buildings', 'fill-color', getColorSteps(field, color))
}

export function addWorldLayers (map, field, color) {
  const layers = map.getStyle().layers

  let firstSymbolId
  for (const layer of layers) {
    if (layer.type === 'symbol') {
      firstSymbolId = layer.id
      break
    }
  }

  map.addLayer({
    id: 'bovenland-world-buildings-outline',
    type: 'line',
    source: 'bovenland-world',
    'source-layer': 'buildings',
    maxzoom: 14,
    paint: {
      'line-opacity': 0.8,
      'line-width': {
        stops: [
          [8, 2],
          [12, 0.8],
          [14, 0]
        ]
      },
      'line-color': getColorSteps(field, color)
    },
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    }
  }, firstSymbolId)

  map.addLayer({
    id: 'bovenland-world-buildings',
    type: 'fill',
    source: 'bovenland-world',
    'source-layer': 'buildings',
    paint: {
      'fill-color': getColorSteps(field, color),
      'fill-outline-color': 'black'
    }
  }, firstSymbolId)
}

export function addCircleLayers (map, field, color) {
  map.addLayer({
    id: 'bovenland-circles-circles',
    type: 'fill',
    source: 'bovenland-circles',
    'source-layer': 'circles',
    paint: {
      'fill-opacity': {
        stops: [
          [12, 1],
          [13, 0.1]
        ]
      },
      // 'fill-opacity': {
      //   stops: [
      //     [12, 1],
      //     [13, 0.1]
      //   ]
      // },
      'fill-color-transition': {
        duration: 1000
      },
      'fill-color': getColorSteps(field, color)
    }
  })

  map.addLayer({
    id: 'bovenland-circles-water',
    type: 'fill',
    source: 'bovenland-circles',
    'source-layer': 'water',
    paint: {
      'fill-opacity': {
        stops: [
          [13, 0],
          [13.5, 1]
        ]
      },
      'fill-color': '#222429'
    }
  })

  // map.addLayer({
  //   id: 'roads-case',
  //   type: 'line',
  //   source: 'bovenland',
  //   'source-layer': 'roads',
  //   'layout': {
  //     'line-cap': 'round',
  //     'line-join': 'round',
  //   },
  //   paint: {
  //     'line-color': color,
  //     'line-opacity': 1,
  //     'line-width': {
  //       'stops': [
  //         [14, 0],
  //         [19, 16]
  //       ]
  //     },
  //   }
  // })

  map.addLayer({
    id: 'bovenland-circles-roads',
    type: 'line',
    source: 'bovenland-circles',
    'source-layer': 'roads',
    paint: {
      'line-color': getColorSteps(field, color, (color) => chroma(color).darken(2).hex()),
      'line-opacity': 1,
      'line-width': {
        stops: [
          [14, 0],
          [19, 10]
        ]
      }
    },
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    }
  })

  map.addLayer({
    id: 'bovenland-circles-buildings',
    type: 'fill',
    source: 'bovenland-circles',
    'source-layer': 'buildings',
    paint: {
      'fill-opacity': {
        stops: [
          [11, 0],
          [12, 1]
        ]
      },
      'fill-color-transition': {
        duration: 1000
      },
      'fill-color': [
        'case',
        ['boolean', ['get', 'centerBuilding'], false],
        getColorSteps(field, color, (color) => chroma(color).brighten(1).hex()),
        getColorSteps(field, color, (color) => chroma(color).darken(1).hex())
      ],
      'fill-outline-color': 'black'
    }
  })

  map.addLayer({
    id: 'bovenland-circles-province-labels',
    type: 'symbol',
    source: 'bovenland-circles',
    'source-layer': 'provinces',
    maxzoom: 12,
    layout: {
      'symbol-avoid-edges': true,
      'text-allow-overlap': true,
      'text-field': ['get', 'province'],
      'text-size': [
        'interpolate',
        ['exponential', 2],
        ['zoom'],
        7, 8,
        11, 32
      ]
    },
    paint: {
      'text-color': 'white',
      'text-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        11, 1,
        12, 0
      ],
      'text-halo-color': 'rgba(0, 0, 0, 0.5)',
      'text-halo-width': 2
    }
  })

  map.addLayer({
    id: 'bovenland-circles-circle-labels',
    type: 'symbol',
    source: 'bovenland-circles',
    'source-layer': 'circleLabels',
    minzoom: 15.5,
    layout: {
      'symbol-placement': 'point',
      // 'text-font': ['Open Sans Regular'],
      'text-field': [
        'concat',
        ['get', 'street'],
        ' ',
        ['get', 'houseNumber'],
        '\n',
        ['get', 'city']
      ],
      'text-size': 16,
      'text-max-width': 100
    },
    paint: {
      'text-color': 'white',
      'text-translate': [0, 35]
    }
  })

  // map.addLayer({
  //   id: 'mask',
  //   type: 'fill',
  //   source: 'bovenland',
  //   'source-layer': 'circles',
  //   paint: {
  //     'fill-opacity':  [
  //       'case',
  //       ['boolean', ['feature-state', 'selected'], false],
  //       0.1,
  //       0.9
  //     ],
  //     'fill-opacity-transition': {duration: 3000},
  //     'fill-color': 'white'
  //   }
  // })
}

export function toggleWorldView (map, feature) {
  setWorldMapStyle(map)

  if (feature) {
    const {lng: mapCenterLon, lat: mapCenterLat} = map.getCenter()

    const [circlesLon, circlesLat] = JSON.parse(feature.properties.centerCircles)
    const [worldLon, worldLat] = JSON.parse(feature.properties.centerWorld)

    const diffLon = mapCenterLon - circlesLon
    const diffLat = mapCenterLat - circlesLat

    const center = [
      worldLon + diffLon,
      worldLat + diffLat
    ]

    map.jumpTo({ center })
  }
}

export function toggleCircleView (map, feature) {
  setCircleMapStyle(map)

  if (feature) {
    const {lng: mapCenterLon, lat: mapCenterLat} = map.getCenter()

    const [worldLon, worldLat] = JSON.parse(feature.properties.centerWorld)
    const [circlesLon, circlesLat] = JSON.parse(feature.properties.centerCircles)

    const diffLon = mapCenterLon - worldLon
    const diffLat = mapCenterLat - worldLat

    const center = [
      circlesLon + diffLon,
      circlesLat + diffLat
    ]

    map.jumpTo({ center })
  }
}
