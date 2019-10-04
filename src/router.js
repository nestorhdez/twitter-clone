import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Signup from './views/Signup'
import Home from './views/Home'
import Search from './views/Search'
import Profile from './views/Profile'
import WriteTweet from './views/WriteTweet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/:user',
      name: 'profile',
      component: Profile
    },
    {
      path: '/write/tweet',
      name: 'write-tweet',
      component: WriteTweet
    }
  ]
})
