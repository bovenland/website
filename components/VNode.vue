<script>
export default {
  name: 'VNode',
  props: ['node'],
  render: function (h, context) {
    return this.node ? this.node : ''
  },
  mounted: function () {
    this.$emit('updated')
  },
  updated: function () {
    this.$emit('updated')
  }
}
</script>
