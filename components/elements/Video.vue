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
      sizes: [
        [1280, 720],
        [1920, 1080]
      ]
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
    this.videoSrc = `https://files.boven.land/video/${this.id}-${size}.mp4`
  },
  beforeDestroy: function () {
    this.intersectionObserver.disconnect()
  }
}
</script>

<style scoped>
</style>
