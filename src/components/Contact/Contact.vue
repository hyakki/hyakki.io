<template>
  <div :class="`contact--${theme.color.value}`">
    <div class="contact-inner">
      <a class="contact__link" href="https://github.com/hyakki" target="_blank">
        github.com/hyakki
      </a>
      <a
        class="contact__link"
        target="_blank"
        href="https://twitter.com/hyakki_dev"
      >
        hyakki_dev
      </a>
      <a class="contact__link" href="mailto:me@hyakki.io">
        me@hyakki.io
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import * as theme from '@/store/theme'

export default {
  name: 'contact',
  setup() {
    return {
      theme,
    }
  },
}
</script>

<style lang="scss">
.contact-inner {
  display: flex;
  justify-content: flex-end;
  padding: $spacing;
}

.contact__link {
  @extend %text-nodecoration;

  margin-left: $spacing;
  color: $c-black;
  font-family: $ff-alt;
  transition: color 0.2s ease-out;

  [class*='contact--'][class*='--dark'] & {
    color: $c-white;
  }

  &:hover {
    color: $c-orange;
  }
}
</style>
