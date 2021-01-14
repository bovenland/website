module.exports = {
  themeConfig: {
    tiles: {
      baseUrl: (process.env.NODE_ENV === 'production') ?
        'https://files.boven.land/topology-of-commerce/tiles/packed' : 'http://localhost:7777'
    }
  }
}
