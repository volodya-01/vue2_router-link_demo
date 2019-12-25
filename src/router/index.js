import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    redirect:'/gfgs',
    children: [{
      path: 'gfgs',
      name: 'gfgs',
      component: ()=>import('@/components/gfgs'),
    },{
      path: 'cjgs',
      name: 'cjgs',
      component: ()=>import('@/components/cjgs'),
    },{
      path: 'jhts',
      name: 'jhts',
      component: ()=>import('@/components/jhts'),
    },{
      path: 'sctc',
      name: 'sctc',
      component: ()=>import('@/components/sctc'),
    }]
  }]
})
