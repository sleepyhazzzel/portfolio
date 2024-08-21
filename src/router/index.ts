// Composables
import path from 'path'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About.vue'),
      },
      {
        path: 'projects',
        component: () => import('@/layouts/ProjectLayout.vue'),
        children: [
          {
            path: 'web-design',
            name: 'Web Design',
            component: () => import('@/views/projects/WebDesign.vue'),
          },
          {
            path: 'product-design',
            name: 'Product Design',
            component: () => import('@/views/projects/ProductDesign.vue'),
          },
          {
            path: 'graphic-design',
            name: 'Graphic Design',
            component: () => import('@/views/projects/GraphicDesign.vue'),
          },
          {
            path: 'game-design',
            name: 'Game Design',
            component: () => import('@/views/projects/GameDesign.vue'),
          }
        ]
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
