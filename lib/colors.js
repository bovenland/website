function steps (color, modifyColor) {
  const domain = color.domain()

  const values = [
    domain[0],
    ...color.thresholds(),
    domain[1]
  ]

  if (!modifyColor) {
    modifyColor = (color) => color
  }

  return values.map((value, index) => {
    if (index < values.length - 1) {
      return [modifyColor(color(value)), value]
    } else {
      return modifyColor(color(value))
    }
  }).flat()
}

export function getColorSteps (field, color, modifyColor) {
  return [
    'step',
    ['get', field],
    ...steps(color, modifyColor)
  ]
}
