<template>
  <Box class="map-filters">
    <div>
      <input :value="textQuery"
        @input.prevent="$emit('update:textQuery', $event.target.value)" />
    </div>
    <div>
      <select v-if="fields"
        @change.prevent="$emit('update:selectedField', $event.target.value)">
        <option v-for="field in Object.keys(fields)"
          :value="field" :key="field">{{ field }}</option>
      </select>
    </div>
  </Box>
</template>

<script>
export default {
  name: 'MapFilters',
  props: {
    fields: Object,
    selectedField: String,
    textQuery: String
  }
}
</script>

<style lang="stylus">
.map-filters {
  height: 3em;
  display: flex;
  flex-direction: row;
}
</style>
