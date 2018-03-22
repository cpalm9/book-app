import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Books from '@/components/Books'
import NewBook from '@/components/NewBook'
import EditBook from '@/components/EditBook'
import Group from '@/components/Group'
import Login from '@/components/Login'
import Register from '@/components/Register'
import store from '../store'


Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/books')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/auth')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: ifAuthenticated
    },
    {
      path:'/books',
      name: 'Books',
      component: Books,
      beforeEnter: ifAuthenticated,
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
      path: '/group/:id',
      name: 'Group',
      component: Group,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/auth',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    }
  ]
})
