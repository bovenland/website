<script>
import MapStory from './MapStory.vue'
export default {
  name: 'MapStory',
  functional: true,
  props: {
    startIndex: {
      type: Number,
      default: undefined
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
