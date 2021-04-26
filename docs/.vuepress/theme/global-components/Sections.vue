<template>
  <ul class="sections">
    <!-- TODO: Doe bollen! -->
    <li><a href="reisverslag">
        <Point className="fill-story" text="Reisverslag" />
      </a></li>
    <li><a href="kaart">
        <Point className="fill-map" text="Kaart" />
      </a></li>
    <li><a href="verbeelding">
      <Point className="fill-imagination" text="Verbeelding" />
      </a></li>
    <li><a href="data">
      <Point className="fill-data" text="Data" />
      </a></li>
  </ul>

</template>

<script>
export default {
  name: 'Sections',
  mounted: function () {
    console.log('harrrrrm!!!')
  }
}
</script>

<style scoped>
ul.sections {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

ul.sections li {
  padding: 0.5em;
}

ul.sections li a {
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul.sections li a {
  text-decoration: none;
  width: 130px;
  height: 130px;
  margin: 1em;
}

ul.sections li svg:hover {
  transform: rotate(27.69deg);
  transition: all .5s;
}
</style>
