<template>
  <div class="portrait">
    <div class="portrait-inner">
      <img
        class="portrait__picture"
        :src="src"
        alt="Maxime Parisse Picture"
        ref="picture"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch } from 'vue'
import aladino from './../../scripts/aladino'
import material from './material'
import gsap from 'gsap'

import displacementPicture from './displacement.png'

export default {
  name: 'portrait',
  props: {
    visibility: {
      type: Number,
      default: () => 0,
    },
    src: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    const picture = ref()
    const carpet = ref()
    const progress = ref(props.visibility)

    onMounted(() => {
      carpet.value = aladino.carpet(picture.value, {
        material,
        uniforms: {
          picture: aladino.texture(picture.value.src),
          displacementPicture: aladino.texture(displacementPicture, {
            nearest: true,
          }),
          progress: progress.value,
        },
      })
    })

    watch(
      () => [props.visibility],
      v => {
        gsap.to(carpet.value.uniforms, {
          duration: 0.3,
          progress: v[0],
        })
      }
    )

    return {
      picture,
    }
  },
}
</script>

<style>
.portrait-inner {
  position: relative;
}

.portrait-inner::before {
  content: '';
  display: block;
  width: 100%;
  padding-top: 100%;
}

.portrait__picture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
