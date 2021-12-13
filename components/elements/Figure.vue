<template>
  <figure>
    <img :src="`${baseUrl}/${id}/1-1280.jpg`" :alt="caption">
    <figcaption>{{caption}}</figcaption>
  </figure>
</template>

<script>
export default {
  name: "Figure",
  props: {
    id: String,
    caption: String
  },
  data: function () {
    return {
      baseUrl: "https://files.boven.land/foto",
      photoWidths: [1280, 1920]
    }
  }
}
</script>

<style scoped>

</style>
