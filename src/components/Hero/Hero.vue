<template>
  <div class="hero">
    <div class="hero-inner container">
      <h1 class="hero__title">
        Creative Developer
      </h1>
      <div class="hero__baseline">
        Maxime Parisse
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'hero',
}
</script>

<style lang="scss">
@import './../../styles/utils/_index.scss';

[class*='hero--'],
.hero {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-inner {
  @extend %text-center;
  @include fluid(
    font-size,
    (
      xxxs: 30px,
      xxl: 80px,
    )
  );

  position: relative;
  z-index: 2;
  color: $c-black;
  line-height: 1.2em;
  pointer-events: none;
}

.hero__title {
  font-size: 1em;
  line-height: 1em;
}

.hero__baseline {
  @extend %text-uppercase;

  margin-top: 0.3em;
  font-size: 0.4em;
  line-height: 1.2em;
}
</style>
