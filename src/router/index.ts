import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'DefaultLayout', aside: true, search: true },
      // component: HomeView,
      component: () => import('../views/main/MainPage.vue'),
    },
    {
      path: '/enter',
      name: 'enter',
      meta: { layout: 'DefaultLayout' },
      component: () => import('../views/EnterView.vue'),
    },
    {
      path: '/exit',
      name: 'exit',
      meta: { layout: 'DefaultLayout' },
      component: () => import('../views/ExitView.vue'),
    },
    // {
    //   path: '/receipts',
    //   name: 'receipts',
    //   meta: { layout: 'DefaultLayout' },
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/ReceiptsView.vue'),
    // },
    // {
    //   path: '/receipts/:id',
    //   name: 'oneReceipt',
    //   meta: { layout: 'DefaultLayout' },
    //   component: () => import('../views/ReceiptView.vue'),
    //   props: true,
    // },
    // {
    //   path: '/receipts/add',
    //   name: 'addReceipt',
    //   meta: { layout: 'DefaultLayout' },
    //   component: () => import('../views/AddView.vue'),
    // },
    {
      path: '/signin',
      name: 'register',
      meta: { layout: 'AdminLayout' },
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/admin-panel',
      name: 'adminPanel',
      meta: { layout: 'AdminLayout', auth: true, role: 'admin' },
      component: () => import('../views/admin/AdminPanel.vue'),
    },
    {
      path: '/admin-panel/ingridients',
      name: 'ingridients',
      meta: { layout: 'AdminLayout', auth: true, role: 'admin' },
      component: () => import('../views/admin/AdminIngridients.vue'),
    },
    {
      path: '/recipes/add',
      name: 'addRecipe',
      meta: { layout: 'DefaultLayout', auth: true },
      component: () => import('../views/recipes/add/AddRecipe.vue'),
    },
    {
      path: '/recipes/edit/:id',
      name: 'editRecipe',
      meta: { layout: 'DefaultLayout', auth: true },
      component: () => import('../views/recipes/edit/EditRecipe.vue'),
    },
    {
      path: '/recipes/:id',
      name: 'recipeView',
      meta: { layout: 'DefaultLayout' },
      component: () => import('../views/recipes/RecipeView.vue'),
    },
    {
      path: '/recipes',
      name: 'recipeSearch',
      meta: { layout: 'InfiniteScrollLayout' },
      children: [
        {
          path: 'search',
          name: 'recipeSearch',
          meta: { layout: 'InfiniteScrollLayout' },
          component: () => import('../components/recipe/RecipesSearch.vue'),
        },
        {
          path: 'by/category/:id',
          name: 'recipeSearch',
          meta: { layout: 'InfiniteScrollLayout' },
          component: () => import('../components/recipe/RecipesByCategory.vue'),
        },
      ],
      component: () => import('../views/recipes/RecipesView.vue'),
    },
    {
      path: '/user/settings',
      name: 'userSettings',
      meta: { layout: 'DefaultLayout' },
      component: () => import('../views/user/UserSettings.vue'),
    },
    {
      path: '/user/favorites',
      name: 'favoriteRecipes',
      meta: { layout: 'DefaultLayout' },
      component: () => import('../views/user/FavoriteRecipes.vue'),
    },
    {
      path: '/user/myrecipes',
      name: 'myRecipes',
      meta: { layout: 'InfiniteScrollLayout' },
      component: () => import('../views/user/MyRecipes.vue'),
    },
  ],
});

export default router;
