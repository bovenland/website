module.exports = {
  title: 'Boven.land',
  description: ``,
  themeConfig: {
    nav: [
      { text: 'Boven.land', link: '/' },
      { text: 'Hoofdstukken', link: '/hoofdstukken/' },
    ],
  },
  dest: 'public',
  postcss: {
    plugins: [
      require('tailwindcss')('./tailwind.config.js'),
      require('autoprefixer')
    ]
  }
}