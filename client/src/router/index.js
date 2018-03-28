import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Books from '@/components/Books'
import NewBook from '@/components/NewBook'
import EditBook from '@/components/EditBook'
import Login from '@/components/Login'
import Group from '@/components/Group'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
    {
      path: '/books/:id',
      name: 'EditBook',
      component: EditBook
    },
    {
      path: '/auth',
      name: 'Login',
      component: Login
    },
    {
      path: '/group/:id',
      name: 'Group',
      component: Group,
    }
  ]
})
