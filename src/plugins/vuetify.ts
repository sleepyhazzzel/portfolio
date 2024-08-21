/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@/assets/styles/main.sass'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults: {
    global: {
      ripple: false,
    },
    VBtn: {
      variant: 'text',
      rounded: 0,
      class: 'white-btn'
    },
    VListItem: {
      class: 'white-btn'
    }
  },
  theme: {
    defaultTheme: 'dark',
  },
})
