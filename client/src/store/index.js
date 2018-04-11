export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_ERROR = 'USER_ERROR'
export const AUTH_REGISTER = 'AUTH_REGISTER'
export const UPDATE_READING_LIST = 'UPDATE_READING_LIST'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    user: '',
    readingList: '',
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    getUser: state => state.user
  },
  actions: {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
      return new Promise((resolve, reject) =>{
        commit(AUTH_REQUEST)
        axios({url: 'http://localhost:8081/login', data: user, method: 'POST' })
          .then(resp => {
            var token = resp.data.token
            var user = resp.data.user
            console.log(user)
            if (!token){
              commit(AUTH_ERROR)
            }
            else{
              localStorage.setItem('user-token', token) // store the token in localstorage
              commit(AUTH_SUCCESS, {
                token: token,
                user: user
              })
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
          var user = res.data.user
          if (!user) {
            commit(AUTH_ERROR)
          }
          else {
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
    },
    [UPDATE_READING_LIST]: ({commit, dispatch}, book) => {
      return new Promise((resolve, reject) => {
        commit(UPDATE_READING_LIST)
        axios({url: 'http://localhost:8081/user/update', data: book, method: 'PUT'})
        .then(res => {
          console.log(res.data.user)
          var readingList = res.data.user.readingList
          commit(UPDATE_SUCCESS, {
            readingList: readingList
          })
        })
      })
    }
  },
  mutations: {
    [AUTH_REQUEST]: (state) => {
      state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, payload) => {
      state.status = 'success'
      state.token = payload.token
      state.user = payload.user
      state.readingList = payload.user.readingList
    },
    [AUTH_ERROR]: (state) => {
      state.status = 'error'
    },
    [AUTH_LOGOUT]: (state, token) => {
      state.token = '',
      state.status = '',
      state.user = '',
      state.readingList = ''
    },
    [AUTH_REGISTER]: (state) => {
      state.status = 'registered'
    },
    [UPDATE_SUCCESS]: (state, payload) => {
      state.status = 'updated'
      state.readingList = payload.readingList
    },
    [UPDATE_READING_LIST]: (state) => {
      state.status = 'updating'
    }
  }
})