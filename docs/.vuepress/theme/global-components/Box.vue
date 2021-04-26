<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Box'
}
</script>

<style scoped>
.box {
  pointer-events: all;

  padding: 1em;
  border-color: black;
  border-width: 1px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  background-color: white;

  border-radius: 3px;
}
</style>
