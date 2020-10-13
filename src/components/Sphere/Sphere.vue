<template>
  <div
    class="sphere"
    @mousemove="mouseMoveHandler"
    @mousedown="mouseDownHandler"
    @mouseup="mouseUpHandler"
    @mouseleave="mouseUpHandler"
  >
    <div class="sphere__canvas" ref="canvas"></div>
  </div>
</template>

<script lang="ts">
import { onMounted, Ref, ref, watch } from 'vue'
import aladino from './../../scripts/aladino'
import material from './material'
import gsap from 'gsap'

interface MouseObject {
  x: number
  y: number
}

export default {
  name: 'sphere',
  setup() {
    const canvas = ref()
    const carpet = ref()
    const mouse: Ref<MouseObject> = ref({ x: 0, y: 0 })
    const progress = ref(0.0)

    onMounted(() => {
      carpet.value = aladino.carpet(canvas.value, {
        material,
        uniforms: {
          mouse: [mouse.value.x, mouse.value.y],
          progress: progress.value,
        },
      })
    })

    const mouseDownHandler = () => {
      gsap.killTweensOf(progress)
      gsap.to(progress, {
        duration: 1.0,
        value: 1.0,
        ease: 'elastic.out(1.2, 0.7)',
      })
    }

    const mouseUpHandler = () => {
      gsap.killTweensOf(progress)
      gsap.to(progress, {
        duration: 1.0,
        value: 0.0,
        ease: 'power4.easeIn,',
      })
    }

    const mouseMoveHandler = e => {
      const { clientX, clientY } = e

      mouse.value = {
        x: (clientX / 650) * 2.0 - 1.0,
        y: 1.0 - (clientY / 650) * 2.0,
      }
    }

    watch(
      () => [mouse.value as MouseObject, progress.value],
      v => {
        const m = v[0] as MouseObject

        carpet.value.uniforms.mouse = [m.x, m.y]
        carpet.value.uniforms.progress = v[1]
      }
    )

    return {
      canvas,
      mouseDownHandler,
      mouseUpHandler,
      mouseMoveHandler,
    }
  },
}
</script>

<style lang="scss">
@import './../../styles/utils/_index.scss';

.sphere {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sphere__canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
