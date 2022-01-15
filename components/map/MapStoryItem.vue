<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MapStoryItem',
  props: {
    title: String,
    view: String,
    field: String,
    bounds: Array,
    zoom: Number,
    center: Array
  }
}
</script>

<style scoped>

</style>
