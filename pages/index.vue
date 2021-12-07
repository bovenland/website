<template>
  <div class="page home-page">
    <div class="intro">
      Een visuele en cartografische ontdekkingsreis waarin we onderzoeken wat
      Nederland tot Nederland maakt.
    </div>

    <!-- Intro afbeelding -->
    <div class="header-image">
      <nuxt-img src="/img/homepage/wadden.jpg" />
    </div>

    <div class="container column">
      <!-- Hoofdstukken -->
      <FoldDownMenu v-bind:children="chapters" collapsible="false" />

      <!-- Wat is boven.land? -->
      <label>Het project</label>
      <h3>Wat is boven.land?</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod
        turpis quis felis ultricies, eu vehicula purus mattis. Donec auctor
        neque eu dolor molestie sollicitudin. Curabitur in enim ornare, viverra
        risus ac, convallis eros. Morbi ac enim sit amet mauris convallis
        cursus. Etiam in ipsum et mauris faucibus bibendum eu quis elit. Aliquam
        molestie lacus quam, ac rhoncus risus rutrum ac. Integer vehicula
        pulvinar odio, sed cursus nisl.
      </p>

      <!-- Wie maken boven.land? -->
      <h3>Wie maken boven.land?</h3>

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
  },
};
</script>
