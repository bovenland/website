export default {
  circles: {
    // tileUrl: 'https://files.boven.land/topology-of-commerce/tiles/packed/{z}/{x}/{y}.pbf'
    tileUrl: (process.env.NODE_ENV === 'production')
      ? 'https://files.boven.land/topology-of-commerce/tiles/packed/{z}/{x}/{y}.pbf' : 'http://localhost:7887/{z}/{x}/{y}.pbf'
  },
  world: {
    tileUrl: (process.env.NODE_ENV === 'production')
      ? '------' : 'http://localhost:7778/{z}/{x}/{y}.pbf'
  },
  // protomaps: {
  //   tileUrl: (process.env.NODE_ENV === 'production')
  //     ? '------' : 'http://localhost:7779/{z}/{x}/{y}.pbf'
  // }
  minimaps: {
    baseUrl: 'https://files.boven.land'
    // baseUrl: 'http://192.168.2.6:8822'
  }
}
