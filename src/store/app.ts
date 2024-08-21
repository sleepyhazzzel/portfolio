// Utilities
import { defineStore } from 'pinia'
// import { ref } from 'vue'
import { useI18n } from 'vue-i18n';

export const useLocaleStore = defineStore('locale', () => {
  const { locale } = useI18n()
  const setLang = (lang: 'en' | 'zh') => {
    locale.value = lang
  }
  return { setLang }
}, {
  persist: true
})