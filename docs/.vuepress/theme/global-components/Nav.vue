<template>
  <nav>
    <a :href="prevHref" :class="{
      prev: true,
      invisible
    }">
      <Point :className="`fill-${prev}`" :text="'← ' + prevText" />
    </a>
    <a :href="nextHref" :class="{
      next: true,
      invisible
    }">
      <Point :className="`fill-${next}`" :text="nextText + ' →'" />
    </a>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    invisible: Boolean,
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
visible-percentage = 0.20
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
  pointer-events: none;
}

nav a {
  width: point-size;
  height: point-size;
  padding: 2em;
  transition: all transition-duration;
  pointer-events: all;
}

nav a.prev {
  margin-left: -(point-size * (1 - visible-percentage));
}

nav a.prev.invisible {
  margin-left: -(point-size);
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

nav a.next.invisible {
  margin-right: -(point-size);
}

nav a.next:hover {
  margin-right: 0;
}

nav a.next:hover svg {
  transform: rotate(-(rotation));
}
</style>
