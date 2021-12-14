import { fetchJson } from '../fetch.js'

export async function fetchFeatureData (config) {
  const featureData = await fetchJson(config.data.url)
  return featureData
}
