export default {
  // TODO: two data URLs, one for each chapter
  data: {
    initialField: 'vacantPercentage',
    url: 'http://localhost:8866/map-data-1000.json'
  },
  circles: {
    tileUrl: (process.env.NODE_ENV === 'production')
      ? 'https://files.boven.land/tiles/waar-we-winkelen/circles/{z}/{x}/{y}.pbf'
      : 'http://localhost:7887/{z}/{x}/{y}.pbf'
  },
  world: {
    tileUrl: (process.env.NODE_ENV === 'production')
      ? 'https://files.boven.land/tiles/waar-we-winkelen/world/{z}/{x}/{y}.pbf'
      : 'http://localhost:7778/{z}/{x}/{y}.pbf'
  },
  minimaps: {
    baseUrl: 'https://files.boven.land'
    // baseUrl: 'http://192.168.2.6:8822'
  }
}
