<template>
  <div class="default">
    <!-- TODO: Base these colors on the route -->
    <Header dotColor="pink" letterColor="black" />
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
};
</script>
