export default {
  target: 'static',
  head: {
    // TODO: add opengraph tags
    title: 'Boven.land',
    htmlAttrs: {
      lang: 'nl'
    },
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: ''
    }
    ],
    link: [{
      rel: 'shortcut icon',
      type: 'image/png',
      href: '/favicon.png'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@700&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/swiper@7/swiper-bundle.min.css'
    },
    {
      rel: 'stylesheet',
      href: 'https://api.mapbox.com/mapbox-gl-js/v2.5.1/mapbox-gl.css'
    }],
    script: [
      {
        src: 'https://unpkg.com/swiper@7/swiper-bundle.min.js',
        body: true
      },
      {
        src: 'https://api.mapbox.com/mapbox-gl-js/v2.5.1/mapbox-gl.js',
        body: true
      }
    ]
  },
  css: ['~/assets/sass/main.scss'],
  plugins: [],
  components: true,
  buildModules: [],
  modules: [
    'nuxt-buefy',
     '@nuxtjs/markdownit'
  ],
  build: {
    standalone: true,
    transpile: [
      'd3-geo',
      'd3-array'
    ]
  },
  router: {
    middleware: ['hamburger']
  },
  publicRuntimeConfig: {
    photo: {
      baseUrl: process.env.PHOTO_BASE_URL,
      widths: process.env.PHOTO_WIDTHS
    },
    video: {
      baseUrl: process.env.VIDEO_BASE_URL,
      extension: process.env.VIDEO_EXTENSION
    },
    mapbox: {
      accessToken: process.env.MAPBOX_ACCESS_TOKEN,
      mapStyle: process.env.MAPBOX_MAP_STYLE
    },
    minimap: {
      baseUrl: process.env.MINIMAP_BASE_URL
    },
    waarWeWinkelen: {
      initialField: process.env.WAAR_WE_WINKELEN_INITIAL_FIELD,
      dataUrl: process.env.WAAR_WE_WINKELEN_DATA_URL,
      circleMapUrl: process.env.WAAR_WE_WINKELEN_CIRCLE_MAP_URL,
      worldMapUrl: process.env.WAAR_WE_WINKELEN_WORLD_MAP_URL
    },
    vijftienMinutenVerderop: {
      dataBaseUrl: process.env.VIJFTIEN_MINUTEN_VERDEROP_DATA_BASE_URL,
      mapUrl: process.env.VIJFTIEN_MINUTEN_VERDEROP_MAP_URL
    }
  }
}
