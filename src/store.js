import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import { getAPI } from './axios-api'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
     accessToken: null,
     refreshToken: null,
     isStaff: false,
  },

  mutations: {
    updateStorage (state, { access, refresh, isStaff }) {
      state.accessToken = access
      state.refreshToken = refresh
      state.isStaff = isStaff
    },
    destroyToken (state) {
      state.accessToken = null
      state.refreshToken = null
      state.isStaff= false
    }
  },
  getters: {
    loggedIn (state) {
      return state.accessToken != null
    }
  },
  actions: {
    userLogout (context) {
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          getAPI.post('/accounts/logout/', { refresh: this.state.refreshToken,}, 
          {headers: { Authorization: `Bearer ${this.state.accessToken}` }})
            .then(() => {
              context.commit('destroyToken') 
              resolve()
            })
            .catch(err => {
              reject(err)
            })
        })
          
      }
    },
    userLogin (context, usercredentials) {
      return new Promise((resolve, reject) => {
        getAPI.post('/accounts/login/', {
          username: usercredentials.username,
          password: usercredentials.password
        })
          .then(response => {
            context.commit('updateStorage', { access: response.data.tokens.access, 
                                              refresh: response.data.tokens.refresh,
                                              isStaff: response.data.isStaff }) 
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})