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

<style scoped>

</style>