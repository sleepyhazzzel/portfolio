// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import EN from '@/locales/en.json'
import ZH from '@/locales/zh.json'
import Tres from '@tresjs/core'

const app = createApp(App)
const i18n = createI18n<object, 'en' | 'zh'>({
  locale: 'zh',
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    'en': EN,
    'zh': ZH,
  },
})

registerPlugins(app)

app.use(i18n)
app.use(Tres)
app.mount('#app')
