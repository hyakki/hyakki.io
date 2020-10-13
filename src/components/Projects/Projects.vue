<template>
  <div :class="`projects--${theme.color.value}`">
    <div class="projects__picture-outer">
      <img
        class="projects__picture"
        :src="currentPicture"
        alt="current-project"
      />
    </div>
    <div class="projects-inner container columns">
      <ul class="projects__list column is-offset-5">
        <li
          class="projects__item"
          @mouseenter="onMouseEnter(project)"
          @mouseleave="onMouseLeave"
          v-for="project in content.projects"
          :key="`project-${project.slug}`"
        >
          <a class="projects__item__link" :href="project.url" target="_blank">
            {{ project.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import * as theme from '@/store/theme'
import * as content from './content'

export default {
  name: 'projects',
  setup() {
    const currentPicture = ref('')

    const onMouseEnter = project => {
      theme.dark()
      currentPicture.value = project.picture
    }

    const onMouseLeave = () => {
      theme.light()
    }

    return {
      content,
      currentPicture,
      onMouseEnter,
      onMouseLeave,
      theme,
    }
  },
}
</script>

<style lang="scss" scoped>
[class*='projects--'],
.projects {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.projects__picture-outer {
  @include center-x;

  position: fixed;
  top: $spacing * 3;
  width: calc(100% - #{$spacing * 2});
  height: calc(100% - #{$spacing * 4});
  background-color: $c-gray-darkest;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-out;

  [class*='projects--'][class*='--dark'] & {
    opacity: 1;
  }
}

.projects__picture {
  @include image-fit;
}

.projects__list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.projects__item {
  width: 100%;
}

.projects__item__link {
  @extend %ff-alt;

  display: block;
  padding: $spacing * 1.5 0;
  font-size: 5.4rem;
  line-height: 1em;
  text-decoration: none;
  color: $c-black;
  transition: color 0.2s ease-out, opacity 0.2s ease-out;

  [class*='projects--'][class*='--dark'] & {
    color: $c-white;
    opacity: 0.1;
  }

  [class*='projects--'][class*='--dark'] .projects__item:hover & {
    opacity: 1;
  }
}
</style>
