export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
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
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300&family=Space+Grotesk:wght@400;600;700&family=Space+Mono:wght@700&display=swap'
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/sass/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/image',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    '@nuxtjs/markdownit',
    '@nuxt/image',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware: ['hamburger']
  }

}