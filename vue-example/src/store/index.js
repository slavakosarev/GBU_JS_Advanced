import Vue from 'vue'
import Vuex from 'vuex'

const API_URL = 'http://localhost:8080'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showcase: [],
    cart: [],
    filterString: ''
  },
  getters: {
    getShowCase(state) {
      if (state.filterString.length == 0) {
        return [...state.showcase]
      }
      const reg = new RegExp(state.filterString, 'gi')
      return state.showcase.filter((good) => reg.test(good.title))
    },
    getCart(state) {
      return [...state.cart]
    },
    getSearchString(state) {
      return state.filterString
    }
  },
  mutations: {
    setFilter(state, payload) {
      state.filterString = payload;
    },
    addShowCase(state, payload) {
      state.showcase = [...payload]
    },
    addToCart(state, good) {
      state.cart.push(good)
    },
    removeFromCart(state, id) {
      const idx = state.cart.findIndex((good) => id == good.id)
      if (idx !== -1) {
        state.cart = [...state.cart.slice(0, idx), ...state.cart.slice(idx + 1)]
      }
    }
  },
  actions: {
    fetchShowCase({ commit }) {
      return fetch(`${API_URL}/catalog`)
        .then((response) => response.json())
        .then((data) => {
          commit('addShowCase', data)
        })
    },

    fetchCart({ commit }) {
      return fetch(`${API_URL}/cart`)
        .then((response) => response.json())
        .then((data) => {
          for (let good of data) {
            commit('addToCart', good)
          }
        })
    },

    addToCart({ commit }, good) {
      return fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(good)
      })
        .then((response) => {
          if (response.status == 200) {
            commit('addToCart', good)
          }
        })
    },
    removeFromCart({ commit }, id) {
      return fetch(`${API_URL}/cart/${id}`, {
        method: 'DELETE'
      })
        .then((response) => {
          if (response.status == 200) {
            commit('removeFromCart', id)
          }
        })
    }
  },
  modules: {
  }
})
