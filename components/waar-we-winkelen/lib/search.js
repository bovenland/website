// fetchData: async function () {
//   const featureData = await fetch('http://localhost:8080/data/map-data.json', {
//     mode: 'cors'
//   }).then((response) => response.json())

//   this.featureData = featureData

//   const options = {
//     findAllMatches: true,
//     threshold: 0.2,
//     ignoreLocation: true,
//     ignoreFieldNorm: true,
//     keys: [
//       'name',
//       'chain'
//     ]
//   }

//   const fuse = new Fuse(this.featureData.rows, options)
//   this.fuse = fuse

//   this.circleIdsByOsmId = this.featureData.rows
//     .reduce((idsByOsmId, row) => ({
//       ...idsByOsmId,
//       [row.osmId]: row.circleId
//     }), {})
// },
// throttledTextSearch: throttle(function (query) {
//   this.textSearch(query)
// }, 500),
// textSearch: function (pattern) {
//   if (this.fuse && pattern.length > 4) {
//     console.log('Go!')

//     const results = this.fuse.search(`=${pattern}`)
//     const osmIds = results.map((result) => result.item.osmId)
//     console.log('Items found:', osmIds.length)

//     let selectedIds = []

//     if (this.selectedIds) {
//       this.selectedIds.forEach((id) => {
//         this.map.setFeatureState({
//           source: 'bovenland',
//           id,
//           sourceLayer: 'circles'
//         }, { selected: false})
//       })
//     }

//     osmIds.forEach((osmId) => {
//       const id = this.circleIdsByOsmId[osmId]

//       this.map.setFeatureState({
//         source: 'bovenland',
//         id,
//         sourceLayer: 'circles'
//       }, { selected: true})

//       selectedIds.push(id)
//     })

//     this.selectedIds = selectedIds

//     this.map.setLayoutProperty('mask', 'visibility', 'visible')

//     console.log('Done setting feature state')
//   } else {
//     this.map.setLayoutProperty('mask', 'visibility', 'none')
//   }
// }
// },