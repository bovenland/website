<template>
  <nav>
    <a :href="prevHref" class="prev">
      <Point :className="`fill-${prev}`" :text="'← ' + prevText" />
    </a>
    <a :href="nextHref" class="next">
      <Point :className="`fill-${next}`" :text="nextText + ' →'" />
    </a>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    prev: String,
    prevText: String,
    prevHref: String,
    next: String,
    nextText: String,
    nextHref: String
  }
}
</script>

<style lang="stylus">
point-size = 300px
visible-percentage = 0.30
segmentAngle = 360 / 13
transition-duration = 0.5s
rotation = 120deg

nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

nav a {
  width: point-size;
  height: point-size;
  padding: 2em;
  transition: all transition-duration
}

nav a.prev {
  margin-left: -(point-size * (1 - visible-percentage));
}

nav a svg {
  transition: all transition-duration
  transform: rotate(0);
}

nav a .text {
  transition: all transition-duration
  opacity: 0;
}

nav a.prev:hover {
  margin-left: 0;
}

nav a.prev:hover svg {
  transform: rotate(rotation);
}

nav a:hover .text {
  opacity: 1;
}

nav a.next {
  margin-right: -(point-size * (1 - visible-percentage));
}

nav a.next:hover {
  margin-right: 0;
}

nav a.next:hover svg {
  transform: rotate(-(rotation));
}
</style>
