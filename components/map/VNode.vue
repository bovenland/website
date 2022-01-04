<script>
export default {
  name: 'VNode',
  props: ['node'],
  render: function () {
    return this.node ? this.node : ''
  }
}
</script>
