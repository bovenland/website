<template>
  <section class="section">
    Reisverslag
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'story',
  methods: {
    ...mapActions({
      setStoryRoute: 'chapters/setStoryRoute'
    })
  },
  mounted: function () {
    this.setStoryRoute([1, 2, 3])
  }
}
</script>
