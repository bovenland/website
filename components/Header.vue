<template>
  <header>
    <NuxtLink to="/">Boven.land</NuxtLink>
    <Menu></Menu>
  </header>
</template>

<script>
import Menu from "./Menu";
export default {
  name: "Header",
  components: {
    Menu,
  },
};
</script>
