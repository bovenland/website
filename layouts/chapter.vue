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
export default {
  data() {
    var chapter = null;
    structure.chapters.forEach((c) => {
      if ("hoofdstukken-" + c.to.name == this.$route.name) {
        chapter = c;
      }
    });
    if (chapter == null) {
      return this.$nuxt.error({ statusCode: 404, message: "Page not found" });
    }
    return {
      segments: chapter.segments,
    };
  },
};
</script>
