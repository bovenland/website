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
    bounds: Array,
    zoom: Number,
    center: Array
  }
}
</script>

<style scoped>

</style>
