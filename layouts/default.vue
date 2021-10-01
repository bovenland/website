<template>
  <div class="default">
    <Header color="pink" />
    <main class="container column is-10">
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "./../components/elements/Header";
import Footer from "./../components/elements/Footer";

export default {
  components: { Header, Footer },
};
</script>
