<template>
  <header>
    <NuxtLink to="/">
      <Logo v-bind:dot="color" letters="black" />
    </NuxtLink>
    <Burger />

    <TopMenu>
      <MainMenu />
    </TopMenu>
  </header>
</template>

<script>
import Logo from "./Logo";
import Burger from "./../menu/Burger";
import MainMenu from "./../menu/MainMenu";
import TopMenu from "./../menu/TopMenu";
export default {
  name: "Header",
  props: ["color"],
  components: {
    Logo,
    Burger,
    MainMenu,
    TopMenu,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";

header {
  width: 100%;
  padding: 16px;
  position: relative;
  z-index: 100;
}

svg {
  padding: 20px 76px;
  width: 100%;
  max-width: 384px;
  display: block;
  margin: 0 auto;
}
</style>
