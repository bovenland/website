import { interpolateOrRd, interpolatePuBuGn, interpolateYlGn } from 'd3-scale-chromatic'

import { interpolateHslLong, interpolateHclLong } from 'd3-interpolate'

const shopColorsRange = [
  '#F749A8',
  'rgb(255, 237, 247)'
]

const colorRange = [
  0.1,
  0.3,
  0.7,
  // 1.0
]

// const colorRange = [
//   0.1,
//   0.3,
//   0.5,
//   0.7,
//   0.9,
// ]

const interpolate = (range) => interpolateHslLong(range[0], range[1])

const shopColors = colorRange.map(interpolate(shopColorsRange))

function colorSteps (colors, extent) {
  return colors.map((color, index) => {
    if (index < colors.length - 1) {
      const extentDiff = extent[1] - extent[0]
      return [color, extentDiff / colors.length * (index + 1) + extent[0]]
    } else {
      return color
    }
  }).flat()
}

function shopFillColor (field, extent) {
  return [
    'step',
    ['get', field],
    ...colorSteps(shopColors, extent)
  ]
}

export function getColor (field, extent) {
  return [
    "step",
    [
      "get",
      "nearbyShops"
    ],
'#f0f462',
5,
'#f7cf79',
10,
'#faa98b',
100,
'#fa7f9b',
200,
'#f749a8'


    // '#4861ed',
    // 10,
    // '#748cca',
    // 20,
    // '#92b3a8',
    // 50,
    // '#b6d785',
    // 100,
    // '#f0f462',
    // 150,
    // '#feab9d',
    // 200,
    // '#dd6c60',
    // 250,
    // '#ab342d',
    // 300,
    // '#6e0000'

  ]

  // return [
  //   'case',
  //   ['==', ['get', 'query'], 'shops'],
  //   shopFillColor(field, extent),
  //   ['==', ['get', 'query'], 'boxes'],
  //   boxFillColor(field, extent),
  //   servicePointFillColor(field, extent)
  // ]
}
