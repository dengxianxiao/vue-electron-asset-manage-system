import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/pages/home/index').default,
      redirect: 'asset-borrow',
      children: [
        {
          path: 'landing-page',
          name: 'landing-page',
          component: require('@/components/LandingPage').default
        },
        {
          path: 'asset-borrow',
          name: 'asset-borrow',
          component: require('@/pages/asset-borrow/index').default
        },
        {
          path: 'department-list',
          name: 'department-list',
          component: require('@/pages/department-list/index').default
        },
        {
          path: 'asset-type-list',
          name: 'asset-type-list',
          component: require('@/pages/asset-type-list/index').default
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
