<template>
  <Box class="feature-info">
    <div>
      <div>{{ featureProperties.name }}</div>
      <div>{{ featureProperties.chain }}</div>
      <div>{{ featureProperties.query }}</div>
      <div>{{ featureProperties.shop }}</div>
      <button @click="$emit('toggleView')">Wissel kaart</button>
      <button @click="$emit('close')">Terug naar verhaal</button>
    </div>
  </Box>
</template>

<script>
export default {
  name: 'FeatureInfo',
  props: {
    featureProperties: Object
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
