<template>
  <header>
    <NuxtLink to="/">
      <Logo dot="pink" letters="black" />
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
}

svg {
  padding: 14px 55px;
  width: 100%;
  max-width: 384px;
  display: block;
  margin: 0 auto;
}
</style>
