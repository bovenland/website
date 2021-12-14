<template>
  <video ref="video"
    :src="videoSrc"
    muted loop />
</template>

<script>

export default {
  name: 'Video',
  props: {
    id: String,
    threshold: {
      type: Number,
      default: 0.2
    }
  },
  data: function () {
    return {
      videoSrc: undefined,
      // TODO: move to config
      sizes: [
        [1280, 720],
        [1920, 1080]
      ],
      baseUrl: this.$config.video.baseUrl,
      extension: this.$config.video.extension
    }
  },
  methods: {
    observedIntersection: function (entries) {
      const video = this.$refs.video

      if (video) {
        entries.forEach((entry) => {
        if (entry.intersectionRatio < this.threshold) {
          video.pause()
        } else if (video.paused) {
          video.play()
        }
      })
      }
    },
    pickVideoHeight: function (width) {
      let minSizeDiff = Infinity
      let sizeIndex
      this.sizes.forEach((size, index) => {
        const sizeDiff = Math.abs(size[0] - width)
        if (sizeDiff < minSizeDiff) {
          minSizeDiff = sizeDiff
          sizeIndex = index
        }
      })

      return this.sizes[sizeIndex][1]
    }
  },
  mounted: function () {
    const video = this.$refs.video

    this.intersectionObserver = new IntersectionObserver(this.observedIntersection, {
      threshold: this.threshold
    })

    this.intersectionObserver.observe(video)

    const width = video.offsetWidth * window.devicePixelRatio
    const size = this.pickVideoHeight(width)
    this.videoSrc = `${this.baseUrl}/${this.id}-${size}.${this.extension}`
  },
  beforeDestroy: function () {
    this.intersectionObserver.disconnect()
  }
}
</script>

<style scoped>
</style>
