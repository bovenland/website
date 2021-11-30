<template>
  <div class="photos-element">
    <div class="photos-description">
      <slot />
    </div>

    <div ref="swiper" class="swiper">
      <div class="swiper-wrapper">
        <div
          v-for="(_, index) in Array.from({ length: count })"
          :key="index"
          class="swiper-slide"
        >
          <!-- TODO: sizes attribute is still incorrect -->
          <img
            :alt="captions[index]"
            :srcset="createSrcset(index)"
            sizes="(min-width: 1344px) 1344px,
              100vw"
          />
          <p v-if="captions[index]">{{ captions[index] }}</p>
        </div>
      </div>
      <div ref="pagination" class="swiper-pagination"></div>
      <div ref="prev" class="swiper-button-prev"></div>
      <div ref="next" class="swiper-button-next"></div>
      <!-- <div ref="scrollbar" class="swiper-scrollbar"></div> -->
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
  methods: {
    createSrcset: function (index) {
      const path = `${this.baseUrl}/${this.series}`;
      const srcset = this.photoWidths.map(
        (width) => `${path}/${index + 1}-${width}.jpg ${width}w`
      );

      return srcset.join(",\n");
    },
  },
  mounted: function () {
    this.swiper = new Swiper(this.$refs.swiper, {
      direction: "horizontal",
      loop: true,
      autoHeight: true,
      pagination: {
        el: this.$refs.pagination,
      },
      navigation: {
        nextEl: this.$refs.next,
        prevEl: this.$refs.prev,
      },
    });
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
