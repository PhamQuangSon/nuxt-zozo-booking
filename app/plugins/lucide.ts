import { defineNuxtPlugin } from '#app'
import * as icons from 'lucide-vue-next'

export default defineNuxtPlugin((nuxtApp) => {
  for (const [name, component] of Object.entries(icons)) {
    // Register component globally: <LucideHome /> → name = "Home"
    nuxtApp.vueApp.component(`${name}`, component)
  }
})
