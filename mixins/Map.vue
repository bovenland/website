<script>
const emptyMapStyle = {
  version: 8,
  sources: {},
  layers: []
}

export default {
  data () {
    return {
      map: undefined,
      mapLoaded: false
    }
  },
  mounted: function () {
    // TODO: move to app config
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVydHNwYWFuIiwiYSI6ImR3dERiQk0ifQ.DLbScmbRohc3Sqv7prfhqw'

    const defaultCenter = [5.608302, 52.303667]
    let zoom = 8
    let lon = defaultCenter[0]
    let lat = defaultCenter[1]

    if (this.$route.query.view) {
      [zoom, lat, lon] = this.$route.query.view
        .split('/')
        .map((n) => parseFloat(n))

      // TODO: check numbers!
    }

    // TODO: add bounds!
    const map = new mapboxgl.Map({
      container: this.$refs.map,
      style: emptyMapStyle,
      minZoom: 7,
      maxZoom: 19,
      center: [lon, lat],
      zoom,
      dragRotate: false
    })

    this.map = map
    map.on('load', () => this.mapLoaded = true)
  }
}
</script>
