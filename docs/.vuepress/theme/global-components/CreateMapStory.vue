<script>
import MapStory from './MapStory.vue'

export default {
  name: 'MapStory',
  functional: true,
  props: {
    map: Object
  },
  render: function (createElement, context) {
    const children = context.children
      .filter((child) => child.tag)

    return createElement(MapStory, {
      props: {
        ...context.props,
        items: children
      }
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
