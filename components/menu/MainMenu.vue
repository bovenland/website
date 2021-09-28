<template lang="md">
# Hoofdstukken

  <section class="section">
    <ol>
      <li v-for="(chapter, index) of chapters" :key="index">
        <nuxt-link v-if="chapter.to" :to="{ name: `hoofdstukken-${chapter.to.name}` }">
          {{ chapter.index }}: {{ chapter.title }}
        </nuxt-link>
        <div v-else>
          {{ chapter.index }}: {{ chapter.title }}
        </div>
        <br>
        <ul v-if="chapter.to">
          <li v-for="(segment, segmentIndex) of chapter.segments" :key="segmentIndex">
            <nuxt-link :to="{ name: `hoofdstukken-${chapter.to.name}-${segment.to.name}` }">
              {{chapter.index}}.{{segmentIndex+1}}: {{ segment.title }}
            </nuxt-link>
          </li>
        </ul>
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
  ol {
    list-style: none;
  }
}
</style>
