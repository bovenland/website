// config.js
export default {

  // Main menu
  menu: [{
    title: "Wat is Boven.land?",
    to: {
      name: "index",
      hash: '#project'
    },
  }, {
    title: "Over ons",
    to: {
      name: "index",
      hash: '#over-ons'
    },
  }, {
    title: "Contact",
    to: {
      name: "index",
      hash: '#contact'
    },
  }, ],

  // The Chapters
  chapters: [{
    index: 1,
    title: "Waar we winkelen",
    description: "Donec eleifend mollis consequat. Suspendisse vitae posuere ipsum. Curabitur lacinia sem lectus, vitae dictum elit aliquet nec. Quisque posuere augue ac ligula bibendum dapibus. Phasellus blandit dictum mi, nec mattis ante efficitur ut. Nullam id commodo tortor.",
    foldDown: "visible",
    to: {
      name: "waar-we-winkelen"
    },
    segments: [{
      title: "Reisverslag",
      color: "red",
      to: {
        name: "reisverslag"
      }
    }, {
      title: "Cartografie",
      color: "green",
      to: {
        name: "cartografie"
      }
    }, {
      // title: "Data & research",
      title: "Data",
      color: "blue",
      to: {
        name: "data"
      }
    }]
  }, {
    index: 2,
    title: "Vijftien minuten verderop",
    description: "Donec eleifend mollis consequat. Suspendisse vitae posuere ipsum. Curabitur lacinia sem lectus, vitae dictum elit aliquet nec. Quisque posuere augue ac ligula bibendum dapibus. Phasellus blandit dictum mi, nec mattis ante efficitur ut. Nullam id commodo tortor.",
    foldDown: "visible",
    to: {
      name: "vijftien-minuten-verderop"
    },
    segments: [{
      title: "Reisverslag",
      color: "red",
      to: {
        name: "reisverslag"
      }
    }, {
      title: "Cartografie",
      color: "green",
      to: {
        name: "cartografie"
      }
    }, {
      // title: "Data & research",
      title: "Data",
      color: "blue",
      to: {
        name: "data"
      }
    }]
  }]
}