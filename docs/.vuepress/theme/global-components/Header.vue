<template>
  <header>
    <div class="line"></div>
    <a href="/hoofdstukken/waar-we-winkelen/">
      <img src="../../../assets/images/logo.svg" />
    </a>
    <div class="line"></div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
header {
  top: 0;
  padding: 1em;
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  z-index: 999;
}

header .line {
  width: 50%;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(0, 0, 0, 0.33);
  height: 1px;
}

header img {
  height: 1em;
  flex-shrink: 0;
  padding: 0 3em;
}
</style>
