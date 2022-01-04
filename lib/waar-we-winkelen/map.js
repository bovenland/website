export const circleMapStyle = {
  version: 8,
  sources: {},
  layers: []
}

export function setCircleMapStyle (map, config, color) {
  map.setStyle(circleMapStyle)
}

export function setCircleMapSourceAndLayers (map, config, color) {
  if (!map.getSource('bovenland-circles')) {
    map.addSource('bovenland-circles', {
      type: 'vector',
      tiles: [config.circles.tileUrl],
      maxzoom: 16
    })
  }

  addCircleLayers(map, color, true)
}

export function setWorldMapStyle (map, config, color) {
  // load from config
  map.setStyle('mapbox://styles/bertspaan/cjxdmn9tr08xh1cl7ttmaeaqn')
}

export function setWorldMapSourceAndLayers (map, config, color) {
  if (!map.getSource('bovenland-world')) {
    map.addSource('bovenland-world', {
      type: 'vector',
      tiles: [config.world.tileUrl],
      maxzoom: 16
    })
  }

  addWorldLayers(map, color, true)
}

// export function createMapSources (map, config) {
//   map.addSource('bovenland', {
//     type: 'vector',
//     tiles: [config.circles.tileUrl],
//     maxzoom: 16
//   })

//   // map.addSource('map', {
//   //   type: 'vector',
//   //   tiles: [config.map.tileUrl],
//   //   maxzoom: 16
//   // })
// }

function visibility (visible) {
  return visible ? 'visible' : 'none'
}

function visibleLayout (visible) {
  return {
    visibility: visibility(visible)
  }
}

const circleLayers = [
  'circles',
  'water',
  'roads',
  'buildings'
]

const mapLayers = [
  'water2',
  'buildings2',
  'roads2',
  'map-circles'
]

function setLayerVisibility (map, layerId, visible) {
  map.setLayoutProperty(layerId, 'visibility', visibility(visible))
}

// function setCircleLayersVisibility (map, visible) {
//   circleLayers.forEach((layerId) => setLayerVisibility(map, layerId, visible))
// }

// function setMapLayersVisibility (map, visible) {
//   mapLayers.forEach((layerId) => setLayerVisibility(map, layerId, visible))
// }

export function setCircleLayersColor (map, color) {
  map.setPaintProperty('circles', 'fill-color', color)
  map.setPaintProperty('roads', 'line-color', color)
  map.setPaintProperty('buildings', 'fill-color', color)
}

export function addWorldLayers (map, color, visible) {
  map.addLayer({
    id: 'bovenland-world-buildings',
    type: 'fill',
    source: 'bovenland-world',
    'source-layer': 'buildings',
    paint: {
      // 'fill-opacity': {
      //   'stops': [
      //     [12, 1],
      //     [13, 0.1]
      //   ]
      // },
      'fill-color': color
    },
    layout: visibleLayout(visible)
  })
}

export function addCircleLayers (map, color, visible) {
  map.addLayer({
    id: 'bovenland-circles-circles',
    type: 'fill',
    source: 'bovenland-circles',
    'source-layer': 'circles',
    paint: {
      'fill-opacity': {
        'stops': [
          [12, 1],
          [13, 0.1]
        ]
      },
      'fill-color': color
    },
    layout: visibleLayout(visible)
  })

  map.addLayer({
    id: 'water',
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
    },
    layout: visibleLayout(visible)
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
  //   },
  //   layout: visibleLayout(visible)
  // })

  map.addLayer({
    id: 'roads',
    type: 'line',
    source: 'bovenland-circles',
    'source-layer': 'roads',
    paint: {
      'line-color': color,
      'line-opacity': 0.5,
      'line-width': {
        stops: [
          [14, 0],
          [19, 10]
        ]
      }
    },
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
      ...visibleLayout(visible)
    }
  })

  map.addLayer({
    id: 'buildings',
    type: 'fill',
    source: 'bovenland-circles',
    'source-layer': 'buildings',
    paint: {
      'fill-opacity': {
        'stops': [
          [11, 0],
          [12, 1]
        ]
      },
      'fill-color': color,
      'fill-outline-color': 'black'
    },
    layout: visibleLayout(visible)
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
  //   },
  //   layout: visibleLayout(visible)
  // })
}

export function toggleWorldView (map, config, color, featureProperties) {
  const {lng: centerLon, lat: centerLat} = map.getCenter()

  const [packedLon, packedLat] = JSON.parse(featureProperties.centerPacked)
  const [lon, lat] = JSON.parse(featureProperties.center)

  const diffLon = centerLon - packedLon
  const diffLat = centerLat - packedLat
  const center = [
    lon + diffLon,
    lat + diffLat
  ]

  setWorldMapStyle(map, config, color)

  // setMapLayersVisibility(map, true)
  // setCircleLayersVisibility(map, false)
  map.jumpTo({ center })
}

export function toggleCircleView (map, config, color, featureProperties) {
  const {lng: centerLon, lat: centerLat} = map.getCenter()

  const [lon, lat] = JSON.parse(featureProperties.center)
  const [packedLon, packedLat] = JSON.parse(featureProperties.centerPacked)

  const diffLon = centerLon - lon
  const diffLat = centerLat - lat

  const center = [
    packedLon + diffLon,
    packedLat + diffLat
  ]

  setCircleMapStyle(map, config, color)

  // setCircleLayersVisibility(map, true)
  // setMapLayersVisibility(map, false)
  map.jumpTo({ center })
}
