export default {
  circles: {
    tileUrl: 'https://files.boven.land/topology-of-commerce/tiles/packed/{z}/{x}/{y}.pbf'
    // tileUrl: (process.env.NODE_ENV === 'production')
    //   ? 'https://files.boven.land/topology-of-commerce/tiles/packed/{z}/{x}/{y}.pbf' : 'http://localhost:7887/{z}/{x}/{y}.pbf'
  },
  map: {
    tileUrl: (process.env.NODE_ENV === 'production')
      ? '------' : 'http://localhost:7778/{z}/{x}/{y}.pbf'
  },
  protomaps: {
    tileUrl: (process.env.NODE_ENV === 'production')
      ? '------' : 'http://localhost:7779/{z}/{x}/{y}.pbf'
  }
}
