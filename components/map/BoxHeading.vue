<template>
  <div class="box-heading">
    <slot />
    <button v-if="hasCloseButton" @click="$emit('close')">
    ✕
    </button>
  </div>
</template>

<script>
export default {
  name: 'BoxHeading',
  computed: {
    hasCloseButton: function () {
      return this.$listeners && this.$listeners.close
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/sass/partials/button.scss";

.box-heading {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  margin-bottom: 10px;

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
