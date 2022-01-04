export const emptyGeoJSON =  {
  type: 'FeatureCollection',
  features: []
}

export function setMapStyle (map) {
  map.setStyle('mapbox://styles/bertspaan/ckwqjhli61bul14mkm7jnus8z')
}

export function setMapSourceAndLayers (map) {
  const layers = map.getStyle().layers

  let firstSymbolId
  for (const layer of layers) {
    if (layer.type === 'symbol') {
      firstSymbolId = layer.id
      break
    }
  }

  if (!map.getSource('bovenland')) {
    map.addSource('bovenland', {
      type: 'vector',
      tiles: ['https://files.boven.land/tiles/vijftien-minuten-verderop/{z}/{x}/{y}.pbf'],
      // tiles: ['http://localhost:7567/{z}/{x}/{y}.pbf'],
      minzoom: 7,
      maxzoom: 13
    })

    map.addSource('routes', {
      type: 'geojson',
      data: emptyGeoJSON
    })

    map.addSource('area', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    })

    map.addLayer({
      id: 'area',
      type: 'fill',
      source: 'area',
      layout: {
      },
      paint: {
        'fill-color': '#42BDC6',
        'fill-opacity': 0,
        'fill-opacity-transition': {
          duration: 1500
        }
      }
    }, firstSymbolId)

    map.addLayer({
      id: 'origins',
      type: 'circle',
      source: 'bovenland',
      minzoom: 7,
      maxzoom: 18,
      'source-layer': 'analyzed',
      paint: {
        'circle-radius': {
          base: 1.75,
          stops: [
            [7, 0.8],
            [12, 6],
            [14, 8]
          ]
        },
        'circle-color': [
          // ['#4861ed', '#748cca', '#92b3a8', '#b6d785', '#f0f462', '#feab9d', '#dd6c60', '#ab342d', '#6e0000']
          'interpolate',
          ['linear'], ['get', 'area'],
          // TODO: from config
          2000000, '#F0F462',
          20000000, '#F749A8'
        ]
      },
      //
      //  7 0 1
      //   \|/
      // 6 - - 2
      //   /|\
      //  5 4 3
      //
      // filter: [
      //   'all',
      //   [
      //     '<=',
      //     [
      //       'max',
      //       ['get', 'maxDistancePerSegment0'],
      //       ['get', 'maxDistancePerSegment4'],
      //     ],
      //     500
      //   ],
      //   [
      //     '>=',
      //     [
      //       'min',
      //       ['get', 'maxDistancePerSegment2'],
      //       ['get', 'maxDistancePerSegment6'],
      //       ['get', 'maxDistancePerSegment1'],
      //       ['get', 'maxDistancePerSegment3'],
      //       ['get', 'maxDistancePerSegment5'],
      //       ['get', 'maxDistancePerSegment7']
      //     ],
      //     1000
      //   ]
      // ]
    }, firstSymbolId)

    map.addLayer({
      id: 'routes',
      type: 'line',
      source: 'routes',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#42BDC6',
        'line-width': {
          property: 'index',
          stops: [
            [0, 5],
            [10, 3]
          ]
        }
      }
    }, firstSymbolId)
  }
}