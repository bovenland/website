<template>
  <nav>
    <a :href="prevHref" class="prev">
      <Point :className="`fill-${prev}`" :text="prevText" />
    </a>
    <a :href="nextHref" class="next">
      <Point :className="`fill-${next}`" :text="nextText" />
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
  width: 250px;
  height: 250px;
  padding: 2em;
  transition: all .5s
}

nav a.prev {
  margin-left: -180px;
}

nav a.prev svg {
  transition: all .5s
  transform: rotate(-150deg);
}

nav a.prev:hover {
  margin-left: 0;
}

nav a.prev:hover svg {
  transform: rotate(0);
}

nav a.next {
  margin-right: -180px;
}

nav a.next svg {
  transition: all .5s
  transform: rotate(150deg);
}

nav a.next:hover {
  margin-right: 0;
}

nav a.next:hover svg {
  transform: rotate(0);
}
</style>
