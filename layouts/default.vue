<template>
  <div class="default">
    <Header color="pink" />
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import Header from "./../components/elements/Header";

export default {
  components: {
    Header
  }
};
</script>
