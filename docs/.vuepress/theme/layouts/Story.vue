<template>
  <div>
    <Header />

    <main>
      <Content />


    <!--
    hier komt een reisverslag
    in 't midden
    links naar kaart
    rechts naar verbeelding
    met stukje van bol, als je hovert dan flapt-ie naar 't midden? -->
    </main>
    <Nav prev="data" prevText="Data" prevHref="../data"
      next="map" nextText="Kaart" nextHref="../kaart" />
  </div>
</template>

<script>
export default {
  name: 'Story'
}
</script>

<style scoped>
.map {
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
