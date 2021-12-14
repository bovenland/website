import { interpolateOrRd, interpolatePuBuGn, interpolateYlGn } from 'd3-scale-chromatic'

import { interpolateHslLong, interpolateHclLong } from 'd3-interpolate'

const shopColorsRange = [
  '#F749A8',
  'rgb(255, 237, 247)'
]

const boxColorsRange = [
  '#42BDC6',
  'rgb(237, 249, 250)'
]

const servicePointColorsRange = [
  '#F0F462',
  'rgb(254, 254, 240)'
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
const boxColors = colorRange.map(interpolate(boxColorsRange))
const servicePointColors = colorRange.map(interpolate(servicePointColorsRange))

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

function boxFillColor (field, extent) {
  return [
    'step',
    ['get', field],
    ...colorSteps(boxColors, extent)
  ]
}

function servicePointFillColor (field, extent) {
  return [
    'step',
    ['get', field],
    ...colorSteps(servicePointColors, extent)
  ]
}

export function getColor (field, extent) {
  return [
    "step",
    [
      "get",
      "nearbyShops"
    ],
    "green",
    20,
    "orange",
    100,
    "red",
    300,
    "blue"
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
