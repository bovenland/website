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
  }],

  // The Chapters
  chapters: [{
    index: 1,
    title: "Waar we winkelen",
    foldDown: "visible",
    to: {
      name: "waar-we-winkelen"
    },
    segments: [{
      title: "Reis&shy;verslag",
      icon: "Reisverslag",
      color: "red",
      to: {
        name: "reisverslag"
      }
    }, {
      title: "Kaart",
      icon: "Kaart",
      color: "green",
      to: {
        name: "kaart"
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
      title: "Reis&shy;verslag",
      icon: "Reisverslag",
      color: "red",
      to: {
        name: "reisverslag"
      }
    }, {
      title: "Kaart",
      icon: "Kaart",
      color: "green",
      to: {
        name: "kaart"
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