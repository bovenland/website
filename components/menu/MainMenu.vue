<template lang="md">
# Hoofdstukken

  <section class="section">
    <ol>
      <li v-for="(chapter, index) of chapters" :key="index">
        <nuxt-link :to="{ name: `hoofdstukken-${chapter.to.name}` }">
          {{ chapter.title }}
        </nuxt-link>
      </li>
    </ol>
  </section>

# Boven.land

  <section class="section">
    <ul>
      <li v-for="(item, index) of menu" :key="index">
        <nuxt-link :to="{ name: item.to.name }">
          {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import structure from "/structure.js";
export default {
  data() {
    return structure;
  },
};
</script>

<style lang="scss" scoped>
section.section {
  padding: 0;
}
</style>
