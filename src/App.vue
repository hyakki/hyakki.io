<template>
  <div :class="`app--${theme.color.value}`">
    <div class="app__bg"></div>
    <Sphere class="app__sphere" v-if="false" />
    <Hero class="app__hero" v-if="true" />
    <Bio class="app__bio" v-if="true" />
    <Projects class="app__projects" v-if="true" />
    <Contact class="app__contact" v-if="true" />
  </div> </template> <script lang="ts">
import aladino from './scripts/aladino'
import { onMounted } from 'vue'

import Bio from './components/Bio/Bio.vue'
import Contact from './components/Contact/Contact.vue'
import Hero from './components/Hero/Hero.vue'
import Projects from './components/Projects/Projects.vue'
import Sphere from './components/Sphere/Sphere.vue'

import * as theme from '@/store/theme'

export default {
  name: 'App',
  components: {
    Bio,
    Contact,
    Hero,
    Projects,
    Sphere,
  },
  setup() {
    onMounted(() => {
      document.body.appendChild(aladino.canvas)
    })

    return {
      theme,
    }
  },
}
</script>

<style lang="scss">
[class*='app--'],
.app {
  background-color: $c-white;
  color: $c-black;
  transition: background-color 0.2s ease-out, color 0.2s ease-out;

  &[class*='--dark'] {
    background-color: $c-black;
    color: $c-white;
  }
}

.app__bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/pattern/dots.svg');
  background-size: 6px;
  opacity: 0.15;
}

.app__sphere {
  @include get-all-space;

  position: fixed;
  z-index: -1;
}

.app__hero,
.app__bio {
  position: relative;
  z-index: 2;
}

.app__portrait {
  width: 100vh;
}

.app__contact {
  position: fixed;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
