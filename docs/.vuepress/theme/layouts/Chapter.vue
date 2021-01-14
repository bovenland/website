<template>
  <div>
    <Header />
    <main>
      <section class="title">
        <video muted loop autoplay>
          <source src="../../../assets/video/waar-we-winkelen.mp4"
            type="video/mp4">
        </video>
        <h1>
          <span>Hoofdstuk {{ $frontmatter.chapter }}:</span>
          <span>{{ $frontmatter.title }}</span>
        </h1>
      </section>

      <div class="header-background" />
      <Content />

      <Sections />
    </main>
  </div>
</template>

<script>
export default {
  name: 'Chapter'
}
</script>

<style lang="stylus" scoped>
.title {
  position: relative;
  width: 100vw;
  height: 100vh;
}

h1 {
  position: absolute;
  border-left-style: solid;
  border-left-width: 5px;
  border-left-color: $logoColor;
  width: $contentWidth;
  margin: 0 auto;
}

h1 span {
  display: block;
}

video {
  position: absolute;
  object-fit: cover;

  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.header-background {
  height: calc(1em + 2em);
  background: white;
  position: sticky;
  top: 0;
}
</style>
