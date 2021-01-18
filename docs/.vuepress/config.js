module.exports = {
  title: 'Boven.land',
  themeConfig: {
    tiles: {
      baseUrl: (process.env.NODE_ENV === 'production') ?
        'https://files.boven.land/topology-of-commerce/tiles/packed' : 'http://localhost:7777'
    }
  },
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdn.skypack.dev/maplibre-gl/dist/mapbox-gl.css'
      }
    ]
  ]
}
