<template>
  <div class="bio">
    <div class="bio-inner container columns">
      <div class="bio__content column is-5">
        <h1 class="bio__content__title">
          Who?
        </h1>
        <div class="bio__content__text" v-html="content.text"></div>
      </div>
      <div class="bio__picture-outer column is-5 is-offset-2">
        <Portrait
          class="bio__picture"
          :src="picture"
          :visibility="visibility"
        />
        <div class="bio__sequence">
          <div
            class="bio__entry"
            :class="{
              'is-active': entry.active,
              'is-clickable': isClickable(index),
            }"
            v-for="(entry, index) in entries"
            :key="`entry-${index}`"
            @click="releaseKey(entry.key)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import Portrait from './../Portrait/Portrait.vue'
import picture from './max.jpg'
import * as content from './content'

export default {
  name: 'bio',
  components: {
    Portrait,
  },
  setup() {
    const konamicode = [
      {
        key: 38,
        active: false,
      },
      {
        key: 38,
        active: false,
      },
      {
        key: 40,
        active: false,
      },
      {
        key: 40,
        active: false,
      },
      {
        key: 37,
        active: false,
      },
      {
        key: 39,
        active: false,
      },
      {
        key: 37,
        active: false,
      },
      {
        key: 39,
        active: false,
      },
      {
        key: 66,
        active: false,
      },
      {
        key: 65,
        active: false,
      },
    ]
    const entries = ref(konamicode)
    const visibility = ref(0)

    const show = () => {
      visibility.value = 1

      setTimeout(() => {
        entries.value.forEach(v => (v.active = false))
        visibility.value = 0
      }, 3000)
    }

    const releaseKey = key => {
      // Find first unactive entries
      const next = entries.value.find(e => !e.active)

      // No next action required for now
      if (!next) {
        return
      }

      // Active entry or desactive all
      if (next && key === next.key) {
        next.active = true
      } else {
        entries.value.forEach(e => {
          e.active = false
        })
      }

      // Check if all entries are active
      if (!entries.value.find(e => !e.active)) {
        show()
      }
    }

    const keyupHandler = e => {
      releaseKey(e.keyCode)
    }

    const isClickable = i => {
      const next = entries.value.findIndex(e => !e.active)

      return i === next
    }

    onMounted(() => {
      window.addEventListener('keyup', keyupHandler)
    })

    return {
      content,
      isClickable,
      entries,
      releaseKey,
      visibility,
      picture,
    }
  },
}
</script>

<style lang="scss">
@import './../../styles/utils/_index.scss';

.bio__content__title {
  font-size: 10rem;
  line-height: 1.4em;
}

.bio__content__text {
  p + p {
    margin-top: $spacing;
  }
}

.bio__sequence {
  display: flex;
  justify-content: flex-end;
  margin-top: $spacing / 2;
}

.bio__entry {
  width: 20px;
  height: 20px;
  margin-left: $spacing / 2;
  background-color: $c-gray-light;
  box-shadow: 0 0 3px 1px transparent;
  pointer-events: none;
  transition: background-color 0.2s ease-out, box-shadow 0.2s ease-out;

  &.is-active {
    background-color: $c-dev;
  }

  &.is-clickable {
    pointer-events: all;
    box-shadow: 0 0 3px 1px $c-gray-dark;
    cursor: pointer;
  }
}
</style>
