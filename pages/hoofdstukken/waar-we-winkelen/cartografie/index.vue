<template>
  <MapPage>
    <div>
      <label>Hoofdstuk 1</label>
      <h1>Waar we winkelen</h1>
      <p>Cartografie</p>
      <p>hier de kaart</p>
    </div>
  </MapPage>
</template>

<script>
import MapPage from "./../../../../components/pages/Map";

export default {
  transition: "map",
  components: {
    MapPage,
  },
};
</script>

<style lang="scss" scoped>
div {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: pink;
}
</style>
