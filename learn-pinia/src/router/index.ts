import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/pages/home.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/about.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
