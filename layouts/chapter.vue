<template>
  <div class="chapter">
    <Header />
    <!-- <h1>{{ page.title }}</h1> -->
    <nav>
      <ul>
        <li v-for="link of chapterLinks" :key="link.name">
          <NuxtLink :to="{ name: `${$route.name}-${link.name}` }">{{
            link.title
          }}</NuxtLink>
        </li>
      </ul>
    </nav>
    <main class="container column is-10">
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chapterLinks: [
        {
          name: "reisverslag",
          title: "Reisverslag",
        },
        {
          name: "kaart",
          title: "Kaart",
        },
        {
          name: "data",
          title: "Data",
        },
      ],
    };
  },
};
</script>
