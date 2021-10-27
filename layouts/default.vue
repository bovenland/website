<template>
  <div class="default">
    <Header color="pink" />
    <main>
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
