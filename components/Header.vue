<template>
  <header>
    <NuxtLink to="/">
      <Logo />
    </NuxtLink>
    <Menu />
  </header>
</template>

<script>
import Logo from "./Logo";
import Menu from "./Menu";
export default {
  name: "Header",
  components: {
    Logo,
    Menu,
  },
};
</script>
