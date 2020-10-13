<template>
  <div :class="`projects--${theme.color.value}`">
    <div class="projects-inner container columns">
      <ul class="projects__list column is-offset-5">
        <li
          class="projects__item"
          @mouseenter="theme.dark()"
          @mouseleave="theme.light()"
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
import * as theme from '@/store/theme'
import * as content from './content'

export default {
  name: 'projects',
  setup() {
    return {
      content,
      theme,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './../../styles/utils/_index.scss';

[class*='projects--'],
.projects {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.projects__list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.projects__item__link {
  @extend %ff-alt;

  display: block;
  padding: $spacing * 2 0;
  font-size: 5.4rem;
  line-height: 1em;
  text-decoration: none;
  color: black;
  transition: color 0.2s ease-out, opacity 0.2s ease-out;

  [class*='projects--'][class*='--dark'] & {
    color: white;
    opacity: 0.1;
  }

  [class*='projects--'][class*='--dark'] .projects__item:hover & {
    opacity: 1;
  }
}
</style>
