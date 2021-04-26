<template>
  <div class="map-controls grid-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MapControls'
}
</script>

<style>
.map-controls {
  position: absolute;
  pointer-events: none;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 2em;
  padding-right: 2em;
  padding-top: calc(63px + 0em);
  padding-bottom: 2em;
}

/* https://grid.layoutit.com/?id=lbrVb4M */
.grid-container {
  display: grid;
  grid-template-columns: 0.8fr 1.3fr 0.9fr;
  grid-template-rows: 2.2fr 0.5fr;
  gap: 1em;
  grid-template-areas:
    "left . right"
    "bottom bottom bottom";
}

.left {
  grid-area: left;
  /* display: flex; */
  place-self: center;
}

.right {
  grid-area: right;
}

.bottom {
  grid-area: bottom;
  place-self: end center;
}
</style>
