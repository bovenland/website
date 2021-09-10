<template lang="md">
# Hello Markdown

@Bert, je kunt nu gewoon Markdown schrijven als je `lang="md"` aan te template toevoegt.
@Bert, we zullen `Server Side Rendering` (SSR) nodig hebben voor het snelle boot-en + indexering door Google en zo. Zie hier: <a href="https://nuxtjs.org/docs/2.x/concepts/server-side-rendering" target="_blank">nuxtjs.org over SSR</a>.

  <section class="section">
    <ol v-for="(chapter, index) of chapters" :key="index">
      <li>
        <nuxt-link :to="{ name: `hoofdstukken-${chapter.to.name}` }">
          {{ chapter.title }}
        </nuxt-link>
      </li>
    </ol>
  </section>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      chapters: [
        {
          title: "Waar we winkelen",
          to: { name: "waar-we-winkelen" },
        },
      ],
    };
  },
};
</script>
