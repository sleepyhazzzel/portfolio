<template>
  <VApp>
    <VAppBar class="px-3 border-bottom" color="#121212" :elevation="0">
      <VAppBarTitle>HAZEL'S {{ $t('portfolio').toUpperCase() }}</VAppBarTitle>
      <template v-if="isSmall" #append>
        <VAppBarNavIcon @click.stop="drawer = !drawer" />
      </template>
      <template v-else #append>
        <template v-for="(item, i) in navList" :key="`navBtn-${i}`">
          <div class="border-right h-100" />
          <VBtn :to="item.to" class="h-100 px-6" exact>{{ item.title }}
            <VIcon v-if="item.children" icon="mdi-chevron-down" end />
            <VMenu v-if="item.children" activator="parent" open-on-hover>
              <VList class="border py-0" :rounded="0">
                <VListItem v-for="(child, i) in item.children" :key="`menuList-${i}`"
                  :title="child.title" :to="child.to" exact>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </template>
        <div class="border-right h-100" />
        <VBtn class="h-100 px-2">
          <VIcon icon="mdi-translate" size="medium" />
          <VMenu activator="parent" open-on-hover>
            <VList class="border py-0" :rounded="0">
              <VListItem v-for="(lang, i) in $i18n.availableLocales" :key="`lang-${i}`"
                @click="switchLang(lang)">
                {{ $t(lang) }}
              </VListItem>
            </VList>
          </VMenu>
        </VBtn>
        <div class="border-right h-100" />
      </template>
    </VAppBar>
    <VNavigationDrawer v-if="isSmall" v-model="drawer" location="end">
      <VList class="py-0">
        <template v-for="(item, i) in navList" :key="`list-${i}`">
          <VListItem v-if="item.to" :title="item.title" :to="item.to" exact />
          <VListGroup v-else>
            <template #activator="{ props }">
              <VListItem v-bind="props" :title="item.title" />
            </template>
            <VListItem v-for="(child, i) in item.children" :key="`listChild-${i}`"
              :title="child.title" :to="child.to" exact />
          </VListGroup>
        </template>
      </VList>
      <template #append>
        <VBtn block>
          <VIcon icon="mdi-translate" size="medium" />
          <VMenu activator="parent" open-on-hover location="top">
            <VList class="border py-0" :rounded="0">
              <VListItem v-for="(lang, i) in $i18n.availableLocales" :key="`lang-${i}`"
                @click="switchLang(lang)">
                {{ $t(lang) }}
              </VListItem>
            </VList>
          </VMenu>
        </VBtn>
      </template>
    </VNavigationDrawer>
    <VMain>
      <VContainer :class="isSmall ? '' : 'border-x'" class="pa-0">
        <RouterView />
      </VContainer>
    </VMain>
    <VFooter app color="#121212" class="border-top px-3 py-0">
      <VContainer class="d-flex pa-0 border-x">
        <div class="text-body-2 flex-1-0 pt-1">
          <div v-for="(item, i) in footerInfo" :key="`info-${i}`" class="my-2 pl-6">
            <VIcon :icon="item.icon" />
            <span class="ml-2">{{ item.text }}</span>
          </div>
          <div class="border-top" />
          <div class="my-2 pl-7">&copy;&nbsp;&nbsp;2024 Hazel Yang</div>
        </div>
        <div class="border-left d-flex flex-wrap">
          <VBtn v-for="(btn, i) in footerBtn" :key="`footerBtn-${i}`" :icon="btn.icon" @click="socialMedia(btn.url)">
            <template v-if="btn.svg" #default>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path :d="btn.svg" fill="currentColor" />
              </svg>
            </template>
          </VBtn>
        </div>
      </VContainer>
    </VFooter>
  </VApp>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useLocaleStore } from '@/store/app'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// i18n
const store = useLocaleStore()
const switchLang = (lang: 'en' | 'zh') => store.setLang(lang)

// screen size
const { smAndDown } = useDisplay()
const isSmall = computed(() => smAndDown.value)

// nav
const drawer = ref<boolean>(false)
type NavItem = { 
  title: string;
  to?: string;
  children?: NavItem[]
}
const navList = computed<NavItem[]>(() => [
  { title: t('home'), to: '/' },
  { title: t('about'), to: '/about' },
  {
    title: t('projects'),
    children: [
      { title: t('webDesign'), to: '/projects/web-design' },
      { title: t('productDesign'), to: '/projects/product-design' },
      { title: t('graphicDesign'), to: '/projects/graphic-design' },
      { title: t('gameDesign'), to: '/projects/game-design' }
    ]
  }
])

// footer
type FooterInfo = { icon: string; text: string }
const footerInfo = ref<FooterInfo[]>([
  { icon: 'mdi-phone', text: '+886 939 960 973' },
  { icon: 'mdi-gmail', text: 'yangching.emily@gmail.com' },
])

type FooterBtn = { 
  icon: string | boolean;
  url: string;
  svg?: string;
}
const footerBtn = ref<FooterBtn[]>([
  { icon: 'mdi-github', url: 'https://github.com/sleepyhazzzel' },
  { icon: true, url: 'https://www.behance.net/yangchinge6dff', svg: 'M19.58 12.27c-.04-.62-.25-1.09-.62-1.41c-.37-.32-.83-.48-1.38-.48c-.58 0-1.08.17-1.39.51c-.33.34-.54.8-.62 1.38m6.35-.23c.08.41.08 1 .08 1.77h-6.5c.05.9.35 1.52.94 1.88c.35.23.78.34 1.29.34c.53 0 .96-.14 1.27-.41c.2-.15.36-.35.5-.62h2.38c-.06.54-.35 1.07-.88 1.62c-.78.88-1.9 1.3-3.34 1.3c-1.19 0-2.23-.37-3.16-1.1c-.88-.73-1.34-1.92-1.34-3.57c0-1.55.41-2.75 1.23-3.55c.82-.83 1.88-1.24 3.19-1.24c.77 0 1.47.14 2.09.42c.62.28 1.14.71 1.54 1.32c.37.53.6 1.14.71 1.84M9.58 14.07c0-.65-.27-1.1-.79-1.34c-.29-.13-.71-.2-1.25-.23H4.87v3.34H7.5c.54 0 .96-.07 1.26-.22c.55-.27.82-.79.82-1.55m-4.71-3.61H7.5c.54 0 1-.1 1.32-.31c.34-.2.5-.57.5-1.09c0-.56-.22-.96-.66-1.15c-.39-.13-.88-.19-1.47-.19H4.87m6.85 4.7c.32.5.48 1.11.48 1.82c0 .76-.2 1.4-.55 1.99a3.6 3.6 0 0 1-.88.98c-.4.29-.87.51-1.41.62c-.54.11-1.12.17-1.75.17H2V5.55h6c1.53.03 2.6.45 3.23 1.33c.38.53.57 1.16.57 1.9c0 .76-.19 1.37-.57 1.83c-.23.26-.53.5-.95.71c.63.23 1.11.6 1.44 1.1m8.34-5.1h-5.01V6.07h5.01v1.25z' },
])
const socialMedia = (url: string) => window.open(url, '_blank')

</script>

<style scoped lang="sass">

</style>