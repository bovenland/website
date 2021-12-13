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
    foldDown: "visible",
    to: {
      name: "waar-we-winkelen"
    },
    segments: [{
      title: "Reisverslag",
      icon: "Reisverslag",
      color: "red",
      to: {
        name: "reisverslag"
      }
    }, {
      title: "Cartografie",
      icon: "Cartografie",
      color: "green",
      to: {
        name: "cartografie"
      }
    }, {
      title: "Research & data",
      icon: "Data",
      color: "blue",
      to: {
        name: "data"
      }
    }]
  }, {
    index: 2,
    title: "Vijftien minuten verderop",
    foldDown: "visible",
    to: {
      name: "vijftien-minuten-verderop"
    },
    segments: [{
      title: "Reisverslag",
      icon: "Reisverslag",
      color: "red",
      to: {
        name: "reisverslag"
      }
    }, {
      title: "Cartografie",
      icon: "Cartografie",
      color: "green",
      to: {
        name: "cartografie"
      }
    }, {
      title: "Research & data",
      icon: "Data",
      color: "blue",
      to: {
        name: "data"
      }
    }]
  }]
}