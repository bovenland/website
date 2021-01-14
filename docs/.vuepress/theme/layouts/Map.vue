<template>
  <div>
    <Header />

    <main>
      <Content />
    </main>
    <Nav prev="story" prevText="Reisverslag" prevHref="../reisverslag"
      next="imagination" nextText="Verbeelding" nextHref="../verbeelding" />
  </div>
</template>

<script>
export default {
  name: 'Map'
}
</script>

<style scoped>
</style>
