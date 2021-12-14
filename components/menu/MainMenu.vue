<template lang="md">
<label>hoofdstukken</label>

  <section class="section">
    <ol>
      <li v-for="(chapter, index) of chapters" :key="index">
        <div>
          <label>{{chapter.index}}</label>
          <h3 v-html="chapter.title"></h3>
        </div>
        <ul v-if="chapter.to">
          <li v-for="(segment, segmentIndex) of chapter.segments" :key="segmentIndex">
            <nuxt-link :to="{ name: `hoofdstukken-${chapter.to.name}-${segment.to.name}` }">
              <label>{{chapter.index}}.{{segmentIndex+1}}</label>
              <h3 v-html="segment.title"></h3>
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ol>
  </section>

  <NuxtLink to="/">
    <Logo dot="pink" letters="black" />
  </NuxtLink>

  <section class="section">
    <ul>
      <li v-for="(item, index) of menu" :key="index">
        <nuxt-link :to="{ ...item.to }">
          <h3 v-html="item.title"></h3>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import Logo from "./../elements/Logo";
import structure from "/structure.js";
export default {
  data() {
    return structure;
  },
  components: {
    Logo,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";

section.section {
  padding: 0;
  ol {
    list-style: none;
    > li {
      margin: 1rem 0;
      > div {
        &:after {
          content: "";
          display: table;
          clear: both;
        }
      }
    }
    li {
      > a:after {
        content: "";
        display: table;
        clear: both;
      }
      label {
        float: left;
        padding-top: 11px;
        width: 48px;
      }
      h3 {
        float: left;
        @include calc("width", "100% - 48px");
      }
      &:after {
        content: "";
        display: table;
        clear: both;
      }
    }
  }
  ul {
    margin: 0.5rem 0;
    li {
      label {
        padding-top: 8px;
      }
    }
  }
}
svg {
  padding: 20px 76px;
  width: 100%;
  max-width: 384px;
  display: block;
  margin: 0 auto;
}

a,
a:link,
a:visited,
a.nuxt-link-exact-active,
a.nuxt-link-exact-active:link,
a.nuxt-link-exact-active:visited {
  text-decoration: none;
}
a:hover,
a.nuxt-link-exact-active:hover {
  color: $white;
}
</style>
