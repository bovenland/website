<template>
  <div class="legend">
    <div>{{format(domain[0])}}</div>
    <canvas class="ramp" ref="ramp"></canvas>
    <div>{{format(domain[1])}}</div>
    <!-- d3.format(tickFormat) -->
  </div>
</template>

<script>
export default {
  name: 'Legend',
  props: {
    color: Function,
    format: Function
  },
  computed: {
    domain: function () {
      return this.color.domain()
    }
  },
  methods: {
    createRamp: function () {
      // color.copy().domain(d3.quantize(d3.interpolate(0, 1), n)

      const canvas = this.$refs.ramp

      // const width = ramp.clientWidth
      // const height = ramp.clientHeight

      const n = 256
      canvas.width = n
      canvas.height = 1

      const context = canvas.getContext('2d')



      for (let i = 0; i < n; ++i) {
        context.fillStyle = this.color(i / (n - 1) * (this.domain[1] - this.domain[0] / n) + this.domain[0])
        context.fillRect(i, 0, 1, 1)
      }
    }
  },
  mounted: function () {
    this.createRamp()
  }
}
</script>

<style scoped>
.legend {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.ramp {
  width: 100%;
  height: 1em;
  border-radius: 5px;
  margin: 0 1em;
}
</style>
