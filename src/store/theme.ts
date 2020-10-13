import { ref } from 'vue'

export const color = ref('light')

export const toggle = () => {
  color.value = color.value === 'light' ? 'dark' : 'light'
}

export const light = () => {
  color.value = 'light'
}

export const dark = () => {
  color.value = 'dark'
}
