<template>
  <div>
    <Header />
    <main>
      <Content />
    </main>
    <Nav prev="data" prevText="Data" prevHref="../data"
      next="map" nextText="Kaart" nextHref="../kaart" />
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'Story'
}
</script>

<style scoped>
</style>
