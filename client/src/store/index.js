export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_ERROR = 'USER_ERROR'
export const AUTH_REGISTER = 'AUTH_REGISTER'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    status: ''
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  actions: {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
      return new Promise((resolve, reject) =>{
        commit(AUTH_REQUEST)
        axios({url: 'http://localhost:8081/login', data: user, method: 'POST' })
          .then(resp => {
            var token = resp.data.token
            if (!token){
              commit(AUTH_ERROR)
            }
            else{
              localStorage.setItem('user-token', token) // store the token in localstorage
              commit(AUTH_SUCCESS, token)
              // you have your token, now log in your user :)
              // dispatch(USER_REQUEST)
              resolve(resp)
            }
          })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
          reject(err)
        })
      })
    },
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_LOGOUT)
        localStorage.removeItem('user-token') // clear your user's token from localstorage
        resolve()
      })
    },
    [AUTH_REGISTER]: ({commit, dispatch}, user) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_REQUEST)
        axios({url: 'http://localhost:8081/register', data: user, method: 'POST'})
        .then(res => {
          var token = res.data.token
          if (!token) {
            commit(AUTH_ERROR)
          }
          else {
            localStorage.setItem('user-token', token)
            commit(AUTH_REGISTER)
            resolve(res)
          }
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('user-token')
          reject(err)
        })
      })
    }
  },
  mutations: {
    [AUTH_REQUEST]: (state) => {
      state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
      state.status = 'success'
      state.token = token
    },
    [AUTH_ERROR]: (state) => {
      state.status = 'error'
    },
    [AUTH_LOGOUT]: (state, token) => {
      state.token = '',
      state.status = ''
    },
    [AUTH_REGISTER]: (state) => {
      state.status = 'registered'
    }
  }
})