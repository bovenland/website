export async function fetchFeatureData (config) {
  const featureData = await fetch('http://localhost:8866/map-data.json', {
    mode: 'cors'
  }).then((response) => response.json())

  return featureData
}