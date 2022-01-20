<template>
  <div class="legend">
    <div class="label">{{format(domain[0])}}</div>
    <canvas class="ramp" ref="ramp"></canvas>
    <div class="label">{{format(domain[1])}}</div>
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
      const canvas = this.$refs.ramp

      const n = 256
      canvas.width = n
      canvas.height = 1

      const context = canvas.getContext('2d')

      const step = (this.domain[1] - this.domain[0]) / (n - 1)
      for (let i = 0; i < n; i++) {
        const value = i * step + this.domain[0]
        context.fillStyle = this.color(value)
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
  min-width: 0;
  height: 1em;
  border-radius: 5px;
  margin: 0 1em;
}

.label {
  margin: 0;
  white-space: nowrap;
}
</style>
