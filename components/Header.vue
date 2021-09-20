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

<style lang="scss">
@import "@/assets/sass/partials/base.scss";

header {
  width: 100%;
  padding: 16px;
}

svg {
  padding: 14px 55px;
  width: 100%;
  max-width: 384px;
  display: block;
  margin: 0 auto;
  .dot {
    fill: $pink;
  }
}
</style>
