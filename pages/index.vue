<template lang="md">
  <div>

    <div class="intro">
      Een visuele en cartografische ontdekkingsreis waarin we onderzoeken wat Nederland tot Nederland maakt.
    </div>

    <!-- Intro afbeelding -->
    <div class="header-image">
      <img src="@/assets/img/wadden.jpg" />
    </div>

    <!-- Hoofdstukken -->
    <ul>
      <li>
        <ul>
          <li>
            <SquareButton small="1.1" label="Reisverslag" icon="Reisverslag" class="red" iconColor="white" />
          </li>
          <li>
            <SquareButton small="1.2" label="Cartografie" icon="Cartografie" class="green" iconColor="white" />
          </li>
          <li>
            <SquareButton small="1.3" label="Verbeelding" icon="Verbeelding" class="aqua" iconColor="white" />
          </li>
          <li>
            <SquareButton small="1.4" label="Data" icon="Data" class="blue" iconColor="white" />
          </li>
        </ul>
      </li>
    </ul>

    <!-- Wat is boven.land? -->
    #### Het project
    ## Wat is boven.land?
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod turpis quis felis ultricies, eu vehicula purus mattis. Donec auctor neque eu dolor molestie sollicitudin. Curabitur in enim ornare, viverra risus ac, convallis eros. Morbi ac enim sit amet mauris convallis cursus. Etiam in ipsum et mauris faucibus bibendum eu quis elit. Aliquam molestie lacus quam, ac rhoncus risus rutrum ac. Integer vehicula pulvinar odio, sed cursus nisl.

    <!-- Wie maken boven.land? -->
    ## Wie maken boven.land?

    <!-- Profielen -->
    <ul class="profiles">
      <li>
        <DotMask>
          <img src="@/assets/img/jenny-smets.jpg" />
        </DotMask>
        <h2>Jenny Smets</h2>
        <p>Visuele verhalen &amp; verbeelding</p>
      </li>
      <li>
        <DotMask>
          <img src="@/assets/img/bert-spaan.jpg" />
        </DotMask>
        <h2>Bert Spaan</h2>
        <p>Cartografie, data &amp; technologie</p>
      </li>
    </ul>

    Nullam in dui metus. Praesent vestibulum ex sed quam dapibus porta. Praesent consectetur nunc at diam porttitor, et maximus velit vulputate. Sed ultricies risus lorem, tristique vehicula dui posuere eu. Praesent quam risus, egestas nec tempus ac, rhoncus et ligula. Nam vestibulum lorem in dignissim malesuada.

  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";

div.intro {
  text-align: center;
}
.header-image {
  border-top: 4px solid $pink;
  width: 100%;
}

ul.profiles {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
}
</style>

<script>
import DotMask from "./../components/svg/icons/DotMask";
import SquareButton from "./../components/buttons/Square";

export default {
  name: "Home",
  components: {
    DotMask,
    SquareButton,
  },
};
</script>
