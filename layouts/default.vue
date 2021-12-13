<template>
  <div class="default">
    <Header dotColor="pink" :letterColor="letterColor" />
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import Header from "./../components/elements/Header";

export default {
  components: {
    Header,
  },
  computed: {
    letterColor: function () {
      return this.isMapRoute() ? 'white' : 'black'
    }
  },
  methods: {
    isMapRoute () {
      return this.$route.name.endsWith('-cartografie')
    }
  }
};
</script>
