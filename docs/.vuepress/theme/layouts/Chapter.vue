<template>
  <div>
    <Header />
    <main>
      <section class="title">
        <video muted loop autoplay>
          <source src="https://files.boven.land/waar-we-winkelen/video/waar-we-winkelen.mp4"
            type="video/mp4">
        </video>
        <h1 class="content">
          <span>Hoofdstuk {{ $frontmatter.chapter }}:</span>
          <span>{{ $frontmatter.title }}</span>
        </h1>
      </section>

      <div class="header-background" />
      <Content />

      <Sections />
    </main>
    <Footer />
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
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

h1 {
  position: absolute;
  border-left-style: solid;
  border-left-width: 5px;
  border-left-color: $logoColor;
  margin-top: 2em;
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
  z-index: 1;
  height: calc(1em + 2em);
  background: white;
  position: sticky;
  top: 0;
}
</style>
