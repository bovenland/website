import { fetchJson } from '../fetch.js'

export async function fetchShopNamesAndTypes () {
  const url = 'https://files.boven.land/data/waar-we-winkelen/names-and-types.json'
  const shopNamesAndTypes = await fetchJson(url)

  const shopNamesAndTypesByOsmId = {}

  shopNamesAndTypes.forEach(({osmId, shops}) => {
    shopNamesAndTypesByOsmId[osmId] = shops
  })

  return shopNamesAndTypesByOsmId
}
