// config.js
export default {

  // Main menu
  menu: [{
    title: "Wat is dit?",
    to: {
      name: "wat"
    },
  }, {
    title: "Over ons",
    to: {
      name: "over",
    },
  }, {
    title: "Contact",
    to: {
      name: "contact",
    },
  }, ],

  // The Chapters
  chapters: [{
    title: "Waar we winkelen",
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
      title: "Verbeelding",
      color: "aqua",
      to: {
        name: "verbeelding"
      }
    }, {
      title: "Data",
      color: "blue",
      to: {
        name: "data"
      }
    }]
  }, {
    title: "Nog een hoofdstuk",
    to: {
      name: "nog-een-hoofdstuk"
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
      title: "Data",
      color: "blue",
      to: {
        name: "data"
      }
    }]
  }, ]
}