<template>
  <NuxtLink :to="{
    name: 'hoofdstukken-waar-we-winkelen-cartografie',
    query: {
      view: this.view.join('/')
    }
  }">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle r="45" cx="50" cy="50" />
    </svg>
  </NuxtLink>
</template>

<script>
export default {
  name: 'MiniMap',
  props: {
    view: Array
  }
}
</script>

<style scoped>
svg {
  width: 250px;
}

svg circle {
  fill: none;
  stroke: black;
}
</style>
