<template>
  <NuxtLink :to="{
    name: 'hoofdstukken-waar-we-winkelen-cartografie',
    // TODO: use named route instead of path?
    // path: '/hoofdstukken/waar-we-winkelen/cartografie',
    query: { center: [4.922, 52.362].join(','), zoom: 12 }
  }">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle r="50" cx="50" cy="50" />
    </svg>
  </NuxtLink>
</template>

<script>

</script>

<style scoped>
svg {
  width: 100px;
}
</style>