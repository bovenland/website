<template>
  <div class="map-page">
    <!-- Segmenten menu -->
    <SegmentsMenu
      v-bind:chapter="chapter"
      v-bind:segment="segment"
      v-bind:segments="segments"
    />

    <div class="container column chapter">
      <slot />
    </div>
  </div>
</template>