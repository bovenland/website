<template>
  <div>
    <Header />
    <main>
      <section class="title">
        <img src="https://files.boven.land/waar-we-winkelen/photos/DSCF0505.jpg" />
        <!-- <h1 class="content">
          <span>Hoofdstuk {{ $frontmatter.chapter }}:</span>
          <span>{{ $frontmatter.title }}</span>
        </h1> -->
      </section>

      <div class="raise">
        <div class="header-background" />
        <Content />
      </div>
    </main>
    <Nav invisible prev="data" prevText="Data" prevHref="../data"
      next="map" nextText="Kaart" nextHref="../kaart" />
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'Story',
  methods: {
    observed: function (entries, observer) {
      const entry = entries[0]

      if (entry) {
        const navLinks = document.querySelectorAll('nav a')

        if (entry.isIntersecting) {
          for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.add('invisible')
          }
        } else {
          for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.remove('invisible')
          }
        }
      }
    }
  },
  mounted: function () {
    let observer = new IntersectionObserver(this.observed, {
      threshold: 0.25
    })

    let target = document.querySelector('.title')
    observer.observe(target)
  }
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

.title img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.raise {
  margin-top: -20rem;
}

.header-background {
  z-index: 1;
  height: calc(1em + 2em);
  background: white;
  position: sticky;
  width: $contentWidth;
  margin: 0 auto;
  top: 0;
}
</style>
