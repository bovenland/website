<template>
  <div>
    <svg
      class="icon"
      id="DotMask"
      xmlns="http://www.w3.org/2000/svg"
      width="1024"
      height="1024"
      viewBox="0 0 1024 1024"
    >
      <path
        d="M0,0V1024H1024V0ZM950.11749,774.03339,775.97168,948.7417l-235.5011,73.81567L297.564,978.59058,102.8783,826.90991,1.02026,602.24414l14.3324-246.16266,127.19415-211.279L353.48956,16.82635,599.86279,1.44263,825.2124,102.20947,977.91345,296.00616l45.06629,242.45862Z"
      />
    </svg>

    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/sass/partials/base.scss";
@import "@/assets/sass/partials/mixins.scss";
div {
  position: relative;
  @include aspect-ratio(1, 1);
  overflow: hidden;
}
svg {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  fill: $white;
}
img {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
