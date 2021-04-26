<template>
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
  name: 'Home',
  components: {

  },
  data () {
    return {
      chapters: [
        {
          title: 'Waar we winkelen',
          to: { name: 'waar-we-winkelen' }
        }
      ]
    }
  }
}
</script>
