import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/pages/home/index').default,
      children: [
        {
          path: 'landing-page',
          name: 'landing-page',
          component: require('@/components/LandingPage').default
        },
        {
          path: 'add-asset',
          name: 'add-asset',
          component: require('@/pages/asset-add/index').default
        },
        {
          path: 'add-asset-type',
          name: 'add-asset-type',
          component: require('@/pages/asset-type-add/index').default
        },
        {
          path: 'asset-list',
          name: 'asset-list',
          component: require('@/pages/asset-list/index').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
