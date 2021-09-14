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
export default {
  data() {
    return {};
  },
};
</script>
