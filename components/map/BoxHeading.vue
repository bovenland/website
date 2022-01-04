<template>
  <div class="heading">
    <h3>{{ title }}</h3>
    <button v-if="hasCloseButton" @click="$emit('close')">
    ✕
    </button>
  </div>
</template>

<script>
export default {
  name: 'BoxHeading',
  props: {
    title: String
  },
  computed: {
    hasCloseButton: function () {
      return this.$listeners && this.$listeners.close
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/button.scss";

.heading {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 0.5rem;

  border-bottom-style: solid;
  border-bottom-width: 2px;
}

button {
  border-radius: 2em;
  color: black;
}

h3 {
  font-size: 1rem;
}
</style>
