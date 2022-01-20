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
  max-width: 100%;
  width: 100%;

  pointer-events: all;
  padding: 10px;
  border-color: black;
  border-width: 1px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  background-color: white;
  border-radius: 3px;
}
</style>
