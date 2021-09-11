import { interpolateOrRd, interpolatePuBuGn, interpolateYlGn } from 'd3-scale-chromatic'

const colorRange = [
  0.1,
  0.3,
  0.7,
  1.0
]

const shopColors = colorRange.map(interpolatePuBuGn).reverse()
const boxColors = colorRange.map(interpolateYlGn).reverse()
const servicePointColors = colorRange.map(interpolateOrRd).reverse()

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
    'case',
    ['==', ['get', 'query'], 'shops'],
    shopFillColor(field, extent),
    ['==', ['get', 'query'], 'boxes'],
    boxFillColor(field, extent),
    servicePointFillColor(field, extent)
  ]
}
