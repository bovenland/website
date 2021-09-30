<template>
  <div class="story">
    <Header />
    <nav>
      <NuxtLink to="./">Terug naar hoofdstuk</NuxtLink>
      <div>Hier misschien hamburgermenu?</div>
    </nav>

    <section>
      <aside>Hier misschien de uitklaproute?</aside>

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from "./../components/elements/Header";
import Footer from "./../components/elements/Footer";

export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
div.story {
  p {
    margin: 1rem 0;
  }
}
</style>
