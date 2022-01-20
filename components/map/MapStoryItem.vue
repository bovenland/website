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
    data: Object
  }
}
</script>

<style scoped>

</style>
