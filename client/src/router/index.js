import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Books from '@/components/Books'
import NewBook from '@/components/NewBook'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    },
    {
      path:'/books',
      name: 'Books',
      component: Books
    },
    {
      path: '/books/new',
      name: 'NewBook',
      component: NewBook
    },
  ]
})
