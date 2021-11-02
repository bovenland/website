<template>
  <div>
    <!-- Intro afbeelding -->
    <div class="header-image story-header-image">
      <video
        src="https://files.boven.land/vijftien-minuten-verderop/video/oosterwold.mp4"
        autoplay
        muted
        loop
      />
    </div>

    <StoryPage>
      <section>
        <label>Hoofdstuk 2</label>
        <h1>Vijftien minuten verderop</h1>

        <p class="intro">
          Het najaar van 2020 is stormachtig in Nederland. En dat geldt niet
          alleen voor het weer. Vanwege de coronopandemie gaan we richting de
          tweede lockdown van het jaar. Deze gedwongen terugtrekking in onze
          huizen doet al eerder ingezette trends in ons koopgedrag doorzetten.
          De Nederlandse consument gaat meer online kopen, we hebben hogere
          verwachtingen van service als snelle levering en gratis retourneren.
          De winkels in grote winkelcentra staan leeg en de kleine zelfstandige
          winkels redden het niet.
        </p>
      </section>
    </StoryPage>
  </div>
</template>

<script>
import StoryPage from "./../../../../components/pages/Story";

export default {
  transition: "story",
  components: {
    StoryPage,
  },

  mounted: function () {
    if (this.$el.querySelectorAll(".swiper").length < 1) return;
    this.swiper = new Swiper(".swiper", {
      // Optional parameters
      direction: "horizontal",
      loop: false,

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // And if we need scrollbar
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  },

  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
    }
  },
};
</script>
