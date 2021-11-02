<script>
import MapStory from './MapStory.vue'
export default {
  name: 'MapStory',
  functional: true,
  props: {
    map: Object,
    startIndex: {
      type: Number,
      default: 0
    }
  },
  render: function (createElement, context) {
    const children = context.children
      .filter((child) => child.tag)
    return createElement(MapStory, {
      on: context.data.on,
      props: {
        ...context.props,
        items: children
      }
    })
  }
}
</script>
