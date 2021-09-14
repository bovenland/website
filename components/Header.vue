<template>
  <header>
    <NuxtLink to="/">
      <Logo></Logo>
    </NuxtLink>
    <Menu></Menu>
  </header>
</template>

<script>
import Menu from "./Menu";
import Logo from "./Logo";
export default {
  name: "Header",
  components: {
    Menu,
  },
};
</script>
