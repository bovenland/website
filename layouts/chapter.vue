<template>
  <div class="chapter">
    <Header />
    <!-- <h1>{{ page.title }}</h1> -->
    <nav>
      <ul>
        <li v-for="(segment, segmentIndex) of segments" :key="segmentIndex">
          <NuxtLink :to="{ name: `${$route.name}-${segment.to.name}` }">{{
            segment.title
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
import structure from "/structure.js";

import Header from "./../components/elements/Header";
import Footer from "./../components/elements/Footer";

export default {
  data() {
    var chapter = null;
    structure.chapters.forEach((c) => {
      if (c.to) {
        if ("hoofdstukken-" + c.to.name == this.$route.name) {
          chapter = c;
        }
      }
    });
    if (chapter == null) {
      return this.$nuxt.error({ statusCode: 404, message: "Page not found" });
    }
    return {
      segments: chapter.segments,
    };
  },
  components: {
    Header,
    Footer,
  },
};
</script>
