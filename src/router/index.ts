import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/enter',
      name: 'enter',
      component: () => import('../views/EnterView.vue'),
    },
    {
      path: '/exit',
      name: 'exit',
      component: () => import('../views/ExitView.vue'),
    },
    {
      path: '/receipts',
      name: 'receipts',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ReceiptsView.vue'),
    },
    {
      path: '/receipts/:id',
      name: 'oneReceipt',
      component: () => import('../views/ReceiptView.vue'),
      props: true,
    },
    {
      path: '/receipts/add',
      name: 'addReceipt',
      component: () => import('../views/AddView.vue'),
    },
    {
      path: '/signin',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
  ],
});

export default router;
