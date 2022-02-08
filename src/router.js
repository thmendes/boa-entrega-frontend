import Vue from 'vue'
import Router from 'vue-router'
import { authGuard } from './auth/authGuard'
Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./components/templates/common.vue'),
      meta: {
        isPublic: true
      },
      children: [
        {
          path: 'home',
          alias: '',
          meta: {
            isPublic: true
          },
          component: () => import('@/views/common/home')
        },
        {
          path: 'entrar',
          name: 'Login',
          component: () => import('@/views/auth/Signin'),
          meta:{
            isPublic: true
          }
        },
        {
          path: 'esqueci-minha-senha',
          component: () => import('@/views/auth/RecoveryPassword'),
          meta:{
            isPublic: true
          }
        }
      ]
    },
    {
      path: '/',
      component: () => import('./components/templates/platform.vue'),
      meta: {
        isPublic: true
      },
      children: [
        {
          path: 'entregas',
          name: 'Entregas',
          component: () => import('./views/common/deliveries.vue'),
          // beforeEnter: authGuard
        },
        {
          path: 'perfil',
          name: 'perfil',
          component: () => import('./views/profile/Profile.vue'),
          // beforeEnter: authGuard
        },
        {
          path: 'sair',
          name: 'sair',
          component: () => import('./views/auth/Signout.vue'),
          beforeEnter: authGuard
        }
      ]
    }
  ]
})

export default router;
