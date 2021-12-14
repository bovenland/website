<template>
  <div class="photos-element">
    <div class="element-max-width">
      <div class="photos-description">
        <slot />
      </div>

      <div ref="swiper" class="swiper" v-bind:data-slides="count">
        <div class="swiper-wrapper">
          <div
            v-for="(_, index) in Array.from({ length: count })"
            :key="index"
            class="swiper-slide"
          >
            <!-- TODO: check! -->
            <img
              :src="src(index)"
              :alt="captions[index]"
              :srcset="srcset(index)"
              :sizes="sizes"
            />
            <p v-if="captions[index]">{{ captions[index] }}</p>
          </div>
        </div>
        <div ref="pagination" class="swiper-pagination"></div>
      </div>
      <div v-if="count > 1" ref="prev" class="swiper-button-prev"></div>
      <div v-if="count > 1" ref="next" class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Photos",
  props: {
    series: String,
    count: Number,
    captions: Array,
  },
  data: function () {
    return {
      swiper: null,
      baseUrl: "https://files.boven.land/foto",
      photoWidths: [1280, 1920],
    };
  },
  computed: {
    sizes: function () {
      return "(min-width: 1344px) 1344px, 100vw"
    }
  },
  methods: {
    src: function (index) {
      return `${this.baseUrl}/${this.series}/${index + 1}-${this.photoWidths[0]}.jpg`
    },
    srcset: function (index) {
      const path = `${this.baseUrl}/${this.series}`;
      const srcset = this.photoWidths.map(
        (width) => `${path}/${index + 1}-${width}.jpg ${width}w`
      );

      return srcset.join(",\n");
    },
  },
  mounted: function () {
    const numSlides = this.$refs.swiper.getAttribute("data-slides");
    let options = {
      allowSlidePrev: false,
      allowSlideNext: false,
    };

    if (numSlides > 1) {
      options = {
        direction: "horizontal",
        loop: true,
        autoHeight: true,
        allowSlidePrev: true,
        allowSlideNext: true,
        pagination: {
          el: this.$refs.pagination,
          dynamicBullets: numSlides > 10,
          dynamicMainBullets: 10,
        },
        navigation: {
          nextEl: this.$refs.next,
          prevEl: this.$refs.prev,
        },
      };
    }
    this.swiper = new Swiper(this.$refs.swiper, options);
  },
  beforeDestroy: function () {
    if (this.swiper) {
      this.swiper.destroy();
    }
  },
};
</script>

<style scoped>
.swiper-wrapper {
  margin-bottom: 40px;
}
img {
  display: block;
}
</style>
