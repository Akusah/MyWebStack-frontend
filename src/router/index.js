import { createRouter, createWebHistory } from 'vue-router'

const index = () => import('@/views/index.vue')

const login = () => import('@/views/login.vue')

const about = () => import('@/views/web/about.vue')

const webPage = () => import('@/views/web/WebPage.vue')

const admin = () => import('@/views/admin/admin.vue')

const info = () => import('@/views/info.vue')

const usermanage = () => import('@/components/admin/usermanage.vue')
const webmanage = () => import('@/components/admin/webmanage.vue')
const commentmanage = () => import('@/components/admin/commentmanage.vue')
const webcontrol = () => import('@/components/admin/webcontrol.vue')
const categoryControl = () => import('@/components/admin/categoryControl.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'startPage',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'loginPage',
      component: login,
    },
    {
      path: '/index',
      name: 'indexPage',
      component: index,
    },
    {
      path: '/about',
      name: 'infoPage',
      component: about,
    },
    {
      path: '/webPage',
      name: 'webPage',
      component: webPage,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: admin,
      children: [
        { path: 'usermanage', component: usermanage },
        { path: 'webmanage', component: webmanage },
        { path: 'commentmanage', component: commentmanage },
        { path: 'webcontrol', component: webcontrol },
        {
          path: 'categoryControl', component: categoryControl
        }
      ]
    },
    {
      path: '/info',
      name: 'infoPage',
      component: info
    }
  ]
})

// router.beforeEach((to,from,next)=>{
   
// })

export default router
