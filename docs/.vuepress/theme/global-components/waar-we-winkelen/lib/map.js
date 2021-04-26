export function createMapSources (map, config) {
  map.addSource('protomaps', {
    type: 'vector',
    tiles: [config.protomaps.tileUrl],
    scheme: 'tms',
    maxzoom: 14
  })

  map.addSource('bovenland', {
    type: 'vector',
    tiles: [config.circles.tileUrl],
    maxzoom: 16
  })

  map.addSource('map', {
    type: 'vector',
    tiles: [config.map.tileUrl],
    maxzoom: 16
  })
}

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

function setCircleLayersVisibility (map, visible) {
  circleLayers.forEach((layerId) => setLayerVisibility(map, layerId, visible))
}

function setMapLayersVisibility (map, visible) {
  mapLayers.forEach((layerId) => setLayerVisibility(map, layerId, visible))
}

export function setCircleLayersColor (map, color) {
  map.setPaintProperty('circles', 'fill-color', color)
  map.setPaintProperty('roads', 'line-color', color)
  map.setPaintProperty('buildings', 'fill-color', color)
}

export function createCircleLayers (map, color, visible) {
console.log('createCircleLayers')
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
      'fill-color': color
    },
    layout: visibleLayout(visible)
  })

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
    source: 'bovenland',
    'source-layer': 'roads',
    'layout': {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': color,
      'line-opacity': 1,
      'line-width': {
        'stops': [
          [14, 0],
          [19, 10]
        ]
      },
    },
    layout: visibleLayout(visible)
  })

  map.addLayer({
    id: 'buildings',
    type: 'fill',
    source: 'bovenland',
    'source-layer': 'buildings',
    paint: {
      'fill-opacity': {
        'stops': [
          [11, 0],
          [12, 1]
        ]
      },
      'fill-color': color,
      'fill-outline-color': 'white'
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

export function createMapLayers (map, color, visible) {
  // https://raw.githubusercontent.com/protomaps/styles/master/mbgl/base.json

  map.addLayer({
    id: 'water2',
    type: 'fill',
    source: 'protomaps',
    'source-layer': 'water',
    paint: {
      'fill-opacity': {
        'stops': [
          [8, .5],
          [15.5, .9]
        ]
      },
      'fill-color': '#eee'
    },
    layout: visibleLayout(visible)
  })

  map.addLayer({
    id: 'map-circles',
    type: 'fill',
    source: 'map',
    'source-layer': 'circles',
    paint: {
      'fill-opacity': 1,
      'fill-color': color
    },
    layout: visibleLayout(visible)
  })

  map.addLayer({
    id: 'roads2',
    type: 'line',
    source: 'protomaps',
    'source-layer': 'roads',
    paint: {
      'line-color': '#999'
    },
    layout: visibleLayout(visible)
  })

  map.addLayer({
    id: 'buildings2',
    type: 'fill',
    source: 'protomaps',
    'source-layer': 'buildings',
    paint: {
      'fill-opacity': {
        'stops': [
          [8, .5],
          [15.5, .9]
        ]
      },
      'fill-color': '#666'
    },
    layout: visibleLayout(visible)
  })
}

export function toggleMapView (map, featureProperties) {
  const {lng: centerLon, lat: centerLat} = map.getCenter()

  const [packedLon, packedLat] = JSON.parse(featureProperties.centerPacked)
  const [lon, lat] = JSON.parse(featureProperties.center)

  const diffLon = centerLon - packedLon
  const diffLat = centerLat - packedLat
  const center = [
    lon + diffLon,
    lat + diffLat
  ]

  setMapLayersVisibility(map, true)
  setCircleLayersVisibility(map, false)
  map.jumpTo({ center })
}

export function toggleCircleView (map, featureProperties) {
  const {lng: centerLon, lat: centerLat} = map.getCenter()

  const [lon, lat] = JSON.parse(featureProperties.center)
  const [packedLon, packedLat] = JSON.parse(featureProperties.centerPacked)

  const diffLon = centerLon - lon
  const diffLat = centerLat - lat

  const center = [
    packedLon + diffLon,
    packedLat + diffLat
  ]

  setCircleLayersVisibility(map, true)
  setMapLayersVisibility(map, false)
  map.jumpTo({ center })
}
