<template>
  <div class="page home-page">
    <div class="intro">
      Een visuele en cartografische ontdekkingsreis waarin we onderzoeken wat
      Nederland tot Nederland maakt.
    </div>

    <div class="header-image story-header-image">
      <Video id="stadskanaal" />
    </div>

    <div class="container column">
      <!-- Wat is boven.land? -->
      <label>Het project</label>
      <h3 id="project">Wat is Boven.land?</h3>
      <p>
        Nederland is klein en geordend. Aanvliegend op ons land is dit je uitzicht: een pannenkoek van rechthoekige polders, waar sloten doorheen snijden, landbouwgrond, natuurgebieden, water. De grillige vormpjes van dorpen, afgewisseld door de grote variant: de stad, met voorsteden en Vinex-wijken. Het patroon van de snelwegen ligt als een web over ons land, met grote hoekige blokken van kassen data- en distributiecentra ernaast.
      </p>

      <p>
        Waarom ons land er zo uitziet, vragen de meesten van ons zich niet dagelijks af. We zijn ons niet zo bewust van de invloed die regelgeving en ons gedrag heeft op het uiterlijk van het ons omringende landschap. De ruimte in Nederland is beperkt en we delen hem met velen. Regulering van het gebruik is daarom noodzaak en wordt urgenter naarmate we onze ruimte intensiever gebruiken. De Rijksbouwmeesters doen een oproep om meer toezicht te houden op hoe we ons land inrichten en wie daarover beslist, de roep om een minister ruimtelijke ordening klinkt. Er zijn dan ook veel urgente thema’s die invloed hebben op onze omgeving: de energietransitie, CO<sub>2</sub>-uitstoot, de verdichting om er slechts een paar te noemen. Maar ook minder voordehandliggende vragen als: waar kopen we, hoe lopen we, waar is het in Nederland nog stil, hoe ver kunnen we nog zien of wat is het meest afgelegen punt in Nederland?
      </p>

      <p>
        In Boven.land stellen wij deze vragen, de meest urgente afgewisseld met wat misschien op het eerste oog triviaal lijkt, maar bij nadere beschouwing bijzonder belangrijk. Boven.land is een ontdekkingsreis door het Nederlandse landschap, aan de hand van cartografie, tekst en (drone)beeld. Wij, Bert Spaan en Jenny Smets, vertellen de verhalen. Verhalen over ons land en over de ruimtelijke ordening. Dat doen we vanuit vanuit onze achtergrond: Jenny maakt beeldverhalen en Bert is cartograaf en digital designer. We reizen af naar opvallende plekken in het Nederlandse landschap. Of naar alledaagse plekken die we met andere ogen bekijken. We brengen in kaart hoe ons dagelijkse gedrag: consumptie, reizen, werk, vrije tijd, sporen nalaat in onze omgeving. We bieden ons publiek een nieuw en verrassend perspectief.
      </p>

      <!-- Hoofdstukken -->
      <FoldDownMenu v-bind:children="chapters" collapsible="false" />

      <!-- Wie maken boven.land? -->
      <h3 id="over-ons">Wie maken boven.land?</h3>

      <!-- Profielen -->
      <ul class="profiles">
        <li>
          <DotMask>
            <nuxt-img src="/img/jenny-smets.jpg" />
          </DotMask>
          <h2>Jenny Smets</h2>
          <p>Visuele verhalen &amp; verbeelding</p>
        </li>
        <li>
          <DotMask>
            <nuxt-img src="/img/bert-spaan.jpg" />
          </DotMask>
          <h2>Bert Spaan</h2>
          <p>Cartografie, data &amp; technologie</p>
        </li>
      </ul>

      <h3 id="contact">Contact</h3>

      <p>
        Nullam in dui metus. Praesent vestibulum ex sed quam dapibus porta.
        Praesent consectetur nunc at diam porttitor, et maximus velit vulputate.
        Sed ultricies risus lorem, tristique vehicula dui posuere eu. Praesent
        quam risus, egestas nec tempus ac, rhoncus et ligula. Nam vestibulum
        lorem in dignissim malesuada.
      </p>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";
.home-page {
  label {
    color: $label-color;
    margin-bottom: 1.25rem;
  }
  h3 {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    color: $aqua;
  }

  .container {
    margin: 0 auto;
    max-width: $column-width !important;
  }

  div.intro {
    text-align: center;
    padding: 20px 25px 8px 25px;
  }
  div.header-image {
    margin-top: 48px;
    margin-bottom: 8px;
  }

  ul.profiles {
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
    margin: 0 -12px;
    margin-top: 32px;
    margin-bottom: 18px;
    padding: 0;
    li {
      margin: 0 12px;
      flex-basis: 400px;
      h2 {
        margin-top: 20px;
        margin-bottom: 0px;
      }
      p {
        margin-top: 0;
      }
    }
  }
}
</style>

<script>
import structure from "/structure.js";

import Video from "./../components/elements/Video";
import Footer from "./../components/elements/Footer";
import FoldDownMenu from "./../components/menu/FoldDownMenu";
import DotMask from "./../components/svg/icons/DotMask";

export default {
  transition: "home",
  data() {
    return structure;
  },
  components: {
    DotMask,
    FoldDownMenu,
    Footer,
    Video
  },
};
</script>
